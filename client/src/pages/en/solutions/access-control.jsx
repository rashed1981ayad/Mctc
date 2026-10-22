import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionAccessControlEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main access-control-main">
      <section className="enterprise-hero access-control-hero" aria-labelledby="access-control-hero-title">
        <img src="/site-assets/access-control-hero.webp" alt="Smart electronic access control and user identity management system" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="access-control-hero-title">Smart, Secure Management of Access and Permissions</h1>
          <p>Precise control over access to facilities and restricted areas through a centralized system that improves organization and operational security.</p>
        </div>
      </section>

      <section className="enterprise-introduction access-control-introduction" aria-label="Introduction to access control and identity management systems">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Access control and identity management systems are a cornerstone of modern building security. They use advanced electronic verification to assign appropriate permissions to each user, ensuring that only authorized people enter designated areas.</p>
          <p className="enterprise-intro-text">At Almutaqaddim, we transform conventional access into an integrated digital system that can be centrally managed and monitored, with complete activity logs and detailed reporting.</p>
        </div>
      </section>

      <section className="enterprise-services access-control-scope" aria-labelledby="access-control-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="access-control-scope-title">Scope of Access Control Solutions</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-door-open" aria-hidden="true"></i><h3>Access Control Systems</h3></div>
              <p>Design and implementation of centralized controllers and smart readers for every entry point, with permissions based on user, location, or time.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-lock" aria-hidden="true"></i><h3>Smart Electronic Locks</h3></div>
              <p>Supply and installation of electronic locks using smart cards, PINs, fingerprints, or facial recognition for stronger security without conventional keys.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-id-card" aria-hidden="true"></i><h3>Identity & Permission Management</h3></div>
              <p>An integrated system that defines who can access each area and when, with permissions that are easy to update as operations change.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-clipboard-list" aria-hidden="true"></i><h3>Access Activity Logging & Monitoring</h3></div>
              <p>A complete record of all entry and exit activity, supporting movement monitoring and detailed security and HR reports.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Integration with Other Security Systems</h3></div>
              <p>Integration with CCTV, fire alarms, and building management systems to create a more effective connected security environment.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-laptop" aria-hidden="true"></i><h3>Centralized Management & Remote Control</h3></div>
              <p>A centralized platform for managing every access point from one location, with secure remote access and straightforward user administration.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow access-control-why" aria-labelledby="access-control-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Reliable Access. Built to Scale.</span>
            <h2 id="access-control-why-title">Why MCTC for Access Control?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Purpose-Built Engineering Design</h3>
              <p>We assess site risks and design access control around your facility and operations.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Scalable Solutions</h3>
              <p>Systems designed to expand in the future without rebuilding the underlying infrastructure.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>System Integration</h3>
              <p>Strong integration capabilities across surveillance, security, and building management systems.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Professional Implementation</h3>
              <p>Implementation follows technical best practices and quality standards to ensure reliable operation.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>Continuous Technical Support</h3>
              <p>Training and technical support help your team gain full value from the system.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="access-control-cta-title">
        <div className="contact-cta-copy">
          <h2 id="access-control-cta-title">Strengthen Your Facility with Smart Access Control</h2>
          <p>We help you design an integrated access management system that balances security and ease of administration, with room for future expansion. With Almutaqaddim, access becomes smarter and safer, supporting stable operations.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request an Access Control Assessment <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
