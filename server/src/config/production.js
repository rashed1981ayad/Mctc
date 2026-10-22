import { isIP } from "node:net";

function isInternalAddress(address) {
  if (["127.0.0.1", "::1"].includes(address)) return true;
  if (isIP(address) === 4) {
    const [first, second] = address.split(".").map(Number);
    return first === 10 || (first === 172 && second >= 16 && second <= 31) || (first === 192 && second === 168);
  }
  if (isIP(address) === 6) return /^(?:fc|fd|fe[89ab])/i.test(address);
  return false;
}

export function assertProductionConfig(env = process.env) {
  if (env.NODE_ENV !== "production") return;
  if (env.MIGRATION_DATABASE_URL) throw new Error("MIGRATION_DATABASE_URL must not be present in the production web process");
  const adminHost = String(env.ADMIN_HOST || "admin.mctc.ly").toLowerCase();
  const adminUrl = new URL(env.ADMIN_URL || `https://${adminHost}`);
  if (adminUrl.protocol !== "https:" || adminUrl.hostname.toLowerCase() !== adminHost || adminUrl.username || adminUrl.password) {
    throw new Error("Production ADMIN_URL must use HTTPS on ADMIN_HOST");
  }
  const origins = [env.CLIENT_URL, env.PUBLIC_CORS_ORIGINS].filter(Boolean)
    .flatMap((value) => String(value).split(",").map((item) => item.trim()).filter(Boolean));
  if (origins.some((origin) => {
    try {
      const url = new URL(origin);
      return url.protocol !== "https:" || ["localhost", "127.0.0.1", "admin.localhost"].includes(url.hostname.toLowerCase());
    }
    catch { return true; }
  })) throw new Error("Production client and CORS origins must use public HTTPS hosts");
  if (!isInternalAddress(String(env.BIND_HOST || "127.0.0.1").trim())) {
    throw new Error("Production BIND_HOST must be loopback or a specific private IP");
  }
}

export async function assertLimitedRuntimeRole(dbQuery) {
  const { rows } = await dbQuery(`
    select r.rolsuper, r.rolcreatedb, r.rolcreaterole,
      has_schema_privilege(current_user, 'public', 'CREATE') as can_create_schema_objects,
      exists (
        select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
        where n.nspname = 'public' and c.relkind in ('r', 'S') and c.relowner = r.oid
      ) as owns_schema_objects
    from pg_roles r where r.rolname = current_user
  `);
  const role = rows[0];
  if (!role || role.rolsuper || role.rolcreatedb || role.rolcreaterole || role.can_create_schema_objects || role.owns_schema_objects) {
    throw new Error("Production DATABASE_URL must use a limited runtime role; run db:prepare with a separate migration role");
  }
}
