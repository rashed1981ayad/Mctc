export const productsEnglishContent = {
  lang: "en",
  direction: "ltr",
  routes: {
    landing: "/en/products",
    list: "/en/products-list",
    product: (id) => `/en/product/${id}`
  },
  landing: {
    imageAlt: "Technology products",
    kicker: "Almutqaddim digital product library",
    title: "Explore our products",
    description: "A modern digital library that makes it easier to access technical specifications and choose the right product for every project.",
    action: "Browse products"
  },
  featured: {
    title: "Featured products",
    viewAll: "View all",
    loading: "Loading featured products..."
  },
  errors: {
    connection: "Could not connect to the server to load products. Check your internet connection and try again.",
    server: "Products could not be loaded from the server right now. Please try again shortly.",
    retry: "Try again",
    retrying: "Trying again..."
  },
  list: {
    title: "Products",
    pageSummary: ({ currentPage, totalPages, total }) => `Page ${currentPage} of ${totalPages} — ${total} products`,
    searchPlaceholder: "Search by product name or model...",
    allCategories: "All categories",
    allBrands: "All brands",
    loading: "Loading products...",
    empty: "No products match the current search.",
    pagerLabel: "Product pages",
    pageOf: ({ currentPage, totalPages }) => `Page ${currentPage} of ${totalPages}`,
    previous: "‹",
    previousLabel: "Previous page",
    next: "Next page »"
  },
  card: {
    details: "View details",
    addToCart: "Add to cart",
    cartFull: "Cart is full (maximum 12 products)"
  },
  details: {
    loading: "Loading product details...",
    notFoundTitle: "Product not found",
    notFound: "This product may have been removed or is no longer available.",
    errorTitle: "Could not load product",
    loadError: "There was a problem loading the product details. Please try again.",
    retry: "Try again",
    backToProducts: "Back to products",
    model: "Model:",
    brand: "Brand:",
    quantity: "Quantity needed",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    datasheet: (count, index) => `Download datasheet ${count > 1 ? index + 1 : ""} PDF`,
    features: "Features",
    specifications: "Specifications",
    relatedTitle: "Related products",
    relatedSubtitle: "Selected products that may interest you"
  }
};
