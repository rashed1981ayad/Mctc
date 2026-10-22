import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionFireAlarmEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main fire-alarm-main">
      <section className="enterprise-hero fire-alarm-hero" aria-labelledby="fire-alarm-hero-title">
        <img src="/site-assets/fire-alarm-hero.webp" alt="Activating a fire alarm point during an emergency response" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="fire-alarm-hero-title">Proactive Protection for Lives and Property</h1>
          <p>Intelligent systems detect hazards early and enable rapid emergency response across facilities.</p>
        </div>
      </section>

      <section className="enterprise-introduction fire-alarm-introduction" aria-label="Introduction to fire alarm and detection systems">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Fire alarm and detection systems are the first line of defense for lives and property. Advanced technology identifies smoke, heat, or flame at an early stage, allowing action before a fire spreads.</p>
          <p className="enterprise-intro-text"> <strong>Almutaqaddim</strong> offers integrated fire alarm and detection solutions designed to international standards and modern safety requirements for institutions and critical facilities.</p>
        </div>
      </section>

      <section className="enterprise-services fire-alarm-scope" aria-labelledby="fire-alarm-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="fire-alarm-scope-title">Scope of Fire Alarm & Detection Solutions</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-fire-extinguisher" aria-hidden="true"></i><h3>Fire Alarm Systems <bdi>Conventional and Addressable</bdi></h3></div><p>Design and implementation based on building type and size, with addressable systems locating incidents precisely for faster response.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-smog" aria-hidden="true"></i><h3>Smoke & Heat Detection</h3></div><p>High-sensitivity smoke and heat detectors identify early warning signs and reduce risk before a fire develops.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-magnifying-glass-chart" aria-hidden="true"></i><h3>Advanced Early Detection</h3></div><p>Sensitive or high-risk locations can use advanced systems that detect smoke or heat at a very early stage, giving safety teams more time to respond.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-bullhorn" aria-hidden="true"></i><h3>Voice Evacuation & Public Alarm Systems</h3></div><p>Clear voice instructions organize emergency evacuation and reduce confusion.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-display" aria-hidden="true"></i><h3>Monitoring & Alert Systems</h3></div><p>Central control panels continuously monitor the system and issue immediate alarm or fault notifications.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow fire-alarm-why" aria-labelledby="fire-alarm-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Safety Designed Around Your Facility</span>
            <h2 id="fire-alarm-why-title">Why Choose Almutaqaddim for Fire Alarm Solutions?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Precise Engineering Design</h3><p>We analyze site risk and safety requirements to design systems that meet international and civil defense standards.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Reliable Technology</h3><p>High-quality equipment ensures accurate detection and rapid response.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Professional Implementation</h3><p>Technical best practices ensure long-term stability and reliability.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="fire-alarm-cta-title">
        <div className="contact-cta-copy">
          <h2 id="fire-alarm-cta-title">Strengthen Facility Safety with a Reliable Fire Alarm System</h2>
          <p>We design integrated fire detection and alarm systems for maximum protection and fast emergency response. With Almutaqaddim, safety becomes part of your building's intelligent infrastructure.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request a Facility Safety Assessment <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
