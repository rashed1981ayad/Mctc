import test from "node:test";
import assert from "node:assert/strict";
import { validateContactPayload } from "../src/routes/contact.js";

const base = { name: "أحمد", phone: "٠٩١٢٣٤٥٦٧٨", message: "مرحبا بكم في المتقدم", turnstileToken: "token" };

test("contact accepts Arabic-Indic digits and enforces real phone digits", () => {
  assert.equal(validateContactPayload(base).phone, "0912345678");
  for (const phone of ["------", "++++++", "(   )"]) {
    assert.throws(() => validateContactPayload({ ...base, phone }), /رقم الهاتف/);
  }
});

test("contact message limits are 15 through 2500 characters", () => {
  assert.throws(() => validateContactPayload({ ...base, message: "a".repeat(14) }), /15 حرفًا/);
  assert.equal(validateContactPayload({ ...base, message: "a".repeat(15) }).message.length, 15);
  assert.equal(validateContactPayload({ ...base, message: "a".repeat(2500) }).message.length, 2500);
  assert.throws(() => validateContactPayload({ ...base, message: "a".repeat(2501) }), /2500/);
});
