import React from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../services/api.js";
import { productImages } from "../services/productHelpers.js";
import { MAX_CART_ITEMS, useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product, detailsLabel = "عرض التفاصيل", detailsPath, addToCartLabel = "أضف إلى السلة", cartFullLabel = "السلة ممتلئة", disableAddToCart = false }) {
  const { items, addItem } = useCart();
  const cartFull = items.length >= MAX_CART_ITEMS && !items.some((item) => item.id === product.id);
  const firstImage = productImages(product)[0];
  const productDetailsPath = detailsPath || `/product/${product.id}`;

  return (
    <article className="product-card">
      <div className="product-image">
        {firstImage ? (
          <img src={imageUrl(firstImage)} alt={product.name} loading="lazy" decoding="async" />
        ) : (
          <span>{product.brand}</span>
        )}
      </div>
      <div className="product-body">
        <span className="tag">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="meta">
          <span>{product.brand}</span>
          <span>{product.model}</span>
        </div>
        <div className="product-card-actions">
          <Link className="link" to={productDetailsPath}>{detailsLabel}</Link>
          <button className="cart-add-button cart-add-icon-button" type="button" onClick={() => addItem(product.id)} disabled={cartFull || disableAddToCart} aria-label={cartFull ? cartFullLabel : addToCartLabel} title={cartFull ? cartFullLabel : addToCartLabel}>
            <i className="fa-solid fa-basket-shopping" aria-hidden="true"></i>
            <span className="cart-add-plus" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}
