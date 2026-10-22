import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });
dotenv.config({ path: fileURLToPath(new URL("../.env.migrations", import.meta.url)) });
if (!process.env.MIGRATION_DATABASE_URL) {
  throw new Error("Set MIGRATION_DATABASE_URL for the one-off admin password change; do not store it in the runtime .env file");
}
if (process.env.MIGRATION_DATABASE_URL) process.env.DATABASE_URL = process.env.MIGRATION_DATABASE_URL;

const { pool } = await import("../src/db/index.js");
const { writeAuditEvent } = await import("../src/security/adminAudit.js");

const email = String(process.env.ADMIN_EMAIL || "").toLowerCase().trim();
const password = String(process.env.NEW_ADMIN_PASSWORD || "");
let client;

try {
  if (!email) throw new Error("ADMIN_EMAIL غير موجود في server/.env");
  if (password.length < 16 || password.length > 256) {
    throw new Error("استخدم كلمة مرور جديدة فريدة من 16 إلى 256 حرفًا عبر NEW_ADMIN_PASSWORD");
  }
  if (password === "ChangeMe123!") throw new Error("لا يمكن استخدام كلمة المرور التجريبية");

  const hash = await bcrypt.hash(password, 12);
  client = await pool.connect();
  await client.query("begin");
  const { rows } = await client.query(
    "update admins set password_hash = $1, updated_at = now() where email = $2 returning id",
    [hash, email]
  );
  if (!rows[0]) throw new Error("حساب المدير المحدد في ADMIN_EMAIL غير موجود");
  await client.query("delete from admin_sessions where admin_id = $1", [rows[0].id]);
  await writeAuditEvent({
    requestId: randomUUID(), action: "admin.password.change", outcome: "success",
    actorAdminId: rows[0].id, subjectHash: null, targetType: "admin_account",
    targetId: String(rows[0].id), ipAddress: null, httpStatus: 0,
    details: { source: "cli" }
  }, client.query.bind(client));
  await client.query("commit");
  console.log("تم تحديث كلمة مرور المدير وإبطال جلساته السابقة.");
} catch (error) {
  if (client) await client.query("rollback").catch(console.error);
  console.error(error.message);
  process.exitCode = 1;
} finally {
  client?.release();
  await pool.end();
}
