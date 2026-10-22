import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { inspectAndApprovePdf, isApprovedPdf, validatePdfObjects, runPdfTool, pdfTools, readPdfBytes, MAX_PDF_BYTES } from "../src/security/pdfInspection.js";
import { makePdf, cleanPdfTool } from "./pdfFixture.js";

test("only a structurally valid, unencrypted and clean PDF obtains content-bound approval", async () => {
  const folder = await mkdtemp(path.join(os.tmpdir(), "mctc-pdf-"));
  const file = path.join(folder, "file.pdf");
  const pdf = makePdf();
  try {
    await writeFile(file, pdf);
    const calls = [];
    await inspectAndApprovePdf(file, { directory: folder, run: async (exe, args) => {
      calls.push(args);
      return cleanPdfTool(exe, args);
    } });
    assert.equal(await isApprovedPdf(pdf, folder), true);
    assert.equal(await isApprovedPdf(Buffer.concat([pdf, Buffer.from("tampered")]), folder), false);
    assert.deepEqual(calls.map(args => args[0]), ["--check", "--is-encrypted", "--json=2", "--no-summary"]);
    assert.ok(calls[3].includes("--fail-if-cvd-older-than=7"));
    assert.ok(calls[3].includes("--alert-exceeds-max=yes"));
    for (const [stage, code, status] of [["--check", 2, 400], ["--check", 3, 400], ["--is-encrypted", 0, 400], ["--no-summary", 1, 400], ["--no-summary", 2, 503]]) {
      await assert.rejects(inspectAndApprovePdf(file, { directory: folder, run: (exe, args) =>
        args[0] === stage ? Promise.resolve({ code, stdout: "" }) : cleanPdfTool(exe, args)
      }), error => error.status === status);
      assert.equal(await isApprovedPdf(pdf, folder), false);
    }
    await assert.rejects(inspectAndApprovePdf(file, { directory: folder, run: async () => { throw new Error("scanner unavailable"); } }));
    assert.equal(await isApprovedPdf(pdf, folder), false);
    await writeFile(file, Buffer.alloc(MAX_PDF_BYTES + 1));
    await assert.rejects(readPdfBytes(file), error => error.status === 413);
  } finally { await rm(folder, { recursive: true, force: true }); }
});

test("decoded PDF actions, embedded files, and interactive forms are rejected", () => {
  for (const value of [
    { "/JS": "u:app.alert(1)" }, { "/S": "/JavaScript" }, { "/EmbeddedFiles": {} },
    { "/Type": "/EmbeddedFile" }, { "/AA": {} }, { "/AcroForm": {} }, { "/XFA": [] }
  ]) {
    assert.throws(() => validatePdfObjects({ version: 2, qpdf: [{}, { "obj:4 0 R": { value } }] }), error => error.status === 400);
  }
  assert.throws(() => validatePdfObjects({}), error => error.status === 503);
});

test("missing or timed-out PDF tools fail closed", async () => {
  await assert.rejects(runPdfTool(path.join(os.tmpdir(), "missing-mctc-pdf-tool"), []), error => error.status === 503);
  await assert.rejects(runPdfTool(process.execPath, ["-e", "setTimeout(() => {}, 10000)"], 50), error => error.status === 503);
});

test("installed qpdf decodes escaped JavaScript names and rejects signature-only fake PDFs", { skip: !process.env.TEST_REAL_PDF_TOOLS }, async () => {
  const folder = await mkdtemp(path.join(os.tmpdir(), "mctc-real-pdf-"));
  const file = path.join(folder, "sample.pdf");
  const qpdf = pdfTools().qpdf;
  try {
    await writeFile(file, makePdf());
    const check = await runPdfTool(qpdf, ["--check", file]);
    assert.equal(check.code, 0, check.stderr);
    await writeFile(file, makePdf({ javascript: true }));
    assert.equal((await runPdfTool(qpdf, ["--check", file])).code, 0);
    const objects = await runPdfTool(qpdf, ["--json=2", "--json-key=qpdf", "--json-stream-data=none", file]);
    assert.equal(objects.code, 0);
    assert.throws(() => validatePdfObjects(JSON.parse(objects.stdout)), error => error.status === 400);
    await writeFile(file, "%PDF-1.7\n<<>>\n%%EOF\n");
    assert.notEqual((await runPdfTool(qpdf, ["--check", file])).code, 0);
  } finally { await rm(folder, { recursive: true, force: true }); }
});
