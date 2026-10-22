import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import products from "../src/routes/products.js";
import auth from "../src/routes/auth.js";
import { pool } from "../src/db/index.js";
import { createAdminAuditMiddleware } from "../src/security/adminAudit.js";

async function serve(app, run) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  try { await run("http://127.0.0.1:" + server.address().port); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test("normal and encoded product deletes are audited atomically; an audit failure rolls back", async () => {
  const originalConnect = pool.connect;
  try {
    for (const id of ["42", "%34%32"]) {
      for (const failAudit of [false, true]) {
        let committedProduct = true;
        let pendingProduct = true;
        let pendingEvent;
        const committedEvents = [];
        const fallbackEvents = [];
        const calls = [];
        pool.connect = async () => ({
          async query(sql, params) {
            calls.push(sql);
            if (sql === "begin") pendingProduct = committedProduct;
            else if (sql.startsWith("delete from products")) {
              assert.deepEqual(params, ["42"]);
              pendingProduct = false;
              return { rows: [{ id: 42, images: [], datasheet_urls: [] }] };
            } else if (sql.includes("insert into admin_audit_events")) {
              if (failAudit) throw new Error("audit unavailable");
              pendingEvent = params;
            } else if (sql === "commit") {
              committedProduct = pendingProduct;
              committedEvents.push(pendingEvent);
            } else if (sql === "rollback") pendingProduct = committedProduct;
            else throw new Error("unexpected SQL");
            return { rows: [] };
          },
          release() {}
        });
        const app = express();
        app.use(createAdminAuditMiddleware(async event => { fallbackEvents.push(event); }));
        app.use((req, _res, next) => { req.admin = { id: 1 }; req.adminSession = { csrfToken: "csrf" }; next(); });
        app.use("/api/products", products);
        app.use((_error, _req, res, _next) => res.status(500).json({ message: "error" }));
        await serve(app, async base => {
          const response = await fetch(base + "/api/products/" + id, { method: "DELETE", headers: { "X-CSRF-Token": "csrf" } });
          assert.equal(response.status, failAudit ? 500 : 200);
        });
        assert.equal(committedProduct, failAudit);
        assert.equal(committedEvents.length, failAudit ? 0 : 1);
        if (!failAudit) {
          assert.equal(committedEvents[0][1], "product.delete");
          assert.equal(committedEvents[0][6], "42");
          assert.equal(fallbackEvents.length, 0);
          assert.equal(calls.at(-1), "commit");
        } else {
          assert.equal(calls.at(-1), "rollback");
          assert.equal(fallbackEvents[0].outcome, "failure");
        }
      }
    }
  } finally { pool.connect = originalConnect; }
});

test("logout clears the cookie only after session deletion and audit commit", async () => {
  const originalConnect = pool.connect;
  try {
    for (const failAt of [null, "delete", "audit"]) {
      let sessionExists = true;
      let pendingSession = true;
      pool.connect = async () => ({
        async query(sql) {
          if (sql.startsWith("delete from admin_sessions")) {
            if (failAt === "delete") throw new Error("database unavailable");
            pendingSession = false;
            return { rows: [{ id: 1 }] };
          }
          if (sql.includes("insert into admin_audit_events") && failAt === "audit") throw new Error("audit unavailable");
          if (sql === "commit") sessionExists = pendingSession;
          return { rows: [] };
        },
        release() {}
      });
      const app = express();
      app.use((req, _res, next) => { req.admin = { id: 1 }; req.adminSession = { tokenHash: "hash", csrfToken: "csrf" }; next(); });
      app.use("/api/auth", auth);
      app.use((_error, _req, res, _next) => res.status(500).json({ message: "error" }));
      await serve(app, async base => {
        const response = await fetch(base + "/api/auth/logout", { method: "POST", headers: { "X-CSRF-Token": "csrf" } });
        assert.equal(response.status, failAt ? 500 : 200);
        if (failAt) assert.equal(response.headers.get("set-cookie"), null);
        else assert.match(response.headers.get("set-cookie"), /mctc_admin_session=;.*Expires=.*HttpOnly/);
      });
      assert.equal(sessionExists, Boolean(failAt));
    }
  } finally { pool.connect = originalConnect; }
});
