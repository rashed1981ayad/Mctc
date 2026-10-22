import React from "react";
import EnglishLink from "../../../components/EnglishLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.en.css";

export default function SolutionAudioVisualEn() {
  useWorkflowReveal(".reference-site-en");
  return (
<div className="enterprise-main audio-visual-main">
      <section className="enterprise-hero audio-visual-hero" aria-labelledby="audio-visual-hero-title">
        <img src="/site-assets/audio-visual-hero.webp" alt="Modern meeting room representing audio-visual and public communication solutions" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="audio-visual-hero-title">Integrated Audio-Visual Systems That Improve Organizational Communication</h1>
          <p>A professional experience for meetings, presentations, and public messaging across buildings and facilities.</p>
        </div>
      </section>

      <section className="enterprise-introduction audio-visual-introduction" aria-label="Introduction to audio-visual and public communication systems">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Audio-visual systems play a central role in communication across organizations and public spaces, supporting clear information delivery, meetings, presentations, and public messaging. At <strong>Almutaqaddim</strong> , we provide integrated audio-visual and public communication solutions designed to improve communication across buildings and organizations.</p>
          <p className="enterprise-intro-text">Our modern solutions integrate with network infrastructure and smart building systems to create a flexible communication environment for today's workplace.</p>
        </div>
      </section>

      <section className="enterprise-services audio-visual-scope" aria-labelledby="audio-visual-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="audio-visual-scope-title">Scope of Audio-Visual Solutions</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-bullhorn" aria-hidden="true"></i><h3>Public Address & Voice Evacuation Systems</h3></div>
              <p>Centralized audio systems for announcements and emergency guidance, supporting clear communication and safe, organized evacuation.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-volume-high" aria-hidden="true"></i><h3>Professional Audio Systems</h3></div>
              <p>High-quality systems that distribute clear, balanced sound across halls, theaters, meeting rooms, and public spaces.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tv" aria-hidden="true"></i><h3>Visual Display & Digital Signage Systems</h3></div>
              <p>Advanced display solutions including professional screens and <bdi>Digital Signage</bdi> systems for dynamic media, advertising, and information content that is easy to update.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-video" aria-hidden="true"></i><h3>Conference & Collaboration Systems</h3></div>
              <p>Advanced solutions for in-person and virtual meetings, including content display, audio, microphones, and conference cameras.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-sliders" aria-hidden="true"></i><h3>Centralized Control Systems</h3></div>
              <p>Unified platforms that manage audio, video, lighting, and displays from one control panel or smart app.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow audio-visual-why" aria-labelledby="audio-visual-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Thoughtful Solutions and an Integrated Experience</span>
            <h2 id="audio-visual-why-title">Why Choose Almutaqaddim for Audio-Visual Solutions?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Designed for Your Environment</h3>
              <p>We study the facility and its communication needs to design a system that delivers the best possible performance.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Technology Integration</h3>
              <p>We integrate audio-visual systems with networks and smart building platforms for stable performance and simple management.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Professional Implementation</h3>
              <p>Specialists install and calibrate every system for a high-quality audio-visual experience.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Scalable Solutions</h3>
              <p>Systems can be expanded as your organization's needs grow.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="audio-visual-cta-title">
        <div className="contact-cta-copy">
          <h2 id="audio-visual-cta-title">Transform Communication Across Your Organization</h2>
          <p>We design integrated audio-visual environments that improve communication and support a more efficient, professional workplace. With Almutaqaddim, clear sound, powerful visuals, and simple control come together in one smart experience.</p>
        </div>
        <EnglishLink className="contact-cta-button" href="#contact">Request a Technical Proposal <span aria-hidden="true">→</span></EnglishLink>
      </section>
    </div>
  );
}
