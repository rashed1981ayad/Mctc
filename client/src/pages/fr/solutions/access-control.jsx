import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionAccessControlFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main access-control-main" lang="fr" dir="ltr">
      <section className="enterprise-hero access-control-hero" aria-labelledby="access-control-hero-title">
        <img src="/site-assets/access-control-hero.webp" alt="Système intelligent de contrôle d’accès électronique et de gestion des identités" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="access-control-hero-title">Gestion intelligente et sécurisée des accès et des autorisations</h1>
          <p>Contrôlez précisément l’accès aux bâtiments et aux zones restreintes grâce à un système centralisé qui améliore l’organisation et la sécurité des opérations.</p>
        </div>
      </section>

      <section className="enterprise-introduction access-control-introduction" aria-label="Présentation des systèmes de contrôle d’accès et de gestion des identités">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Les systèmes de contrôle d’accès et de gestion des identités sont un pilier de la sécurité des bâtiments modernes. Ils utilisent une vérification électronique avancée pour attribuer les autorisations adaptées à chaque utilisateur, afin que seules les personnes autorisées puissent accéder aux zones désignées.</p>
          <p className="enterprise-intro-text">Chez Almutaqaddim, nous transformons les accès traditionnels en un système numérique intégré, géré et supervisé de manière centralisée, avec des journaux d’activité complets et des rapports détaillés.</p>
        </div>
      </section>

      <section className="enterprise-services access-control-scope" aria-labelledby="access-control-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="access-control-scope-title">Notre offre de solutions de contrôle d’accès</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-door-open" aria-hidden="true"></i><h3>Systèmes de contrôle d’accès</h3></div>
              <p>Conception et déploiement de contrôleurs centralisés et de lecteurs intelligents pour chaque point d’entrée, avec des autorisations définies selon l’utilisateur, le lieu ou l’horaire.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-lock" aria-hidden="true"></i><h3>Serrures électroniques intelligentes</h3></div>
              <p>Fourniture et installation de serrures électroniques utilisant des cartes à puce, des codes PIN, des empreintes digitales ou la reconnaissance faciale, pour renforcer la sécurité sans clés traditionnelles.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-id-card" aria-hidden="true"></i><h3>Gestion des identités et des autorisations</h3></div>
              <p>Un système intégré qui définit qui peut accéder à chaque zone et à quel moment, avec des autorisations faciles à actualiser selon l’évolution des activités.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-clipboard-list" aria-hidden="true"></i><h3>Journalisation et supervision des accès</h3></div>
              <p>Un enregistrement complet des entrées et des sorties pour suivre les déplacements et produire des rapports détaillés destinés à la sécurité et aux ressources humaines.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Intégration aux autres systèmes de sécurité</h3></div>
              <p>Intégration à la vidéosurveillance, aux alarmes incendie et à la gestion technique des bâtiments pour créer un environnement de sécurité connecté plus efficace.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-laptop" aria-hidden="true"></i><h3>Gestion centralisée et contrôle à distance</h3></div>
              <p>Une plateforme centralisée pour gérer tous les points d’accès depuis un seul emplacement, avec un accès distant sécurisé et une administration simple des utilisateurs.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow access-control-why" aria-labelledby="access-control-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Des accès fiables, conçus pour évoluer.</span>
            <h2 id="access-control-why-title">Pourquoi choisir MCTC pour le contrôle d’accès ?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Conception technique sur mesure</h3>
              <p>Nous évaluons les risques du site et concevons le contrôle d’accès selon vos installations et vos activités.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Solutions évolutives</h3>
              <p>Des systèmes conçus pour évoluer sans reconstruire l’infrastructure existante.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Intégration des systèmes</h3>
              <p>Une forte capacité d’intégration entre vidéosurveillance, sécurité et gestion technique des bâtiments.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Déploiement professionnel</h3>
              <p>Une mise en œuvre conforme aux bonnes pratiques techniques et aux normes de qualité pour garantir un fonctionnement fiable.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>Assistance technique continue</h3>
              <p>La formation et l’assistance technique permettent à vos équipes de tirer pleinement parti du système.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="access-control-cta-title">
        <div className="contact-cta-copy">
          <h2 id="access-control-cta-title">Renforcez la sécurité de vos installations avec un contrôle d’accès intelligent</h2>
          <p>Nous vous aidons à concevoir un système intégré de gestion des accès qui concilie sécurité et simplicité d’administration, tout en permettant de futures extensions. Avec Almutaqaddim, les accès deviennent plus intelligents et plus sûrs, au service de la stabilité de vos activités.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une évaluation du contrôle d’accès <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
