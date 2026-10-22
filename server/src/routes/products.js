import { auditAction, auditedQuery } from "../security/adminAudit.js";
import { Router } from "express";
import { query, mapProduct } from "../db/index.js";
import { requireAuth, requireCsrf } from "../middleware/auth.js";
import { productFiles, removeUploadedFiles } from "../security/uploads.js";
import { HttpError } from "../middleware/errorHandler.js";
import { limitAdminUploads } from "../security/uploadLimit.js";
import { deleteUnreferencedFiles, productFileUrls } from "../security/uploadStorage.js";
import { requireAdminTurnstile } from "../security/adminTurnstile.js";

const router = Router();
router.param("id", (req, res, next, id) => {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id)) || Number(id) > 2147483647) {
    return res.status(400).json({ message: "المعرّف غير صحيح" });
  }
  res.locals.auditTargetId = String(Number(id));
  next();
});

function mapProductSummary(row) {
  if (!row) return null;
  const description = row.description || "";
  return {
    id: row.id,
    name: row.name,
    model: row.model,
    category: row.category,
    brand: row.brand,
    description: description.length > 160 ? `${description.slice(0, 160)}…` : description,
    image: row.image || row.images?.[0] || ""
  };
}

function toList(value) {
  if (value == null) return [];
  return (Array.isArray(value) ? value : [value]).map((item) => {
    if (typeof item !== "string") throw new HttpError(400, "أرسل كل رابط في حقل مستقل");
    const link = item.trim();
    if (!link) return "";
    try {
      // Each repeated FormData field or array item is one complete URL.
      // Preserve commas, query strings and encoded characters exactly as supplied.
      if (/[\s\u0000-\u001f\u007f\\]/u.test(link)) throw new Error();
      const local = link.startsWith("/") && !link.startsWith("//");
      if (!local && !/^https?:\/\//i.test(link)) throw new Error();
      const url = local ? new URL(link, "https://local.invalid") : new URL(link);
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname || url.username || url.password) throw new Error();
    } catch {
      throw new HttpError(400, "رابط غير صالح؛ استخدم رابط HTTP أو HTTPS أو مسارًا محليًا، وضع كل رابط في حقل مستقل");
    }
    return link;
  }).filter(Boolean);
}

function toLines(value) {
  return (Array.isArray(value) ? value : [value]).flatMap((item) => String(item || "").split(/\r?\n/))
    .map((item) => item.trim()).filter(Boolean);
}

export function normalize(body = {}, files = {}) {
  const imageFiles = [...(files.imageFiles || []), ...(files.imageFile || [])];
  const datasheetFile = files.datasheetFile?.[0];
  const existingImages = toList(body.images ?? body.image);
  const linkedDatasheets = toList(body.datasheetUrls || body.datasheetUrl || body.datasheet_url);

  const data = {
    name: String(body.name || "").trim(),
    model: String(body.model || "").trim().toUpperCase(),
    category: String(body.category || "").trim(),
    brand: String(body.brand || "").trim(),
    description: String(body.description || "").trim(),
    features: toLines(body.features),
    specifications: toLines(body.specifications),
    datasheetUrls: linkedDatasheets,
    featured: String(body.featured) === "true" || body.featured === true,
    status: body.status || "available"
  };

  const uploadedImages = imageFiles.map((file) => `/uploads/${file.filename}`);
  data.images = [...existingImages, ...uploadedImages].filter(Boolean);
  data.image = data.images[0] || "";

  if (datasheetFile) data.datasheetUrls = [`/uploads/${datasheetFile.filename}`];
  data.datasheetUrls = [...new Set(data.datasheetUrls.filter(Boolean))];
  data.datasheetUrl = data.datasheetUrls[0] || "";

  return data;
}

export function shouldPreserveExistingImages(body = {}, images) {
  return images.length === 0 && !Object.hasOwn(body, "images") && !Object.hasOwn(body, "image");
}

function validateProduct(data) {
  const required = ["name", "model", "category", "brand", "datasheetUrl"];
  const missing = required.filter((key) => !data[key]);
  const labels = {
    name: "اسم المنتج",
    model: "رقم الموديل",
    category: "القسم",
    brand: "العلامة التجارية",
    description: "الوصف",
    datasheetUrl: "ملف PDF الخاص بالداتا شيت"
  };
  if (missing.length) throw new HttpError(400, `حقول ناقصة: ${missing.map((key) => labels[key] || key).join(", ")}`);
}

router.get("/meta/options", async (req, res, next) => {
  try {
    const includeDrafts = req.query.status === "all" && Boolean(req.adminSession);
    const publishedOnly = includeDrafts ? "" : "where status <> 'draft'";
    const [categories, brands] = await Promise.all([
      query(`select distinct category from products ${publishedOnly} order by category asc`),
      query(`select distinct brand from products ${publishedOnly} order by brand asc`)
    ]);
    if (includeDrafts) res.set("Cache-Control", "private, no-store");
    res.json({
      categories: categories.rows.map((row) => row.category),
      brands: brands.rows.map((row) => row.brand)
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const {
      q = "",
      category = "",
      brand = "",
      status = "available",
      featured = "",
      summary = "",
      random = "",
      page = 1,
      limit = 24
    } = req.query;

    if (status === "all" && !req.adminSession) {
      return res.status(401).json({ message: "يلزم تسجيل الدخول" });
    }
    if (status === "all") res.set("Cache-Control", "private, no-store");
    if (status !== "all" && status !== "available") {
      return res.status(400).json({ message: "حالة المنتجات غير صحيحة" });
    }

    const where = [];
    const params = [];
    const add = (sql, value) => {
      params.push(value);
      where.push(sql.replace("?", `$${params.length}`));
    };

    if (status !== "all") add("status = ?", status);
    if (category) add("category = ?", category);
    if (brand) add("brand = ?", brand);
    if (featured === "true") where.push("featured = true");
    if (q) {
      params.push(`%${q}%`);
      const key = `$${params.length}`;
      where.push(`(name ilike ${key} or model ilike ${key} or brand ilike ${key} or category ilike ${key})`);
    }

    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 24));
    const safePage = Math.max(1, Number(page) || 1);
    const offset = (safePage - 1) * safeLimit;
    const whereSql = where.length ? `where ${where.join(" and ")}` : "";
    const isSummary = summary === "true";
    const selectColumns = isSummary
      ? "id, name, model, category, brand, description, image, images"
      : "*";

    if (featured === "true" && random === "true") {
      const latest = await query(
        `select ${selectColumns} from products ${whereSql} order by created_at desc limit 1`,
        params
      );
      const latestId = latest.rows[0]?.id || 0;
      const restParams = [...params, latestId, Math.max(0, safeLimit - 1)];
      const rest = await query(
        `select ${selectColumns}
         from products ${whereSql}${whereSql ? " and" : " where"} id <> $${params.length + 1}
         order by random()
         limit $${params.length + 2}`,
        restParams
      );
      const total = await query(`select count(*)::int as total from products ${whereSql}`, params);

      return res.json({
        items: [...latest.rows, ...rest.rows].map(isSummary ? mapProductSummary : mapProduct),
        total: total.rows[0].total,
        page: 1,
        pages: 1
      });
    }

    const [items, total] = await Promise.all([
      query(
        `select ${selectColumns} from products ${whereSql} order by featured desc, created_at desc limit $${params.length + 1} offset $${params.length + 2}`,
        [...params, safeLimit, offset]
      ),
      query(`select count(*)::int as total from products ${whereSql}`, params)
    ]);

    res.json({
      items: items.rows.map(isSummary ? mapProductSummary : mapProduct),
      total: total.rows[0].total,
      page: safePage,
      pages: Math.ceil(total.rows[0].total / safeLimit)
    });
  } catch (error) {
    next(error);
  }
});

router.get("/cart/items", async (req, res, next) => {
  try {
    const ids = String(req.query.ids || "").split(",").filter(Boolean).map(Number);
    if (!ids.length || ids.length > 12 || ids.some((id) => !Number.isSafeInteger(id) || id < 1)) {
      return res.status(400).json({ message: "معرّفات المنتجات غير صحيحة" });
    }
    const { rows } = await query(
      `select id, name, model, brand, category, description, image, images
       from products where id = any($1::int[]) and status = 'available'`,
      [ids]
    );
    res.json({ items: rows.map(mapProductSummary) });
  } catch (error) {
    next(error);
  }
});

router.get("/cart/recommendations", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `select id, name, model, brand, category, description, image, images
       from products where status = 'available'
       order by random() limit 8`
    );
    res.json({ items: rows.map(mapProductSummary) });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await query("select * from products where id = $1", [req.params.id]);
    const product = mapProduct(rows[0]);
    if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
    if (product.status !== "available" && !req.adminSession) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }
    if (product.status !== "available") res.set("Cache-Control", "private, no-store");

    const sameCategory = await query(
      `select id, name, model, category, brand, description, image, images
       from products
       where id <> $1 and status = 'available' and category = $2
       order by random()
       limit 2`,
      [product.id, product.category]
    );

    const excludedIds = [product.id, ...sameCategory.rows.map((item) => item.id)];
    const randomProducts = await query(
      `select id, name, model, category, brand, description, image, images
       from products
       where status = 'available' and not (id = any($1::int[]))
       order by random()
       limit 2`,
      [excludedIds]
    );

    const relatedProducts = [...sameCategory.rows, ...randomProducts.rows].map(mapProductSummary);

    res.json({ ...product, relatedProducts });
  } catch (error) {
    next(error);
  }
});

router.post("/", auditAction("product.create", "product"), requireAuth, requireCsrf, requireAdminTurnstile("product_create", (req) => req.get("X-Turnstile-Token")), limitAdminUploads, productFiles, async (req, res, next) => {
  try {
    const data = normalize(req.body, req.files);
    validateProduct(data);

    const { rows } = await auditedQuery(req, res,
      `insert into products
        (name, model, category, brand, description, features, specifications, image, images, datasheet_url, datasheet_urls, featured, status)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       returning *`,
      [
        data.name,
        data.model,
        data.category,
        data.brand,
        data.description,
        data.features,
        data.specifications,
        data.image,
        data.images,
        data.datasheetUrl,
        data.datasheetUrls,
        data.featured,
        data.status
      ], { status: 201 }
    );

    res.locals.auditTargetId = rows[0].id;
    res.status(201).json(mapProduct(rows[0]));
  } catch (error) {
    await removeUploadedFiles(req.files).catch(console.error);
    next(error);
  }
});

router.put("/:id", auditAction("product.update", "product"), requireAuth, requireCsrf, requireAdminTurnstile("product_edit", (req) => req.get("X-Turnstile-Token")), limitAdminUploads, productFiles, async (req, res, next) => {
  try {
    const revision = Number(req.body?.revision);
    if (!Number.isSafeInteger(revision) || revision < 1) throw new HttpError(400, "نسخة المنتج غير صحيحة؛ حدّث الصفحة وحاول مجددًا");
    const data = normalize(req.body, req.files);
    const preserveImages = shouldPreserveExistingImages(req.body, data.images);

    const existing = await query("select image, images, datasheet_url, datasheet_urls, revision from products where id = $1", [req.params.id]);
    if (!existing.rows[0]) {
      await removeUploadedFiles(req.files).catch(console.error);
      return res.status(404).json({ message: "المنتج غير موجود" });
    }
    if (existing.rows[0].revision !== revision) throw new HttpError(409, "حُفظ تعديل أحدث لهذا المنتج. انسخ تغييراتك ثم حدّث الصفحة قبل إعادة الحفظ");
    if (preserveImages || !data.datasheetUrls.length) {
      const existingImages = existing.rows[0].images?.length ? existing.rows[0].images : (existing.rows[0].image ? [existing.rows[0].image] : []);
      const existingDatasheets = existing.rows[0].datasheet_urls?.length ? existing.rows[0].datasheet_urls : (existing.rows[0].datasheet_url ? [existing.rows[0].datasheet_url] : []);
      if (preserveImages) {
        data.images = existingImages;
        data.image = data.images[0] || "";
      }
      if (!data.datasheetUrls.length) {
        data.datasheetUrls = existingDatasheets;
        data.datasheetUrl = data.datasheetUrls[0] || "";
      }
    }

    validateProduct(data);

    const { rows } = await auditedQuery(req, res,
      `update products set
        name = $1,
        model = $2,
        category = $3,
        brand = $4,
        description = $5,
        features = $6,
        specifications = $7,
        image = $8,
        images = $9,
        datasheet_url = $10,
        datasheet_urls = $11,
        featured = $12,
        status = $13,
        revision = revision + 1,
        updated_at = now()
       where id = $14 and revision = $15
       returning *`,
      [
        data.name,
        data.model,
        data.category,
        data.brand,
        data.description,
        data.features,
        data.specifications,
        data.image,
        data.images,
        data.datasheetUrl,
        data.datasheetUrls,
        data.featured,
        data.status,
        req.params.id,
        revision
      ]
    );

    if (!rows[0]) {
      await removeUploadedFiles(req.files).catch(console.error);
      const current = await query("select 1 from products where id = $1", [req.params.id]);
      return res.status(current.rows[0] ? 409 : 404).json({ message: current.rows[0]
        ? "حُفظ تعديل أحدث لهذا المنتج. انسخ تغييراتك ثم حدّث الصفحة قبل إعادة الحفظ"
        : "المنتج غير موجود" });
    }
    const retained = new Set(productFileUrls(rows[0]));
    await deleteUnreferencedFiles(productFileUrls(existing.rows[0]).filter((url) => !retained.has(url))).catch(console.error);
    res.json(mapProduct(rows[0]));
  } catch (error) {
    await removeUploadedFiles(req.files).catch(console.error);
    next(error);
  }
});

router.delete("/:id", auditAction("product.delete", "product"), requireAuth, requireCsrf, async (req, res, next) => {
  try {
    const { rows } = await auditedQuery(req, res,"delete from products where id = $1 returning id, image, images, datasheet_url, datasheet_urls", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: "المنتج غير موجود" });
    await deleteUnreferencedFiles(productFileUrls(rows[0])).catch(console.error);
    res.json({ message: "تم حذف المنتج" });
  } catch (error) {
    next(error);
  }
});

export default router;
