import "dotenv/config";
import bcrypt from "bcryptjs";
import { pathToFileURL } from "url";
import { migrate, query } from "./db/index.js";

const sampleProducts = [
  {
    name: "كاميرا Turret ذكية بإضاءة هجينة 4MP",
    model: "DS-2CD1343G2-LIU",
    category: "Digital Cameras",
    brand: "Hikvision",
    description: "كاميرا شبكية ذكية بصورة فائقة الوضوح وإضاءة هجينة للمشاريع التجارية والسكنية.",
    features: ["دقة 4MP", "ميكروفون مدمج", "كشف الأشخاص"],
    specifications: ["إضاءة هجينة ذكية حتى 30 مترًا", "كشف الأشخاص والمركبات", "ضغط فيديو H.265+"],
    featured: true
  },
  {
    name: "سويتش مُدار PoE بـ 18 منفذًا",
    model: "RG-ES218GC-P",
    category: "Network Switches",
    brand: "Ruijie | Reyee",
    description: "سويتش احترافي لتغذية وربط الكاميرات ونقاط الوصول مع إدارة سحابية.",
    features: ["16 منفذ PoE", "إدارة سحابية", "240W"],
    specifications: ["16 منفذ Gigabit PoE+", "منفذا Uplink", "ميزانية طاقة 240 واط"],
    featured: true
  },
  {
    name: "مسجل شبكي AcuSense ثماني القنوات",
    model: "DS-7608NXI-K2",
    category: "NVR/DVR",
    brand: "Hikvision",
    description: "مسجل شبكي ذكي يرفع كفاءة البحث والتنبيهات.",
    features: ["8 قنوات", "AcuSense", "دقة 12MP"],
    specifications: ["دعم 8 كاميرات IP", "تشغيل حتى دقة 12MP", "مخرج HDMI بدقة 4K"]
  },
  {
    name: "نقطة وصول Wi‑Fi 6 داخلية",
    model: "RG-RAP2260-G",
    category: "Network Access Points",
    brand: "Ruijie | Reyee",
    description: "نقطة وصول سقفية عالية الأداء للمكاتب والفنادق.",
    features: ["Wi‑Fi 6", "سرعة 1.77Gbps", "إدارة Cloud"],
    specifications: ["ثنائية النطاق", "دعم عدد كبير من المستخدمين", "إدارة سحابية"]
  }
];

export async function seed({ includeSamples = false } = {}) {
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const existingAdmin = await query("select id from admins where email = $1", [email]);
  if (!existingAdmin.rowCount) {
    const password = process.env.ADMIN_PASSWORD || "";
    if (password.length < 16) {
      throw new Error("ADMIN_PASSWORD يجب أن تكون 16 حرفًا على الأقل عند إنشاء المدير لأول مرة");
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await query(
      `insert into admins (name, email, password_hash)
       values ($1, $2, $3)
       on conflict (email) do nothing`,
      ["مدير النظام", email, passwordHash]
    );
  }

  if (!includeSamples) return;
  const count = await query("select count(*)::int as total from products");
  if (count.rows[0].total > 0) return;

  for (const product of sampleProducts) {
    await query(
      `insert into products
        (name, model, category, brand, description, features, specifications, featured, status)
       values ($1,$2,$3,$4,$5,$6,$7,$8,'available')`,
      [
        product.name,
        product.model,
        product.category,
        product.brand,
        product.description,
        product.features,
        product.specifications,
        product.featured || false
      ]
    );
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await migrate();
  await seed({ includeSamples: true });
  console.log("Database seeded successfully");
  process.exit(0);
}
