import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop.jsx";
import SolutionRoute from "../pages/solutions/SolutionRoute.jsx";
import { getArabicTitle } from "../constants/titles.ar.js";
import { getEnglishTitle } from "../constants/titles.en.js";
import { getFrenchTitle } from "../constants/titles.fr.js";

const ContactPage = React.lazy(() => import("../pages/ContactPage.jsx"));
const HomePage = React.lazy(() => import("../pages/HomePage.jsx"));
const AboutPage = React.lazy(() => import("../pages/AboutPage.jsx"));
const AboutPageEn = React.lazy(() => import("../pages/en/AboutPageEn.jsx"));
const AboutPageFr = React.lazy(() => import("../pages/fr/AboutPageFr.jsx"));
const SolutionRouteEn = React.lazy(() => import("../pages/en/SolutionRouteEn.jsx"));
const SolutionRouteFr = React.lazy(() => import("../pages/fr/SolutionRouteFr.jsx"));
const ContactPageEn = React.lazy(() => import("../pages/en/ContactPageEn.jsx"));
const ContactPageFr = React.lazy(() => import("../pages/fr/ContactPageFr.jsx"));
const HomePageEn = React.lazy(() => import("../pages/en/HomePageEn.jsx"));
const HomePageFr = React.lazy(() => import("../pages/fr/HomePageFr.jsx"));
const ProductsPage = React.lazy(() => import("../pages/ProductsPage.jsx"));
const ProductsPageEn = React.lazy(() => import("../pages/en/ProductsPageEn.jsx"));
const ProductsPageFr = React.lazy(() => import("../pages/fr/ProductsPageFr.jsx"));
const ProductDetailsPage = React.lazy(() => import("../pages/ProductDetailsPage.jsx"));
const ProductDetailsPageEn = React.lazy(() => import("../pages/en/ProductDetailsPageEn.jsx"));
const ProductDetailsPageFr = React.lazy(() => import("../pages/fr/ProductDetailsPageFr.jsx"));
const CartPage = React.lazy(() => import("../pages/CartPage.jsx"));
const CartPageEn = React.lazy(() => import("../pages/en/CartPageEn.jsx"));
const CartPageFr = React.lazy(() => import("../pages/fr/CartPageFr.jsx"));
const HeaderEn = React.lazy(() => import("../components/HeaderEn.jsx"));
const HeaderFr = React.lazy(() => import("../components/HeaderFr.jsx"));
const FooterEn = React.lazy(() => import("../components/FooterEn.jsx"));
const FooterFr = React.lazy(() => import("../components/FooterFr.jsx"));
const Header = React.lazy(() => import("../components/Header.jsx"));
const Footer = React.lazy(() => import("../components/Footer.jsx"));
function SiteLayout() {
  const location = useLocation();
  const isEnglishRoute = location.pathname.startsWith("/en");
  const isFrenchRoute = location.pathname === "/fr" || location.pathname.startsWith("/fr/");
  const isArabicPublic = !isEnglishRoute && !isFrenchRoute;
  const isReferenceArabic = location.pathname === "/" || location.pathname === "/about" || location.pathname.startsWith("/solutions/");
  const isReferenceEnglish = location.pathname === "/en" || location.pathname === "/en/home" || location.pathname === "/en/about" || location.pathname.startsWith("/en/solutions/");
  const isReferenceFrench = location.pathname === "/fr" || location.pathname === "/fr/home" || location.pathname === "/fr/about" || location.pathname.startsWith("/fr/solutions/");

  React.useEffect(() => {
    document.documentElement.lang = isFrenchRoute ? "fr" : isEnglishRoute ? "en" : "ar";
    document.documentElement.dir = isFrenchRoute || isEnglishRoute ? "ltr" : "rtl";
  }, [isEnglishRoute, isFrenchRoute]);

  React.useEffect(() => {
    if (isFrenchRoute) {
      document.title = getFrenchTitle(location.pathname);
      return undefined;
    }
    if (!isEnglishRoute) {
      document.title = getArabicTitle(location.pathname);
      return undefined;
    }
    document.title = getEnglishTitle(location.pathname);
    return undefined;
  }, [isEnglishRoute, isFrenchRoute, location.pathname]);

  return (
    <div className={[isArabicPublic ? "arabic-site" : "", isReferenceArabic ? "reference-site-ar" : "", isReferenceEnglish ? "reference-site-en" : "", isReferenceFrench ? "reference-site-fr" : ""].filter(Boolean).join(" ") || undefined} dir={isEnglishRoute || isFrenchRoute ? "ltr" : undefined}>
      <ScrollToTop />
      {isFrenchRoute ? (
        <Suspense fallback={null}><HeaderFr /></Suspense>
      ) : isEnglishRoute ? (
        <Suspense fallback={null}>
          <HeaderEn />
        </Suspense>
      ) : <Suspense fallback={null}><Header /></Suspense>}
      <main>
        <Suspense key={location.pathname} fallback={<section className="page-loading">جاري تحميل الصفحة...</section>}>
          <Outlet />
        </Suspense>
      </main>
      {isFrenchRoute ? (
        <Suspense fallback={null}><FooterFr /></Suspense>
      ) : isEnglishRoute ? (
        <Suspense fallback={null}>
          <FooterEn />
        </Suspense>
      ) : <Suspense fallback={null}><Footer /></Suspense>}
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Suspense fallback={<section className="page-loading">جاري تحميل الصفحة الرئيسية...</section>}><HomePage /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<section className="page-loading">جاري تحميل صفحة الشركة...</section>}><AboutPage /></Suspense>} />
        <Route path="/solutions/:slug" element={<SolutionRoute />} />
        <Route path="/en/about" element={<Suspense fallback={<section className="page-loading">Loading about page...</section>}><AboutPageEn /></Suspense>} />
        <Route path="/en/solutions/:slug" element={<Suspense fallback={<section className="page-loading">Loading solution...</section>}><SolutionRouteEn /></Suspense>} />
        <Route path="/fr/about" element={<Suspense fallback={<section className="page-loading">Chargement de la page À propos...</section>}><AboutPageFr /></Suspense>} />
        <Route path="/fr/solutions/:slug" element={<Suspense fallback={<section className="page-loading">Chargement de la solution...</section>}><SolutionRouteFr /></Suspense>} />
        <Route
          path="/en"
          element={(
            <Suspense fallback={<section className="page-loading">Loading home page...</section>}>
              <HomePageEn />
            </Suspense>
          )}
        />
        <Route
          path="/en/home"
          element={(
            <Suspense fallback={<section className="page-loading">Loading home page...</section>}>
              <HomePageEn />
            </Suspense>
          )}
        />
        <Route path="/fr" element={<Suspense fallback={<section className="page-loading">Chargement de l’accueil...</section>}><HomePageFr /></Suspense>} />
        <Route path="/fr/home" element={<Suspense fallback={<section className="page-loading">Chargement de l’accueil...</section>}><HomePageFr /></Suspense>} />
        <Route
          path="/products"
          element={(
            <Suspense fallback={<section className="page-loading">جاري تحميل المنتجات...</section>}>
              <ProductsPage />
            </Suspense>
          )}
        />
        <Route
          path="/products-list"
          element={(
            <Suspense fallback={<section className="page-loading">جاري تحميل المنتجات...</section>}>
              <ProductsPage />
            </Suspense>
          )}
        />
        <Route
          path="/en/products"
          element={(
            <Suspense fallback={<section className="page-loading">Loading products...</section>}>
              <ProductsPageEn />
            </Suspense>
          )}
        />
        <Route
          path="/en/products-list"
          element={(
            <Suspense fallback={<section className="page-loading">Loading products...</section>}>
              <ProductsPageEn />
            </Suspense>
          )}
        />
        <Route path="/fr/products" element={<Suspense fallback={<section className="page-loading">Chargement des produits...</section>}><ProductsPageFr /></Suspense>} />
        <Route path="/fr/products-list" element={<Suspense fallback={<section className="page-loading">Chargement des produits...</section>}><ProductsPageFr /></Suspense>} />
        <Route
          path="/contact"
          element={(
            <Suspense fallback={<section className="page-loading">جاري تحميل صفحة التواصل...</section>}>
              <ContactPage />
            </Suspense>
          )}
        />
        <Route
          path="/en/contact"
          element={(
            <Suspense fallback={<section className="page-loading">Loading contact page...</section>}>
              <ContactPageEn />
            </Suspense>
          )}
        />
        <Route path="/fr/contact" element={<Suspense fallback={<section className="page-loading">Chargement de la page de contact...</section>}><ContactPageFr /></Suspense>} />
        <Route
          path="/product/:id"
          element={(
            <Suspense fallback={<section className="page-loading">جاري تحميل تفاصيل المنتج...</section>}>
              <ProductDetailsPage />
            </Suspense>
          )}
        />
        <Route
          path="/en/product/:id"
          element={(
            <Suspense fallback={<section className="page-loading">Loading product details...</section>}>
              <ProductDetailsPageEn />
            </Suspense>
          )}
        />
        <Route path="/fr/product/:id" element={<Suspense fallback={<section className="page-loading">Chargement du produit...</section>}><ProductDetailsPageFr /></Suspense>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/en/cart" element={<CartPageEn />} />
        <Route path="/fr/cart" element={<CartPageFr />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
