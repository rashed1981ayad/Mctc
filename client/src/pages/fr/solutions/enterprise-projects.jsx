import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionEnterpriseProjectsFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main" lang="fr" dir="ltr">
      <section className="enterprise-hero" aria-labelledby="enterprise-hero-title">
        <img src="/site-assets/enterprise-projects-hero.webp" alt="Architecture moderne illustrant les solutions pour entreprises et projets d’envergure" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="enterprise-hero-title">Une infrastructure sécurisée et hautement fiable pour les organisations</h1>
          <p>Soutenez les activités critiques, la continuité des opérations et la transformation numérique en toute confiance.</p>
        </div>
      </section>

      <section className="enterprise-introduction" aria-labelledby="enterprise-audience-title">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Les grandes entreprises et les organismes publics ont besoin d’infrastructures avancées, sécurisées et évolutives pour leurs activités critiques. Almutaqaddim a développé une offre complète de <bdi>Projets d’entreprise</bdi> pour les environnements complexes nécessitant des systèmes intégrés, une gouvernance claire et des niveaux de service professionnels.</p>

          <div className="enterprise-audience-layout">
            <div className="enterprise-audience-heading">
              <span>Nos clients</span>
              <h2 id="enterprise-audience-title">À qui s’adressent ces solutions ?</h2>
            </div>

            <div className="enterprise-audience-grid" role="list">
              <article className="enterprise-audience-card" role="listitem"><span>Organismes et institutions publics</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Grandes entreprises</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Banques et institutions financières</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Entreprises pétrolières, gazières et énergétiques</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Universités et grands établissements d’enseignement</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Hôpitaux et complexes médicaux</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Organisations internationales et multisites</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-services" aria-labelledby="enterprise-services-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="enterprise-services-title">Systèmes et solutions pour les projets d’entreprise <bdi>Entreprise</bdi></h2>
            <p>Notre méthode intégrée couvre la planification stratégique, l’ingénierie, le déploiement, l’exploitation et l’assistance à long terme, selon les normes internationales.</p>
          </div>

          <figure className="enterprise-services-visual">
            <img src="/site-assets/enterprise-services-diagram-v2.webp" alt="Schéma reliant l’infrastructure d’entreprise, les sites, le personnel à distance et les solutions cloud" loading="lazy" />
          </figure>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-server" aria-hidden="true"></i><h3>Infrastructure informatique</h3></div>
              <p>Serveurs virtuels intégrés, cloud privé ou hybride, sauvegarde, reprise après sinistre et gestion des identités et des autorisations assurent la continuité et un accès sécurisé.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><h3>Infrastructure réseau avancée</h3></div>
              <p>Nous concevons des réseaux d’entreprise couvrant les réseaux <bdi>LAN</bdi> et <bdi>WAN</bdi> et <bdi>MAN</bdi>, avec une connectivité sans fil à haute densité et des liaisons sécurisées entre sites par <bdi>VPN</bdi>, ainsi qu’une supervision et des pare-feu avancés pour une connectivité stable et sécurisée.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-database" aria-hidden="true"></i><h3>Centres de données</h3></div>
              <p>Nous concevons, construisons, étendons et migrons des centres de données à haute disponibilité, avec alimentation électrique, refroidissement, redondance, continuité et supervision centralisée.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Systèmes intégrés de sûreté et de sécurité</h3></div>
              <p>Vidéosurveillance connectée, contrôle d’accès avancé, détection incendie et évacuation vocale améliorent la réponse aux incidents et la gestion des risques.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tower-broadcast" aria-hidden="true"></i><h3>Systèmes audiovisuels et de communication</h3></div>
              <p>Conférences, sonorisation, évacuation et communications unifiées intègrent la voix, les données et la collaboration interne.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-user-shield" aria-hidden="true"></i><h3>Cybersécurité</h3></div>
              <p>Une cybersécurité complète, depuis l’évaluation des risques jusqu’à la protection des réseaux et des terminaux, en passant par la prévention des intrusions, la conformité et la sécurité de l’information.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-headset" aria-hidden="true"></i><h3>Services technologiques 24 h/24 et 7 j/7</h3></div>
              <p>Une exploitation continue de l’infrastructure grâce à une supervision proactive et une assistance permanente, encadrées par des accords de niveau de service clairs <bdi>(SLA)</bdi>, avec gestion des correctifs et des mises à jour pour des opérations stables et moins exposées aux risques.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow" aria-labelledby="enterprise-workflow-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Des étapes réfléchies, des résultats fiables</span>
            <h2 id="enterprise-workflow-title">Notre approche</h2>
            <p>Pour les projets <bdi>d’entreprise</bdi>, nous suivons une méthode professionnelle avec des étapes claires et des résultats efficaces.</p>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Analyse des besoins</h3>
              <p>Évaluer les opérations, les exigences techniques et la gouvernance.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Conception stratégique</h3>
              <p>Créer une conception intégrée conciliant performance, sécurité et évolutivité.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Déploiement et installation</h3>
              <p>Réaliser le projet selon des normes d’ingénierie précises et des étapes maîtrisées.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Tests et mise en service</h3>
              <p>Effectuer des tests approfondis et livrer des systèmes prêts à fonctionner sans perturbation.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>Assistance à long terme</h3>
              <p>Une exploitation et un suivi continus maintiennent la stabilité et améliorent les performances.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="enterprise-cta-title">
        <div className="contact-cta-copy">
          <h2 id="enterprise-cta-title">Prêt à construire une infrastructure d’entreprise hautement fiable ?</h2>
          <p>Nous analysons vos besoins et proposons un plan technique clair, intégré et évolutif, sans reconstruire l’infrastructure ni perturber les opérations.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation de l’infrastructure d’entreprise <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
