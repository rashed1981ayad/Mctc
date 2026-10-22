import test from "node:test";
import assert from "node:assert/strict";
import { requestFingerprint, prepareOrderRequest, rememberSavedOrder, readSavedOrder, discardPendingRequest, navigateWhatsApp, RECOVERY_TTL } from "../src/services/orderRecovery.js";

function storage(initial = {}) {
  const values = { ...initial };
  return { values, getItem: key => values[key] || null, setItem: (key, value) => { values[key] = value; } };
}
const customer = { name: "Ali", phone: "0912345678", email: "ali@example.com", notes: "" };
const items = [{ id: 2, quantity: 3 }, { id: 1, quantity: 1 }];

test("an unknown request reuses its persisted key after refresh, without storing customer fields", async () => {
  const original = storage();
  const fingerprint = await requestFingerprint(customer, items, "ar");
  const first = prepareOrderRequest(fingerprint, original, 1000);
  const refreshed = storage(original.values);
  const second = prepareOrderRequest(await requestFingerprint(customer, [...items].reverse(), "ar"), refreshed, 2000);
  assert.equal(first.requestKey, second.requestKey);
  assert.doesNotMatch(JSON.stringify(original.values), /Ali|0912345678|ali@example/);
});

test("customer, quantity, product, or language changes create a different request key", async () => {
  const base = await requestFingerprint(customer, items, "ar");
  for (const [person, cart, lang] of [
    [{ ...customer, phone: "0922345678" }, items, "ar"],
    [customer, [{ id: 2, quantity: 4 }, items[1]], "ar"],
    [customer, [items[0]], "ar"],
    [customer, items, "en"]
  ]) {
    const saved = storage();
    const first = prepareOrderRequest(base, saved, 1000);
    const changed = prepareOrderRequest(await requestFingerprint(person, cart, lang), saved, 2000);
    assert.notEqual(first.requestKey, changed.requestKey);
  }
});

test("confirmed orders retain their WhatsApp receipt after refresh and rotate the key", () => {
  const saved = storage();
  const first = prepareOrderRequest("fingerprint", saved, 1000);
  rememberSavedOrder(first, { orderId: "42", whatsappUrl: "https://wa.me/218930001191?text=test" }, saved, 2000);
  const refreshed = storage(saved.values);
  assert.equal(readSavedOrder(refreshed, 3000).orderId, "42");
  assert.equal(readSavedOrder(refreshed, 3000).whatsappUrl, "https://wa.me/218930001191?text=test");
  assert.notEqual(prepareOrderRequest("fingerprint", refreshed, 3000).requestKey, first.requestKey);
  assert.equal(readSavedOrder(refreshed, RECOVERY_TTL + 3000), null);
});

test("conflicts and expiration reset pending keys; unavailable storage blocks sending", () => {
  const saved = storage();
  const first = prepareOrderRequest("same", saved, 1000);
  discardPendingRequest(first, saved);
  const second = prepareOrderRequest("same", saved, 2000);
  assert.notEqual(first.requestKey, second.requestKey);
  assert.notEqual(prepareOrderRequest("same", saved, RECOVERY_TTL + 2001).requestKey, second.requestKey);
  assert.throws(() => prepareOrderRequest("same", { getItem() { return null; }, setItem() { throw new Error("blocked"); } }), /blocked/);
});

test("closed, blocked, or inaccessible popups never erase a successful receipt", () => {
  const saved = storage();
  const pending = prepareOrderRequest("same", saved);
  const result = { orderId: "42", whatsappUrl: "https://wa.me/218930001191?text=test" };
  rememberSavedOrder(pending, result, saved);
  for (const popup of [
    null,
    { closed: true, get location() { throw new Error("closed window accessed"); } },
    { closed: false, get location() { throw new Error("navigation unavailable"); } }
  ]) {
    assert.equal(navigateWhatsApp(popup, result.whatsappUrl), false);
    assert.equal(readSavedOrder(saved).orderId, "42");
  }
  const open = { closed: false, location: { href: "" } };
  assert.equal(navigateWhatsApp(open, result.whatsappUrl), true);
  assert.equal(open.location.href, result.whatsappUrl);
});
