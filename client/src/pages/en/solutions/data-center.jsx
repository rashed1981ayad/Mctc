import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionDataCenterEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main data-center-main">
      <section className="enterprise-hero data-center-hero" aria-labelledby="data-center-hero-title">
        <img src="/site-assets/data-center-hero.webp" alt="Server racks inside a high-availability data center" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="data-center-hero-title">High-Availability Data Centers</h1>
          <p>Ensure operational continuity, fast data access, and confident, stable digital growth.</p>
        </div>
      </section>

      <section className="enterprise-introduction data-center-introduction" aria-label="Introduction to data centers">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">As data volumes grow and organizations rely on digital applications and services, data centers have become the foundation for business continuity and critical system performance.</p>
          <p className="enterprise-intro-text">Almutaqaddim provides <strong>Almutaqaddim</strong> integrated data center solutions that combine operating efficiency, physical security, and future scalability in a stable environment built for uninterrupted growth.</p>
          <p className="enterprise-intro-text">We design intelligent operating environments that reduce risk, improve efficiency, and maintain the highest levels of availability.</p>
        </div>
      </section>

      <section className="enterprise-services data-center-scope" aria-labelledby="data-center-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="data-center-scope-title">Integrated Infrastructure Components</h2>
          </div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-building-shield" aria-hidden="true"></i><h3>Physical Infrastructure & Facility <bdi>(Infrastructure &amp; Facility)</bdi></h3></div><p>Space design, fire suppression, access control, and physical protection for technology assets.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-bolt" aria-hidden="true"></i><h3>Power & Cooling</h3></div><p>Uninterruptible power supply <bdi>(UPS)</bdi>, backup generators, and energy-efficient intelligent cooling maintain performance and prevent unexpected outages.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-server" aria-hidden="true"></i><h3>Compute & Storage</h3></div><p>High-performance servers and storage for critical applications and databases, with flexible capacity for future growth.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow data-center-why" aria-labelledby="data-center-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Continuous Availability and Infrastructure That Grows with You</span>
            <h2 id="data-center-why-title">Why Choose Almutaqaddim for Data Centers?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Scalable Design</h3><p>Data centers that grow with your business without rebuilding the foundation.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Sustainable Operating Efficiency</h3><p>Solutions focused on lower energy use and operating costs.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Comprehensive Integration</h3><p>Networks, storage, and security work together for safe, stable data flow.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>Specialized Technical Support</h3><p>A technical team that maintains stability and continuously improves the environment.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="data-center-cta-title">
        <div className="contact-cta-copy">
          <h2 id="data-center-cta-title">Need More Reliable, Future-Ready Digital Infrastructure?</h2>
          <p>We help you design or upgrade a data center that balances performance, efficiency, and scalability without disrupting critical operations.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request a Data Center Assessment <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
