import { Router } from "express";
import { query } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Only operational data is browsable. Never send password or session hashes to a browser.
const TABLES = {
  admins: "id, name, email, created_at, updated_at",
  admin_audit_events: "id, occurred_at, request_id, action, outcome, actor_admin_id, subject_hash, target_type, target_id, ip_address, http_status, details",
  products: "id, name, model, category, brand, description, features, specifications, image, images, datasheet_url, datasheet_urls, featured, status, created_at, updated_at",
  contact_messages: "id, name, phone, email, subject, message, status, whatsapp_number, created_at, updated_at",
  orders: "id, customer_name, phone, email, notes, language, status, whatsapp_number, created_at",
  order_items: "id, order_id, product_id, product_name, model, brand, category, quantity"
};

function pagination(req) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) return null;
  return { page, limit };
}

async function readTable(table, { page, limit }) {
  const offset = (page - 1) * limit;
  const [countResult, rowsResult] = await Promise.all([
    query(`select count(*)::int as total from ${table}`),
    query(`select ${TABLES[table]} from ${table} order by id desc limit $1 offset $2`, [limit, offset])
  ]);
  const total = countResult.rows[0].total;
  const pages = Math.ceil(total / limit);
  return {
    total,
    page,
    pages,
    limit,
    rows: rowsResult.rows,
    previous: page > 1 ? `/api/database/${table}?page=${page - 1}&limit=${limit}` : null,
    next: page < pages ? `/api/database/${table}?page=${page + 1}&limit=${limit}` : null
  };
}

router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const paging = pagination(req);
    if (!paging) return res.status(400).json({ message: "رقم الصفحة أو حجمها غير صحيح" });
    const entries = await Promise.all(Object.keys(TABLES).map(async (name) => [name, {
      url: `/api/database/${name}`,
      ...await readTable(name, paging)
    }]));
    res.json({ database: "almutqaddim", tables: Object.fromEntries(entries) });
  } catch (error) {
    next(error);
  }
});

router.get("/:table", async (req, res, next) => {
  try {
    const { table } = req.params;
    if (!Object.hasOwn(TABLES, table)) return res.status(404).json({ message: "الجدول غير متاح" });
    const paging = pagination(req);
    if (!paging) return res.status(400).json({ message: "رقم الصفحة أو حجمها غير صحيح" });
    res.json({ table, ...await readTable(table, paging) });
  } catch (error) {
    next(error);
  }
});

export default router;
