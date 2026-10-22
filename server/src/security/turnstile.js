export async function verifyTurnstile(token, ipAddress, { secret = process.env.TURNSTILE_SECRET_KEY, action, hostnames } = {}) {
  const params = new URLSearchParams({
    secret,
    response: token
  });

  if (ipAddress) params.set("remoteip", ipAddress);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: params,
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Turnstile verification returned HTTP ${response.status}`);
    const result = await response.json();
    if (typeof result?.success !== "boolean") throw new Error("Turnstile verification returned an invalid response");
    if (!result.success) return false;
    if (action && result.action !== action) return false;
    if (hostnames?.length && !hostnames.includes(String(result.hostname || "").toLowerCase())) return false;
    return true;
  } catch (cause) {
    const error = new Error("Turnstile verification service unavailable", { cause });
    error.code = "TURNSTILE_UNAVAILABLE";
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function getClientIp(req) {
  return req.ip || req.socket?.remoteAddress || "";
}
