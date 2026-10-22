export function productImages(product) {
  if (product?.images?.length) return product.images;
  return product?.image ? [product.image] : [];
}

export function productDatasheets(product) {
  if (product?.datasheetUrls?.length) return product.datasheetUrls;
  return product?.datasheetUrl ? [product.datasheetUrl] : [];
}

export function pickFeaturedProducts(items = []) {
  if (!items.length) return [];
  const [latest, ...rest] = items;
  const randomRest = [...rest].sort(() => Math.random() - 0.5).slice(0, 3);
  return [latest, ...randomRest].slice(0, 4);
}
