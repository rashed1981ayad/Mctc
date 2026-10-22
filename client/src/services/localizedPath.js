export function getLocalizedPath(pathname, search, language) {
  const prefix = language === "ar" ? "" : `/${language}`;
  const homePaths = ["/", "/en", "/en/home", "/fr", "/fr/home"];
  if (homePaths.includes(pathname)) return prefix || "/";

  for (const page of ["contact", "products", "products-list", "cart"]) {
    if ([`/${page}`, `/en/${page}`, `/fr/${page}`].includes(pathname)) {
      return `${prefix}/${page}${page === "products-list" ? search || "" : ""}`;
    }
  }

  const product = pathname.match(/^\/(?:en\/|fr\/)?product\/([^/]+)$/);
  if (product) return `${prefix}/product/${product[1]}`;
  if (["/about", "/en/about", "/fr/about"].includes(pathname)) return `${prefix}/about`;
  const solution = pathname.match(/^\/(?:en\/|fr\/)?solutions\/([\w-]+)$/);
  if (solution) return `${prefix}/solutions/${solution[1]}`;
  return prefix || "/";
}
