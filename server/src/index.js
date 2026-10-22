import "dotenv/config";
import { randomUUID } from "node:crypto";
import express from "express";
import { existsSync } from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import databaseRoutes from "./routes/database.js";
import { query } from "./db/index.js";
import bcrypt from "bcryptjs";
import { loadAdminSession, requireAdminPage } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { publicUploadOnly, serveUploadedFile } from "./security/uploads.js";
import { ADMIN_CSP, setAdminCsp } from "./security/adminCsp.js";
import { networkConfig } from "./config/network.js";
import { cleanupLoginAttempts } from "./security/loginThrottle.js";
import { cleanupOrphanUploads } from "./security/uploadStorage.js";
import { adminAuditMiddleware } from "./security/adminAudit.js";
import { createApiCors } from "./security/apiCors.js";
import { assertLimitedRuntimeRole, assertProductionConfig } from "./config/production.js";
import { adminTurnstileConfig } from "./security/adminTurnstile.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteDist = path.resolve(__dirname, "../../client/dist");
const adminDist = path.resolve(__dirname, "../../admin/dist");
const adminLogin = path.resolve(__dirname, "../public/admin-login.html");
const adminLoginCss = path.resolve(__dirname, "../public/admin-login.css");
const adminLoginJs = path.resolve(__dirname, "../public/admin-login.js");
const adminHost = (process.env.ADMIN_HOST || "admin.mctc.ly").toLowerCase();
const defaultAdminUrl = process.env.NODE_ENV === "production"
  ? `https://${adminHost}`
  : "http://127.0.0.1:5174";
const adminUrl = (process.env.ADMIN_URL || defaultAdminUrl).replace(/\/$/, "");
const { bindHost, port, trustedProxies } = networkConfig();
assertProductionConfig(process.env);
if (process.env.NODE_ENV === "production") adminTurnstileConfig(adminHost);

function isAdminHost(req) {
  return req.hostname.toLowerCase() === adminHost;
}

app.set("trust proxy", trustedProxies);
app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.set("X-Request-ID", req.requestId);
  next();
});
app.use(adminAuditMiddleware);
app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  if (!isAdminHost(req)) return next();
  res.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  setAdminCsp(req, res, next);
});
app.get("/uploads/:filename", publicUploadOnly, serveUploadedFile);
app.use("/uploads", (_req, res) => res.status(404).end());
app.use(loadAdminSession);
app.use(createApiCors());

app.get("/api", (req, res) => {
  if (req.adminSession) {
    res.set("Cache-Control", "private, no-store");
    return res.redirect(302, "/api/database");
  }
  res.json({ message: "Almutqaddim API", health: "/api/health", login: `${adminUrl}/login` });
});

app.get("/api/health", async (_req, res, next) => {
  try {
    await query("select 1");
    res.json({ status: "ok", database: "postgresql" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/database", databaseRoutes);

app.use("/api", (_req, res) => res.status(404).json({ message: "المسار غير موجود" }));

app.get(/^\/admin(?:\/.*)?$/, (req, res) => {
  const suffix = req.path.replace(/^\/admin/, "") || "/";
  const destination = suffix === "/" ? (req.adminSession ? "/products" : "/login") : suffix;
  res.redirect(302, `${adminUrl}${destination}`);
});

app.get("/login", (req, res, next) => {
  if (process.env.NODE_ENV === "production" && !isAdminHost(req)) return next();
  if (req.adminSession) return res.redirect(302, "/products");
  res.set("Content-Security-Policy", ADMIN_CSP);
  res.set("Cache-Control", "no-store");
  res.sendFile(adminLogin);
});
app.get("/admin-login.css", (req, res, next) => {
  if (process.env.NODE_ENV === "production" && !isAdminHost(req)) return next();
  res.set("Cache-Control", "no-store");
  res.sendFile(adminLoginCss);
});
app.get("/admin-login.js", (req, res, next) => {
  if (process.env.NODE_ENV === "production" && !isAdminHost(req)) return next();
  res.set("Cache-Control", "no-store");
  res.sendFile(adminLoginJs);
});
app.get("/favicon.webp", (req, res, next) => {
  if (!isAdminHost(req)) return next();
  res.sendFile(path.join(adminDist, "favicon.webp"));
});

app.use((req, res, next) => {
  if (!isAdminHost(req)) return next();
  if (req.path === "/") return res.redirect(302, req.adminSession ? "/products" : "/login");
  next();
});
app.use((req, res, next) => {
  if (!isAdminHost(req) || req.path === "/login") return next();
  requireAdminPage(req, res, next);
});
app.use((req, res, next) => {
  if (!isAdminHost(req)) return next();
  express.static(adminDist, {
  index: false,
  dotfiles: "deny",
  setHeaders: (res) => res.setHeader("Cache-Control", "private, no-store")
  })(req, res, next);
});
app.get(/.*/, (req, res, next) => {
  if (!isAdminHost(req)) return next();
  if (path.extname(req.path)) return res.status(404).end();
  if (!existsSync(path.join(adminDist, "index.html"))) return res.status(503).send("لوحة التحكم لم تُبنَ بعد. شغّل npm run build.");
  res.set("Cache-Control", "private, no-store");
  res.sendFile(path.join(adminDist, "index.html"));
});

app.use(express.static(siteDist, { index: false, dotfiles: "deny" }));
app.get(/^\/(?!uploads(?:\/|$)).*/, (req, res) => {
  if (path.extname(req.path)) return res.status(404).end();
  if (!existsSync(path.join(siteDist, "index.html"))) return res.json({ message: "Almutqaddim API", health: "/api/health" });
  res.sendFile(path.join(siteDist, "index.html"));
});

app.use(errorHandler);

const required = ["DATABASE_URL", "ADMIN_EMAIL", "TURNSTILE_SECRET_KEY"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

await assertLimitedRuntimeRole(query);
await cleanupLoginAttempts();
setInterval(() => cleanupLoginAttempts().catch(console.error), 60 * 60 * 1000).unref();
await cleanupOrphanUploads().catch(console.error);
setInterval(() => cleanupOrphanUploads().catch(console.error), 60 * 60 * 1000).unref();

if (process.env.NODE_ENV === "production") {
  const { rows } = await query("select password_hash from admins");
  if ((await Promise.all(rows.map((row) => bcrypt.compare("ChangeMe123!", row.password_hash)))).some(Boolean)) {
    console.error("رفض تشغيل الإنتاج: كلمة مرور المدير التجريبية ما زالت فعّالة. غيّرها باستخدام npm --prefix server run admin:password.");
    process.exit(1);
  }
}

app.listen(port, bindHost, () => {
  console.log(`API running on http://${bindHost}:${port}`);
});
