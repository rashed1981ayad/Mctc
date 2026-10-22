import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionSmallOfficeFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main small-office-main" lang="fr" dir="ltr">
      <section className="enterprise-hero small-office-hero" aria-labelledby="small-office-hero-title">
        <img src="/site-assets/small-office-hero.webp" alt="Bureau moderne illustrant des technologies fiables pour les petites entreprises" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="small-office-hero-title">Une technologie fiable et sécurisée pour accompagner la croissance de votre entreprise, améliorer son efficacité et répondre aux exigences de l’avenir numérique.</h1>
        </div>
      </section>

      <section className="enterprise-introduction small-office-introduction" aria-labelledby="small-office-audience-title">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Chez Almutaqaddim, nous savons que les petites entreprises ont besoin de <strong>technologies pratiques, fiables et économiques</strong> qui assurent la continuité sans complexité. Nous avons créé une offre de <bdi><strong>projets pour petits bureaux</strong></bdi> comme un socle intégré, prêt à l’emploi, pour aujourd’hui et la croissance future.</p>

          <div className="enterprise-audience-layout">
            <div className="enterprise-audience-heading">
              <span>Nos clients</span>
              <h2 id="small-office-audience-title">À qui s’adresse cette solution ?</h2>
            </div>

            <div className="enterprise-audience-grid" role="list">
              <article className="enterprise-audience-card" role="listitem"><span>Bureaux administratifs</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Jeunes entreprises <bdi>(Jeunes entreprises)</bdi></span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Cliniques et centres médicaux</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Cabinets juridiques et de conseil</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Entreprises de services</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Petites succursales de grandes organisations</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-services small-office-services" aria-labelledby="small-office-services-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="small-office-services-title">Systèmes et solutions pour les projets <bdi>Petits bureaux</bdi></h2>
            <p>Notre offre couvre la conception, le déploiement, la mise en service et l’assistance, selon la taille et l’activité de l’entreprise.</p>
          </div>

          <figure className="enterprise-services-visual">
            <img src="/site-assets/small-office-services.webp" alt="Schéma des solutions réseau, serveur, vidéosurveillance et communication pour petits bureaux" loading="lazy" />
          </figure>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-wifi" aria-hidden="true"></i><h3>Réseaux <bdi>LAN</bdi> et <bdi>Wi-Fi</bdi></h3></div>
              <p>Des réseaux de bureau filaires et sans fil efficaces, configurés pour la stabilité et la simplicité de gestion.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><h3>Câblage cuivre et fibre optique</h3></div>
              <p>Un câblage soigné et planifié réduit les pannes et facilite les extensions futures.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-cloud" aria-hidden="true"></i><h3>Petits serveurs ou solutions cloud</h3></div>
              <p>Des serveurs de bureau ou plateformes cloud pour les fichiers et services essentiels, avec des autorisations d’accès adaptées.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Sécurité essentielle des réseaux et des données</h3></div>
              <p>Une protection pratique des réseaux, terminaux et accès pour les petites entreprises.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-video" aria-hidden="true"></i><h3>Vidéosurveillance et contrôle d’accès</h3></div>
              <p>Les systèmes de vidéosurveillance, de suivi des présences et de contrôle d’accès améliorent la visibilité et la sécurité.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-fire-extinguisher" aria-hidden="true"></i><h3>Détection et alarme incendie</h3></div>
              <p>Des systèmes fiables de détection et d’alarme incendie renforcent la sécurité et la continuité.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-display" aria-hidden="true"></i><h3>Systèmes audiovisuels et de communication</h3></div>
              <p>Des solutions pratiques pour le son, les salles de réunion, les présentations et les communications IP améliorent la collaboration.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i><h3>Assistance technique, gestion et maintenance</h3></div>
              <p>Assistance sur site et à distance, maintenance, sauvegarde, configuration des appareils et gestion des utilisateurs assurent la stabilité du travail.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow small-office-workflow" aria-labelledby="small-office-workflow-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Des étapes claires et une réalisation concrète</span>
            <h2 id="small-office-workflow-title">Notre approche</h2>
            <p>Pour les projets de <bdi>petits bureaux</bdi>, nous suivons une méthode simple et professionnelle.</p>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Analyse des besoins</h3>
              <p>Comprendre les opérations, les utilisateurs et les besoins.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Conception technique</h3>
              <p>Concilier performance, coût et évolutivité.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Déploiement et installation</h3>
              <p>Une réalisation rapide et organisée selon les normes techniques.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Tests et mise en service</h3>
              <p>Tester et livrer des systèmes prêts à fonctionner.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>Assistance et service après-vente</h3>
              <p>Maintenir la continuité grâce à l’assistance et à la maintenance.</p>
            </article>
          </div>
        </div>
      </section>

      <aside className="small-office-workflow-outcome" aria-label="Résultat de notre méthode de réalisation">
        <p>Le résultat : une solution sur mesure, économique et évolutive, déployée sans perturber le travail et accompagnée d’une assistance fiable.</p>
      </aside>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="small-office-cta-title">
        <div className="contact-cta-copy">
          <h2 id="small-office-cta-title">Prêt à disposer d’un environnement technologique stable dans votre bureau ?</h2>
          <p>Nous définissons le périmètre adapté et un plan de mise en œuvre permettant des extensions sans reconstruction.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation rapide de votre bureau <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
