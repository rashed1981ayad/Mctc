import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import express from "express";
import { ADMIN_CSP, setAdminCsp } from "../src/security/adminCsp.js";

test("admin CSP permits Turnstile while keeping other external scripts blocked", async () => {
  const app = express();
  app.get("/admin", setAdminCsp, (_req, res) => res.send("ok"));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/admin`);
    assert.equal(response.headers.get("content-security-policy"), ADMIN_CSP);
    for (const directive of ["script-src 'self' https://challenges.cloudflare.com", "style-src 'self'", "font-src 'self'", "connect-src 'self' https://challenges.cloudflare.com", "frame-src https://challenges.cloudflare.com", "frame-ancestors 'none'"]) {
      assert.ok(ADMIN_CSP.includes(directive));
    }
    assert.doesNotMatch(ADMIN_CSP, /unsafe-inline|unsafe-eval/);
    assert.equal((ADMIN_CSP.match(/https:\/\//g) || []).length, 3);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("admin login has no inline script or style", async () => {
  const html = await readFile(new URL("../public/admin-login.html", import.meta.url), "utf8");
  assert.match(html, /<script src="\/admin-login\.js" defer><\/script>/);
  assert.match(html, /<script src="https:\/\/challenges\.cloudflare\.com\/turnstile\/v0\/api\.js\?render=explicit" defer><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\/admin-login\.css"/);
  assert.doesNotMatch(html, /<script(?:\s|>)((?!src=)[^>])*?>/i);
  assert.doesNotMatch(html, /<style\b/i);
});
