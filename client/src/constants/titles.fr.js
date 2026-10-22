const solutions = {
  "access-control": "Contrôle d’accès et gestion des identités",
  "audio-visual": "Systèmes audiovisuels et de sonorisation",
  bms: "Gestion technique des bâtiments",
  cctv: "Vidéosurveillance et sécurité intelligente",
  "cloud-services": "Services cloud",
  "cyber-security": "Cybersécurité",
  "data-center": "Centres de données",
  "fire-alarm": "Détection et alarme incendie",
  "managed-it": "Services informatiques gérés",
  "network-infrastructure": "Infrastructure réseau",
  "enterprise-projects": "Projets d’entreprise",
  retail: "Commerce de détail",
  "small-office": "Solutions pour petits bureaux"
};

export function getFrenchTitle(pathname) {
  if (pathname === "/fr" || pathname === "/fr/home") return "Almutaqaddim | Solutions informatiques";
  if (pathname === "/fr/about") return "À propos de nous | Almutaqaddim";
  const slug = pathname.match(/^\/fr\/solutions\/([\w-]+)$/)?.[1];
  if (slug) return `${solutions[slug] || "Solutions"} | Almutaqaddim`;
  if (pathname === "/fr/products") return "Catalogue de produits | Almutaqaddim";
  if (pathname === "/fr/products-list") return "Liste des produits | Almutaqaddim";
  if (pathname.startsWith("/fr/product/")) return "Détails du produit | Almutaqaddim";
  if (pathname === "/fr/contact") return "Contactez-nous | Almutaqaddim";
  if (pathname === "/fr/cart") return "Panier de devis | Almutaqaddim";
  return "Almutaqaddim | Solutions informatiques";
}
