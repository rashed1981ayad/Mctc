import { createHash } from "node:crypto";
import { query } from "../db/index.js";

export function loginSubjectHash(scope, value) {
  return createHash("sha256").update(`${scope}\0${value}`).digest("hex");
}

async function retryAfter(dbQuery, scope, subjectHash) {
  const { rows } = await dbQuery(
    `select greatest(1, ceil(extract(epoch from (
       case when $1 = 'ip' then window_started_at + interval '15 minutes'
            else blocked_until end - now()
     )))::int) as seconds
     from auth_login_limits where scope = $1 and subject_hash = $2`,
    [scope, subjectHash]
  );
  return rows[0]?.seconds || 1;
}

export async function consumeIpAttempt(ip, dbQuery = query) {
  const subjectHash = loginSubjectHash("ip", ip || "unknown");
  const { rows } = await dbQuery(
    `insert into auth_login_limits (scope, subject_hash, attempts, window_started_at, updated_at)
     values ('ip', $1, 1, now(), now())
     on conflict (scope, subject_hash) do update set
       attempts = case when auth_login_limits.window_started_at <= now() - interval '15 minutes'
         then 1 else auth_login_limits.attempts + 1 end,
       window_started_at = case when auth_login_limits.window_started_at <= now() - interval '15 minutes'
         then now() else auth_login_limits.window_started_at end,
       blocked_until = null,
       updated_at = now()
     where auth_login_limits.window_started_at <= now() - interval '15 minutes'
        or auth_login_limits.attempts < 10
     returning attempts`,
    [subjectHash]
  );
  return rows.length ? { allowed: true } : { allowed: false, retryAfter: await retryAfter(dbQuery, "ip", subjectHash) };
}

export async function consumeAccountAttempt(email, dbQuery = query) {
  const subjectHash = loginSubjectHash("account", email);
  const { rows } = await dbQuery(
    `insert into auth_login_limits (scope, subject_hash, attempts, window_started_at, blocked_until, updated_at)
     values ('account', $1, 1, now(), null, now())
     on conflict (scope, subject_hash) do update set
       attempts = case when auth_login_limits.window_started_at <= now() - interval '15 minutes'
         then 1 else auth_login_limits.attempts + 1 end,
       window_started_at = case when auth_login_limits.window_started_at <= now() - interval '15 minutes'
         then now() else auth_login_limits.window_started_at end,
       blocked_until = case when auth_login_limits.window_started_at <= now() - interval '15 minutes'
         then null when auth_login_limits.attempts >= 4
         then now() + least(60, power(2, least(6, auth_login_limits.attempts - 3))) * interval '1 second'
         else null end,
       updated_at = now()
     where auth_login_limits.window_started_at <= now() - interval '15 minutes'
        or auth_login_limits.blocked_until is null
        or auth_login_limits.blocked_until <= now()
     returning attempts`,
    [subjectHash]
  );
  return rows.length ? { allowed: true } : { allowed: false, retryAfter: await retryAfter(dbQuery, "account", subjectHash) };
}

export async function clearLoginAttempts(email, ip, dbQuery = query) {
  await dbQuery(
    `delete from auth_login_limits
     where (scope = 'account' and subject_hash = $1)
        or (scope = 'ip' and subject_hash = $2)`,
    [loginSubjectHash("account", email), loginSubjectHash("ip", ip || "unknown")]
  );
}

export async function cleanupLoginAttempts(dbQuery = query) {
  await dbQuery("delete from auth_login_limits where updated_at < now() - interval '1 day'");
}
