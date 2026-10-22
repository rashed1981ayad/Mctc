import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionCloudServicesEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main cloud-services-main">
      <section className="enterprise-hero cloud-services-hero" aria-labelledby="cloud-services-hero-title">
        <img src="/site-assets/cloud-services-hero.webp" alt="Flexible and secure enterprise cloud computing solutions" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cloud-services-hero-title">Flexible and Secure Cloud Computing</h1>
          <p>Enable organizations to run systems and applications efficiently, reduce infrastructure costs, and prepare for future growth.</p>
        </div>
      </section>

      <section className="enterprise-introduction cloud-services-introduction" aria-label="Introduction to cloud services">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Cloud services are a foundation of modern enterprise technology, enabling systems, applications, and data to run in flexible, secure environments instead of relying entirely on conventional on-premises infrastructure.</p>
          <p className="enterprise-intro-text">At <strong>Almutaqaddim</strong>, we provide integrated cloud solutions that improve efficiency, reduce infrastructure cost, and strengthen flexibility and continuity. We design tailored cloud environments focused on performance, security, and ease of management.</p>
        </div>
      </section>

      <section className="enterprise-services cloud-services-scope" aria-labelledby="cloud-services-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cloud-services-scope-title">Scope of Cloud Solutions</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-cloud" aria-hidden="true"></i><h3><bdi>Cloud Infrastructure Deployment</bdi><small>Cloud Infrastructure Implementation</small></h3></div>
              <p>Design and implementation of virtual servers, cloud networks, and advanced storage, allowing systems and applications to run efficiently without major local hardware investment.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-arrow-right-arrow-left" aria-hidden="true"></i><h3><bdi>Cloud Migration Services</bdi><small>Cloud Migration Services</small></h3></div>
              <p>Structured, secure migration of servers, systems, and applications to the cloud with minimal downtime and uninterrupted operations.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-database" aria-hidden="true"></i><h3><bdi>Cloud Backup &amp; Disaster Recovery</bdi><small>Cloud Backup & Disaster Recovery</small></h3></div>
              <p>Cloud backup for critical data and systems, with disaster recovery plans that restore operations rapidly during an emergency.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i><h3><bdi>Hybrid Cloud Solutions</bdi><small>Hybrid Cloud Solutions</small></h3></div>
              <p>Environments that combine local infrastructure with public or private cloud services for greater control and flexibility.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3><bdi>Cloud Monitoring &amp; Management</bdi><small>Cloud Monitoring & Management</small></h3></div>
              <p>Continuous management and monitoring to maintain performance, optimize resources, and identify issues before they affect operations.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cloud-services-why" aria-labelledby="cloud-services-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Secure Cloud. Built for Growth.</span>
            <h2 id="cloud-services-why-title">Why MCTC for Cloud Services?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Cloud Design for Your Business</h3>
              <p>We assess your current environment and design a cloud platform around operational and performance requirements.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Systems Integration Expertise</h3>
              <p>We integrate cloud platforms with existing networks, infrastructure, and enterprise systems.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Security and Business Continuity</h3>
              <p>Cloud solutions protect data and reduce operational risk.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Professional Cloud Management</h3>
              <p>Ongoing monitoring and management keep systems stable and optimize performance.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cloud-services-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cloud-services-cta-title">Move to the Cloud with Confidence</h2>
          <p>We design secure, flexible cloud environments that support growth and efficient management. With <strong>Almutaqaddim</strong>, the cloud becomes a reliable platform that gives your business the agility to grow in a fast-moving digital world.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request a Technology Consultation <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
