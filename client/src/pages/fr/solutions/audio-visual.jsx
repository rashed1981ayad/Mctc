import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionAudioVisualFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main audio-visual-main" lang="fr" dir="ltr">
      <section className="enterprise-hero audio-visual-hero" aria-labelledby="audio-visual-hero-title">
        <img src="/site-assets/audio-visual-hero.webp" alt="Salle de réunion moderne illustrant les solutions audiovisuelles et de sonorisation" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="audio-visual-hero-title">Des systèmes audiovisuels intégrés pour améliorer la communication des organisations</h1>
          <p>Une expérience professionnelle pour les réunions, les présentations et la diffusion d’annonces dans vos bâtiments et installations.</p>
        </div>
      </section>

      <section className="enterprise-introduction audio-visual-introduction" aria-label="Présentation des systèmes audiovisuels et de sonorisation">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Les systèmes audiovisuels jouent un rôle central dans la communication des organisations et des espaces publics : diffusion claire de l’information, réunions, présentations et annonces. Chez <strong>Almutaqaddim</strong>, nous proposons des solutions audiovisuelles et de sonorisation intégrées pour améliorer la communication au sein des bâtiments et des organisations.</p>
          <p className="enterprise-intro-text">Nos solutions modernes s’intègrent aux infrastructures réseau et aux systèmes de bâtiments intelligents pour créer un environnement de communication flexible adapté au travail d’aujourd’hui.</p>
        </div>
      </section>

      <section className="enterprise-services audio-visual-scope" aria-labelledby="audio-visual-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="audio-visual-scope-title">Notre offre de solutions audiovisuelles</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-bullhorn" aria-hidden="true"></i><h3>Systèmes de sonorisation et d’évacuation vocale</h3></div>
              <p>Des systèmes audio centralisés pour les annonces et les consignes d’urgence, afin d’assurer une communication claire et une évacuation sûre et organisée.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-volume-high" aria-hidden="true"></i><h3>Systèmes audio professionnels</h3></div>
              <p>Des systèmes de haute qualité qui diffusent un son clair et équilibré dans les salles, les théâtres, les espaces de réunion et les lieux publics.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tv" aria-hidden="true"></i><h3>Systèmes d’affichage et de signalétique numérique</h3></div>
              <p>Des solutions d’affichage avancées comprenant des écrans professionnels et des systèmes de <bdi>signalétique numérique</bdi> pour diffuser des contenus multimédias, publicitaires et informatifs dynamiques, faciles à actualiser.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-video" aria-hidden="true"></i><h3>Systèmes de conférence et de collaboration</h3></div>
              <p>Des solutions avancées pour les réunions en présentiel et à distance, avec affichage de contenus, son, microphones et caméras de conférence.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-sliders" aria-hidden="true"></i><h3>Systèmes de commande centralisée</h3></div>
              <p>Des plateformes unifiées pour gérer le son, la vidéo, l’éclairage et les écrans depuis un seul panneau de commande ou une application intelligente.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow audio-visual-why" aria-labelledby="audio-visual-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Des solutions réfléchies pour une expérience intégrée</span>
            <h2 id="audio-visual-why-title">Pourquoi choisir Almutaqaddim pour vos solutions audiovisuelles ?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Une conception adaptée à votre environnement</h3>
              <p>Nous étudions les installations et leurs besoins de communication pour concevoir un système offrant les meilleures performances possibles.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Intégration technologique</h3>
              <p>Nous intégrons les systèmes audiovisuels aux réseaux et aux plateformes de bâtiments intelligents pour garantir stabilité et simplicité de gestion.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Déploiement professionnel</h3>
              <p>Des spécialistes installent et calibrent chaque système pour offrir une expérience audiovisuelle de qualité.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Solutions évolutives</h3>
              <p>Les systèmes peuvent être étendus au rythme de l’évolution des besoins de votre organisation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="audio-visual-cta-title">
        <div className="contact-cta-copy">
          <h2 id="audio-visual-cta-title">Transformez la communication au sein de votre organisation</h2>
          <p>Nous concevons des environnements audiovisuels intégrés qui améliorent la communication et favorisent un cadre de travail plus efficace et professionnel. Avec Almutaqaddim, un son clair, des images percutantes et un contrôle simple se réunissent dans une expérience intelligente.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une proposition technique <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
