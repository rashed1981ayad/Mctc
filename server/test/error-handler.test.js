import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import multer from "multer";
import { HttpError, errorHandler, publicError } from "../src/middleware/errorHandler.js";
import { verifyTurnstile } from "../src/security/turnstile.js";

test("known client errors keep their status while internal details are hidden", () => {
  assert.deepEqual(publicError(new HttpError(400, "حقل مطلوب")), { status: 400, message: "حقل مطلوب" });
  assert.deepEqual(publicError(Object.assign(new Error("duplicate key value violates constraint products_model_key"), { code: "23505" })), {
    status: 409, message: "يوجد سجل بهذه البيانات بالفعل"
  });
  assert.deepEqual(publicError(new multer.MulterError("LIMIT_FILE_SIZE")), {
    status: 413, message: "الملف أكبر من الحجم المسموح"
  });
  assert.deepEqual(publicError({ type: "entity.parse.failed", message: "Unexpected token near password" }), {
    status: 400, message: "تنسيق بيانات الطلب غير صحيح"
  });
  assert.deepEqual(publicError(new Error("relation admin_sessions does not exist")), {
    status: 500, message: "حدث خطأ داخلي في الخادم. حاول مرة أخرى لاحقًا"
  });
  assert.deepEqual(publicError(Object.assign(new Error("database connection string details"), { code: "ECONNREFUSED" })), {
    status: 503, message: "الخدمة غير متاحة مؤقتًا. حاول مرة أخرى لاحقًا"
  });
  assert.deepEqual(publicError(Object.assign(new Error("Turnstile details"), { code: "TURNSTILE_UNAVAILABLE" })), {
    status: 503, message: "الخدمة غير متاحة مؤقتًا. حاول مرة أخرى لاحقًا"
  });
});

test("Turnstile distinguishes an invalid token from a verification outage", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ success: false }) });
    assert.equal(await verifyTurnstile("invalid-token", "127.0.0.1"), false);
    globalThis.fetch = async () => { throw new Error("network failure with internal details"); };
    await assert.rejects(verifyTurnstile("token", "127.0.0.1"), (error) => error.code === "TURNSTILE_UNAVAILABLE");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("admin Turnstile checks the requested action and permitted hostname", async () => {
  const originalFetch = globalThis.fetch;
  try {
    let result = { success: true, action: "admin_login", hostname: "admin.mctc.ly" };
    globalThis.fetch = async () => ({ ok: true, json: async () => result });
    const options = { secret: "test-secret", action: "admin_login", hostnames: ["admin.mctc.ly"] };
    assert.equal(await verifyTurnstile("token", "127.0.0.1", options), true);
    result = { ...result, action: "product_edit" };
    assert.equal(await verifyTurnstile("token", "127.0.0.1", options), false);
    result = { ...result, action: "admin_login", hostname: "mctc.ly" };
    assert.equal(await verifyTurnstile("token", "127.0.0.1", options), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("the HTTP error handler never sends an internal exception message", async () => {
  const app = express();
  app.get("/failure", (_req, _res, next) => next(new Error("column password_hash does not exist")));
  app.use(errorHandler);
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const originalLog = console.error;
  let logged = "";
  console.error = (value) => { logged = String(value); };
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/failure`);
    assert.equal(response.status, 500);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const body = await response.json();
    assert.equal(body.message, "حدث خطأ داخلي في الخادم. حاول مرة أخرى لاحقًا");
    assert.match(body.errorId, /^[a-f0-9-]{36}$/);
    assert.equal(response.headers.get("x-error-id"), body.errorId);
    assert.match(logged, new RegExp(body.errorId));
    assert.doesNotMatch(JSON.stringify(body), /password_hash/);
  } finally {
    console.error = originalLog;
    await new Promise((resolve) => server.close(resolve));
  }
});

test("a server-side HttpError is generic unless explicitly approved for exposure", () => {
  assert.deepEqual(publicError(new HttpError(503, "database table secret_details is unavailable")), {
    status: 503, message: "حدث خطأ داخلي في الخادم. حاول مرة أخرى لاحقًا"
  });
  assert.deepEqual(publicError(new HttpError(507, "مساحة التخزين ممتلئة", { expose: true })), {
    status: 507, message: "مساحة التخزين ممتلئة"
  });
});
