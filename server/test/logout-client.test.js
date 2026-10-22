import test from "node:test";
import assert from "node:assert/strict";
import { confirmLogout } from "../../admin/src/services/logout.js";
import { api } from "../../admin/src/services/api.js";

test("logout preserves the UI session and URL on network, server, or authentication failure", async () => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  try {
    const navigation = [];
    globalThis.window = { location: { replace: path => navigation.push(path) } };
    for (const status of [0, 500, 401, 403]) {
      let cleared = false;
      globalThis.fetch = async () => {
        if (!status) throw new TypeError("network error");
        return new Response(JSON.stringify({ message: "failed" }), { status });
      };
      await assert.rejects(confirmLogout(api, () => { cleared = true; }, path => navigation.push(path)));
      assert.equal(cleared, false);
      assert.deepEqual(navigation, []);
    }
    let resolveRequest;
    globalThis.fetch = () => new Promise(resolve => { resolveRequest = resolve; });
    let cleared = false;
    const pending = confirmLogout(api, () => { cleared = true; }, path => navigation.push(path));
    assert.equal(cleared, false);
    assert.deepEqual(navigation, []);
    resolveRequest(new Response(JSON.stringify({ message: "logged out" }), { status: 200 }));
    await pending;
    assert.equal(cleared, true);
    assert.deepEqual(navigation, ["/login"]);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
