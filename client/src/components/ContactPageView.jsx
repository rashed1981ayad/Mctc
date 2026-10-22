import React, { useEffect, useRef, useState } from "react";
import { api } from "../services/api.js";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: ""
};
const MESSAGE_MIN_LENGTH = 15;
const MESSAGE_MAX_LENGTH = 2500;

export default function ContactPageView({ content }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [whatsappFallback, setWhatsappFallback] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);

  useEffect(() => {
    document.documentElement.lang = content.lang;
    document.documentElement.dir = content.direction;
  }, [content.direction, content.lang]);

  useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    let cancelled = false;
    let retryTimer = null;

    if (!siteKey) {
      console.warn("Cloudflare Turnstile site key is missing. The contact security check cannot be rendered.");
      return undefined;
    }

    function renderTurnstile() {
      if (cancelled) return;

      if (window.turnstile && turnstileContainerRef.current && turnstileWidgetIdRef.current === null) {
        turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (token) => {
            setError("");
            setTurnstileToken(token);
          },
          "expired-callback": () => setTurnstileToken(""),
          "timeout-callback": () => setTurnstileToken(""),
          "error-callback": () => {
            setTurnstileToken("");
            setError(content.errors.turnstileRender);
          }
        });
        return;
      }

      retryTimer = window.setTimeout(renderTurnstile, 250);
    }

    renderTurnstile();

    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [content.errors.turnstileRender]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setError("");
    setWhatsappFallback("");
    setIsSubmitting(true);
    let whatsappWindow = null;

    try {
      if (!turnstileToken) {
        setError(content.errors.missingTurnstile);
        return;
      }

      whatsappWindow = window.open("about:blank", "_blank");
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.document.title = content.whatsapp.title;
        whatsappWindow.document.body.dir = content.direction;
        whatsappWindow.document.body.style.fontFamily = "Arial, sans-serif";
        whatsappWindow.document.body.style.padding = "2rem";
        whatsappWindow.document.body.textContent = content.whatsapp.preparing;
      }

      const result = await api.sendContactMessage({ ...form, turnstileToken });
      setForm(initialForm);
      let opened = false;
      try {
        if (whatsappWindow && !whatsappWindow.closed) {
          whatsappWindow.location.href = result.whatsappUrl;
          opened = true;
        } else {
          const nextWindow = window.open(result.whatsappUrl, "_blank");
          if (nextWindow) {
            nextWindow.opener = null;
            opened = true;
          }
        }
      } catch {
        opened = false;
      }
      if (!opened) {
        setStatus(content.whatsapp.popupBlocked);
        setWhatsappFallback(result.whatsappUrl);
      }
    } catch (submitError) {
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.close();
      }
      setError(submitError.message || content.errors.submitFailed);
    } finally {
      setIsSubmitting(false);
      setTurnstileToken("");
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    }
  }

  return (
    <section className={`contact-page ${content.pageClassName}`} dir={content.direction} lang={content.lang}>
      <section className="contact-cta" aria-labelledby="cta-title">
        <div className="contact-cta-copy">
          <span className="contact-cta-kicker">{content.hero.kicker}</span>
          <h2 id="cta-title">{content.hero.title}</h2>
        </div>
      </section>

      <div className="contact-grid" id="contact">
        <form className="contact-form" onSubmit={handleSubmit}>
          {status && <p className="success" role="status">{status} {whatsappFallback && <a href={whatsappFallback} target="_blank" rel="noopener noreferrer">{content.whatsapp.openLink}</a>}</p>}
          {error && <p className="error">{error}</p>}

          <label>
            <span className="field-title">{content.form.name.label} <span className="required">*</span></span>
            <input name="name" value={form.name} onChange={updateField} required placeholder={content.form.name.placeholder} />
          </label>

          <label>
            <span className="field-title">{content.form.phone.label} <span className="required">*</span></span>
            <input name="phone" type="tel" inputMode="tel" minLength="6" maxLength="60" value={form.phone} onChange={updateField} required placeholder={content.form.phone.placeholder} />
          </label>

          <label>
            <span className="field-title">{content.form.email.label}</span>
            <input name="email" type="email" value={form.email} onChange={updateField} placeholder={content.form.email.placeholder} />
          </label>

          <label>
            <span className="field-title">{content.form.subject.label}</span>
            <input name="subject" value={form.subject} onChange={updateField} placeholder={content.form.subject.placeholder} />
          </label>

          <label>
            <span className="field-title">{content.form.message.label} <span className="required">*</span></span>
            <small className="contact-message-hint">{content.form.message.hint}</small>
            <span className="contact-message-box">
              <textarea name="message" value={form.message} onChange={updateField} required minLength={MESSAGE_MIN_LENGTH} maxLength={MESSAGE_MAX_LENGTH} rows="6" placeholder={content.form.message.placeholder} />
              <small className="contact-message-counter" aria-live="off">{form.message.length} / {MESSAGE_MAX_LENGTH}</small>
            </span>
          </label>

          <div className="turnstile-check">
            <span>{content.form.security} <span className="required">*</span></span>
            <div ref={turnstileContainerRef}></div>
          </div>

          <button className="primary contact-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? content.form.submitting : content.form.submit}
          </button>
        </form>

        <div className="contact-visual" aria-hidden="true">
          <div className="contact-visual-dialog">
            <p>{content.visualText}</p>
          </div>
          <picture>
            <source media="(max-width: 820px)" srcSet="/contact-illustration-mobile.webp" />
            <img src="/contact-illustration-desktop.webp" alt="" />
          </picture>
        </div>
      </div>

      <section className="contact-map" aria-label={content.map.title}>
        <div className="contact-map-card">
          <p className="contact-map-address">
            <i className="fa-solid fa-location-dot"></i>
            <span>
              <strong>{content.map.location}</strong>
              <small>{content.map.address}</small>
            </span>
          </p>

          <div className="contact-map-socials" aria-label={content.map.socialsLabel}>
            <a href="https://mctc.ly/" target="_blank" rel="noreferrer" aria-label={content.map.websiteLabel}>
              <i className="fa-solid fa-globe"></i>
            </a>
            <a href="https://www.facebook.com/mctcly" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/mctcly" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@mctcly" target="_blank" rel="noreferrer" aria-label="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>

        <iframe
          title={content.map.title}
          src={`https://maps.google.com/maps?q=32.096651345238755,20.082461785419767&z=19&hl=${content.lang}&output=embed`}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </section>

      <section className="contact-info-section" aria-label={content.cards.label}>
        <div className="contact-info-cards">
          <article className="contact-info-card">
            <span className="contact-info-icon" aria-hidden="true">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <h3>{content.cards.emailTitle}</h3>
            <a href="mailto:support@mctc.ly">support@mctc.ly</a>
          </article>

          <article className="contact-info-card">
            <span className="contact-info-icon" aria-hidden="true">
              <i className="fa-solid fa-headphones"></i>
            </span>
            <h3>{content.cards.phoneTitle}</h3>
            <p>00218930001191</p>
            <p>00218930001190</p>
          </article>

          <article className="contact-info-card">
            <span className="contact-info-icon" aria-hidden="true">
              <i className="fa-solid fa-clock"></i>
            </span>
            <h3>{content.cards.hoursTitle}</h3>
            {content.cards.hoursLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>
        </div>
      </section>
    </section>
  );
}
