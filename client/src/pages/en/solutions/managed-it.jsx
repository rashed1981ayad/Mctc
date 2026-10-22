import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionManagedItEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main managed-it-main">
      <section className="enterprise-hero managed-it-hero" aria-labelledby="managed-it-hero-title">
        <img src="/site-assets/managed-it-hero.webp" alt="IT specialist monitoring digital systems" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="managed-it-hero-title">In a World Increasingly Dependent on Digital Systems</h1>
          <p>Reliable, efficient technology infrastructure is essential to organizational success.</p>
        </div>
      </section>

      <section className="enterprise-introduction managed-it-introduction" aria-label="Introduction to managed IT services">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Modern organizations need stable, secure technology to maintain continuity and efficiency. Increasingly complex systems require specialist expertise and advanced monitoring.</p>
          <p className="enterprise-intro-text">At <strong>Almutaqaddim</strong> , we provide managed IT services through proactive monitoring, continuous support, and reliable infrastructure management.</p>
          <p className="enterprise-intro-text">These services let organizations focus on core business while our team manages, maintains, and operates their systems.</p>
        </div>
      </section>

      <section className="enterprise-services managed-it-scope" aria-labelledby="managed-it-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="managed-it-scope-title">Scope of Almutaqaddim Managed IT Solutions</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><h3>IT Infrastructure Management <small dir="ltr">IT Infrastructure Management</small></h3></div><p>Comprehensive management of servers, networks, storage, and endpoints for stable, high-performing systems.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i><h3>Systems Administration & Maintenance <small dir="ltr">System Administration &amp; Maintenance</small></h3></div><p>Server, operating system, and application management with routine maintenance and continuous improvement.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-headset" aria-hidden="true"></i><h3>Remote & On-Site Technical Support <small dir="ltr">24/7 Remote &amp; On-Site Support</small></h3></div><p>Continuous support resolves issues quickly, remotely or on site.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3>Proactive System Monitoring <small dir="ltr">Proactive System Monitoring</small></h3></div><p>Advanced monitoring detects issues before they affect operations.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-boxes-stacked" aria-hidden="true"></i><h3>Hardware & Software Asset Management <small dir="ltr">Hardware &amp; Software Asset Management</small></h3></div><p>Asset tracking ensures efficient use and lifecycle management.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i><h3>Patch Management & Updates <small dir="ltr">Patch Management &amp; Updates</small></h3></div><p>Routine updates protect against vulnerabilities and improve performance.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow managed-it-why" aria-labelledby="managed-it-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Proactive IT. Long-Term Partnership.</span>
            <h2 id="managed-it-why-title">Why MCTC for Managed IT?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Complex Environment Expertise</h3><p>Our team manages sensitive environments that require stability and rapid incident response.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Proactive Downtime Prevention</h3><p>Continuous analysis detects potential problems before they affect operations.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Cost-Efficient Operations</h3><p>Access specialist expertise and professional tools without the cost of a full internal IT team.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>Unified Technology Management</h3><p>We manage networks, servers, applications, and devices as one connected environment.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">05</span><h3>Long-Term Partnership</h3><p>We strengthen your digital infrastructure and prepare it for future growth.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="managed-it-cta-title">
        <div className="contact-cta-copy">
          <h2 id="managed-it-cta-title">Leave IT Management to the Experts</h2>
          <p>We manage your environment efficiently so you can focus on your business. With <strong>Almutaqaddim</strong> , IT management becomes a stable platform for growth.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request an IT Infrastructure Assessment <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
