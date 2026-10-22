import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionDataCenterFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main data-center-main" lang="fr" dir="ltr">
      <section className="enterprise-hero data-center-hero" aria-labelledby="data-center-hero-title">
        <img src="/site-assets/data-center-hero.webp" alt="Baies de serveurs dans un centre de données à haute disponibilité" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="data-center-hero-title">Des centres de données à haute disponibilité</h1>
          <p>Assurez la continuité des opérations, un accès rapide aux données et une croissance numérique stable en toute confiance.</p>
        </div>
      </section>

      <section className="enterprise-introduction data-center-introduction" aria-label="Présentation des centres de données">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Avec l’augmentation des volumes de données et la dépendance des organisations aux applications et services numériques, les centres de données sont devenus le socle de la continuité des activités et de la performance des systèmes critiques.</p>
          <p className="enterprise-intro-text">Almutaqaddim propose des <strong>Almutaqaddim</strong> solutions intégrées de centres de données qui associent efficacité opérationnelle, sécurité physique et évolutivité dans un environnement stable conçu pour une croissance sans interruption.</p>
          <p className="enterprise-intro-text">Nous concevons des environnements opérationnels intelligents qui réduisent les risques, améliorent l’efficacité et maintiennent les plus hauts niveaux de disponibilité.</p>
        </div>
      </section>

      <section className="enterprise-services data-center-scope" aria-labelledby="data-center-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="data-center-scope-title">Les composants d’une infrastructure intégrée</h2>
          </div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-building-shield" aria-hidden="true"></i><h3>Infrastructure physique et installations <bdi>(Infrastructure et installations)</bdi></h3></div><p>Aménagement des espaces, extinction incendie, contrôle d’accès et protection physique des équipements technologiques.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-bolt" aria-hidden="true"></i><h3>Alimentation électrique et refroidissement</h3></div><p>Une alimentation sans interruption <bdi>(UPS)</bdi>, des groupes électrogènes de secours et un refroidissement intelligent économe en énergie maintiennent les performances et évitent les interruptions imprévues.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-server" aria-hidden="true"></i><h3>Calcul et stockage</h3></div><p>Des serveurs et un stockage haute performance pour les applications et bases de données critiques, avec des capacités flexibles pour accompagner la croissance.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow data-center-why" aria-labelledby="data-center-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Une disponibilité continue et une infrastructure qui évolue avec vous</span>
            <h2 id="data-center-why-title">Pourquoi choisir Almutaqaddim pour vos centres de données ?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Conception évolutive</h3><p>Des centres de données qui évoluent avec votre entreprise sans reconstruire leurs fondations.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Efficacité opérationnelle durable</h3><p>Des solutions axées sur la réduction de la consommation d’énergie et des coûts d’exploitation.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Intégration complète</h3><p>Réseaux, stockage et sécurité fonctionnent ensemble pour garantir des flux de données sûrs et stables.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>Assistance technique spécialisée</h3><p>Une équipe technique qui maintient la stabilité et améliore continuellement l’environnement.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="data-center-cta-title">
        <div className="contact-cta-copy">
          <h2 id="data-center-cta-title">Besoin d’une infrastructure numérique plus fiable et prête pour l’avenir ?</h2>
          <p>Nous vous aidons à concevoir ou moderniser un centre de données qui concilie performance, efficacité et évolutivité sans perturber les opérations critiques.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation du centre de données <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
