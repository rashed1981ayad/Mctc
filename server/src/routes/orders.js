import { auditAction, auditedQuery } from "../security/adminAudit.js";
import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { pool } from "../db/index.js";
import { requireAuth, requireCsrf } from "../middleware/auth.js";
import { getClientIp, verifyTurnstile } from "../security/turnstile.js";
import { paginationFromQuery } from "../utils/pagination.js";
import { HttpError } from "../middleware/errorHandler.js";
import { normalizePhone } from "../utils/phone.js";

const router = Router();
const MAX_ITEMS = 12;
const ORDER_STATUSES = new Set(["pending_whatsapp", "confirmed", "archived"]);
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "تم إرسال عدد كبير من الطلبات، حاول مرة أخرى بعد 15 دقيقة" }
});

const labels = {
  ar: { title: "طلب عرض سعر جديد من موقع المتقدم", order: "رقم الطلب", products: "المنتجات", quantity: "العدد", notes: "ملاحظات", name: "الاسم", phone: "الهاتف", email: "البريد الإلكتروني" },
  en: { title: "New quotation request from Almutqaddim website", order: "Request number", products: "Products", quantity: "Quantity", notes: "Notes", name: "Name", phone: "Phone", email: "Email" },
  fr: { title: "Nouvelle demande de devis depuis le site Almutqaddim", order: "Numéro de demande", products: "Produits", quantity: "Quantité", notes: "Remarques", name: "Nom", phone: "Téléphone", email: "E-mail" }
};

function fail(message) {
  throw new HttpError(400, message);
}

function field(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateOrderStatus(status) {
  if (typeof status !== "string" || !ORDER_STATUSES.has(status)) fail("حالة الطلب غير صحيحة");
  return status;
}

export function validateOrderPayload(body = {}) {
  const customer = body.customer || {};
  const name = field(customer.name).replace(/\s+/g, " ");
  const phone = normalizePhone(customer.phone);
  const email = field(customer.email);
  const notes = field(customer.notes);
  const language = field(body.language);
  const turnstileToken = field(body.turnstileToken);
  const requestKey = field(body.requestKey);
  const items = body.items;

  if (name.length < 2 || name.length > 120) fail("الاسم يجب أن يكون بين 2 و120 حرفًا");
  if (!phone) fail("رقم الهاتف غير صحيح؛ أدخل 6 أرقام على الأقل");
  if (email.length > 160 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) fail("البريد الإلكتروني غير صحيح");
  if (notes.length > 500) fail("الملاحظات طويلة جدًا");
  if (!labels[language]) fail("اللغة غير صحيحة");
  if (!turnstileToken || turnstileToken.length > 2048) fail("يرجى إكمال التحقق الأمني");
  if (!/^[\da-f]{8}-[\da-f]{4}-[1-8][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(requestKey)) fail("معرّف الطلب غير صحيح");
  if (!Array.isArray(items) || items.length < 1 || items.length > MAX_ITEMS) fail("يجب اختيار منتج واحد على الأقل وبحد أقصى 12 منتجًا");

  const normalizedItems = items.map((item) => {
    const id = Number(item?.id);
    const quantity = Number(item?.quantity);
    if (!Number.isSafeInteger(id) || id < 1 || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      fail("المنتجات أو الكميات غير صحيحة");
    }
    return { id, quantity };
  });
  if (new Set(normalizedItems.map((item) => item.id)).size !== normalizedItems.length) fail("لا يمكن تكرار المنتج في الطلب");

  return { name, phone, email, notes, language, turnstileToken, requestKey, items: normalizedItems };
}

export function matchesSavedOrder(order, savedItems, request) {
  if (order.customer_name !== request.name || order.phone !== request.phone
    || order.email !== request.email || order.notes !== request.notes
    || order.language !== request.language || savedItems.length !== request.items.length) return false;
  const quantities = new Map(savedItems.map((item) => [Number(item.product_id), Number(item.quantity)]));
  return request.items.every((item) => quantities.get(item.id) === item.quantity);
}

export function buildOrderMessage(order, items) {
  const t = labels[order.language];
  return [
    t.title,
    `${t.order}: ${order.id}`,
    "",
    `${t.products}:`,
    ...items.map((item, index) => `${index + 1}. ${item.model.slice(0, 60)} || ${t.quantity}: ${item.quantity}`),
    ...(order.notes ? ["", `${t.notes}: ${order.notes}`] : []),
    "",
    `${t.name}: ${order.customer_name}`,
    `${t.phone}: ${order.phone}`,
    ...(order.email ? [`${t.email}: ${order.email}`] : [])
  ].join("\n");
}

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const { page, limit, offset } = paginationFromQuery(req.query);
    const status = String(req.query.status || "all");
    if (status !== "all" && !ORDER_STATUSES.has(status)) return res.status(400).json({ message: "فلتر حالة الطلب غير صحيح" });
    const search = String(req.query.q || "").trim().slice(0, 160);
    const phoneDigits = search.replace(/[٠-٩۰-۹]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹".indexOf(digit) % 10)).replace(/\D/g, "");
    const params = search ? [search, phoneDigits] : [];
    const conditions = [];
    if (search) conditions.push(`(o.id::text = $1
        or position(lower($1) in lower(o.phone)) > 0
        or (length($2) > 0 and position($2 in regexp_replace(o.phone, '[^0-9]', '', 'g')) > 0)
        or exists (
          select 1 from order_items oi
          where oi.order_id = o.id
            and (position(lower($1) in lower(oi.product_name)) > 0
              or position(lower($1) in lower(oi.model)) > 0)
        ))`);
    if (status !== "all") {
      params.push(status);
      conditions.push(`o.status = $${params.length}`);
    }
    const whereSql = conditions.length ? `where ${conditions.join(" and ")}` : "";
    const client = await pool.connect();
    try {
      const { rows: orders } = await client.query(
        `select id, customer_name, phone, email, notes, language, status, whatsapp_number, created_at
         from orders o ${whereSql}
         order by created_at desc, id desc
         limit $${params.length + 1} offset $${params.length + 2}`,
        [...params, limit, offset]
      );
      const { rows: countRows } = await client.query(
        `select count(*)::int as total from orders o ${whereSql}`,
        params
      );
      const orderIds = orders.map((order) => order.id);
      const { rows: items } = orderIds.length
        ? await client.query(
          `select id, order_id, product_id, product_name, model, brand, category, quantity
           from order_items
           where order_id = any($1::bigint[])
           order by id`,
          [orderIds]
        )
        : { rows: [] };
      const itemsByOrder = new Map();
      for (const item of items) {
        const group = itemsByOrder.get(item.order_id) || [];
        group.push(item);
        itemsByOrder.set(item.order_id, group);
      }
      const total = countRows[0].total;
      res.json({
        items: orders.map((order) => ({ ...order, items: itemsByOrder.get(order.id) || [] })),
        total,
        page,
        pages: Math.ceil(total / limit)
      });
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", auditAction("order.status.update", "order"), requireAuth, requireCsrf, async (req, res, next) => {
  try {
    if (!/^[1-9]\d{0,18}$/.test(req.params.id) || BigInt(req.params.id) > 9223372036854775807n) {
      return res.status(400).json({ message: "رقم الطلب غير صحيح" });
    }
    const status = validateOrderStatus(req.body?.status);
    const { rows } = await auditedQuery(req, res,
      "update orders set status = $1 where id = $2 returning id, status",
      [status, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ message: "الطلب غير موجود" });
    res.locals.auditStatus = rows[0].status;
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/", orderLimiter, async (req, res, next) => {
  let client;
  try {
    const data = validateOrderPayload(req.body);
    const verified = await verifyTurnstile(data.turnstileToken, getClientIp(req));
    if (!verified) return res.status(400).json({ message: "فشل التحقق الأمني، حدّث الصفحة وحاول مرة أخرى" });

    const whatsappNumber = (process.env.CONTACT_WHATSAPP_NUMBER || "218930001191").replace(/\D/g, "");
    if (whatsappNumber.length < 8 || whatsappNumber.length > 20) throw new Error("رقم WhatsApp غير صالح في إعدادات الخادم");

    client = await pool.connect();
    await client.query("BEGIN");

    let { rows: existingOrders } = await client.query("select * from orders where request_key = $1", [data.requestKey]);
    let order = existingOrders[0];
    let storedItems;

    if (!order) {
      const ids = data.items.map((item) => item.id);
      const { rows: products } = await client.query(
        `select id, name, model, brand, category from products
         where id = any($1::int[]) and status = 'available' for share`,
        [ids]
      );
      if (products.length !== ids.length) fail("أحد المنتجات لم يعد متاحًا، راجع السلة وحاول مرة أخرى");

      const inserted = await client.query(
        `insert into orders (request_key, customer_name, phone, email, notes, language, whatsapp_number)
         values ($1, $2, $3, $4, $5, $6, $7)
         on conflict (request_key) do nothing returning *`,
        [data.requestKey, data.name, data.phone, data.email, data.notes, data.language, whatsappNumber]
      );
      order = inserted.rows[0];

      if (order) {
        const productById = new Map(products.map((product) => [product.id, product]));
        storedItems = [];
        for (const item of data.items) {
          const product = productById.get(item.id);
          const { rows } = await client.query(
            `insert into order_items (order_id, product_id, product_name, model, brand, category, quantity)
             values ($1, $2, $3, $4, $5, $6, $7)
             returning product_name, model, brand, quantity`,
            [order.id, product.id, product.name, product.model, product.brand, product.category, item.quantity]
          );
          storedItems.push(rows[0]);
        }
      } else {
        ({ rows: existingOrders } = await client.query("select * from orders where request_key = $1", [data.requestKey]));
        order = existingOrders[0];
      }
    }

    if (!storedItems) {
      const result = await client.query(
        "select product_id, product_name, model, brand, quantity from order_items where order_id = $1 order by id",
        [order.id]
      );
      storedItems = result.rows;
      if (!matchesSavedOrder(order, storedItems, data)) {
        throw new HttpError(409, "تغيّر محتوى الطلب؛ أعد المحاولة لإنشاء طلب جديد");
      }
    }
    await client.query("COMMIT");

    res.status(201).json({
      orderId: order.id,
      status: order.status,
      whatsappUrl: `https://wa.me/${order.whatsapp_number}?text=${encodeURIComponent(buildOrderMessage(order, storedItems))}`
    });
  } catch (error) {
    if (client) await client.query("ROLLBACK").catch(() => {});
    next(error);
  } finally {
    client?.release();
  }
});

export default router;
