import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import productRouter from "../src/routes/products.js";
import { pool } from "../src/db/index.js";
import { errorHandler } from "../src/middleware/errorHandler.js";

test("an older product form cannot restore an image or overwrite a newer edit", async () => {
  const originalQuery = pool.query;
  const originalConnect = pool.connect;
  pool.connect = async () => ({ query: (sql, params) => /^(begin|commit|rollback)$/.test(sql) || sql.includes("insert into admin_audit_events") ? Promise.resolve({ rows: [] }) : pool.query(sql, params), release() {} });
  const originalFetch = globalThis.fetch;
  const previousSiteKey = process.env.ADMIN_TURNSTILE_SITE_KEY;
  const previousSecret = process.env.ADMIN_TURNSTILE_SECRET_KEY;
  let product = {
    id: 5, name: "Camera", model: "CAM-5", category: "Digital Cameras", brand: "Hikvision",
    description: "original", features: [], specifications: [], image: "https://example.com/old.webp",
    images: ["https://example.com/old.webp"], datasheet_url: "https://example.com/spec.pdf",
    datasheet_urls: ["https://example.com/spec.pdf"], status: "available", featured: false,
    revision: 1, created_at: new Date(), updated_at: new Date()
  };
  let updates = 0;
  try {
    process.env.ADMIN_TURNSTILE_SITE_KEY = "test-site-key";
    process.env.ADMIN_TURNSTILE_SECRET_KEY = "test-secret-key";
    globalThis.fetch = (url, options) => String(url).startsWith("https://challenges.cloudflare.com/")
      ? Promise.resolve({ ok: true, json: async () => ({ success: true, action: "product_edit", hostname: "127.0.0.1" }) })
      : originalFetch(url, options);
    pool.query = async (sql, params) => {
      if (sql.includes("admin_upload_limits")) return { rows: [{ requests: 1 }] };
      if (sql.startsWith("select image, images, datasheet_url")) return { rows: [{ ...product }] };
      if (sql.startsWith("update products set")) {
        updates += 1;
        if (params[14] !== product.revision) return { rows: [] };
        product = { ...product, description: params[4], image: params[7], images: params[8], revision: product.revision + 1 };
        return { rows: [{ ...product }] };
      }
      throw new Error(`Unexpected SQL: ${sql.slice(0, 50)}`);
    };
    const app = express();
    app.use((req, _res, next) => { req.adminSession = { csrfToken: "csrf" }; req.admin = { id: 1 }; next(); });
    app.use("/api/products", productRouter);
    app.use(errorHandler);
    const server = app.listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    try {
      const base = `http://127.0.0.1:${server.address().port}`;
      async function save(description, image) {
        const form = new FormData();
        for (const [key, value] of Object.entries({
          name: "Camera", model: "CAM-5", category: "Digital Cameras", brand: "Hikvision",
          description, images: image, datasheetUrls: "https://example.com/spec.pdf", status: "available", revision: "1"
        })) form.set(key, value);
        return fetch(`${base}/api/products/5`, { method: "PUT", headers: { "X-CSRF-Token": "csrf", "X-Turnstile-Token": "test-token" }, body: form });
      }
      const noChallenge = await fetch(`${base}/api/products/5`, { method: "PUT", headers: { "X-CSRF-Token": "csrf" } });
      assert.equal(noChallenge.status, 400);
      const noCreateChallenge = await fetch(`${base}/api/products`, { method: "POST", headers: { "X-CSRF-Token": "csrf" } });
      assert.equal(noCreateChallenge.status, 400);
      assert.equal(updates, 0);
      const first = await save("first edit", "https://example.com/new.webp");
      assert.equal(first.status, 200);
      assert.equal((await first.json()).revision, 2);
      const stale = await save("stale edit", "https://example.com/old.webp");
      assert.equal(stale.status, 409);
      assert.equal(updates, 1);
      assert.equal(product.image, "https://example.com/new.webp");
      assert.equal(product.description, "first edit");
    } finally { await new Promise((resolve) => server.close(resolve)); }
  } finally {
    pool.query = originalQuery;
    pool.connect = originalConnect;
    globalThis.fetch = originalFetch;
    if (previousSiteKey === undefined) delete process.env.ADMIN_TURNSTILE_SITE_KEY;
    else process.env.ADMIN_TURNSTILE_SITE_KEY = previousSiteKey;
    if (previousSecret === undefined) delete process.env.ADMIN_TURNSTILE_SECRET_KEY;
    else process.env.ADMIN_TURNSTILE_SECRET_KEY = previousSecret;
  }
});
