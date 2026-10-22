import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { auditAction, createAdminAuditMiddleware, writeAuditEvent } from "../src/security/adminAudit.js";

async function withServer(app, run) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise((resolve) => server.close(resolve)); }
}

test("audit records login success and failure without credentials or a plaintext email", async () => {
  const events = [];
  const app = express();
  app.use(createAdminAuditMiddleware(async (event) => { events.push(event); }));
  app.use(express.json());
  app.post("/api/auth/login", auditAction("auth.login", "admin_account"), (req, res) => {
    if (req.body.password === "correct") {
      res.locals.auditActorId = 7;
      return res.json({ ok: true });
    }
    res.status(401).json({ message: "invalid" });
  });
  await withServer(app, async (base) => {
    for (const password of ["wrong", "correct"]) {
      await fetch(`${base}/api/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "Admin@Example.com", password })
      });
    }
  });
  assert.equal(events.length, 2);
  assert.deepEqual(events.map((event) => event.outcome), ["failure", "success"]);
  assert.equal(events[1].actorAdminId, 7);
  assert.equal(events[0].subjectHash, events[1].subjectHash);
  assert.match(events[0].subjectHash, /^[a-f0-9]{64}$/);
  assert.doesNotMatch(JSON.stringify(events), /Admin@Example|correct|wrong/);
});

test("audit records the product target and allowed change metadata", async () => {
  const events = [];
  const app = express();
  app.use(createAdminAuditMiddleware(async (event) => { events.push(event); }));
  app.patch("/api/orders/:id/status", auditAction("order.status.update", "order"), (req, res) => {
    req.admin = { id: 3 };
    res.locals.auditTargetId = req.params.id;
    res.locals.auditStatus = "confirmed";
    res.json({ id: req.params.id });
  });
  await withServer(app, async (base) => {
    await fetch(`${base}/api/orders/42/status`, { method: "PATCH" });
  });
  assert.equal(events.length, 1);
  assert.equal(events[0].action, "order.status.update");
  assert.equal(events[0].targetId, "42");
  assert.equal(events[0].actorAdminId, 3);
  assert.deepEqual(events[0].details, { status: "confirmed" });
});

test("audit insert uses fixed SQL parameters", async () => {
  let captured;
  await writeAuditEvent({
    requestId: "00000000-0000-4000-8000-000000000000", action: "product.delete", outcome: "success",
    actorAdminId: 1, subjectHash: null, targetType: "product", targetId: "2",
    ipAddress: "127.0.0.1", httpStatus: 200, details: {}
  }, async (sql, params) => { captured = { sql, params }; });
  assert.match(captured.sql, /insert into admin_audit_events/);
  assert.equal(captured.params[6], "2");
  assert.equal(captured.params[9], "{}");
});
