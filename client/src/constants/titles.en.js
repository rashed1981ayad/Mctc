const solutionTitles = {
  "access-control": "Access Control & Identity Management",
  "audio-visual": "Audio-Visual & Public Communication Systems",
  bms: "Building Management Systems (BMS)",
  cctv: "CCTV & Intelligent Security Systems",
  "cloud-services": "Cloud Services",
  "cyber-security": "Cybersecurity",
  "data-center": "Data Center Solutions",
  "enterprise-projects": "Enterprise Projects",
  "fire-alarm": "Fire Alarm & Detection Systems",
  "managed-it": "Managed IT Services",
  "network-infrastructure": "Network Infrastructure Solutions",
  retail: "Retail Solutions",
  "small-office": "Small Office & Business Solutions"
};

export function getEnglishTitle(pathname) {
  if (pathname === "/en" || pathname === "/en/home") return "MCTC Almutaqaddim | IT Solutions";
  if (pathname === "/en/about") return "About Us | MCTC Almutaqaddim";
  const slug = pathname.match(/^\/en\/solutions\/([\w-]+)$/)?.[1];
  if (slug && solutionTitles[slug]) return `${solutionTitles[slug]} | Almutaqaddim`;
  if (pathname === "/en/products") return "Product Library | Almutaqaddim";
  if (pathname === "/en/products-list") return "Product List | Almutaqaddim";
  if (pathname.startsWith("/en/product/")) return "Product Details | Almutaqaddim";
  if (pathname === "/en/contact") return "Contact Us | Almutaqaddim";
  if (pathname === "/en/cart") return "Quotation Cart | Almutaqaddim";
  return "Almutaqaddim | IT Solutions";
}
