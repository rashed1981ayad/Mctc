import test from "node:test";
import assert from "node:assert/strict";
import { buildOrderMessage, matchesSavedOrder, validateOrderPayload, validateOrderStatus } from "../src/routes/orders.js";

const valid = {
  requestKey: "b642d12c-c8ef-4e3b-8e7d-4a9a8cb12745",
  language: "ar",
  turnstileToken: "test-token",
  customer: { name: "أحمد محمد", phone: "+218930001191", email: "ahmed@example.com", notes: "مشروع جديد" },
  items: [{ id: 1, quantity: 2 }]
};

test("accepts a valid quotation request", () => {
  assert.deepEqual(validateOrderPayload(valid).items, [{ id: 1, quantity: 2 }]);
});

test("the same request key cannot return a different cart or customer as an old order", () => {
  const saved = { customer_name: "أحمد محمد", phone: "+218930001191", email: "ahmed@example.com", notes: "مشروع جديد", language: "ar" };
  const items = [{ product_id: 1, quantity: 2 }];
  const request = validateOrderPayload(valid);
  assert.equal(matchesSavedOrder(saved, items, request), true);
  assert.equal(matchesSavedOrder(saved, items, { ...request, items: [...request.items, { id: 2, quantity: 1 }] }), false);
  assert.equal(matchesSavedOrder(saved, items, { ...request, phone: "0912345678" }), false);
});

test("Arabic-Indic phone digits are normalized, punctuation-only phones are rejected", () => {
  assert.equal(validateOrderPayload({ ...valid, customer: { ...valid.customer, phone: "٠٩١٢٣٤٥٦٧٨" } }).phone, "0912345678");
  assert.throws(() => validateOrderPayload({ ...valid, customer: { ...valid.customer, phone: "------" } }), /رقم الهاتف/);
  assert.throws(() => validateOrderPayload({ ...valid, customer: { ...valid.customer, phone: "++++++" } }), /رقم الهاتف/);
});

test("rejects duplicate, invalid and excessive cart items", () => {
  assert.throws(() => validateOrderPayload({ ...valid, items: [{ id: 1, quantity: 2 }, { id: 1, quantity: 3 }] }));
  assert.throws(() => validateOrderPayload({ ...valid, items: [{ id: 1, quantity: 100 }] }));
  assert.throws(() => validateOrderPayload({ ...valid, items: Array.from({ length: 13 }, (_, i) => ({ id: i + 1, quantity: 1 })) }));
});

test("rejects missing customer information or security token", () => {
  assert.throws(() => validateOrderPayload({ ...valid, customer: { ...valid.customer, phone: "bad" } }));
  assert.throws(() => validateOrderPayload({ ...valid, turnstileToken: "" }));
});

test("formats the saved product snapshot in each language", () => {
  const order = { id: 42, customer_name: "Alex", phone: "12345678", email: "", notes: "", language: "en" };
  const items = [{ product_name: "Network switch", model: "SW-1", brand: "Ruijie", quantity: 2 }];
  assert.match(buildOrderMessage(order, items), /Request number: 42/);
  assert.match(buildOrderMessage(order, items), /1\. SW-1 \|\| Quantity: 2/);
  assert.match(buildOrderMessage({ ...order, language: "fr" }, items), /Numéro de demande: 42/);
  const arabicMessage = buildOrderMessage({ ...order, language: "ar" }, items);
  assert.match(arabicMessage, /رقم الطلب: 42/);
  assert.match(arabicMessage, /1\. SW-1 \|\| العدد: 2/);
  assert.doesNotMatch(arabicMessage, /Network switch|Ruijie|×|العلامة/);
});

test("only database-supported order statuses can be saved", () => {
  for (const status of ["pending_whatsapp", "confirmed", "archived"]) {
    assert.equal(validateOrderStatus(status), status);
  }
  for (const status of ["sent", "sent_whatsapp", "deleted", "confirmed ", "", null, 1]) {
    assert.throws(() => validateOrderStatus(status), /حالة الطلب غير صحيحة/);
  }
});
