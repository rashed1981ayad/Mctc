import React from "react";
import { Link } from "react-router-dom";

export default function ProductsLandingHeroEn({ content }) {
  return (
    <section className="hero products-landing-hero products-landing-hero-en" dir={content.direction} lang={content.lang}>
      <img src="/hero-products.webp" alt={content.landing.imageAlt} />
      <div className="hero-copy">
        <span className="eyebrow">{content.landing.kicker}</span>
        <h1>{content.landing.title}</h1>
        <p>{content.landing.description}</p>
        <div className="hero-actions">
          <Link className="primary" to={content.routes.list}>{content.landing.action}</Link>
        </div>
      </div>
    </section>
  );
}
