import { HttpError } from "../middleware/errorHandler.js";
import { getClientIp, verifyTurnstile } from "./turnstile.js";

const LOCAL_TEST_SITE_KEY = "1x00000000000000000000AA";
const LOCAL_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";
const TEST_SITE_KEYS = new Set([
  LOCAL_TEST_SITE_KEY,
  "2x00000000000000000000AB",
  "1x00000000000000000000BB",
  "2x00000000000000000000BB",
  "3x00000000000000000000FF"
]);
const TEST_SECRET_KEYS = new Set([
  LOCAL_TEST_SECRET_KEY,
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA"
]);
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "admin.localhost"]);

export function adminTurnstileConfig(requestHostname) {
  const configuredSiteKey = process.env.ADMIN_TURNSTILE_SITE_KEY?.trim() || "";
  const configuredSecret = process.env.ADMIN_TURNSTILE_SECRET_KEY?.trim() || "";
  const localTestMode = process.env.NODE_ENV === "development" && !configuredSiteKey && !configuredSecret;
  if (localTestMode && !LOCAL_HOSTNAMES.has(String(requestHostname || "").toLowerCase())) {
    throw new HttpError(503, "Local Turnstile test keys require a local hostname");
  }
  const siteKey = localTestMode ? LOCAL_TEST_SITE_KEY : configuredSiteKey;
  const secret = localTestMode ? LOCAL_TEST_SECRET_KEY : configuredSecret;
  if (!siteKey || !secret) throw new HttpError(503, "Admin Turnstile is not configured");
  if (process.env.NODE_ENV === "production" && (TEST_SITE_KEYS.has(siteKey) || TEST_SECRET_KEYS.has(secret))) {
    throw new HttpError(503, "Turnstile test keys are forbidden in production");
  }
  const defaultHostnames = process.env.NODE_ENV === "production"
    ? process.env.ADMIN_HOST || "admin.mctc.ly"
    : "localhost,127.0.0.1,admin.localhost";
  const hostnames = (process.env.ADMIN_TURNSTILE_HOSTNAMES || defaultHostnames)
    .split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  return { siteKey, secret, hostnames, localTestMode };
}

export async function validateAdminTurnstile(token, action, ipAddress, requestHostname) {
  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    throw new HttpError(400, "أكمل التحقق الأمني وحاول مرة أخرى");
  }
  const { secret, hostnames, localTestMode } = adminTurnstileConfig(requestHostname);
  // Cloudflare's dummy widget is deliberately permissive; keep action/host checks for real keys.
  const valid = await verifyTurnstile(token.trim(), ipAddress, localTestMode ? { secret } : { secret, action, hostnames });
  if (!valid) throw new HttpError(400, "فشل التحقق الأمني أو انتهت صلاحيته؛ حاول مرة أخرى");
}

export function requireAdminTurnstile(action, tokenFromRequest) {
  return (req, _res, next) => {
    validateAdminTurnstile(tokenFromRequest(req), action, getClientIp(req), req.hostname).then(() => next(), next);
  };
}
