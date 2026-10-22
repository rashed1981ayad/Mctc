import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import ProductGallery from "./ProductGallery.jsx";
import { useProduct } from "../hooks/useProducts.js";
import { imageUrl } from "../services/api.js";
import { productDatasheets, productImages } from "../services/productHelpers.js";
import { productQuantityPickerText } from "../constants/productQuantityPicker.js";
import { MAX_CART_ITEMS, useCart } from "../context/CartContext.jsx";

export default function ProductDetailsPageView({ content }) {
  const { id } = useParams();
  const { data: product, isLoading, isError, error, isFetching, refetch } = useProduct(id);
  const { items, addItem } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const quantityText = productQuantityPickerText[content.lang] || productQuantityPickerText.ar;

  useEffect(() => {
    document.documentElement.lang = content.lang;
    document.documentElement.dir = content.direction;
  }, [content.direction, content.lang]);

  useEffect(() => {
    if (!product?.name) return;
    const siteName = content.lang === "ar" ? "المتقدم" : "Almutaqaddim";
    document.title = `${product.name} | ${siteName}`;
  }, [content.lang, product?.name]);

  useEffect(() => setSelectedQuantity(1), [id]);

  if (isLoading) return <p className="notice" dir={content.direction} lang={content.lang}>{content.details.loading}</p>;

  if (isError || !product) {
    const notFound = error?.status === 404;
    return (
      <section className="product-details-state" dir={content.direction} lang={content.lang} role="alert">
        <h1>{notFound ? content.details.notFoundTitle : content.details.errorTitle}</h1>
        <p>{notFound ? content.details.notFound : content.details.loadError}</p>
        <div className="product-details-state-actions">
          {!notFound && (
            <button type="button" className="primary" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? content.details.loading : content.details.retry}
            </button>
          )}
          <Link className="secondary" to={content.routes.list}>{content.details.backToProducts}</Link>
        </div>
      </section>
    );
  }

  const images = productImages(product);
  const datasheets = productDatasheets(product);
  const relatedProducts = product.relatedProducts || [];
  const cartFull = items.length >= MAX_CART_ITEMS && !items.some((item) => item.id === product.id);
  const quantityInCart = items.find((item) => item.id === product.id)?.quantity ?? 0;
  const quantityExceeded = quantityInCart + selectedQuantity > 99;
  const canAdd = !cartFull && !quantityExceeded;

  function addSelectedQuantity() {
    if (!canAdd) return;
    addItem(product.id, selectedQuantity);
    setSelectedQuantity(1);
  }

  return (
    <>
      <section className="details" dir={content.direction} lang={content.lang}>
        <div className="details-image">
          <ProductGallery images={images} productName={product.name} fallback={product.brand} />
        </div>
        <div className="details-summary">
          <span className="tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="spec-row"><strong>{content.details.model}</strong> {product.model}</div>
          {product.description && <p>{product.description}</p>}
          <div className="spec-row"><strong>{content.details.brand}</strong> {product.brand}</div>
          <div className="details-order-controls product-quantity-panel">
            <label className="details-quantity-label" htmlFor={`details-quantity-${product.id}`}>{content.details.quantity}</label>
            <select id={`details-quantity-${product.id}`} value={selectedQuantity} onChange={(event) => setSelectedQuantity(Number(event.target.value))}>
              {Array.from({ length: 30 }, (_, index) => index + 1).map((quantity) => <option key={quantity} value={quantity}>{quantityText.quantityOption(quantity)}</option>)}
            </select>
            {(cartFull || quantityExceeded) && <p className="product-quantity-warning" role="status">{cartFull ? content.card.cartFull : quantityText.maxQuantity}</p>}
            <div className="product-quantity-actions">
              <button className="primary" type="button" onClick={addSelectedQuantity} disabled={!canAdd}>
                <i className="fa-solid fa-basket-shopping" aria-hidden="true"></i>
                {content.card.addToCart}
              </button>
              {datasheets[0] ? (
                <a className="secondary" href={imageUrl(datasheets[0])} target="_blank" rel="noopener noreferrer" download>{content.details.datasheet(datasheets.length, 0)}</a>
              ) : (
                <span className="product-datasheet-unavailable" aria-disabled="true">{quantityText.unavailable}</span>
              )}
            </div>
            {datasheets.length > 1 && (
              <div className="download-list">
                {datasheets.slice(1).map((item, index) => (
                  <a className="secondary download-link" key={`${item}-${index}`} href={imageUrl(item)} target="_blank" rel="noopener noreferrer" download>
                    {content.details.datasheet(datasheets.length, index + 1)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="details-extra">
          <article className="details-panel">
            <h3>{content.details.features}</h3>
            <ul>{(product.features || []).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="details-panel">
            <h3>{content.details.specifications}</h3>
            <ul>{(product.specifications || []).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section related-products-section" dir={content.direction} lang={content.lang}>
          <div className="section-title">
            <span>{content.details.relatedTitle}</span>
            <small>{content.details.relatedSubtitle}</small>
          </div>
          <div className="grid related-products-grid">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                detailsLabel={content.card.details}
                addToCartLabel={content.card.addToCart}
                cartFullLabel={content.card.cartFull}
                detailsPath={content.routes.product(item.id)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
