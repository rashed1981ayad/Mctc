import test from "node:test";
import assert from "node:assert/strict";
import { validPage, correctedProductPage } from "../src/services/pagination.js";

test("outdated page links return to the last page, or page one for an empty catalog", () => {
  assert.equal(correctedProductPage(8, { page: 8, pages: 1, total: 5 }), 1);
  assert.equal(correctedProductPage(8, { page: 8, pages: 3, total: 30 }), 3);
  assert.equal(correctedProductPage(8, { page: 8, pages: 0, total: 0 }), 1);
  assert.equal(correctedProductPage(1, { page: 1, pages: 0, total: 0 }), 1);
  assert.equal(correctedProductPage(2, { page: 2, pages: 3, total: 30 }), 2);
});

test("an unfinished or older page response cannot correct the current page", () => {
  assert.equal(correctedProductPage(8, undefined), 8);
  assert.equal(correctedProductPage(8, { page: 1, pages: 1 }), 8);
});

test("invalid, negative, fractional, and infinite page parameters use page one", () => {
  for (const value of [null, "", "bad", "-2", "0", "1.5", "Infinity", "9007199254740992"]) assert.equal(validPage(value), 1);
  assert.equal(validPage("8"), 8);
});
