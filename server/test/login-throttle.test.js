import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import authRouter from "../src/routes/auth.js";
import { pool } from "../src/db/index.js";
import { loginSubjectHash } from "../src/security/loginThrottle.js";
import { errorHandler } from "../src/middleware/errorHandler.js";

async function withServer(run) {
  const app = express();
  app.use(express.json());
  app.use("/api/auth", authRouter);
  app.use(errorHandler);
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("account and IP keys are separate hashes rather than stored identifiers", () => {
  const email = "admin@example.com";
  const account = loginSubjectHash("account", email);
  assert.match(account, /^[a-f0-9]{64}$/);
  assert.notEqual(account, loginSubjectHash("ip", email));
  assert.equal(account.includes(email), false);
});

test("IP throttling returns 429 with Retry-After before looking up an account", async () => {
  const originalQuery = pool.query;
  const calls = [];
  try {
    pool.query = async (sql) => {
      calls.push(sql);
      if (sql.includes("insert into auth_login_limits")) return { rows: [] };
      if (sql.includes("select greatest(1, ceil")) return { rows: [{ seconds: 55 }] };
      throw new Error("account lookup should not run");
    };
    await withServer(async (base) => {
      const response = await fetch(`${base}/api/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@example.com", password: "wrong" })
      });
      assert.equal(response.status, 429);
      assert.equal(response.headers.get("retry-after"), "55");
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.match((await response.json()).message, /محاولات دخول كثيرة/);
    });
    assert.equal(calls.length, 2);
  } finally {
    pool.query = originalQuery;
  }
});

test("unknown accounts receive the same generic invalid-credentials response", async () => {
  const originalQuery = pool.query;
  const originalFetch = globalThis.fetch;
  const previousSiteKey = process.env.ADMIN_TURNSTILE_SITE_KEY;
  const previousSecret = process.env.ADMIN_TURNSTILE_SECRET_KEY;
  try {
    process.env.ADMIN_TURNSTILE_SITE_KEY = "test-site-key";
    process.env.ADMIN_TURNSTILE_SECRET_KEY = "test-secret-key";
    globalThis.fetch = (url, options) => String(url).startsWith("https://challenges.cloudflare.com/")
      ? Promise.resolve({ ok: true, json: async () => ({ success: true, action: "admin_login", hostname: "127.0.0.1" }) })
      : originalFetch(url, options);
    pool.query = async (sql) => {
      if (sql.includes("insert into auth_login_limits")) return { rows: [{ attempts: 1 }] };
      if (sql.includes("from admins where email")) return { rows: [] };
      throw new Error("unexpected query");
    };
    await withServer(async (base) => {
      const config = await fetch(`${base}/api/auth/turnstile-config`);
      assert.equal(config.status, 200);
      assert.deepEqual(await config.json(), { siteKey: "test-site-key" });
      const missingChallenge = await fetch(`${base}/api/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "missing@example.com", password: "wrong" })
      });
      assert.equal(missingChallenge.status, 400);
      const response = await fetch(`${base}/api/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "missing@example.com", password: "wrong", turnstileToken: "test-token" })
      });
      assert.equal(response.status, 401);
      assert.deepEqual(await response.json(), { message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    });
  } finally {
    pool.query = originalQuery;
    globalThis.fetch = originalFetch;
    if (previousSiteKey === undefined) delete process.env.ADMIN_TURNSTILE_SITE_KEY;
    else process.env.ADMIN_TURNSTILE_SITE_KEY = previousSiteKey;
    if (previousSecret === undefined) delete process.env.ADMIN_TURNSTILE_SECRET_KEY;
    else process.env.ADMIN_TURNSTILE_SECRET_KEY = previousSecret;
  }
});
