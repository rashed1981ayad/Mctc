import cors from "cors";

export function publicCorsOrigins(env = process.env) {
  const adminHost = String(env.ADMIN_HOST || "admin.mctc.ly").toLowerCase();
  return String(env.PUBLIC_CORS_ORIGINS ?? env.CLIENT_URL ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .flatMap((value) => {
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol) || url.hostname.toLowerCase() === adminHost || url.port === "5174") return [];
        return [url.origin];
      } catch {
        return [];
      }
    });
}

export function isPublicCorsRoute(req) {
  const method = req.method === "OPTIONS" ? req.get("Access-Control-Request-Method")?.toUpperCase() : req.method;
  const path = req.path;
  if (method === "GET") {
    return path === "/api/health" || ((path === "/api/products" || path.startsWith("/api/products/")) && req.query.status !== "all");
  }
  return method === "POST" && (path === "/api/contact" || path === "/api/orders");
}

export function createApiCors(env = process.env) {
  const publicCors = cors({ origin: publicCorsOrigins(env), methods: ["GET", "POST"], credentials: false });
  return (req, res, next) => {
    if (!req.adminSession && isPublicCorsRoute(req)) return publicCors(req, res, next);
    next();
  };
}
