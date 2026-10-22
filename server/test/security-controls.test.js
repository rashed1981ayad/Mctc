import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { pool } from "../src/db/index.js";
import { loadAdminSession, requireAuth, SESSION_IDLE_MS } from "../src/middleware/auth.js";
import { limitAdminUploads } from "../src/security/uploadLimit.js";

async function withServer(app, run) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise((resolve) => server.close(resolve)); }
}

test("a stale session is rejected by the server and its cookie is cleared", async () => {
  const originalQuery = pool.query;
  try {
    let checkedIdle = false;
    pool.query = async (sql, params) => {
      assert.match(sql, /last_activity_at > now\(\)/);
      assert.equal(params[1], SESSION_IDLE_MS);
      checkedIdle = true;
      return { rows: [] };
    };
    const app = express();
    app.use(loadAdminSession);
    app.get("/session", requireAuth, (_req, res) => res.json({ ok: true }));
    await withServer(app, async (base) => {
      const response = await fetch(`${base}/session`, { headers: { Cookie: `mctc_admin_session=${"a".repeat(64)}` } });
      assert.equal(response.status, 401);
      assert.match(response.headers.get("set-cookie"), /mctc_admin_session=;/);
    });
    assert.equal(checkedIdle, true);
  } finally { pool.query = originalQuery; }
});

test("the admin operation limit rejects the sixty-first request", async () => {
  const originalQuery = pool.query;
  try {
    pool.query = async (sql, params) => {
      assert.match(sql, /admin_upload_limits/);
      assert.match(sql, /requests < 60/);
      assert.deepEqual(params, [7]);
      return { rows: [] };
    };
    const app = express();
    app.use((req, _res, next) => { req.admin = { id: 7 }; next(); });
    app.post("/products", limitAdminUploads, (_req, res) => res.json({ ok: true }));
    await withServer(app, async (base) => {
      const response = await fetch(`${base}/products`, { method: "POST" });
      assert.equal(response.status, 429);
      assert.equal(response.headers.get("retry-after"), "3600");
    });
  } finally { pool.query = originalQuery; }
});
