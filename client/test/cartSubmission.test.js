import test from "node:test";
import assert from "node:assert/strict";
import { orderRequestSignature, remainingAfterSubmission } from "../src/services/cartSubmission.js";

test("adding a suggested product changes the order signature without editing customer fields", () => {
  const customer = { name: "Ali", phone: "0912345678" };
  const first = orderRequestSignature(customer, [{ id: 1, quantity: 2 }]);
  const second = orderRequestSignature(customer, [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }]);
  assert.notEqual(first, second);
  assert.equal(first, orderRequestSignature(customer, [{ id: 1, quantity: 2 }]));
});

test("clearing a saved snapshot keeps products added or changed while saving", () => {
  const submitted = [{ id: 1, quantity: 2 }];
  assert.deepEqual(remainingAfterSubmission([{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }], submitted), [{ id: 2, quantity: 1 }]);
  assert.deepEqual(remainingAfterSubmission([{ id: 1, quantity: 3 }], submitted), [{ id: 1, quantity: 3 }]);
});
