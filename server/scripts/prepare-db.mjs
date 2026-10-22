import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });
dotenv.config({ path: fileURLToPath(new URL("../.env.migrations", import.meta.url)) });
if (!process.env.MIGRATION_DATABASE_URL) {
  throw new Error("Set MIGRATION_DATABASE_URL only for this db:prepare command; do not store it in the runtime .env file");
}
process.env.DATABASE_URL = process.env.MIGRATION_DATABASE_URL;

const { migrate, pool } = await import("../src/db/index.js");
const { seed } = await import("../src/seed.js");
try {
  await migrate();
  await seed();
  console.log("Database schema and admin account are ready");
} finally {
  await pool.end();
}
