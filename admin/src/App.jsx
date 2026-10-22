import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "../../client/src/components/Footer.jsx";
import AdminNav from "./components/AdminNav.jsx";
import { useAuth } from "./hooks/useAuth.js";

const ProductsAdminPage = React.lazy(() => import("./pages/ProductsAdminPage.jsx"));
const ProductFormPage = React.lazy(() => import("./pages/ProductFormPage.jsx"));
const MessagesAdminPage = React.lazy(() => import("./pages/MessagesAdminPage.jsx"));
const MessageDetailsPage = React.lazy(() => import("./pages/MessageDetailsPage.jsx"));
const OrdersAdminPage = React.lazy(() => import("./pages/OrdersAdminPage.jsx"));

export default function App() {
  const { session, loading, logout, logoutError, loggingOut } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    if (path === "/orders") document.title = "طلبات عروض الأسعار | لوحة تحكم المتقدم";
    else if (path.startsWith("/messages/")) document.title = "تفاصيل رسالة التواصل | لوحة تحكم المتقدم";
    else if (path === "/messages") document.title = "رسائل التواصل | لوحة تحكم المتقدم";
    else if (/^\/product-form\/\d+$/.test(path)) document.title = "تعديل المنتج | لوحة تحكم المتقدم";
    else if (path === "/product-form") document.title = "إضافة منتج | لوحة تحكم المتقدم";
    else document.title = "قائمة المنتجات | لوحة تحكم المتقدم";
  }, [location.pathname]);

  if (loading) return <main className="page-loading">جاري التحقق من الجلسة...</main>;
  if (!session) return null;

  const mode = location.pathname.startsWith("/product-form")
    ? "form"
    : location.pathname.startsWith("/messages")
      ? "messages"
      : location.pathname.startsWith("/orders") ? "orders" : "list";

  return (
    <>
      <AdminNav mode={mode} onLogout={logout} loggingOut={loggingOut} />
      <main>
        {logoutError && <div className="logout-error" role="alert">
          <span>{logoutError}</span>
          <button type="button" onClick={logout} disabled={loggingOut}>إعادة محاولة الخروج</button>
        </div>}
        <Suspense fallback={<section className="page-loading">جاري تحميل الصفحة...</section>}>
          <Routes>
            <Route path="/products" element={<ProductsAdminPage />} />
            <Route path="/product-form" element={<ProductFormPage />} />
            <Route path="/product-form/:id" element={<ProductFormPage />} />
            <Route path="/messages" element={<MessagesAdminPage />} />
            <Route path="/messages/:id" element={<MessageDetailsPage />} />
            <Route path="/orders" element={<OrdersAdminPage />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
