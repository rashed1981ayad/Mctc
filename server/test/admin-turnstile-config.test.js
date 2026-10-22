import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { adminTurnstileConfig, validateAdminTurnstile } from "../src/security/adminTurnstile.js";
import authRouter from "../src/routes/auth.js";
import { errorHandler } from "../src/middleware/errorHandler.js";

const keys = ["NODE_ENV", "ADMIN_HOST", "ADMIN_TURNSTILE_SITE_KEY", "ADMIN_TURNSTILE_SECRET_KEY", "ADMIN_TURNSTILE_HOSTNAMES"];

test("local development uses Cloudflare's visible test widget when admin keys are absent", async () => {
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  const originalFetch = globalThis.fetch;
  try {
    process.env.NODE_ENV = "development";
    delete process.env.ADMIN_TURNSTILE_SITE_KEY;
    delete process.env.ADMIN_TURNSTILE_SECRET_KEY;
    delete process.env.ADMIN_TURNSTILE_HOSTNAMES;
    const config = adminTurnstileConfig("127.0.0.1");
    assert.equal(config.siteKey, "1x00000000000000000000AA");
    assert.equal(config.localTestMode, true);
    assert.ok(config.hostnames.includes("127.0.0.1"));
    const app = express();
    app.use("/api/auth", authRouter);
    app.use(errorHandler);
    const server = app.listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    try {
      const response = await originalFetch(`http://127.0.0.1:${server.address().port}/api/auth/turnstile-config`);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { siteKey: config.siteKey });
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
    globalThis.fetch = async (_url, options) => {
      assert.equal(options.body.get("secret"), "1x0000000000000000000000000000000AA");
      return { ok: true, json: async () => ({ success: true, action: "test", hostname: "localhost" }) };
    };
    await validateAdminTurnstile("dummy-token", "admin_login", "127.0.0.1", "127.0.0.1");
    assert.throws(() => adminTurnstileConfig("admin.mctc.ly"), (error) => error.status === 503);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});

test("production rejects absent or dummy admin Turnstile keys", () => {
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  try {
    process.env.NODE_ENV = "production";
    delete process.env.ADMIN_TURNSTILE_SITE_KEY;
    delete process.env.ADMIN_TURNSTILE_SECRET_KEY;
    assert.throws(adminTurnstileConfig, (error) => error.status === 503);
    process.env.ADMIN_TURNSTILE_SITE_KEY = "1x00000000000000000000AA";
    process.env.ADMIN_TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";
    assert.throws(adminTurnstileConfig, (error) => error.status === 503);
    process.env.ADMIN_TURNSTILE_SITE_KEY = "real-site-key";
    process.env.ADMIN_TURNSTILE_SECRET_KEY = "real-secret-key";
    assert.equal(adminTurnstileConfig().localTestMode, false);
  } finally {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});
