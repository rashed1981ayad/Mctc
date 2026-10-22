import { auditAction, auditedQuery, auditTransaction } from "../security/adminAudit.js";
import { randomBytes } from "node:crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { query } from "../db/index.js";
import { clearLoginAttempts, consumeAccountAttempt, consumeIpAttempt } from "../security/loginThrottle.js";
import { adminTurnstileConfig, validateAdminTurnstile } from "../security/adminTurnstile.js";
import {
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  hashSessionToken,
  requireAuth,
  requireCsrf,
  sessionCookieOptions
} from "../middleware/auth.js";

const router = Router();
const dummyPasswordHash = "$2b$12$ONLcPq4RoAHTGhZWIIEcl.RtohtsqyJEjueY2K7.LM1hTzsFHUAk.";
const invalidCredentials = "البريد الإلكتروني أو كلمة المرور غير صحيحة";

function tooManyAttempts(res, retryAfter) {
  res.set("Cache-Control", "no-store");
  res.set("Retry-After", String(retryAfter));
  return res.status(429).json({ message: "محاولات دخول كثيرة. حاول مرة أخرى لاحقًا" });
}

router.get("/turnstile-config", (req, res, next) => {
  try {
    res.set("Cache-Control", "no-store");
    res.json({ siteKey: adminTurnstileConfig(req.hostname).siteKey });
  } catch (error) {
    next(error);
  }
});

router.post("/login", auditAction("auth.login", "admin_account"), async (req, res, next) => {
  try {
    const email = String(req.body?.email || "").toLowerCase().trim();
    const password = String(req.body?.password || "");
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    const ipLimit = await consumeIpAttempt(ip);
    if (!ipLimit.allowed) return tooManyAttempts(res, ipLimit.retryAfter);
    await validateAdminTurnstile(req.body?.turnstileToken, "admin_login", ip, req.hostname);

    if (!email || email.length > 254 || !password || password.length > 1024) {
      res.set("Cache-Control", "no-store");
      return res.status(401).json({ message: invalidCredentials });
    }

    const accountLimit = await consumeAccountAttempt(email);
    if (!accountLimit.allowed) return tooManyAttempts(res, accountLimit.retryAfter);

    const { rows } = await query(
      "select id, name, email, password_hash from admins where email = $1",
      [email]
    );
    const admin = rows[0];
    const passwordMatches = await bcrypt.compare(password, admin?.password_hash || dummyPasswordHash);
    if (!admin || !passwordMatches) {
      res.set("Cache-Control", "no-store");
      return res.status(401).json({ message: invalidCredentials });
    }

    const token = randomBytes(32).toString("hex");
    const csrfToken = randomBytes(32).toString("hex");
    await clearLoginAttempts(email, ip);
    await auditTransaction(req, res, async (dbQuery) => {
    await dbQuery("delete from admin_sessions where expires_at <= now()");
    if (req.adminSession) {
      await dbQuery("delete from admin_sessions where token_hash = $1", [req.adminSession.tokenHash]);
    }
    await dbQuery(
      "insert into admin_sessions (token_hash, admin_id, csrf_token, expires_at) values ($1, $2, $3, $4)",
      [hashSessionToken(token), admin.id, csrfToken, new Date(Date.now() + SESSION_DURATION_MS)]
    );
    res.locals.auditActorId = admin.id;
    res.locals.auditTargetId = admin.id;
    });
    res.cookie(SESSION_COOKIE, token, sessionCookieOptions(req));
    res.set("Cache-Control", "no-store");
    res.json({ admin: { name: admin.name, email: admin.email }, csrfToken });
  } catch (error) {
    next(error);
  }
});

router.get("/session", requireAuth, (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ admin: req.admin, csrfToken: req.adminSession.csrfToken });
});

router.post("/logout", auditAction("auth.logout", "admin_account"), requireAuth, requireCsrf, async (req, res, next) => {
  try {
    await auditedQuery(req, res, "delete from admin_sessions where token_hash = $1 returning admin_id as id", [req.adminSession.tokenHash]);
    res.clearCookie(SESSION_COOKIE, { ...sessionCookieOptions(req), maxAge: undefined });
    res.set("Cache-Control", "no-store");
    res.json({ message: "تم تسجيل الخروج" });
  } catch (error) {
    next(error);
  }
});

export default router;
