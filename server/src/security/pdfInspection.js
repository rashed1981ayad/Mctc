import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HttpError } from "../middleware/errorHandler.js";

const serverDir = fileURLToPath(new URL("../../", import.meta.url));
const verdictDir = path.join(serverDir, "uploads", ".pdf-verdicts");
export const PDF_POLICY = "pdf-qpdf-clamav-v1";
export const MAX_PDF_BYTES = 10 * 1024 * 1024;
const forbiddenNames = new Set(["/JS", "/JavaScript", "/AA", "/Launch", "/EmbeddedFiles", "/EmbeddedFile", "/RichMedia", "/RichMediaContent", "/XFA", "/AcroForm", "/SubmitForm", "/ImportData"]);

function unavailable() {
  return new HttpError(503, "فحص أمان PDF غير متاح حاليًا. لم يُنشر الملف؛ حاول مجددًا لاحقًا.", { expose: true });
}
function rejected(message = "ملف PDF غير سليم أو يتضمن محتوى غير مسموح") {
  return new HttpError(400, message);
}

export function pdfTools(env = process.env) {
  const portableQpdf = path.join(serverDir, ".tools/qpdf/qpdf-12.4.2-msvc64/bin/qpdf.exe");
  const portableClam = path.join(serverDir, ".tools/clamav/clamav-1.5.4.win.x64/clamscan.exe");
  const database = path.join(serverDir, ".tools/clamav/database");
  return {
    qpdf: env.PDF_QPDF_PATH || (existsSync(portableQpdf) ? portableQpdf : "qpdf"),
    clamscan: env.PDF_CLAMSCAN_PATH || (existsSync(portableClam) ? portableClam : "clamscan"),
    database: env.PDF_CLAMAV_DATABASE || (existsSync(database) ? database : "")
  };
}

// No shell, inherited application secrets, or unbounded tool output.
export function runPdfTool(executable, args, timeout = 30_000) {
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) =>
    /^(PATH|SYSTEMROOT|WINDIR|TEMP|TMP|TMPDIR|HOME|LANG|LC_ALL)$/i.test(key)));
  return new Promise((resolve, reject) => {
    execFile(executable, args, { windowsHide: true, shell: false, timeout, killSignal: "SIGKILL", maxBuffer: 8 * 1024 * 1024, env }, (error, stdout, stderr) => {
      if (error && (error.killed || !Number.isInteger(error.code))) return reject(unavailable());
      resolve({ code: error?.code || 0, stdout, stderr });
    });
  });
}

export function validatePdfObjects(document) {
  if (document?.version !== 2 || !Array.isArray(document.qpdf) || document.qpdf.length < 2) throw unavailable();
  const pending = [document.qpdf];
  while (pending.length) {
    const value = pending.pop();
    if (typeof value === "string" && forbiddenNames.has(value)) throw rejected();
    if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        // qpdf decodes PDF names, including #xx escapes and compressed objects.
        if (forbiddenNames.has(key)) throw rejected();
        pending.push(child);
      }
    }
  }
}

export async function readPdfBytes(filename) {
  const info = await stat(filename);
  if (!info.isFile() || info.size > MAX_PDF_BYTES) throw new HttpError(413, "الملف أكبر من الحجم المسموح");
  const bytes = await readFile(filename);
  if (bytes.length > MAX_PDF_BYTES) throw new HttpError(413, "الملف أكبر من الحجم المسموح");
  if (!/^%PDF-[12]\.\d/.test(bytes.toString("ascii", 0, 8)) || !/%%EOF[\t\r\n ]*$/.test(bytes.subarray(-2048).toString("latin1"))) throw rejected();
  return bytes;
}
const digest = bytes => createHash("sha256").update(bytes).digest("hex");

export async function isApprovedPdf(bytes, directory = verdictDir) {
  const hash = digest(bytes);
  try {
    const record = JSON.parse(await readFile(path.join(directory, hash + ".json"), "utf8"));
    return record.policy === PDF_POLICY && record.sha256 === hash && record.result === "clean";
  } catch { return false; }
}

let scanning = false;
export async function inspectAndApprovePdf(filename, { run = runPdfTool, tools = pdfTools(), directory = verdictDir } = {}) {
  if (scanning) throw new HttpError(503, "فحص ملف آخر جارٍ الآن. أعد المحاولة بعد قليل.", { expose: true });
  scanning = true;
  try {
    const before = await readPdfBytes(filename);
    // A failed re-scan revokes any previous approval of these same bytes.
    await unlink(path.join(directory, digest(before) + ".json")).catch(error => {
      if (error.code !== "ENOENT") throw error;
    });
    const structural = await run(tools.qpdf, ["--check", filename]);
    if (structural.code === 2 || structural.code === 3) throw rejected("بنية PDF غير سليمة. أعد تصدير الملف ثم حاول مجددًا");
    if (structural.code !== 0) throw unavailable();
    const encrypted = await run(tools.qpdf, ["--is-encrypted", filename]);
    if (encrypted.code === 0) throw rejected("ملفات PDF المشفّرة غير مسموحة؛ ارفع نسخة غير محمية بكلمة مرور");
    if (encrypted.code !== 2) throw unavailable();
    const objects = await run(tools.qpdf, ["--json=2", "--json-key=qpdf", "--json-stream-data=none", filename]);
    if (objects.code !== 0) throw rejected();
    let document;
    try { document = JSON.parse(objects.stdout); } catch { throw unavailable(); }
    validatePdfObjects(document);
    const args = [
      "--no-summary", "--stdout", "--max-scantime=0", "--max-filesize=10M", "--max-scansize=100M",
      "--max-recursion=16", "--max-files=1000", "--alert-exceeds-max=yes",
      "--alert-encrypted=yes", "--fail-if-cvd-older-than=7",
      ...(tools.database ? ["--database=" + tools.database] : []), filename
    ];
    const antivirus = await run(tools.clamscan, args, 120_000);
    if (antivirus.code === 1) throw rejected("رُفض ملف PDF بواسطة فحص الأمان. استخدم نسخة موثوقة أخرى");
    if (antivirus.code !== 0) throw unavailable();
    const after = await readPdfBytes(filename);
    const hash = digest(before);
    if (digest(after) !== hash) throw rejected("تغيّر الملف أثناء الفحص؛ أعد رفعه");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, hash + ".json"), JSON.stringify({
      policy: PDF_POLICY, sha256: hash, result: "clean", scannedAt: new Date().toISOString()
    }), { mode: 0o600 });
  } finally { scanning = false; }
}
