import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { api, imageUrl } from "../services/api.js";
import { requestFingerprint, prepareOrderRequest, readSavedOrder, rememberSavedOrder, discardPendingRequest, navigateWhatsApp } from "../services/orderRecovery.js";
import ProductCard from "./ProductCard.jsx";

const emptyCustomer = { name: "", phone: "", email: "", notes: "" };

export default function CartPageView({ content }) {
  const { items, setQuantity, removeItem, removeSubmittedItems } = useCart();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const turnstileContainerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const submittingRef = useRef(false);
  const [savedOrder, setSavedOrder] = useState(() => {
    try { return readSavedOrder(); } catch { return null; }
  });
  const ids = items.map((item) => item.id);
  const idsKey = ids.join(",");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart-products", idsKey],
    queryFn: () => api.getCartProducts(ids),
    enabled: ids.length > 0,
    staleTime: 60_000
  });
  const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
    queryKey: ["cart-recommendations"],
    queryFn: api.getCartRecommendations,
    staleTime: 0,
    refetchOnMount: "always"
  });
  const productsById = useMemo(() => new Map((data?.items || []).map((product) => [product.id, product])), [data]);
  const allAvailable = items.every((item) => productsById.has(item.id));

  useEffect(() => {
    document.documentElement.lang = content.lang;
    document.documentElement.dir = content.direction;
  }, [content.lang, content.direction]);

  useEffect(() => {
    if (!items.length) return undefined;
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    let cancelled = false;
    let timer;
    if (!siteKey) {
      console.warn("Cloudflare Turnstile site key is missing. The cart security check cannot be rendered.");
      return undefined;
    }

    function render() {
      if (cancelled) return;
      if (window.turnstile && turnstileContainerRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (token) => { setTurnstileToken(token); setError(""); },
          "expired-callback": () => setTurnstileToken(""),
          "timeout-callback": () => setTurnstileToken(""),
          "error-callback": () => { setTurnstileToken(""); setError(content.errors.securityRender); }
        });
        return;
      }
      timer = window.setTimeout(render, 250);
    }

    render();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (window.turnstile && widgetIdRef.current !== null) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [Boolean(items.length), content.errors.securityRender]);

  function changed() {
    setError("");
  }

  function updateCustomer(event) {
    changed();
    setCustomer((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function updateQuantity(id, value) {
    changed();
    setQuantity(id, value);
  }

  function remove(id) {
    changed();
    removeItem(id);
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!turnstileToken) { setError(content.errors.missingSecurity); return; }
    if (!allAvailable || isLoading || isError || submittingRef.current) return;

    const submittedItems = items.map((item) => ({ id: item.id, quantity: item.quantity }));
    const submittedCustomer = { ...customer };
    submittingRef.current = true;
    setSubmitting(true);
    let whatsappWindow = null;
    let pending;
    try {
      whatsappWindow = window.open("about:blank", "_blank");
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.opener = null;
        whatsappWindow.document.title = content.sending;
        whatsappWindow.document.body.textContent = content.sending;
      }
    } catch { /* The saved-order link remains available when popups are blocked. */ }

    try {
      try {
        const signature = await requestFingerprint(submittedCustomer, submittedItems, content.lang);
        pending = prepareOrderRequest(signature);
      } catch {
        setError(content.errors.storage);
        if (whatsappWindow && !whatsappWindow.closed) whatsappWindow.close();
        return;
      }
      const result = await api.createOrder({
        requestKey: pending.requestKey,
        language: content.lang,
        customer: submittedCustomer,
        items: submittedItems,
        turnstileToken
      });
      // Confirmation belongs to the saved order, independently of the popup.
      setSavedOrder({ orderId: result.orderId, whatsappUrl: result.whatsappUrl });
      try { rememberSavedOrder(pending, result); } catch { /* Keep the visible receipt and the existing retry key. */ }
      removeSubmittedItems(submittedItems);
      navigateWhatsApp(whatsappWindow, result.whatsappUrl);
    } catch (submitError) {
      if (whatsappWindow && !whatsappWindow.closed) whatsappWindow.close();
      if (submitError.status === 409) {
        try { discardPendingRequest(pending); } catch { /* Retain the key if storage is unavailable. */ }
      }
      setError(submitError.status === 429 ? content.errors.rate : submitError.status === 409 ? content.errors.conflict : content.errors.submit);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
      setTurnstileToken("");
      if (window.turnstile && widgetIdRef.current !== null) window.turnstile.reset(widgetIdRef.current);
    }
  }

  return (
    <section className="cart-page" lang={content.lang} dir={content.direction}>
      <div className="cart-page-heading">
        <i className="fa-solid fa-basket-shopping" aria-hidden="true"></i>
        <div><h1>{content.title}</h1><p>{content.intro}</p></div>
      </div>

      {savedOrder && (
        <div className="cart-confirmation" role="status" aria-live="polite">
          <div>
            <strong>{content.success}</strong>
            <p>{content.orderPrefix} <bdi>{savedOrder.orderId}</bdi></p>
            <small>{content.whatsappHint}</small>
          </div>
          <a className="cart-submit" href={savedOrder.whatsappUrl} target="_blank" rel="noopener noreferrer">{content.reopen}</a>
        </div>
      )}

      {!items.length ? (
        <div className="cart-empty"><p>{content.empty}</p><Link className="cart-browse" to={content.productsPath}>{content.browse}</Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" aria-live="polite">
            {isLoading && <p className="cart-notice">{content.loading}</p>}
            {isError && <p className="cart-error">{content.errors.load}</p>}
            {items.map((item) => {
              const product = productsById.get(item.id);
              return (
                <article className="cart-item" key={item.id}>
                  {product ? (
                    <>
                      <Link className="cart-item-image" to={content.productPath(item.id)}>
                        {product.image ? <img src={imageUrl(product.image)} alt="" loading="lazy" decoding="async" /> : <span>{product.brand}</span>}
                      </Link>
                      <div className="cart-item-copy">
                        <Link to={content.productPath(item.id)}><strong>{product.name}</strong></Link>
                        <small>{product.brand} · {product.model}</small>
                        <label className="cart-quantity-label">{content.quantity}
                          <span className="cart-quantity-controls">
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={submitting} aria-label="−">−</button>
                            <input type="number" min="1" max="99" value={item.quantity} onChange={(event) => { if (event.target.value) updateQuantity(item.id, Number(event.target.value)); }} disabled={submitting} aria-label={content.quantity} />
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={submitting || item.quantity >= 99} aria-label="+">+</button>
                          </span>
                        </label>
                      </div>
                    </>
                  ) : <p className="cart-unavailable">{isLoading ? content.loading : content.unavailable}</p>}
                  <button className="cart-remove" type="button" onClick={() => remove(item.id)} disabled={submitting}>{content.remove}</button>
                </article>
              );
            })}
            <Link className="cart-browse" to={content.productsPath}>{content.browse}</Link>
          </div>

          <form className="cart-checkout" onSubmit={submit}>
            <h2>{content.customerTitle}</h2>
            <label><span className="cart-field-title">{content.name} <span aria-hidden="true">*</span></span><input name="name" value={customer.name} onChange={updateCustomer} minLength="2" maxLength="120" required autoComplete="name" /></label>
            <label><span className="cart-field-title">{content.phone} <span aria-hidden="true">*</span></span><input name="phone" type="tel" value={customer.phone} onChange={updateCustomer} minLength="6" maxLength="60" required autoComplete="tel" /></label>
            <label><span className="cart-field-title">{content.email}</span><input name="email" type="email" value={customer.email} onChange={updateCustomer} maxLength="160" autoComplete="email" /></label>
            <label><span className="cart-field-title">{content.notes}</span><textarea name="notes" value={customer.notes} onChange={updateCustomer} maxLength="500" rows="4" /></label>
            <div className="cart-security"><strong>{content.security} <span aria-hidden="true">*</span></strong><div ref={turnstileContainerRef}></div></div>
            {error && <p className="cart-error" role="alert">{error}</p>}
            <button className="cart-submit" type="submit" disabled={submitting || isLoading || isError || !allAvailable}>
              <i className="fa-solid fa-basket-shopping" aria-hidden="true"></i> {submitting ? content.sending : content.send}
            </button>
          </form>
        </div>
      )}
      <section className="cart-recommendations" aria-labelledby="cart-recommendations-title">
        <h2 id="cart-recommendations-title">{content.recommended.title}</h2>
        {suggestionsLoading && <p className="cart-notice">{content.recommended.loading}</p>}
        {suggestions?.items?.length > 0 && (
          <div className="grid">
            {suggestions.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                detailsLabel={content.recommended.details}
                addToCartLabel={content.recommended.add}
                cartFullLabel={content.recommended.full}
                disableAddToCart={submitting}
                detailsPath={content.productPath(product.id)}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
