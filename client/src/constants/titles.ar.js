const solutionTitles = {
  "access-control": "التحكم بالدخول وإدارة الهوية",
  "audio-visual": "الأنظمة الصوتية والمرئية",
  bms: "أنظمة إدارة المباني BMS",
  cctv: "المراقبة والأمن الذكي",
  "cloud-services": "الخدمات السحابية",
  "cyber-security": "الأمن السيبراني",
  "data-center": "مراكز البيانات",
  "enterprise-projects": "حلول المؤسسات والمشاريع الكبرى",
  "fire-alarm": "أنظمة إنذار وكشف الحريق",
  "managed-it": "خدمات تقنية المعلومات المُدارة",
  "network-infrastructure": "البنية التحتية للشبكات",
  retail: "حلول البيع بالتجزئة",
  "small-office": "حلول المكاتب والشركات الصغيرة"
};

export function getArabicTitle(pathname) {
  if (pathname === "/") return "المتقدم | حلول تقنية المعلومات";
  if (pathname === "/about") return "حول الشركة | المتقدم";
  const slug = pathname.match(/^\/solutions\/([\w-]+)$/)?.[1];
  if (slug) return `${solutionTitles[slug] || "الحلول التقنية"} | المتقدم`;
  if (pathname === "/products") return "مكتبة المنتجات | المتقدم";
  if (pathname === "/products-list") return "قائمة المنتجات | المتقدم";
  if (pathname.startsWith("/product/")) return "تفاصيل المنتج | المتقدم";
  if (pathname === "/contact") return "تواصل معنا | المتقدم";
  if (pathname === "/cart") return "سلة طلب عرض السعر | المتقدم";
  return "المتقدم | حلول تقنية المعلومات";
}
