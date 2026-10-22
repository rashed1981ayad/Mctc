import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionBmsEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main bms-main">
      <section className="enterprise-hero bms-hero" aria-labelledby="bms-hero-title">
        <img src="/site-assets/bms-hero.webp" alt="Intelligent digital platform for centralized control of building systems" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="bms-hero-title">Intelligent Centralized Control for a Unified Building Environment</h1>
          <p>Improve operational efficiency, strengthen security, and reduce energy consumption in a smarter, more sustainable environment.</p>
        </div>
      </section>

      <section className="enterprise-introduction bms-introduction" aria-label="Introduction to building management systems">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Building management systems <bdi>(Building Management Systems – BMS)</bdi> is an intelligent centralized platform for monitoring, managing, and operating a building's critical systems. It connects HVAC, lighting, energy, safety, and security in an integrated environment that improves efficiency, enhances safety, and reduces long-term cost.</p>
          <p className="enterprise-intro-text">At <strong>Almutaqaddim</strong>, we provide more than a control system: we create an intelligent operational environment that supports building sustainability and future readiness.</p>
        </div>
      </section>

      <section className="enterprise-services bms-scope" aria-labelledby="bms-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="bms-scope-title">Scope of Building Management Solutions</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-compass-drafting" aria-hidden="true"></i><h3>Integrated Engineering Design</h3></div>
              <p>We assess the building's electrical and mechanical infrastructure and design a tailored <bdi>BMS</bdi> architecture that matches its activity, size, and present and future operating requirements.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-temperature-half" aria-hidden="true"></i><h3>HVAC Integration & Management</h3></div>
              <p>Intelligent HVAC control based on occupancy and environmental conditions for stable comfort and lower energy use.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-lightbulb" aria-hidden="true"></i><h3>Smart Lighting Control</h3></div>
              <p>Automated lighting based on movement, schedules, or programmed scenarios to reduce waste and improve user comfort.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-bolt" aria-hidden="true"></i><h3>Energy Monitoring & Management</h3></div>
              <p>Central monitoring of electrical loads and consumption data to improve decisions and reduce operating costs.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-diagram-project" aria-hidden="true"></i><h3>Integration Through Global Protocols</h3></div>
              <p>Open standards such as <bdi>KNX</bdi> ensure stability, scalability, and compatibility across manufacturers without future restrictions.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Security & Safety Integration</h3></div>
              <p>Connect <bdi>BMS</bdi> with access control, fire alarms, and CCTV for a fully integrated and secure operating environment.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-laptop" aria-hidden="true"></i><h3>Remote Monitoring & Control</h3></div>
              <p>A centralized dashboard with secure remote access and instant critical alerts for rapid response and continuous operation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow bms-why" aria-labelledby="bms-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>One Unified System to Professional Standards</span>
            <h2 id="bms-why-title">Why Choose Almutaqaddim for BMS?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Tailored Design</h3>
              <p>We design around your facility instead of relying on generic packaged solutions.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Comprehensive Integration</h3>
              <p>We integrate low-current systems and infrastructure within one unified platform.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Global Standards</h3>
              <p>Solutions use open protocols and remain scalable for the future.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Organized Implementation</h3>
              <p>Professional delivery without disrupting operations inside the facility.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>Local Technical Support</h3>
              <p>Fast response and continuous service keep the system stable.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="bms-cta-title">
        <div className="contact-cta-copy">
          <h2 id="bms-cta-title">Ready to Transform Your Building into a Smart Operating Environment?</h2>
          <p>We design building management systems that balance efficiency, security, and sustainability without unnecessary complexity. With Almutaqaddim, your building operates intelligently and reliably today and into the future.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request a Building Assessment <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
