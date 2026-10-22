import "dotenv/config";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectAndApprovePdf } from "../src/security/pdfInspection.js";

const directory = fileURLToPath(new URL("../uploads/", import.meta.url));
let passed = 0;
let failed = 0;
for (const file of await readdir(directory, { withFileTypes: true })) {
  if (!file.isFile() || !file.name.toLowerCase().endsWith(".pdf")) continue;
  try {
    await inspectAndApprovePdf(path.join(directory, file.name));
    passed++;
    console.log("APPROVED", file.name);
  } catch (error) {
    failed++;
    console.error("BLOCKED", file.name, error.publicMessage || error.message);
  }
}
console.log(JSON.stringify({ passed, failed }));
if (failed) process.exitCode = 1;
