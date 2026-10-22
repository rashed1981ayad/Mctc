import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import orders from "../src/routes/orders.js";
import { pool } from "../src/db/index.js";
import { prepareOrderRequest, requestFingerprint } from "../../client/src/services/orderRecovery.js";

test("retry after a lost response and page refresh returns the saved order without inserting another", async () => {
  const originalConnect = pool.connect;
  const originalFetch = globalThis.fetch;
  const values = new Map();
  const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) };
  let savedOrder;
  let savedItem;
  let inserts = 0;
  let server;
  try {
    globalThis.fetch = (url, options) => String(url).startsWith("https://challenges.cloudflare.com/")
      ? Promise.resolve({ ok: true, json: async () => ({ success: true }) })
      : originalFetch(url, options);
    pool.connect = async () => ({
      async query(sql, params) {
        if (["BEGIN", "COMMIT", "ROLLBACK"].includes(sql)) return { rows: [] };
        if (sql.startsWith("select * from orders")) return { rows: savedOrder ? [savedOrder] : [] };
        if (sql.includes("select id, name, model")) return { rows: [{ id: 1, name: "Switch", model: "SW1", brand: "Brand", category: "Network" }] };
        if (sql.includes("insert into orders")) {
          inserts++;
          savedOrder = { id: "42", request_key: params[0], customer_name: params[1], phone: params[2], email: params[3], notes: params[4], language: params[5], whatsapp_number: params[6], status: "pending_whatsapp" };
          return { rows: [savedOrder] };
        }
        if (sql.includes("insert into order_items")) {
          savedItem = { product_id: params[1], product_name: params[2], model: params[3], brand: params[4], quantity: params[6] };
          return { rows: [savedItem] };
        }
        if (sql.includes("from order_items")) return { rows: [savedItem] };
        throw new Error("unexpected SQL");
      },
      release() {}
    });
    const app = express();
    app.use(express.json());
    app.use("/api/orders", orders);
    server = app.listen(0, "127.0.0.1");
    await new Promise(resolve => server.once("listening", resolve));
    const customer = { name: "Ali", phone: "0912345678", email: "", notes: "" };
    const items = [{ id: 1, quantity: 3 }];
    const fingerprint = await requestFingerprint(customer, items, "ar");
    const first = prepareOrderRequest(fingerprint, storage);
    const send = key => fetch("http://127.0.0.1:" + server.address().port + "/api/orders", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestKey: key, customer, items, language: "ar", turnstileToken: "new-token" })
    });
    const lostResponse = await send(first.requestKey);
    assert.equal(lostResponse.status, 201);
    await lostResponse.text(); // The page never records success or clears the pending key.
    const afterRefresh = prepareOrderRequest(await requestFingerprint(customer, items, "ar"), storage);
    const retry = await send(afterRefresh.requestKey);
    assert.equal(retry.status, 201);
    const recovered = await retry.json();
    assert.equal(recovered.orderId, "42");
    assert.match(recovered.whatsappUrl, /^https:\/\/wa\.me\//);
    assert.equal(inserts, 1);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    pool.connect = originalConnect;
    globalThis.fetch = originalFetch;
  }
});
