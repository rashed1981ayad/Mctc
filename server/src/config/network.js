import { isIP } from "node:net";

export function networkConfig(env = process.env) {
  const bindHost = String(env.BIND_HOST || "127.0.0.1").trim();
  const port = Number(env.PORT || 5000);
  const extraTrustedProxies = String(env.TRUSTED_PROXY_IPS || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!isIP(bindHost)) throw new Error("BIND_HOST must be an IP address");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be an integer from 1 to 65535");
  if (extraTrustedProxies.some((address) => !isIP(address))) {
    throw new Error("TRUSTED_PROXY_IPS must contain only explicit IP addresses");
  }

  return { bindHost, port, trustedProxies: ["loopback", ...extraTrustedProxies] };
}
