import "../src/db/index.js";
import { query } from "../src/db/index.js";

const targetTotalProducts = 100;
const testStartId = 100;

const categories = [
  "NVR/DVR",
  "Analog Cameras",
  "Digital Cameras",
  "Network Routers",
  "Network Switches",
  "Network Access Points",
  "Wireless Bridge",
  "Network Cables",
  "Other Network Components"
];

const brands = [
  "Ruijie | Reyee",
  "EATON fire alarm system",
  "unicable",
  "KNX",
  "DELL technologies",
  "Salto inspired access",
  "Eelectron",
  "Itc",
  "Schrack Seconet",
  "Fortinet",
  "hikvision"
];

const productNamePrefixes = [
  "Advanced",
  "Professional",
  "Enterprise",
  "Smart",
  "Secure",
  "Cloud Managed",
  "Industrial",
  "Compact",
  "High Performance",
  "Outdoor"
];

const productNameByCategory = {
  "NVR/DVR": "Video Recorder",
  "Analog Cameras": "Analog Security Camera",
  "Digital Cameras": "IP Network Camera",
  "Network Routers": "Business Router",
  "Network Switches": "Managed Network Switch",
  "Network Access Points": "Wireless Access Point",
  "Wireless Bridge": "Outdoor Wireless Bridge",
  "Network Cables": "Network Cable",
  "Other Network Components": "Network Component"
};

const baseProductsResult = await query(`
  select *
  from products
  where id < $1
  order by id asc
`, [testStartId]);

const baseProducts = baseProductsResult.rows;

if (!baseProducts.length) {
  throw new Error("لا توجد منتجات أصلية يمكن استخدامها كقوالب للمنتجات التجريبية.");
}

const totalResult = await query("select count(*)::int as count from products where id < $1", [testStartId]);
const originalCount = totalResult.rows[0].count;
const testProductsNeeded = Math.max(0, targetTotalProducts - originalCount);

if (!testProductsNeeded) {
  console.log("قاعدة البيانات تحتوي بالفعل على 100 منتج أو أكثر قبل المنتجات التجريبية.");
  process.exit(0);
}

await query("begin");

try {
  for (let index = 0; index < testProductsNeeded; index += 1) {
    const id = testStartId + index;
    const template = baseProducts[index % baseProducts.length];
    const category = categories[index % categories.length];
    const brand = brands[(index * 3) % brands.length];
    const prefix = productNamePrefixes[index % productNamePrefixes.length];
    const name = `${prefix} ${productNameByCategory[category]} ${String(index + 1).padStart(3, "0")}`;
    const model = `MCTC-TEST-${String(id).padStart(4, "0")}`;
    const description = template.description || "منتج تجريبي مخصص لاختبار عرض المنتجات ونظام الصفحات في موقع المتقدم.";
    const features = template.features?.length ? template.features : ["منتج تجريبي لاختبار الواجهة.", "يدعم عرض البيانات داخل بطاقات المنتجات."];
    const specifications = template.specifications?.length ? template.specifications : ["بيانات تجريبية.", "يستخدم لاختبار قاعدة البيانات والصفحات."];
    const image = template.image || template.images?.[0] || "";
    const images = template.images?.length ? template.images : (image ? [image] : []);
    const datasheetUrl = template.datasheet_url || template.datasheet_urls?.[0] || "";
    const datasheetUrls = template.datasheet_urls?.length ? template.datasheet_urls : (datasheetUrl ? [datasheetUrl] : []);
    const featured = index % 11 === 0;

    await query(
      `insert into products
        (id, name, model, category, brand, description, features, specifications, image, images, datasheet_url, datasheet_urls, featured, status, created_at, updated_at)
       values
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'available', now() - ($14::int * interval '1 minute'), now())
       on conflict (id) do update set
        name = excluded.name,
        model = excluded.model,
        category = excluded.category,
        brand = excluded.brand,
        description = excluded.description,
        features = excluded.features,
        specifications = excluded.specifications,
        image = excluded.image,
        images = excluded.images,
        datasheet_url = excluded.datasheet_url,
        datasheet_urls = excluded.datasheet_urls,
        featured = excluded.featured,
        status = excluded.status,
        updated_at = now()`,
      [
        id,
        name,
        model,
        category,
        brand,
        description,
        features,
        specifications,
        image,
        images,
        datasheetUrl,
        datasheetUrls,
        featured,
        index
      ]
    );
  }

  await query("select setval('products_id_seq', (select max(id) from products), true)");
  await query("commit");

  const summary = await query(`
    select
      count(*)::int as total,
      count(*) filter (where id >= $1)::int as test_total,
      min(id) filter (where id >= $1)::int as test_min_id,
      max(id) filter (where id >= $1)::int as test_max_id
    from products
  `, [testStartId]);

  console.log(JSON.stringify(summary.rows[0], null, 2));
} catch (error) {
  await query("rollback");
  throw error;
}

process.exit(0);
