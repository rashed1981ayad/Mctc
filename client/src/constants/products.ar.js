export const productsArabicContent = {
  lang: "ar",
  direction: "rtl",
  routes: {
    landing: "/products",
    list: "/products-list",
    product: (id) => `/product/${id}`
  },
  landing: {
    imageAlt: "منتجات تقنية",
    kicker: "مكتبة منتجات المتقدم الرقمية",
    title: "اكتشف منتجاتنا",
    description: "مكتبة رقمية حديثة تسهّل الوصول للمواصفات الفنية، وتساعدك في اختيار المنتج المناسب لكل مشروع.",
    action: "استعراض المنتجات"
  },
  featured: {
    title: "منتجات مميزة",
    viewAll: "عرض الكل",
    loading: "جاري تحميل المنتجات المميزة..."
  },
  errors: {
    connection: "تعذر الاتصال بالخادم لتحميل المنتجات. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
    server: "تعذر تحميل المنتجات من الخادم حاليًا. حاول مرة أخرى بعد قليل.",
    retry: "إعادة المحاولة",
    retrying: "جاري إعادة المحاولة..."
  },
  list: {
    title: "المنتجات",
    pageSummary: ({ currentPage, totalPages, total }) => `الصفحة ${currentPage} من ${totalPages} — ${total} منتج`,
    searchPlaceholder: "ابحث باسم المنتج أو الموديل...",
    allCategories: "كل الأقسام",
    allBrands: "كل العلامات",
    loading: "جاري تحميل المنتجات...",
    empty: "لا توجد منتجات مطابقة للبحث الحالي.",
    pagerLabel: "صفحات المنتجات",
    pageOf: ({ currentPage, totalPages }) => `الصفحة ${currentPage} من ${totalPages}`,
    previous: "‹",
    previousLabel: "الصفحة السابقة",
    next: "الصفحة التالية »"
  },
  card: {
    details: "عرض التفاصيل",
    addToCart: "أضف إلى السلة",
    cartFull: "السلة ممتلئة (12 منتجًا كحد أقصى)"
  },
  details: {
    loading: "جاري تحميل تفاصيل المنتج...",
    notFoundTitle: "المنتج غير موجود",
    notFound: "قد يكون هذا المنتج محذوفًا أو لم يعد متاحًا.",
    errorTitle: "تعذر تحميل المنتج",
    loadError: "حدثت مشكلة أثناء تحميل تفاصيل المنتج. يرجى المحاولة مرة أخرى.",
    retry: "إعادة المحاولة",
    backToProducts: "العودة إلى المنتجات",
    model: "الموديل:",
    brand: "العلامة:",
    quantity: "الكمية المطلوبة",
    decreaseQuantity: "تقليل الكمية",
    increaseQuantity: "زيادة الكمية",
    datasheet: (count, index) => `تحميل الداتا شيت ${count > 1 ? index + 1 : ""} PDF`,
    features: "المميزات",
    specifications: "المواصفات",
    relatedTitle: "منتجات قد تهمك",
    relatedSubtitle: "اختيارات مرتبطة بهذا المنتج"
  }
};
