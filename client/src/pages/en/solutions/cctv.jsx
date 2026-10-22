import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionCctvEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main cctv-main">
      <section className="enterprise-hero cctv-hero" aria-labelledby="cctv-hero-title">
        <img src="/site-assets/cctv-hero.webp" alt="Professional surveillance camera protecting a facility" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cctv-hero-title">Professional, Integrated Surveillance Systems</h1>
          <p>Strengthen facility security and provide accurate, reliable operational visibility at all times.</p>
        </div>
      </section>

      <section className="enterprise-introduction cctv-introduction" aria-label="Introduction to surveillance systems">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Surveillance is now essential to risk management and operational safety. It goes beyond recording events to protect assets, support decisions, and improve incident response. At <strong>Almutaqaddim</strong> , we provide integrated <bdi>CCTV</bdi> solutions tailored to each facility, with an emphasis on quality, reliability, and infrastructure integration for lasting protection.</p>
          <p className="enterprise-intro-text">We do more than install cameras; we build intelligent surveillance environments that support long-term operational stability.</p>
        </div>
      </section>

      <section className="enterprise-services cctv-scope" aria-labelledby="cctv-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cctv-scope-title">Scope of Surveillance Solutions</h2>
            <p>We provide integrated solutions using modern imaging and analytics, intuitive interfaces, centralized management, and secure remote monitoring.</p>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-camera" aria-hidden="true"></i><h3>CCTV Camera Systems</h3></div>
              <p>Supply and installation of high-quality <bdi>IP</bdi> and<bdi>Analog</bdi> cameras for indoor and outdoor use, with resolutions up to <bdi>4K</bdi>, including fixed, PTZ, thermal, and license plate recognition cameras with secure remote monitoring.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-hard-drive" aria-hidden="true"></i><h3>Video Recording & Management <bdi>(VMS)</bdi></h3></div>
              <p>Professional recording infrastructure using high-performance <bdi>NVR</bdi> and<bdi>DVR</bdi> systems, secure storage, rapid retrieval, and centralized control-room management.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-eye" aria-hidden="true"></i><h3>Intelligent Video Analytics</h3></div>
              <p>AI turns surveillance into proactive analysis that detects unusual activity, sends instant alerts, and improves incident response.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tower-broadcast" aria-hidden="true"></i><h3>Temporary Camera Solutions</h3></div>
              <p>Flexible, rapidly deployed surveillance for construction sites, events, and exhibitions without permanent infrastructure or long-term investment.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cctv-why" aria-labelledby="cctv-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Thoughtful Protection and Reliable Delivery</span>
            <h2 id="cctv-why-title">Why Choose Almutaqaddim for Surveillance?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Specialized Technical Expertise</h3>
              <p>Our engineering and technical teams have practical experience delivering security and surveillance projects of every scale.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Commitment to Quality</h3>
              <p>Engineering best practices ensure professional, sustainable implementation.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Client-Focused Approach</h3>
              <p>Dedicated project management for every contract ensures close follow-up and alignment with operational requirements.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Scalable Solutions</h3>
              <p>Systems can grow in the future without rebuilding the base infrastructure.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cctv-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cctv-cta-title">Strengthen Your Facility with Professional Surveillance</h2>
          <p>We design an integrated surveillance system suited to your operations, balancing security, ease of management, and future scalability.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request a Tailored Technical and Financial Proposal <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
