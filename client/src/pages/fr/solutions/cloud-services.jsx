import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionCloudServicesFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main cloud-services-main" lang="fr" dir="ltr">
      <section className="enterprise-hero cloud-services-hero" aria-labelledby="cloud-services-hero-title">
        <img src="/site-assets/cloud-services-hero.webp" alt="Solutions cloud d’entreprise flexibles et sécurisées" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cloud-services-hero-title">Un cloud flexible et sécurisé</h1>
          <p>Permettez à votre organisation d’exploiter efficacement ses systèmes et applications, de réduire ses coûts d’infrastructure et de préparer sa croissance.</p>
        </div>
      </section>

      <section className="enterprise-introduction cloud-services-introduction" aria-label="Présentation des services cloud">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Les services cloud constituent un pilier des technologies d’entreprise modernes. Ils permettent d’exploiter systèmes, applications et données dans des environnements flexibles et sécurisés, sans dépendre entièrement d’une infrastructure traditionnelle sur site.</p>
          <p className="enterprise-intro-text">Chez <strong>Almutaqaddim</strong>, nous proposons des solutions cloud intégrées qui améliorent l’efficacité, réduisent les coûts d’infrastructure et renforcent la flexibilité et la continuité des activités. Nous concevons des environnements cloud sur mesure, axés sur les performances, la sécurité et la simplicité de gestion.</p>
        </div>
      </section>

      <section className="enterprise-services cloud-services-scope" aria-labelledby="cloud-services-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cloud-services-scope-title">Notre offre de solutions cloud</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-cloud" aria-hidden="true"></i><h3><bdi>Déploiement d’infrastructures cloud</bdi><small>Mise en œuvre d’infrastructures cloud</small></h3></div>
              <p>Conception et déploiement de serveurs virtuels, de réseaux cloud et de stockage avancé pour exploiter efficacement vos systèmes et applications sans investissement matériel local majeur.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-arrow-right-arrow-left" aria-hidden="true"></i><h3><bdi>Services de migration vers le cloud</bdi><small>Services de migration vers le cloud</small></h3></div>
              <p>Une migration structurée et sécurisée des serveurs, systèmes et applications vers le cloud, avec un minimum d’interruptions et une continuité des opérations.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-database" aria-hidden="true"></i><h3><bdi>Sauvegarde cloud et reprise après sinistre</bdi><small>Sauvegarde cloud et reprise après sinistre</small></h3></div>
              <p>Sauvegarde des données et systèmes critiques dans le cloud, avec des plans de reprise après sinistre pour rétablir rapidement les activités en cas d’urgence.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i><h3><bdi>Solutions cloud hybrides</bdi><small>Solutions cloud hybrides</small></h3></div>
              <p>Des environnements associant une infrastructure locale à des services cloud publics ou privés pour davantage de contrôle et de flexibilité.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3><bdi>Supervision et gestion du cloud</bdi><small>Supervision et gestion du cloud</small></h3></div>
              <p>Une gestion et une supervision continues pour maintenir les performances, optimiser les ressources et détecter les problèmes avant qu’ils n’affectent les opérations.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cloud-services-why" aria-labelledby="cloud-services-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Un cloud sécurisé, conçu pour accompagner votre croissance.</span>
            <h2 id="cloud-services-why-title">Pourquoi choisir MCTC pour les services cloud ?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Un cloud conçu pour votre entreprise</h3>
              <p>Nous évaluons votre environnement actuel et concevons une plateforme cloud selon vos besoins opérationnels et vos exigences de performance.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Expertise en intégration des systèmes</h3>
              <p>Nous intégrons les plateformes cloud aux réseaux, infrastructures et systèmes d’entreprise existants.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Sécurité et continuité des activités</h3>
              <p>Des solutions cloud qui protègent les données et réduisent les risques opérationnels.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Gestion professionnelle du cloud</h3>
              <p>Une supervision et une gestion continues pour assurer la stabilité des systèmes et optimiser leurs performances.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cloud-services-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cloud-services-cta-title">Passez au cloud en toute confiance</h2>
          <p>Nous concevons des environnements cloud sécurisés et flexibles qui accompagnent votre croissance et facilitent la gestion. Avec <strong>Almutaqaddim</strong>, le cloud devient une plateforme fiable qui donne à votre entreprise l’agilité nécessaire pour évoluer dans un monde numérique en mouvement.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander un conseil technologique <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
