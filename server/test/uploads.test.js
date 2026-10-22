import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import sharp from "sharp";
import { randomUUID, createHash } from "node:crypto";
import { writeFile, unlink, stat } from "node:fs/promises";
import path from "node:path";
import { uploadsDir } from "../src/security/uploadStorage.js";
import { HttpError } from "../src/middleware/errorHandler.js";
import { detectUploadedType, createProductFiles, productFiles, publicUploadOnly, removeUploadedFiles, serveUploadedFile, validatedExtension } from "../src/security/uploads.js";
import { inspectAndApprovePdf } from "../src/security/pdfInspection.js";
import { makePdf, cleanPdfTool } from "./pdfFixture.js";
import { pool } from "../src/db/index.js";

const originalConnect = pool.connect;
before(() => {
  pool.connect = async () => ({ query: async () => ({ rows: [] }), release() {} });
});
after(() => { pool.connect = originalConnect; });

const pdf = makePdf();
const html = Buffer.from("<!doctype html><script>alert(1)</script>");
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL/nwAAAABJRU5ErkJggg==", "base64");

test("file content, not browser MIME metadata, determines accepted type", () => {
  assert.equal(detectUploadedType(pdf), "pdf");
  assert.equal(detectUploadedType(html), null);
  assert.equal(validatedExtension({ fieldname: "datasheetFile", originalname: "report.PDF", mimetype: "text/html" }, pdf), ".pdf");
  assert.throws(() => validatedExtension({ fieldname: "datasheetFile", originalname: "report.pdf", mimetype: "application/pdf" }, html));
  assert.throws(() => validatedExtension({ fieldname: "datasheetFile", originalname: "report.html", mimetype: "application/pdf" }, pdf));
  assert.equal(validatedExtension({ fieldname: "imageFiles", originalname: "photo.png", mimetype: "text/html" }, png), ".png");
  assert.throws(() => validatedExtension({ fieldname: "imageFiles", originalname: "photo.png", mimetype: "image/png" }, html));
  assert.throws(() => validatedExtension({ fieldname: "imageFiles", originalname: "photo.html", mimetype: "image/png" }, png));
});

test("uploaded PDFs get a server-generated safe name and download-only response", async () => {
  const app = express();
  app.post("/upload", createProductFiles(file => inspectAndApprovePdf(file, { run: cleanPdfTool })), async (req, res, next) => {
    try {
      const filename = req.files.datasheetFile[0].filename;
      const response = await fetch(`http://127.0.0.1:${server.address().port}/uploads/${filename}`);
      const headers = Object.fromEntries(response.headers);
      await response.arrayBuffer();
      await writeFile(req.files.datasheetFile[0].path, Buffer.concat([pdf, Buffer.from("\n")]));
      const changed = await fetch(`http://127.0.0.1:${server.address().port}/uploads/${filename}`);
      await changed.arrayBuffer();
      await removeUploadedFiles(req.files);
      res.json({ filename, status: response.status, headers, changedStatus: changed.status });
    } catch (error) { next(error); }
  });
  app.get("/uploads/:filename", publicUploadOnly, serveUploadedFile);
  app.use("/uploads", (_req, res) => res.status(404).end());
  app.use((error, _req, res, _next) => res.status(400).json({ message: error.message }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const form = new FormData();
    form.append("datasheetFile", new Blob([pdf], { type: "text/html" }), "original.PDF");
    const response = await fetch(`http://127.0.0.1:${server.address().port}/upload`, { method: "POST", body: form });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.match(result.filename, /^[a-f0-9-]{36}\.pdf$/);
    assert.equal(result.status, 200);
    assert.equal(result.changedStatus, 503);
    assert.match(result.headers["content-disposition"], /^attachment;/);
    assert.equal(result.headers["content-type"], "application/pdf");
    assert.equal(result.headers["x-content-type-options"], "nosniff");

    const onAdminHost = await fetch(`http://127.0.0.1:${server.address().port}/uploads/${result.filename}`, {
      headers: { Host: "admin.mctc.ly" }
    });
    assert.equal(onAdminHost.status, 404);

    const legacyHtml = await fetch(`http://127.0.0.1:${server.address().port}/uploads/old.html`);
    assert.equal(legacyHtml.status, 404);

    const forged = new FormData();
    forged.append("datasheetFile", new Blob([html], { type: "application/pdf" }), "forged.pdf");
    const rejected = await fetch(`http://127.0.0.1:${server.address().port}/upload`, { method: "POST", body: forged });
    assert.equal(rejected.status, 400);

    const wrongExtension = new FormData();
    wrongExtension.append("datasheetFile", new Blob([pdf], { type: "application/pdf" }), "forged.html");
    const rejectedExtension = await fetch(`http://127.0.0.1:${server.address().port}/upload`, { method: "POST", body: wrongExtension });
    assert.equal(rejectedExtension.status, 400);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await unlink(path.join(uploadsDir, ".pdf-verdicts", createHash("sha256").update(pdf).digest("hex") + ".json")).catch(() => {});
  }
});

test("PDF scan failure removes staging files and unapproved existing PDFs stay private", async () => {
  const app = express();
  let staged;
  app.post("/upload", createProductFiles(async filename => {
    staged = filename;
    throw new HttpError(503, "Scanner unavailable", { expose: true });
  }), (_req, res) => res.status(200).end());
  app.get("/uploads/:filename", publicUploadOnly, serveUploadedFile);
  app.use((error, _req, res, _next) => res.status(error.status || error.statusCode || 500).end());
  const server = app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  const filename = randomUUID() + ".pdf";
  const legacy = path.join(uploadsDir, filename);
  try {
    await writeFile(legacy, Buffer.concat([pdf, Buffer.from("\n")]), { flag: "wx" });
    const base = "http://127.0.0.1:" + server.address().port;
    const response = await fetch(base + "/uploads/" + filename);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const form = new FormData();
    form.append("datasheetFile", new Blob([pdf]), "file.pdf");
    assert.equal((await fetch(base + "/upload", { method: "POST", body: form })).status, 503);
    assert.ok(staged);
    await assert.rejects(stat(staged), { code: "ENOENT" });
  } finally {
    await unlink(legacy).catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
});

test("uploaded images are decoded and re-encoded as WebP without trailing active content", async () => {
  const app = express();
  app.post("/upload", productFiles, async (req, res, next) => {
    try {
      const file = req.files.imageFiles[0];
      const response = await fetch(`http://127.0.0.1:${server.address().port}/uploads/${file.filename}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      await removeUploadedFiles(req.files);
      res.json({ filename: file.filename, status: response.status, contentType: response.headers.get("content-type"), bytes: bytes.toString("base64") });
    } catch (error) { next(error); }
  });
  app.get("/uploads/:filename", publicUploadOnly, serveUploadedFile);
  app.use((error, _req, res, _next) => res.status(400).json({ message: error.message }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const source = await sharp({ create: { width: 2, height: 2, channels: 3, background: "#4a7" } }).png().toBuffer();
    const polyglot = Buffer.concat([source, Buffer.from("<script>alert(1)</script>")]);
    const form = new FormData();
    form.append("imageFiles", new Blob([polyglot], { type: "text/html" }), "photo.png");
    const response = await fetch(`http://127.0.0.1:${server.address().port}/upload`, { method: "POST", body: form });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.match(result.filename, /^[a-f0-9-]{36}\.webp$/);
    assert.equal(result.status, 200);
    assert.equal(result.contentType, "image/webp");
    const encoded = Buffer.from(result.bytes, "base64");
    assert.equal((await sharp(encoded).metadata()).format, "webp");
    assert.doesNotMatch(encoded.toString("latin1"), /<script>/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
