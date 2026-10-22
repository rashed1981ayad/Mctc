import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import multer from "multer";
import sharp from "sharp";
import { HttpError } from "../middleware/errorHandler.js";
import { stagingDir, uploadsDir, withUploadQuota } from "./uploadStorage.js";
import { inspectAndApprovePdf, isApprovedPdf, readPdfBytes } from "./pdfInspection.js";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const publicFileName = /^[A-Za-z0-9][A-Za-z0-9._-]{0,180}\.(?:jpg|jpeg|png|webp|pdf)$/i;
const adminHosts = new Set([(process.env.ADMIN_HOST || "admin.mctc.ly").toLowerCase(), "admin.localhost"]);

function invalidFile() {
  return new HttpError(400, "نوع الملف غير مدعوم أو محتوى الملف لا يطابق امتداده");
}

export function detectUploadedType(bytes) {
  if (bytes.length >= 33 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    && bytes.readUInt32BE(8) === 13 && bytes.toString("ascii", 12, 16) === "IHDR"
    && bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0) return "png";

  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8
    && bytes[2] === 0xff && bytes[bytes.length - 2] === 0xff && bytes[bytes.length - 1] === 0xd9) return "jpg";

  if (bytes.length >= 20 && bytes.toString("ascii", 0, 4) === "RIFF"
    && bytes.readUInt32LE(4) === bytes.length - 8 && bytes.toString("ascii", 8, 12) === "WEBP"
    && ["VP8 ", "VP8L", "VP8X"].includes(bytes.toString("ascii", 12, 16))) return "webp";

  if (bytes.length >= 12 && /^%PDF-[12]\.\d/.test(bytes.toString("ascii", 0, 8))
    && /%%EOF[\t\r\n ]*$/.test(bytes.subarray(Math.max(0, bytes.length - 2048)).toString("latin1"))) return "pdf";

  return null;
}

export function validatedExtension(file, bytes) {
  const extension = path.extname(file.originalname).toLowerCase();
  const detected = detectUploadedType(bytes);
  if (file.fieldname === "datasheetFile" && extension === ".pdf" && detected === "pdf") return ".pdf";
  if ((file.fieldname === "imageFile" || file.fieldname === "imageFiles") && imageExtensions.has(extension)
    && detected && detected !== "pdf" && (extension === ".jpeg" ? "jpg" : extension.slice(1)) === detected) {
    return `.${detected}`;
  }
  throw invalidFile();
}

export async function reencodeImage(bytes, expectedType) {
  try {
    const input = sharp(bytes, { failOn: "error", limitInputPixels: 40_000_000, animated: false });
    const metadata = await input.metadata();
    if (metadata.format !== expectedType || (metadata.pages || 1) !== 1) throw invalidFile();
    return await input.rotate().webp({ quality: 82, effort: 4 }).toBuffer();
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw invalidFile();
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      mkdirSync(stagingDir, { recursive: true });
      callback(null, stagingDir);
    },
    filename: (_req, _file, callback) => callback(null, `${randomUUID()}.tmp`)
  }),
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if ((file.fieldname === "datasheetFile" && extension === ".pdf")
      || ((file.fieldname === "imageFile" || file.fieldname === "imageFiles") && imageExtensions.has(extension))) {
      return callback(null, true);
    }
    callback(invalidFile());
  }
}).fields([
  { name: "imageFile", maxCount: 1 },
  { name: "imageFiles", maxCount: 8 },
  { name: "datasheetFile", maxCount: 1 }
]);

function uploadedFiles(files = {}) {
  return Object.values(files).flat();
}

export async function removeUploadedFiles(files) {
  await Promise.all(uploadedFiles(files).map(async (file) => {
    if (file.path && [stagingDir, uploadsDir].includes(path.dirname(file.path))) {
      await unlink(file.path).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
    }
  }));
}

export function createProductFiles(inspectPdf = inspectAndApprovePdf) {
return function productFiles(req, res, next) {
  upload(req, res, async (uploadError) => {
    if (uploadError) {
      await removeUploadedFiles(req.files).catch(console.error);
      return next(uploadError);
    }
    if (!uploadedFiles(req.files).length) return next();

    try {
      // Inspect the private staging copy before publication or the quota transaction.
      for (const file of uploadedFiles(req.files)) {
        const extension = validatedExtension(file, await readFile(file.path));
        if (extension === ".pdf") await inspectPdf(file.path);
      }
      await withUploadQuota(async () => {
        for (const file of uploadedFiles(req.files)) {
          const bytes = await readFile(file.path);
          const extension = validatedExtension(file, bytes);
          const isImage = extension !== ".pdf";
          const filename = `${randomUUID()}${isImage ? ".webp" : ".pdf"}`;
          const destination = path.join(uploadsDir, filename);
          if (isImage) {
            const encoded = await reencodeImage(bytes, extension.slice(1) === "jpg" ? "jpeg" : extension.slice(1));
            await writeFile(destination, encoded, { flag: "wx" });
            try {
              await unlink(file.path);
            } catch (error) {
              await unlink(destination).catch(console.error);
              throw error;
            }
          } else {
            await rename(file.path, destination);
          }
          file.path = destination;
          file.filename = filename;
        }
      });
      next();
    } catch (error) {
      await removeUploadedFiles(req.files).catch(console.error);
      next(error);
    }
  });
};
}
export const productFiles = createProductFiles();

export function publicUploadOnly(req, res, next) {
  if (adminHosts.has(req.hostname.toLowerCase())) return res.status(404).end();
  next();
}

export async function serveUploadedFile(req, res) {
  const filename = req.params.filename;
  if (!publicFileName.test(filename) || filename.includes("..")) return res.status(404).end();

  const extension = path.extname(filename).toLowerCase();
  const types = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf" };
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", "default-src 'none'; sandbox");
  res.set("Cross-Origin-Resource-Policy", "same-origin");
  res.type(types[extension]);
  if (extension === ".pdf") {
    // Legacy PDFs also need approval. Serve the exact bytes whose digest was checked.
    try {
      const bytes = await readPdfBytes(path.join(uploadsDir, filename));
      if (!await isApprovedPdf(bytes)) {
        res.set("Cache-Control", "no-store");
        return res.status(503).type("text/plain").send("ملف PDF غير متاح حتى اكتمال فحص الأمان");
      }
      res.attachment(filename);
      return res.send(bytes);
    } catch (error) {
      res.set("Cache-Control", "no-store");
      return res.status(error.code === "ENOENT" ? 404 : 503).end();
    }
  }
  res.sendFile(filename, { root: uploadsDir, dotfiles: "deny" }, (error) => {
    if (error && !res.headersSent) res.status(error.statusCode || 404).end();
  });
}
