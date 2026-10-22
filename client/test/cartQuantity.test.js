import test from "node:test";
import assert from "node:assert/strict";
import { addCartQuantity } from "../src/services/cartQuantity.js";

test("quantity picker adds 1 through 30 pieces and accumulates existing quantity", () => {
  assert.deepEqual(addCartQuantity([], 4, 30), [{ id: 4, quantity: 30 }]);
  assert.deepEqual(addCartQuantity([{ id: 4, quantity: 6 }], 4, 12), [{ id: 4, quantity: 18 }]);
  assert.deepEqual(addCartQuantity([{ id: 4, quantity: 6 }], 4, 0), [{ id: 4, quantity: 6 }]);
  assert.deepEqual(addCartQuantity([{ id: 4, quantity: 6 }], 4, 31), [{ id: 4, quantity: 6 }]);
});

test("quantity picker respects cart limits without silently truncating", () => {
  const nearLimit = [{ id: 4, quantity: 90 }];
  assert.strictEqual(addCartQuantity(nearLimit, 4, 10), nearLimit);
  assert.deepEqual(addCartQuantity(nearLimit, 4, 9), [{ id: 4, quantity: 99 }]);
  const fullCart = Array.from({ length: 12 }, (_, index) => ({ id: index + 1, quantity: 1 }));
  assert.strictEqual(addCartQuantity(fullCart, 13, 1), fullCart);
});
