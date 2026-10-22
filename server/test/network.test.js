import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import express from "express";
import { networkConfig } from "../src/config/network.js";

test("Node binds to loopback and trusts only loopback proxies by default", () => {
  const config = networkConfig({});
  assert.equal(config.bindHost, "127.0.0.1");
  assert.equal(config.port, 5000);
  const app = express();
  app.set("trust proxy", config.trustedProxies);
  const trust = app.get("trust proxy fn");
  assert.equal(trust("127.0.0.1", 0), true);
  assert.equal(trust("::1", 0), true);
  assert.equal(trust("203.0.113.20", 0), false);
});

test("a remote proxy must be an explicit IP, not a hop count or open subnet", () => {
  const config = networkConfig({ BIND_HOST: "0.0.0.0", TRUSTED_PROXY_IPS: "192.0.2.10,2001:db8::10" });
  const app = express();
  app.set("trust proxy", config.trustedProxies);
  const trust = app.get("trust proxy fn");
  assert.equal(trust("192.0.2.10", 0), true);
  assert.equal(trust("192.0.2.11", 0), false);
  assert.equal(trust("2001:db8::10", 0), true);
  assert.throws(() => networkConfig({ TRUSTED_PROXY_IPS: "0.0.0.0/0" }));
  assert.throws(() => networkConfig({ TRUSTED_PROXY_IPS: "1" }));
  assert.throws(() => networkConfig({ BIND_HOST: "not-an-ip" }));
});

test("Nginx overwrites rather than appends client-supplied forwarded IPs", async () => {
  const nginx = await readFile(new URL("../../deploy/nginx.mctc.conf.example", import.meta.url), "utf8");
  assert.equal((nginx.match(/proxy_set_header X-Forwarded-For \$remote_addr;/g) || []).length, 2);
  assert.doesNotMatch(nginx, /\$proxy_add_x_forwarded_for/);
});
