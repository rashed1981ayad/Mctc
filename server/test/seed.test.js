import test from "node:test";
import assert from "node:assert/strict";
import { pool } from "../src/db/index.js";
import { seed } from "../src/seed.js";

test("startup seed does not inspect or recreate an empty product catalog", async () => {
  const originalQuery = pool.query;
  const originalEmail = process.env.ADMIN_EMAIL;
  const statements = [];
  try {
    process.env.ADMIN_EMAIL = "admin@example.com";
    pool.query = async (sql) => {
      statements.push(sql);
      if (sql.startsWith("select id from admins")) return { rowCount: 1, rows: [{ id: 1 }] };
      throw new Error("product seeding must be explicit");
    };
    await seed();
    assert.equal(statements.length, 1);
  } finally { pool.query = originalQuery; process.env.ADMIN_EMAIL = originalEmail; }
});
