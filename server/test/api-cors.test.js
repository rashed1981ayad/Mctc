import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { createApiCors, publicCorsOrigins } from "../src/security/apiCors.js";

const env = {
  ADMIN_HOST: "admin.mctc.ly",
  CLIENT_URL: "https://mctc.ly,https://admin.mctc.ly,http://127.0.0.1:5173,http://127.0.0.1:5174"
};

test("public CORS excludes the administration origins", () => {
  assert.deepEqual(publicCorsOrigins(env), ["https://mctc.ly", "http://127.0.0.1:5173"]);
});

test("CORS is available only on public API routes without an admin session", async () => {
  const app = express();
  app.use((req, _res, next) => { if (req.get("X-Test-Admin")) req.adminSession = { csrfToken: "test" }; next(); });
  app.use(createApiCors(env));
  app.use("/api", (_req, res) => res.json({ ok: true }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    const headers = { Origin: "https://mctc.ly" };
    const publicResponse = await fetch(`${base}/api/products`, { headers });
    assert.equal(publicResponse.headers.get("access-control-allow-origin"), "https://mctc.ly");
    assert.equal(publicResponse.headers.get("access-control-allow-credentials"), null);
    for (const [path, extraHeaders] of [
      ["/api/auth/session", {}],
      ["/api/database", {}],
      ["/api/orders", {}],
      ["/api/products?status=all", {}],
      ["/api/products", { "X-Test-Admin": "1" }]
    ]) {
      const response = await fetch(`${base}${path}`, { headers: { ...headers, ...extraHeaders } });
      assert.equal(response.headers.get("access-control-allow-origin"), null, path);
    }
    const publicPreflight = await fetch(`${base}/api/orders`, {
      method: "OPTIONS", headers: { ...headers, "Access-Control-Request-Method": "POST" }
    });
    assert.equal(publicPreflight.headers.get("access-control-allow-origin"), "https://mctc.ly");
    const adminPreflight = await fetch(`${base}/api/auth/login`, {
      method: "OPTIONS", headers: { ...headers, "Access-Control-Request-Method": "POST" }
    });
    assert.equal(adminPreflight.headers.get("access-control-allow-origin"), null);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
