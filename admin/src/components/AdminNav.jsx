import React from "react";
import { Link } from "react-router-dom";

export default function AdminNav({ mode, onLogout, loggingOut }) {
  return (
    <header className="admin-navbar">
      <Link className="brand admin-brand" to="/products">
        <span className="brand-mark">م</span>
        <span>
          <strong>لوحة التحكم</strong>
          <small>إدارة منتجات المتقدم</small>
        </span>
      </Link>
      <nav className="admin-nav-links">
        <Link className={mode === "list" ? "active" : ""} to="/products">قائمة المنتجات</Link>
        <Link className={mode === "form" ? "active" : ""} to="/product-form">إضافة منتج</Link>
        <Link className={mode === "orders" ? "active" : ""} to="/orders">طلبات عروض الأسعار</Link>
        <Link className={mode === "messages" ? "active" : ""} to="/messages">رسائل التواصل</Link>
        <button type="button" className="admin-logout" onClick={onLogout} disabled={loggingOut}>{loggingOut ? "جاري الخروج..." : "خروج"}</button>
      </nav>
    </header>
  );
}
