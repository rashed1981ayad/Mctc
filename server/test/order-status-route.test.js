import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import ordersRouter from "../src/routes/orders.js";
import { pool } from "../src/db/index.js";

async function withServer(authenticated, run) {
  const app = express();
  app.use(express.json());
  if (authenticated) app.use((req, _res, next) => {
    req.adminSession = { csrfToken: "test-csrf-token" };
    next();
  });
  app.use("/api/orders", ordersRouter);
  app.use((error, _req, res, _next) => res.status(error.status || 500).json({ message: error.message }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("order status updates require an admin session and CSRF token", async () => {
  await withServer(false, async (base) => {
    const response = await fetch(`${base}/api/orders/1/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "confirmed" })
    });
    assert.equal(response.status, 401);
  });
  await withServer(true, async (base) => {
    const response = await fetch(`${base}/api/orders/1/status`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "confirmed" })
    });
    assert.equal(response.status, 403);
  });
});

test("order status updates reject invalid status and order id before database access", async () => {
  await withServer(true, async (base) => {
    for (const [id, status] of [["1", "deleted"], ["invalid", "confirmed"]]) {
      const response = await fetch(`${base}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": "test-csrf-token" },
        body: JSON.stringify({ status })
      });
      assert.equal(response.status, 400);
    }
  });
});

test("a valid status update returns the saved state, or 404 for a missing order", async () => {
  const originalQuery = pool.query;
  const originalConnect = pool.connect;
  pool.connect = async () => ({ query: (sql, params) => /^(begin|commit|rollback)$/.test(sql) || sql.includes("insert into admin_audit_events") ? Promise.resolve({ rows: [] }) : pool.query(sql, params), release() {} });
  try {
    pool.query = async (sql, params) => {
      assert.match(sql, /update orders set status = \$1 where id = \$2 returning id, status/);
      assert.deepEqual(params, ["confirmed", "42"]);
      return { rows: [{ id: "42", status: "confirmed" }] };
    };
    await withServer(true, async (base) => {
      const response = await fetch(`${base}/api/orders/42/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": "test-csrf-token" },
        body: JSON.stringify({ status: "confirmed" })
      });
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { id: "42", status: "confirmed" });
    });

    pool.query = async () => ({ rows: [] });
    await withServer(true, async (base) => {
      const response = await fetch(`${base}/api/orders/42/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": "test-csrf-token" },
        body: JSON.stringify({ status: "confirmed" })
      });
      assert.equal(response.status, 404);
    });
  } finally {
    pool.query = originalQuery;
    pool.connect = originalConnect;
  }
});

test("order status filtering happens in SQL before pagination and works with search", async () => {
  const originalConnect = pool.connect;
  const calls = [];
  try {
    pool.connect = async () => ({
      query: async (sql, params) => {
        calls.push({ sql, params });
        return { rows: sql.includes("count(*)") ? [{ total: 0 }] : [] };
      },
      release: () => {}
    });
    await withServer(true, async (base) => {
      const response = await fetch(`${base}/api/orders?q=218&status=confirmed&page=2&limit=5`);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { items: [], total: 0, page: 2, pages: 0 });
      assert.equal(calls.length, 2);
      assert.match(calls[0].sql, /o\.status = \$3[\s\S]*limit \$4 offset \$5/);
      assert.deepEqual(calls[0].params, ["218", "218", "confirmed", 5, 5]);
      assert.match(calls[1].sql, /o\.status = \$3/);
      assert.deepEqual(calls[1].params, ["218", "218", "confirmed"]);

      const invalid = await fetch(`${base}/api/orders?status=sent_whatsapp`);
      assert.equal(invalid.status, 400);
      assert.equal(calls.length, 2);
    });
  } finally {
    pool.connect = originalConnect;
  }
});
