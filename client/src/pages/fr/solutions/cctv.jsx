import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionCctvFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main cctv-main" lang="fr" dir="ltr">
      <section className="enterprise-hero cctv-hero" aria-labelledby="cctv-hero-title">
        <img src="/site-assets/cctv-hero.webp" alt="Caméra de vidéosurveillance professionnelle protégeant une installation" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cctv-hero-title">Des systèmes de vidéosurveillance professionnels et intégrés</h1>
          <p>Renforcez la sécurité de vos installations et bénéficiez en permanence d’une vision précise et fiable de vos opérations.</p>
        </div>
      </section>

      <section className="enterprise-introduction cctv-introduction" aria-label="Présentation des systèmes de vidéosurveillance">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">La vidéosurveillance est devenue essentielle à la gestion des risques et à la sécurité opérationnelle. Au-delà de l’enregistrement des événements, elle protège les biens, facilite les décisions et améliore la réponse aux incidents. Chez <strong>Almutaqaddim</strong>, nous proposons des solutions intégrées de <bdi>vidéosurveillance</bdi> adaptées à chaque installation, en privilégiant la qualité, la fiabilité et l’intégration aux infrastructures pour une protection durable.</p>
          <p className="enterprise-intro-text">Nous allons au-delà de l’installation de caméras : nous créons des environnements de surveillance intelligents au service de la stabilité opérationnelle à long terme.</p>
        </div>
      </section>

      <section className="enterprise-services cctv-scope" aria-labelledby="cctv-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cctv-scope-title">Notre offre de vidéosurveillance</h2>
            <p>Nous proposons des solutions intégrées associant imagerie et analyse modernes, interfaces intuitives, gestion centralisée et supervision à distance sécurisée.</p>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-camera" aria-hidden="true"></i><h3>Systèmes de caméras de vidéosurveillance</h3></div>
              <p>Fourniture et installation de caméras de haute qualité <bdi>IP</bdi> et <bdi>analogiques</bdi> pour l’intérieur et l’extérieur, avec des résolutions allant jusqu’à la <bdi>4K</bdi>, comprenant des caméras fixes, motorisées PTZ, thermiques et de reconnaissance des plaques d’immatriculation, avec supervision à distance sécurisée.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-hard-drive" aria-hidden="true"></i><h3>Enregistrement et gestion vidéo <bdi>(VMS)</bdi></h3></div>
              <p>Une infrastructure d’enregistrement professionnelle utilisant des systèmes performants <bdi>NVR</bdi> et <bdi>DVR</bdi>, avec stockage sécurisé, recherche rapide et gestion centralisée en salle de contrôle.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-eye" aria-hidden="true"></i><h3>Analyse vidéo intelligente</h3></div>
              <p>L’intelligence artificielle transforme la surveillance en analyse proactive : détection des activités inhabituelles, alertes immédiates et meilleure réponse aux incidents.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tower-broadcast" aria-hidden="true"></i><h3>Solutions de caméras temporaires</h3></div>
              <p>Une surveillance flexible et rapidement déployée pour les chantiers, événements et expositions, sans infrastructure permanente ni investissement à long terme.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cctv-why" aria-labelledby="cctv-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Une protection réfléchie et un déploiement fiable</span>
            <h2 id="cctv-why-title">Pourquoi choisir Almutaqaddim pour la vidéosurveillance ?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Expertise technique spécialisée</h3>
              <p>Nos équipes d’ingénierie et techniques disposent d’une expérience concrète dans la réalisation de projets de sécurité et de vidéosurveillance de toutes tailles.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Engagement qualité</h3>
              <p>Les bonnes pratiques d’ingénierie garantissent une réalisation professionnelle et durable.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Une approche centrée sur le client</h3>
              <p>Une gestion de projet dédiée à chaque contrat assure un suivi rigoureux et l’adéquation aux besoins opérationnels.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Solutions évolutives</h3>
              <p>Les systèmes peuvent évoluer sans reconstruire l’infrastructure de base.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cctv-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cctv-cta-title">Renforcez la sécurité de vos installations avec une vidéosurveillance professionnelle</h2>
          <p>Nous concevons un système intégré de vidéosurveillance adapté à vos activités, conciliant sécurité, simplicité de gestion et évolutivité.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une proposition technique et financière sur mesure <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
