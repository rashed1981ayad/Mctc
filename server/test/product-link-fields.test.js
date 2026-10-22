import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import multer from "multer";
import { normalize } from "../src/routes/products.js";

test("multipart single and repeated URL fields preserve complete links through parsing", async () => {
  const app = express();
  app.post("/", multer().none(), (req, res) => res.json(normalize(req.body)));
  const server = app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  try {
    const image = "https://example.com/a,b.webp?width=640,480";
    const pdf = "https://example.com/a,b.pdf?model=A,B";
    for (const repeated of [false, true]) {
      const form = new FormData();
      form.append("images", image);
      form.append("datasheetUrls", pdf);
      if (repeated) {
        form.append("images", "/uploads/local.webp");
        form.append("datasheetUrls", "/uploads/local.pdf");
      }
      const response = await fetch("http://127.0.0.1:" + server.address().port, { method: "POST", body: form });
      assert.equal(response.status, 200);
      const result = await response.json();
      assert.deepEqual(result.images, repeated ? [image, "/uploads/local.webp"] : [image]);
      assert.deepEqual(result.datasheetUrls, repeated ? [pdf, "/uploads/local.pdf"] : [pdf]);
    }
  } finally { await new Promise(resolve => server.close(resolve)); }
});
