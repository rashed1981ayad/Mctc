import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool, query } from "../db/index.js";
import { HttpError } from "../middleware/errorHandler.js";

const here = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDir = path.resolve(here, "../../uploads");
export const stagingDir = path.join(uploadsDir, ".pending");
export const UPLOAD_MAX_BYTES = Number(process.env.UPLOAD_MAX_BYTES || 1024 * 1024 * 1024);
const managedFileName = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.(?:webp|pdf)$/i;
const stagedFileName = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.tmp$/i;

if (!Number.isSafeInteger(UPLOAD_MAX_BYTES) || UPLOAD_MAX_BYTES < 10 * 1024 * 1024) {
  throw new Error("UPLOAD_MAX_BYTES must be at least 10485760 bytes");
}

async function filesIn(directory) {
  return (await readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  })).filter((entry) => entry.isFile()).map((entry) => entry.name);
}

async function fileStat(filename) {
  return stat(filename).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
}

export async function storageBytes(directory = uploadsDir) {
  let bytes = 0;
  for (const folder of [directory, path.join(directory, ".pending")]) {
    for (const filename of await filesIn(folder)) {
      bytes += (await fileStat(path.join(folder, filename)))?.size || 0;
    }
  }
  return bytes;
}

export async function withUploadQuota(work, { directory = uploadsDir, maxBytes = UPLOAD_MAX_BYTES, dbPool = pool } = {}) {
  const client = await dbPool.connect();
  try {
    await client.query("begin");
    await client.query("select pg_advisory_xact_lock(524443, 1)");
    if (await storageBytes(directory) > maxBytes) throw new HttpError(507, "مساحة تخزين الملفات المخصصة ممتلئة", { expose: true });
    const result = await work();
    if (await storageBytes(directory) > maxBytes) throw new HttpError(507, "مساحة تخزين الملفات المخصصة ممتلئة", { expose: true });
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback").catch(console.error);
    throw error;
  } finally {
    client.release();
  }
}

export function productFileUrls(product) {
  return [product?.image, ...(product?.images || []), product?.datasheet_url, ...(product?.datasheet_urls || [])].filter(Boolean);
}

function managedNames(urls) {
  return new Set(urls.map((url) => /^\/uploads\/([^/]+)$/.exec(url)?.[1]).filter((name) => name && managedFileName.test(name)));
}

async function unlinkIfPresent(filename) {
  await unlink(filename).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
}

export async function deleteUnreferencedFiles(urls, dbQuery = query, directory = uploadsDir) {
  for (const name of managedNames(urls)) {
    const url = `/uploads/${name}`;
    const { rows } = await dbQuery(
      `select exists(select 1 from products
         where image = $1 or $1 = any(images) or datasheet_url = $1 or $1 = any(datasheet_urls)) as used`,
      [url]
    );
    if (!rows[0]?.used) await unlinkIfPresent(path.join(directory, name));
  }
}

export async function cleanupOrphanUploads(dbQuery = query, directory = uploadsDir, minAgeMs = 24 * 60 * 60 * 1000) {
  const { rows } = await dbQuery("select image, images, datasheet_url, datasheet_urls from products");
  const referenced = managedNames(rows.flatMap(productFileUrls));
  const cutoff = Date.now() - minAgeMs;
  for (const name of await filesIn(directory)) {
    if (!managedFileName.test(name) || referenced.has(name)) continue;
    const info = await fileStat(path.join(directory, name));
    if (info && info.mtimeMs < cutoff) await unlinkIfPresent(path.join(directory, name));
  }
  const pending = path.join(directory, ".pending");
  for (const name of await filesIn(pending)) {
    if (!stagedFileName.test(name)) continue;
    const info = await fileStat(path.join(pending, name));
    if (info && info.mtimeMs < cutoff) await unlinkIfPresent(path.join(pending, name));
  }
}
