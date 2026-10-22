import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readdir, stat, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { cleanupOrphanUploads, deleteUnreferencedFiles, withUploadQuota } from "../src/security/uploadStorage.js";

const oldName = "11111111-1111-4111-8111-111111111111.webp";
const usedName = "22222222-2222-4222-8222-222222222222.pdf";
const newName = "33333333-3333-4333-8333-333333333333.webp";

test("quota rejects bytes above the cap and releases its database lock", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "mctc-quota-"));
  t.after(async () => { const { rm } = await import("node:fs/promises"); await rm(directory, { recursive: true, force: true }); });
  await writeFile(path.join(directory, oldName), Buffer.alloc(8));
  const statements = [];
  const dbPool = { async connect() { return { async query(sql) { statements.push(sql); }, release() { statements.push("release"); } }; } };
  await assert.rejects(withUploadQuota(async () => { await writeFile(path.join(directory, newName), Buffer.alloc(5)); }, { directory, maxBytes: 10, dbPool }), (error) => error.status === 507);
  assert.deepEqual(statements, ["begin", "select pg_advisory_xact_lock(524443, 1)", "rollback", "release"]);
});

test("file cleanup preserves shared and legacy files, removes only old unreferenced generated files", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "mctc-cleanup-"));
  t.after(async () => { const { rm } = await import("node:fs/promises"); await rm(directory, { recursive: true, force: true }); });
  await mkdir(path.join(directory, ".pending"));
  for (const name of [oldName, usedName, newName, "legacy-photo.webp"]) await writeFile(path.join(directory, name), "x");
  const stale = new Date(Date.now() - 48 * 60 * 60 * 1000);
  for (const name of [oldName, usedName, "legacy-photo.webp"]) await utimes(path.join(directory, name), stale, stale);
  const staged = "44444444-4444-4444-8444-444444444444.tmp";
  await writeFile(path.join(directory, ".pending", staged), "x");
  await utimes(path.join(directory, ".pending", staged), stale, stale);
  const dbQuery = async (sql) => sql.startsWith("select image")
    ? { rows: [{ image: `/uploads/${usedName}`, images: [], datasheet_url: "", datasheet_urls: [] }] }
    : { rows: [{ used: sql.includes("exists") }] };
  await cleanupOrphanUploads(dbQuery, directory);
  assert.deepEqual((await readdir(directory)).sort(), [".pending", newName, usedName, "legacy-photo.webp"].sort());
  assert.deepEqual(await readdir(path.join(directory, ".pending")), []);
  await deleteUnreferencedFiles([`/uploads/${newName}`, "/uploads/legacy-photo.webp"], async () => ({ rows: [{ used: false }] }), directory);
  assert.deepEqual((await readdir(directory)).sort(), [".pending", usedName, "legacy-photo.webp"].sort());
  assert.ok((await stat(path.join(directory, usedName))).isFile());
});
