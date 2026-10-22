import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const labels = { ar: "السلة", en: "Cart", fr: "Panier" };

export default function CartLink({ language = "ar" }) {
  const { count } = useCart();
  const { pathname } = useLocation();
  const path = language === "ar" ? "/cart" : `/${language}/cart`;
  return (
    <Link className="header-cart-link" to={path} aria-label={`${labels[language]}${count ? ` (${count})` : ""}`} aria-current={pathname === path ? "page" : undefined}>
      <i className="fa-solid fa-basket-shopping" aria-hidden="true"></i>
      {count > 0 && <span className="header-cart-count" aria-hidden="true">{count}</span>}
    </Link>
  );
}
