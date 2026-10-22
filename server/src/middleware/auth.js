import { createHash, timingSafeEqual } from "node:crypto";
import { query } from "../db/index.js";

export const SESSION_COOKIE = "mctc_admin_session";
export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
export const SESSION_IDLE_MS = 20 * 60 * 1000;

export function hashSessionToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function sessionCookieOptions(req) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || Boolean(req?.secure),
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS
  };
}

function readCookie(req, name) {
  const header = req.headers.cookie || "";
  const value = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  if (!value) return "";
  try {
    return decodeURIComponent(value.slice(name.length + 1));
  } catch {
    return "";
  }
}

export async function loadAdminSession(req, res, next) {
  try {
    const token = readCookie(req, SESSION_COOKIE);
    if (!/^[a-f0-9]{64}$/.test(token)) return next();

    const { rows } = await query(
      `update admin_sessions s set last_activity_at = now()
       from admins a
       where s.admin_id = a.id and s.token_hash = $1
         and s.expires_at > now()
         and s.last_activity_at > now() - ($2 * interval '1 millisecond')
       returning s.token_hash, s.csrf_token, a.id, a.name, a.email`,
      [hashSessionToken(token), SESSION_IDLE_MS]
    );
    if (rows[0]) {
      req.adminSession = { tokenHash: rows[0].token_hash, csrfToken: rows[0].csrf_token };
      req.admin = { id: rows[0].id, name: rows[0].name, email: rows[0].email };
    }
    else res.clearCookie(SESSION_COOKIE, { ...sessionCookieOptions(req), maxAge: undefined });
    next();
  } catch (error) {
    next(error);
  }
}

export function requireAuth(req, res, next) {
  if (!req.adminSession) return res.status(401).json({ message: "يلزم تسجيل الدخول" });
  res.set("Cache-Control", "private, no-store");
  next();
}

export function requireAdminPage(req, res, next) {
  if (!req.adminSession) return res.redirect(302, "/login");
  next();
}

export function requireCsrf(req, res, next) {
  const received = req.get("X-CSRF-Token") || "";
  const expected = req.adminSession?.csrfToken || "";
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  if (!expected || a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(403).json({ message: "انتهت صلاحية التحقق الأمني، حدّث الصفحة وحاول مجددًا" });
  }
  next();
}
