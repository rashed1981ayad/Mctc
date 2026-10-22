import { randomUUID } from "node:crypto";
import { query, pool } from "../db/index.js";
import { loginSubjectHash } from "./loginThrottle.js";

export function auditAction(action, targetType) {
  return (req, res, next) => {
    res.locals.auditTarget = { action, targetType };
    next();
  };
}

// The same connection commits both the mutation and its audit event.
export async function auditTransaction(req, res, change, status = 200) {
  const client = await pool.connect();
  try {
    await client.query("begin");
    const result = await change(client.query.bind(client));
    if (result !== false) {
      const event = auditEventFor(req, res, res.locals.auditTarget);
      event.httpStatus = status;
      event.outcome = "success";
      await writeAuditEvent(event, client.query.bind(client));
    }
    await client.query("commit");
    res.locals.auditCommitted = result !== false;
    return result;
  } catch (error) {
    await client.query("rollback").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

export async function auditedQuery(req, res, sql, params, { status = 200, bulk = false, details = {} } = {}) {
  let result;
  await auditTransaction(req, res, async (dbQuery) => {
    result = await dbQuery(sql, params);
    if (!bulk && !result.rows[0]) return false;
    if (!bulk) res.locals.auditTargetId = result.rows[0].id ?? req.admin?.id;
    if (result.rows[0]?.status) res.locals.auditStatus = result.rows[0].status;
    if (bulk) {
      res.locals.auditCount = result.rowCount;
      res.locals.auditRequestedIds = details.ids;
      res.locals.auditStatus = details.status;
    }
  }, status);
  return result;
}

function safeIp(req) {
  const ip = String(req.ip || req.socket?.remoteAddress || "");
  return ip.length <= 64 && /^[0-9a-fA-F:.]+$/.test(ip) ? ip : null;
}

export function auditEventFor(req, res, target) {
  const email = target.action === "auth.login" && typeof req.body?.email === "string"
    ? req.body.email.toLowerCase().trim().slice(0, 254) : "";
  const actorId = target.action === "auth.login"
    ? res.locals.auditActorId : res.locals.auditActorId ?? req.admin?.id;
  const targetId = res.locals.auditTargetId ?? target.targetId;
  const details = {};
  if (res.statusCode < 400 && typeof res.locals.auditStatus === "string") details.status = res.locals.auditStatus;
  if (res.statusCode < 400 && Number.isSafeInteger(res.locals.auditCount)) details.affected_count = res.locals.auditCount;
  if (res.statusCode < 400 && Array.isArray(res.locals.auditRequestedIds)) {
    details.requested_ids = res.locals.auditRequestedIds;
  }
  return {
    requestId: req.requestId || randomUUID(),
    action: target.action,
    outcome: res.statusCode === 429 ? "blocked" : res.statusCode < 400 ? "success" : "failure",
    actorAdminId: Number.isSafeInteger(actorId) ? actorId : null,
    subjectHash: email ? loginSubjectHash("account", email) : null,
    targetType: target.targetType,
    targetId: targetId == null ? null : String(targetId).slice(0, 64),
    ipAddress: safeIp(req),
    httpStatus: res.statusCode,
    details
  };
}

export async function writeAuditEvent(event, dbQuery = query) {
  await dbQuery(
    `insert into admin_audit_events
      (request_id, action, outcome, actor_admin_id, subject_hash, target_type, target_id, ip_address, http_status, details)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)`,
    [event.requestId, event.action, event.outcome, event.actorAdminId, event.subjectHash,
      event.targetType, event.targetId, event.ipAddress, event.httpStatus, JSON.stringify(event.details)]
  );
}

export function createAdminAuditMiddleware(record = writeAuditEvent) {
  return (req, res, next) => {
    res.once("finish", () => {
        const target = res.locals.auditTarget;
        if (!target || res.locals.auditCommitted) return;
        if (target.action !== "auth.login" && !req.admin?.id && !res.locals.auditActorId) return;
        Promise.resolve().then(() => record(auditEventFor(req, res, target))).catch((error) => {
          console.error(JSON.stringify({ event: "admin_audit_write_failed", requestId: req.requestId, message: error.message }));
        });
    });
    next();
  };
}

export const adminAuditMiddleware = createAdminAuditMiddleware();
