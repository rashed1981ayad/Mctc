process.env.NODE_ENV = "production";
await import("dotenv/config");
const { createConnection } = await import("node:net");

const { assertProductionConfig, assertLimitedRuntimeRole } = await import("../src/config/production.js");
const { adminTurnstileConfig } = await import("../src/security/adminTurnstile.js");
const { query, pool } = await import("../src/db/index.js");

function isListeningOnLoopback(port) {
  return new Promise((resolve, reject) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => { socket.destroy(); resolve(true); });
    socket.once("error", (error) => {
      if (error.code === "ECONNREFUSED") resolve(false);
      else reject(error);
    });
    socket.setTimeout(1000, () => { socket.destroy(); reject(new Error(`Cannot check local port ${port}`)); });
  });
}

try {
  assertProductionConfig(process.env);
  adminTurnstileConfig(process.env.ADMIN_HOST || "admin.mctc.ly");
  for (const port of [5173, 5174]) {
    if (await isListeningOnLoopback(port)) throw new Error(`Development server port ${port} is still open`);
  }
  await assertLimitedRuntimeRole(query);
  await query("select 1 from admins limit 1");
  console.log("Production environment, database schema, limited runtime role, and local development ports passed checks");
  console.log("TLS certificates, firewall rules, and public port exposure still require checks on the deployment host");
} finally {
  await pool.end();
}
