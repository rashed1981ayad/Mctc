import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionBmsFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main bms-main" lang="fr" dir="ltr">
      <section className="enterprise-hero bms-hero" aria-labelledby="bms-hero-title">
        <img src="/site-assets/bms-hero.webp" alt="Plateforme numérique intelligente de commande centralisée des systèmes du bâtiment" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="bms-hero-title">Un contrôle centralisé intelligent pour un bâtiment entièrement intégré</h1>
          <p>Améliorez l’efficacité opérationnelle, renforcez la sécurité et réduisez la consommation d’énergie dans un environnement plus intelligent et plus durable.</p>
        </div>
      </section>

      <section className="enterprise-introduction bms-introduction" aria-label="Présentation de la gestion technique des bâtiments">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">La gestion technique des bâtiments <bdi>(BMS)</bdi> repose sur une plateforme centralisée intelligente pour superviser, gérer et exploiter les systèmes essentiels d’un bâtiment. Elle relie le chauffage, la ventilation, la climatisation, l’éclairage, l’énergie et la sécurité dans un environnement intégré qui améliore l’efficacité et réduit les coûts à long terme.</p>
          <p className="enterprise-intro-text">Chez <strong>Almutaqaddim</strong>, nous allons au-delà d’un simple système de commande : nous créons un environnement opérationnel intelligent qui favorise la durabilité du bâtiment et prépare son avenir.</p>
        </div>
      </section>

      <section className="enterprise-services bms-scope" aria-labelledby="bms-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="bms-scope-title">Notre offre de gestion technique des bâtiments</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-compass-drafting" aria-hidden="true"></i><h3>Conception technique intégrée</h3></div>
              <p>Nous évaluons les infrastructures électriques et mécaniques du bâtiment et concevons une architecture <bdi>BMS</bdi> adaptée à son activité, à sa taille et à ses besoins opérationnels actuels et futurs.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-temperature-half" aria-hidden="true"></i><h3>Intégration et gestion du chauffage, de la ventilation et de la climatisation</h3></div>
              <p>Un contrôle intelligent des équipements de chauffage, de ventilation et de climatisation selon l’occupation et les conditions ambiantes, pour un confort constant et une consommation réduite.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-lightbulb" aria-hidden="true"></i><h3>Commande intelligente de l’éclairage</h3></div>
              <p>Un éclairage automatisé selon les mouvements, les horaires ou des scénarios programmés pour réduire le gaspillage et améliorer le confort des occupants.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-bolt" aria-hidden="true"></i><h3>Suivi et gestion de l’énergie</h3></div>
              <p>Une supervision centralisée des charges électriques et des données de consommation pour améliorer les décisions et réduire les coûts d’exploitation.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-diagram-project" aria-hidden="true"></i><h3>Intégration par des protocoles internationaux</h3></div>
              <p>Des normes ouvertes telles que <bdi>KNX</bdi> garantissent stabilité, évolutivité et compatibilité entre fabricants, sans contraintes futures.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Intégration des systèmes de sûreté et de sécurité</h3></div>
              <p>Reliez les systèmes <bdi>BMS</bdi> au contrôle d’accès, aux alarmes incendie et à la vidéosurveillance pour créer un environnement opérationnel entièrement intégré et sécurisé.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-laptop" aria-hidden="true"></i><h3>Supervision et commande à distance</h3></div>
              <p>Un tableau de bord centralisé avec un accès distant sécurisé et des alertes critiques immédiates pour intervenir rapidement et assurer la continuité des opérations.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow bms-why" aria-labelledby="bms-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Un système unifié conforme aux standards professionnels</span>
            <h2 id="bms-why-title">Pourquoi choisir Almutaqaddim pour la gestion technique des bâtiments ?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Conception sur mesure</h3>
              <p>Nous concevons une solution adaptée à vos installations plutôt que de recourir à des offres génériques.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Intégration complète</h3>
              <p>Nous intégrons les systèmes à courants faibles et les infrastructures dans une plateforme unifiée.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Normes internationales</h3>
              <p>Des solutions utilisant des protocoles ouverts et conçues pour évoluer.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Déploiement organisé</h3>
              <p>Une réalisation professionnelle sans perturber les activités dans les installations.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>Assistance technique locale</h3>
              <p>Une intervention rapide et un service continu pour maintenir la stabilité du système.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="bms-cta-title">
        <div className="contact-cta-copy">
          <h2 id="bms-cta-title">Prêt à transformer votre bâtiment en un environnement opérationnel intelligent ?</h2>
          <p>Nous concevons des systèmes de gestion technique qui concilient efficacité, sécurité et durabilité sans complexité inutile. Avec Almutaqaddim, votre bâtiment fonctionne de manière intelligente et fiable, aujourd’hui comme demain.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation du bâtiment <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
