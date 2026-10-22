import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionNetworkInfrastructureFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main networking-main" lang="fr" dir="ltr">
      <section className="enterprise-hero networking-hero" aria-labelledby="networking-hero-title">
        <img src="/site-assets/networking-hero.webp" alt="Infrastructure professionnelle de réseau et de centre de données" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="networking-hero-title">Une infrastructure réseau rapide, stable et sécurisée</h1>
          <p>Soutenez vos systèmes numériques et une croissance durable de votre entreprise en toute confiance.</p>
        </div>
      </section>

      <section className="enterprise-introduction networking-introduction" aria-label="Présentation des solutions d’infrastructure réseau">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">L’infrastructure réseau est le socle d’opérations numériques efficaces et sécurisées. Un réseau professionnel offre une connectivité stable et accompagne la croissance future.</p>
          <p className="enterprise-intro-text">Avec <strong>Almutaqaddim</strong>, bénéficiez d’une planification, d’une conception, d’un déploiement et d’une exploitation intégrés, avec des technologies internationales reconnues.</p>
          <p className="enterprise-intro-text">Chaque environnement est conçu selon les besoins de l’organisation, l’évolutivité, la sécurité et la simplicité de gestion.</p>
        </div>
      </section>

      <section className="enterprise-services networking-scope" aria-labelledby="networking-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="networking-scope-title">Notre offre d’infrastructure réseau</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-ethernet" aria-hidden="true"></i><h3>Systèmes de câblage structuré <small dir="ltr">Câblage structuré en cuivre et fibre optique</small></h3></div><p>Câblage cuivre et fibre optique conforme aux normes internationales, avec organisation des locaux et des armoires réseau.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-wifi" aria-hidden="true"></i><h3>Conception et déploiement de réseaux filaires et sans fil <small dir="ltr">Solutions LAN, WAN et réseaux sans fil</small></h3></div><p>Réseaux LAN et WAN, connexions entre sites et Wi-Fi haute performance, avec études radio professionnelles.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Sécurité réseau et pare-feu <small dir="ltr">Solutions de sécurité réseau et de pare-feu</small></h3></div><p>Pare-feu modernes, politiques de sécurité, gestion du trafic, supervision et réponse aux incidents protègent vos actifs numériques.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-user-shield" aria-hidden="true"></i><h3>VPN et accès distant sécurisé <small dir="ltr">Solutions VPN et d’accès distant</small></h3></div><p>Des connexions VPN chiffrées offrent un accès sécurisé aux sites et aux employés.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3>Supervision réseau et optimisation des performances <small dir="ltr">Supervision réseau et optimisation des performances</small></h3></div><p>Une analyse continue identifie les goulets d’étranglement et les pannes avant qu’ils n’affectent les opérations.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-phone-volume" aria-hidden="true"></i><h3>Téléphonie IP et communications unifiées <small dir="ltr">Téléphonie IP et communications unifiées</small></h3></div><p>Voix, vidéo, VoIP et communications entre sites intégrées sur une même plateforme.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow managed-it-why networking-why" aria-labelledby="networking-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Des réseaux stables qui évoluent avec votre entreprise</span>
            <h2 id="networking-why-title">Pourquoi choisir Almutaqaddim pour vos solutions réseau ?</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>Conception technique précise</h3><p>Nous évaluons les besoins actuels et la croissance future avant de concevoir le réseau.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>Solutions évolutives</h3><p>Les réseaux évoluent sans reconstruire leurs fondations.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>Technologie fiable</h3><p>Nous utilisons des équipements internationaux reconnus pour garantir performance et stabilité.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>Déploiement professionnel</h3><p>Le déploiement respecte les normes internationales et les bonnes pratiques techniques.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">05</span><h3>Assistance technique spécialisée</h3><p>Une assistance continue maintient la stabilité et les performances.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="networking-cta-title">
        <div className="contact-cta-copy">
          <h2 id="networking-cta-title">Modernisez le réseau de votre organisation</h2>
          <p>Nous concevons une infrastructure sécurisée et fiable pour tous vos systèmes et votre croissance future. Avec <strong>Almutaqaddim</strong>, votre réseau devient un socle numérique solide.</p>
        </div>
        <div className="contact-cta-actions">
          <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation de l’infrastructure <span aria-hidden="true">→</span></FrenchLink>
        </div>
      </section>
    </div>
  );
}
