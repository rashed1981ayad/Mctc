import { auditAction, auditedQuery } from "../security/adminAudit.js";
import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { query } from "../db/index.js";
import { requireAuth, requireCsrf } from "../middleware/auth.js";
import { verifyTurnstile, getClientIp } from "../security/turnstile.js";
import { paginationFromQuery } from "../utils/pagination.js";
import { HttpError } from "../middleware/errorHandler.js";
import { normalizePhone } from "../utils/phone.js";

const router = Router();
router.param("id", (req, res, next, id) => {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id)) || Number(id) > 2147483647) {
    return res.status(400).json({ message: "المعرّف غير صحيح" });
  }
  res.locals.auditTargetId = String(Number(id));
  next();
});
const defaultWhatsappNumber = "218930001191";
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "تم إرسال عدد كبير من الطلبات، حاول مرة أخرى بعد 15 دقيقة"
  }
});
const messageStatusLabels = {
  new: "جديدة",
  read: "تمت القراءة",
  archived: "مؤرشفة"
};

function mapContactMessage(row) {
  if (!row) return null;
  return {
    ...row,
    statusLabel: messageStatusLabels[row.status] || row.status
  };
}

function clean(value, max = 1000) {
  return String(value || "").trim().slice(0, max);
}

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function buildWhatsappMessage(data) {
  return [
    "رسالة تواصل جديدة من موقع المتقدم",
    "",
    data.subject ? `الموضوع: ${data.subject}` : "",
    "",
    "الرسالة:",
    data.message,
    "",
    `الاسم: ${data.name}`,
    `الهاتف: ${data.phone}`,
    data.email ? `البريد الإلكتروني: ${data.email}` : ""
  ].filter(Boolean).join("\n");
}

export function validateContactPayload(body = {}) {
  const data = {
    name: text(body.name),
    phone: normalizePhone(body.phone),
    email: text(body.email),
    subject: text(body.subject),
    message: text(body.message),
    turnstileToken: text(body.turnstileToken)
  };
  const errors = [];

  if (data.name.length < 2) errors.push("الاسم يجب أن يكون حرفين على الأقل");
  if (data.name.length > 120) errors.push("الاسم طويل جدًا");

  if (!data.phone) errors.push("رقم الهاتف غير صحيح؛ أدخل 6 أرقام على الأقل");

  if (data.email.length > 160) errors.push("البريد الإلكتروني طويل جدًا");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("البريد الإلكتروني غير صحيح");

  if (data.subject.length > 180) errors.push("عنوان الرسالة طويل جدًا");

  if (data.message.length < 15) errors.push("الرسالة يجب أن تكون 15 حرفًا على الأقل");
  if (data.message.length > 2500) errors.push("الرسالة طويلة جدًا، الحد الأقصى 2500 حرف");

  if (!data.turnstileToken) errors.push("يرجى إكمال التحقق الأمني");
  if (data.turnstileToken.length > 2048) errors.push("رمز التحقق الأمني غير صحيح");

  if (errors.length) {
    throw new HttpError(400, `البيانات غير صحيحة: ${errors.join("، ")}`);
  }

  return data;
}

router.get("/messages", requireAuth, async (req, res, next) => {
  try {
    const { page, limit, offset } = paginationFromQuery(req.query);
    const search = String(req.query.q || "").trim().slice(0, 160);
    const phoneDigits = search.replace(/[٠-٩۰-۹]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹".indexOf(digit) % 10)).replace(/\D/g, "");
    const status = String(req.query.status || "all");
    if (!["all", "active", "archived"].includes(status)) {
      return res.status(400).json({ message: "فلتر الرسائل غير صحيح" });
    }

    const where = [];
    const params = [];
    if (status === "active") where.push("status <> 'archived'");
    if (status === "archived") where.push("status = 'archived'");
    if (search) {
      params.push(search, phoneDigits);
      where.push(`(position(lower($1) in lower(name)) > 0
        or position(lower($1) in lower(email)) > 0
        or position(lower($1) in lower(phone)) > 0
        or (length($2) > 0 and position($2 in regexp_replace(phone, '[^0-9]', '', 'g')) > 0))`);
    }
    const whereSql = where.length ? `where ${where.join(" and ")}` : "";
    const [messages, count] = await Promise.all([
      query(
      `select id, name, phone, email, subject, message, status, whatsapp_number, created_at, updated_at
       from contact_messages ${whereSql}
       order by created_at desc, id desc
       limit $${params.length + 1} offset $${params.length + 2}`,
        [...params, limit, offset]
      ),
      query(`select count(*)::int as total from contact_messages ${whereSql}`, params)
    ]);

    const total = count.rows[0].total;
    res.json({ items: messages.rows.map(mapContactMessage), total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
});

router.get("/messages/:id", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await query(
      `select id, name, phone, email, subject, message, status, whatsapp_number, created_at, updated_at
       from contact_messages
       where id = $1`,
      [req.params.id]
    );

    const item = mapContactMessage(rows[0]);
    if (!item) return res.status(404).json({ message: "الرسالة غير موجودة" });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.patch("/messages/bulk-status", auditAction("message.bulk_status.update", "contact_message"), requireAuth, requireCsrf, async (req, res, next) => {
  try {
    const ids = Array.isArray(req.body.ids) ? req.body.ids.map(Number).filter(Number.isFinite) : [];
    const status = String(req.body.status || "").trim();

    if (!ids.length || ids.length > 1000) return res.status(400).json({ message: "حدد من 1 إلى 1000 رسالة" });
    if (!messageStatusLabels[status]) return res.status(400).json({ message: "حالة الرسالة غير صحيحة" });

    const { rowCount } = await auditedQuery(req, res,
      `update contact_messages
       set status = $1, updated_at = now()
       where id = any($2::int[])`,
      [status, ids], { bulk: true, details: { ids, status } }
    );

    res.locals.auditStatus = status;
    res.locals.auditCount = rowCount;
    res.locals.auditRequestedIds = ids;
    res.json({ message: "تم تحديث حالة الرسائل", count: rowCount });
  } catch (error) {
    next(error);
  }
});

router.post("/messages/bulk-delete", auditAction("message.bulk_delete", "contact_message"), requireAuth, requireCsrf, async (req, res, next) => {
  try {
    const ids = Array.isArray(req.body.ids) ? req.body.ids.map(Number).filter(Number.isFinite) : [];

    if (!ids.length || ids.length > 1000) return res.status(400).json({ message: "حدد من 1 إلى 1000 رسالة" });

    const { rowCount } = await auditedQuery(req, res,"delete from contact_messages where id = any($1::int[])", [ids], { bulk: true, details: { ids } });
    res.locals.auditCount = rowCount;
    res.locals.auditRequestedIds = ids;
    res.json({ message: "تم حذف الرسائل", count: rowCount });
  } catch (error) {
    next(error);
  }
});

router.patch("/messages/:id/status", auditAction("message.status.update", "contact_message"), requireAuth, requireCsrf, async (req, res, next) => {
  try {
    const status = String(req.body.status || "").trim();

    if (!messageStatusLabels[status]) {
      return res.status(400).json({ message: "حالة الرسالة غير صحيحة" });
    }

    const { rows } = await auditedQuery(req, res,
      `update contact_messages
       set status = $1, updated_at = now()
       where id = $2
       returning id, name, phone, email, subject, message, status, whatsapp_number, created_at, updated_at`,
      [status, req.params.id]
    );

    if (!rows[0]) return res.status(404).json({ message: "الرسالة غير موجودة" });
    res.locals.auditStatus = rows[0].status;
    res.json(mapContactMessage(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.delete("/messages/:id", auditAction("message.delete", "contact_message"), requireAuth, requireCsrf, async (req, res, next) => {
  try {
    const { rows } = await auditedQuery(req, res,"delete from contact_messages where id = $1 returning id", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: "الرسالة غير موجودة" });
    res.json({ message: "تم حذف الرسالة" });
  } catch (error) {
    next(error);
  }
});

router.post("/", contactLimiter, async (req, res, next) => {
  try {
    const whatsappNumber = clean(process.env.CONTACT_WHATSAPP_NUMBER || defaultWhatsappNumber, 30).replace(/\D/g, "");
    const data = validateContactPayload(req.body);
    const ipAddress = getClientIp(req);
    const turnstilePassed = await verifyTurnstile(data.turnstileToken, ipAddress);

    if (!turnstilePassed) {
      return res.status(400).json({ message: "فشل التحقق الأمني، حدّث الصفحة وحاول مرة أخرى" });
    }

    const text = encodeURIComponent(buildWhatsappMessage(data));
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    const { rows } = await query(
      `insert into contact_messages
        (name, phone, email, subject, message, whatsapp_number)
       values ($1,$2,$3,$4,$5,$6)
       returning id, name, phone, email, subject, message, status, whatsapp_number, created_at, updated_at`,
      [data.name, data.phone, data.email, data.subject, data.message, whatsappNumber]
    );

    res.status(201).json({
      message: "تم حفظ الرسالة وسيتم فتح واتساب لإرسالها",
      saved: true,
      item: rows[0],
      whatsappUrl
    });
  } catch (error) {
    next(error);
  }
});

export default router;
