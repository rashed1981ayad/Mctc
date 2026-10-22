import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionNetworkInfrastructureEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main networking-main">
      <section className="enterprise-hero networking-hero" aria-labelledby="networking-hero-title">
        <img src="/site-assets/networking-hero.webp" alt="Professional network and data center infrastructure" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="networking-hero-title">Fast, Stable, and Secure Network Infrastructure</h1>
          <p>Support digital systems and confident, sustainable business expansion.</p>
        </div>
      </section>

      <section className="enterprise-introduction networking-introduction" aria-label="Introduction to network infrastructure solutions">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Network infrastructure is the foundation for efficient, secure digital operations. A professional network provides stable connectivity and supports future growth.</p>
          <p className="enterprise-intro-text">Almutaqaddim provides <strong>Almutaqaddim</strong> integrated planning, design, implementation, and operation using trusted global technology.</p>
          <p className="enterprise-intro-text">Every environment is designed for the organization's needs, scalability, security, and ease of management.</p>
        </div>
      </section>

      <section className="enterprise-services networking-scope" aria-labelledby="networking-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="networking-scope-title">Scope of Network Infrastructure Solutions</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-ethernet" aria-hidden="true"></i><h3>Structured Cabling Systems <small dir="ltr">Structured Cabling (Copper &amp; Fiber Optic)</small></h3></div><p>Copper and fiber cabling to global standards, including organized network rooms and cabinets.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-wifi" aria-hidden="true"></i><h3>Wired & Wireless Network Design and Implementation <small dir="ltr">LAN, WAN &amp; Wireless Network Solutions</small></h3></div><p>LAN, WAN, branch connectivity, and high-performance Wi-Fi with professional wireless surveys.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Network Security & Firewalls <small dir="ltr">Network Security &amp; Firewall Solutions</small></h3></div><p>Modern firewalls, policies, traffic management, monitoring, and response protect digital assets.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-user-shield" aria-hidden="true"></i><h3>VPN & Secure Remote Access <small dir="ltr">VPN &amp; Remote Access Solutions</small></h3></div><p>Encrypted VPN connectivity provides secure access for branches and employees.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3>Network Monitoring & Performance Optimization <small dir="ltr">Network Monitoring &amp; Performance Optimization</small></h3></div><p>Continuous analysis identifies bottlenecks and faults before they affect operations.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-phone-volume" aria-hidden="true"></i><h3>IP Telephony & Unified Communications <small dir="ltr">IP Telephony &amp; Unified Communications</small></h3></div><p>Voice, video, VoIP, and branch communications integrated on one platform.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow managed-it-why networking-why" aria-labelledby="networking-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Stable Networks That Grow with Your Business</span>
            <h2 id="networking-why-title">Why Choose Almutaqaddim for Network Solutions?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Precise Engineering Design</h3><p>We assess current needs and future growth before designing the network.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Scalable Solutions</h3><p>Networks expand without rebuilding the foundation.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Reliable Technology</h3><p>We use trusted global equipment for strong performance and stability.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>Professional Implementation</h3><p>Delivery follows global standards and technical best practices.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">05</span><h3>Specialized Technical Support</h3><p>Ongoing support maintains stability and performance.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="networking-cta-title">
        <div className="contact-cta-copy">
          <h2 id="networking-cta-title">Upgrade Your Organization's Network</h2>
          <p>We design secure, reliable infrastructure for every system and future growth. With <strong>Almutaqaddim</strong> , your network becomes a strong digital foundation.</p>
        </div>
        <div className="contact-cta-actions">
          <EnglishLink className="contact-cta-button" href="#contact">Request an Infrastructure Assessment <span aria-hidden="true">→</span></EnglishLink>
        </div>
      </section>
    </div>
  );
}
