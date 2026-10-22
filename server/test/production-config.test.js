import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { assertLimitedRuntimeRole, assertProductionConfig } from "../src/config/production.js";

const safeEnv = {
  NODE_ENV: "production",
  ADMIN_HOST: "admin.mctc.ly",
  ADMIN_URL: "https://admin.mctc.ly",
  CLIENT_URL: "https://mctc.ly,https://www.mctc.ly,https://admin.mctc.ly",
  PUBLIC_CORS_ORIGINS: "https://mctc.ly,https://www.mctc.ly",
  BIND_HOST: "127.0.0.1"
};

test("production rejects HTTP origins and public bind addresses", () => {
  assert.doesNotThrow(() => assertProductionConfig(safeEnv));
  assert.doesNotThrow(() => assertProductionConfig({ ...safeEnv, BIND_HOST: "10.0.0.8" }));
  assert.throws(() => assertProductionConfig({ ...safeEnv, ADMIN_URL: "http://admin.mctc.ly" }), /HTTPS/);
  assert.throws(() => assertProductionConfig({ ...safeEnv, CLIENT_URL: "https://mctc.ly,http://127.0.0.1:5173" }), /HTTPS/);
  assert.throws(() => assertProductionConfig({ ...safeEnv, BIND_HOST: "0.0.0.0" }), /private IP/);
  assert.throws(() => assertProductionConfig({ ...safeEnv, BIND_HOST: "203.0.113.10" }), /private IP/);
  assert.throws(() => assertProductionConfig({ ...safeEnv, MIGRATION_DATABASE_URL: "postgres://owner:secret@localhost/db" }), /must not be present/);
});

test("production runtime refuses a database superuser, table owner, or schema creator", async () => {
  const limited = {
    rolsuper: false, rolcreatedb: false, rolcreaterole: false,
    can_create_schema_objects: false, owns_schema_objects: false
  };
  await assert.doesNotReject(assertLimitedRuntimeRole(async () => ({ rows: [limited] })));
  for (const flag of ["rolsuper", "rolcreatedb", "rolcreaterole", "can_create_schema_objects", "owns_schema_objects"]) {
    await assert.rejects(assertLimitedRuntimeRole(async () => ({ rows: [{ ...limited, [flag]: true }] })), /limited runtime role/);
  }
});

test("production start and database preparation are separate commands", async () => {
  const index = await readFile(new URL("../src/index.js", import.meta.url), "utf8");
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.match(index, /await assertLimitedRuntimeRole\(query\);/);
  assert.doesNotMatch(index, /await (migrate|seed)\(/);
  assert.equal(packageJson.scripts.start, "node scripts/start.mjs");
  assert.equal(packageJson.scripts["db:prepare"], "node scripts/prepare-db.mjs");
});
