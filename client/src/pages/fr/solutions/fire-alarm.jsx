import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionFireAlarmFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main fire-alarm-main" lang="fr" dir="ltr">
      <section className="enterprise-hero fire-alarm-hero" aria-labelledby="fire-alarm-hero-title">
        <img src="/site-assets/fire-alarm-hero.webp" alt="Activation d’un déclencheur d’alarme incendie lors d’une intervention d’urgence" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="fire-alarm-hero-title">Une protection proactive des personnes et des biens</h1>
          <p>Des systèmes intelligents détectent les dangers au plus tôt et permettent une réponse rapide aux urgences dans vos installations.</p>
        </div>
      </section>

      <section className="enterprise-introduction fire-alarm-introduction" aria-label="Présentation des systèmes de détection et d’alarme incendie">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Les systèmes de détection et d’alarme incendie constituent la première ligne de défense des personnes et des biens. Une technologie avancée identifie la fumée, la chaleur ou les flammes dès leur apparition pour agir avant que l’incendie ne se propage.</p>
          <p className="enterprise-intro-text"> <strong>Almutaqaddim</strong> propose des solutions intégrées de détection et d’alarme incendie conçues selon les normes internationales et les exigences de sécurité modernes des institutions et des installations critiques.</p>
        </div>
      </section>

      <section className="enterprise-services fire-alarm-scope" aria-labelledby="fire-alarm-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="fire-alarm-scope-title">Notre offre de détection et d’alarme incendie</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-fire-extinguisher" aria-hidden="true"></i><h3>Systèmes d’alarme incendie <bdi>Conventionnels et adressables</bdi></h3></div><p>Une conception et une réalisation adaptées au type et à la taille du bâtiment, avec des systèmes adressables qui localisent précisément les incidents pour accélérer la réponse.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-smog" aria-hidden="true"></i><h3>Détection de fumée et de chaleur</h3></div><p>Des détecteurs de fumée et de chaleur à haute sensibilité identifient les premiers signes d’alerte et réduisent les risques avant le développement d’un incendie.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-magnifying-glass-chart" aria-hidden="true"></i><h3>Détection précoce avancée</h3></div><p>Les sites sensibles ou à haut risque peuvent utiliser des systèmes avancés détectant la fumée ou la chaleur très tôt, pour donner aux équipes de sécurité davantage de temps pour intervenir.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-bullhorn" aria-hidden="true"></i><h3>Systèmes d’évacuation vocale et d’alarme générale</h3></div><p>Des instructions vocales claires organisent l’évacuation d’urgence et réduisent la confusion.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-display" aria-hidden="true"></i><h3>Systèmes de supervision et d’alerte</h3></div><p>Des centrales supervisent en continu le système et signalent immédiatement les alarmes ou les défauts.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow fire-alarm-why" aria-labelledby="fire-alarm-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Une sécurité conçue pour vos installations</span>
            <h2 id="fire-alarm-why-title">Pourquoi choisir Almutaqaddim pour vos alarmes incendie ?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Conception technique précise</h3><p>Nous analysons les risques du site et les exigences de sécurité pour concevoir des systèmes conformes aux normes internationales et de protection civile.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Technologie fiable</h3><p>Des équipements de haute qualité assurent une détection précise et une réponse rapide.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Déploiement professionnel</h3><p>Les bonnes pratiques techniques garantissent une stabilité et une fiabilité durables.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="fire-alarm-cta-title">
        <div className="contact-cta-copy">
          <h2 id="fire-alarm-cta-title">Renforcez la sécurité de vos installations avec une alarme incendie fiable</h2>
          <p>Nous concevons des systèmes intégrés de détection et d’alarme incendie pour une protection maximale et une réponse rapide aux urgences. Avec Almutaqaddim, la sécurité fait partie de l’infrastructure intelligente de votre bâtiment.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation de la sécurité des installations <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
