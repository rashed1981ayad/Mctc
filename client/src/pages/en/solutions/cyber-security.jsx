import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionCyberSecurityEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main cyber-security-main">
      <section className="enterprise-hero cyber-security-hero" aria-labelledby="cyber-security-hero-title">
        <img src="/site-assets/cyber-security-hero.webp" alt="Digital interface representing protection from cyber risks" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cyber-security-hero-title">Protecting Your Business with Integrated Cybersecurity</h1>
          <p>Reduce digital risk and maintain operational continuity in a constantly changing technology environment.</p>
        </div>
      </section>

      <section className="enterprise-introduction cyber-security-introduction" aria-label="Introduction to cybersecurity">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">As digital transformation accelerates and organizations depend on connected systems and cloud services, cybersecurity is essential to business continuity and the protection of data and operations.</p>
          <p className="enterprise-intro-text">At <strong>Almutaqaddim</strong> , we provide integrated cybersecurity solutions against modern threats while maintaining operational efficiency and supporting stable digital growth.</p>
          <p className="enterprise-intro-text">We treat cybersecurity as an integrated strategy that reduces risk and strengthens business reliability, not as a standalone product.</p>
        </div>
      </section>

      <section className="enterprise-services cyber-security-scope" aria-labelledby="cyber-security-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cyber-security-scope-title">Integrated Protection Framework</h2>
            <p>Almutaqaddim combines people, processes, and technology to deliver balanced, sustainable protection.</p>
          </div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-users" aria-hidden="true"></i><h3>People <bdi>(People)</bdi></h3></div><p>Cybersecurity begins with users. We raise security awareness and apply data protection practices that reduce human error, one of the leading causes of breaches.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-list-check" aria-hidden="true"></i><h3>Processes <bdi>(Processes)</bdi></h3></div><p>We build clear procedures for risk management and incident response, from threat detection and analysis through rapid recovery and operational restoration.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Technology <bdi>(Technology)</bdi></h3></div><p>Advanced protection includes next-generation firewalls, intrusion detection and prevention, email and endpoint protection, and security for networks and cloud environments, with sophisticated threat detection and response.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cyber-security-why" aria-labelledby="cyber-security-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Clearer Protection and Integrated Operational Visibility</span>
            <h2 id="cyber-security-why-title">What Sets Almutaqaddim Apart in Cybersecurity?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>We Speak Your Language</h3>
              <p>We turn complex technical concepts into clear solutions that help decision-makers understand risk and act confidently.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>A Clear, Practical Approach</h3>
              <p>We follow carefully planned implementation steps toward stronger security without unnecessary complexity or disruption.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>We Think with the Client</h3>
              <p>We begin with your business goals and design security that supports growth and reduces operational risk.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Industry Expertise</h3>
              <p>We understand the requirements of different industries and tailor protection to each work environment.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cyber-security-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cyber-security-cta-title">Begin Your Journey to a Safer Digital Environment</h2>
          <p><strong>Almutaqaddim, your partner for a secure digital environment.</strong> Through an integrated cybersecurity strategy combining technical expertise and operational insight, Almutaqaddim helps organizations protect their business, strengthen digital resilience, and advance with confidence.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request an Initial Security Readiness Assessment <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
