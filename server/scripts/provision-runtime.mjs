import { readFile, writeFile, rename, access } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import dotenv from "dotenv";
import { Pool } from "pg";
import { assertLimitedRuntimeRole } from "../src/config/production.js";

// One-time local setup. Credentials never appear in command arguments or output.
const envPath = new URL("../.env", import.meta.url);
const migrationPath = new URL("../.env.migrations", import.meta.url);
const source = await readFile(envPath, "utf8");
const settings = dotenv.parse(source);
const url = new URL(settings.DATABASE_URL);
if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) throw new Error("This setup command is for a local database only");
try { await access(migrationPath); throw new Error("Migration credentials already exist; refusing to overwrite"); }
catch (error) { if (error.code !== "ENOENT") throw error; }
const role = "mctc_runtime";
const password = randomBytes(36).toString("hex");
const owner = new Pool({ connectionString: settings.DATABASE_URL });
let runtime;
const ident = (value) => '"' + value.replaceAll('"', '""') + '"';
try {
  const { rows } = await owner.query("select current_database() as name");
  const grantSource = await readFile(new URL("../../deploy/postgres-runtime-grants.sql", import.meta.url), "utf8");
  const grants = grantSource.split("\n").filter((line) => !line.trim().startsWith("--"))
    .map((line) => line.includes("\\gexec")
      ? "grant connect on database " + ident(rows[0].name) + " to " + ident(role) + ";"
      : line.replaceAll(':"runtime_role"', ident(role))).join("\n")
    .replace(/\bbegin;/i, "").replace(/\bcommit;/i, "");
  const client = await owner.connect();
  try {
    await client.query("begin");
    await client.query("create role " + ident(role) + " login nosuperuser nocreatedb nocreaterole noreplication nobypassrls password '" + password + "'");
    await client.query(grants);
    await client.query("commit");
  } catch (error) { await client.query("rollback"); throw error; }
  finally { client.release(); }
  url.username = role;
  url.password = password;
  runtime = new Pool({ connectionString: url.toString() });
  await assertLimitedRuntimeRole(runtime.query.bind(runtime));
  await runtime.query("select id from products limit 1");
  await runtime.query("select id from admins limit 1");
  await writeFile(migrationPath, "MIGRATION_DATABASE_URL=" + JSON.stringify(settings.DATABASE_URL) + "\n", { flag: "wx", mode: 0o600 });
  const updated = source.replace(/^DATABASE_URL=.*$/m, "DATABASE_URL=" + url.toString());
  if (updated === source) throw new Error("DATABASE_URL line not found");
  const temp = new URL("../.env.runtime-tmp", import.meta.url);
  await writeFile(temp, updated, { mode: 0o600 });
  await rename(temp, envPath);
  console.log("Local DATABASE_URL now uses mctc_runtime; owner credentials are isolated in .env.migrations.");
} catch (error) {
  console.error("Runtime setup failed:", error.code || error.name);
  process.exitCode = 1;
} finally { await runtime?.end(); await owner.end(); }
