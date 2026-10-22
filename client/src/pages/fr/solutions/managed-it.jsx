import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionManagedItFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main managed-it-main" lang="fr" dir="ltr">
      <section className="enterprise-hero managed-it-hero" aria-labelledby="managed-it-hero-title">
        <img src="/site-assets/managed-it-hero.webp" alt="Spécialiste informatique supervisant des systèmes numériques" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="managed-it-hero-title">Dans un monde toujours plus dépendant des systèmes numériques</h1>
          <p>Une infrastructure technologique fiable et efficace est essentielle à la réussite des organisations.</p>
        </div>
      </section>

      <section className="enterprise-introduction managed-it-introduction" aria-label="Présentation des services informatiques gérés">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Les organisations modernes ont besoin de technologies stables et sécurisées pour maintenir la continuité et l’efficacité de leurs activités. Des systèmes toujours plus complexes nécessitent une expertise spécialisée et une supervision avancée.</p>
          <p className="enterprise-intro-text">Chez <strong>Almutaqaddim</strong>, nous proposons des services informatiques gérés grâce à une supervision proactive, une assistance continue et une gestion fiable des infrastructures.</p>
          <p className="enterprise-intro-text">Ces services permettent aux organisations de se concentrer sur leur cœur de métier pendant que notre équipe gère, entretient et exploite leurs systèmes.</p>
        </div>
      </section>

      <section className="enterprise-services managed-it-scope" aria-labelledby="managed-it-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="managed-it-scope-title">Notre offre de services informatiques gérés</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><h3>Gestion de l’infrastructure informatique <small dir="ltr">Gestion de l’infrastructure informatique</small></h3></div><p>Une gestion complète des serveurs, réseaux, systèmes de stockage et terminaux pour des systèmes stables et performants.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i><h3>Administration et maintenance des systèmes <small dir="ltr">Administration et maintenance des systèmes</small></h3></div><p>Gestion des serveurs, systèmes d’exploitation et applications avec maintenance régulière et amélioration continue.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-headset" aria-hidden="true"></i><h3>Assistance technique à distance et sur site <small dir="ltr">Assistance à distance et sur site 24 h/24 et 7 j/7</small></h3></div><p>Une assistance continue pour résoudre rapidement les problèmes, à distance ou sur site.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3>Supervision proactive des systèmes <small dir="ltr">Supervision proactive des systèmes</small></h3></div><p>Une supervision avancée détecte les problèmes avant qu’ils n’affectent les opérations.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-boxes-stacked" aria-hidden="true"></i><h3>Gestion des actifs matériels et logiciels <small dir="ltr">Gestion des actifs matériels et logiciels</small></h3></div><p>Le suivi des actifs assure leur utilisation efficace et la gestion de leur cycle de vie.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i><h3>Gestion des correctifs et des mises à jour <small dir="ltr">Gestion des correctifs et des mises à jour</small></h3></div><p>Des mises à jour régulières protègent contre les vulnérabilités et améliorent les performances.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow managed-it-why" aria-labelledby="managed-it-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Une informatique proactive. Un partenariat durable.</span>
            <h2 id="managed-it-why-title">Pourquoi choisir MCTC pour vos services informatiques gérés ?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Expertise des environnements complexes</h3><p>Notre équipe gère des environnements sensibles exigeant stabilité et réponse rapide aux incidents.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Prévention proactive des interruptions</h3><p>Une analyse continue détecte les problèmes potentiels avant qu’ils n’affectent les opérations.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Maîtrise des coûts d’exploitation</h3><p>Accédez à une expertise spécialisée et à des outils professionnels sans supporter le coût d’une équipe informatique interne complète.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>Gestion technologique unifiée</h3><p>Nous gérons réseaux, serveurs, applications et appareils comme un environnement connecté unique.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">05</span><h3>Partenariat à long terme</h3><p>Nous renforçons votre infrastructure numérique et la préparons à votre croissance.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="managed-it-cta-title">
        <div className="contact-cta-copy">
          <h2 id="managed-it-cta-title">Confiez la gestion informatique à des experts</h2>
          <p>Nous gérons efficacement votre environnement pour que vous puissiez vous concentrer sur votre activité. Avec <strong>Almutaqaddim</strong>, la gestion informatique devient un socle stable pour votre croissance.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation de l’infrastructure informatique <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
