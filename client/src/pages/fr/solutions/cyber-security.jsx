import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionCyberSecurityFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main cyber-security-main" lang="fr" dir="ltr">
      <section className="enterprise-hero cyber-security-hero" aria-labelledby="cyber-security-hero-title">
        <img src="/site-assets/cyber-security-hero.webp" alt="Interface numérique illustrant la protection contre les risques cyber" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cyber-security-hero-title">Protégez votre entreprise avec une cybersécurité intégrée</h1>
          <p>Réduisez les risques numériques et préservez la continuité des opérations dans un environnement technologique en constante évolution.</p>
        </div>
      </section>

      <section className="enterprise-introduction cyber-security-introduction" aria-label="Présentation de la cybersécurité">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">Alors que la transformation numérique s’accélère et que les organisations dépendent des systèmes connectés et des services cloud, la cybersécurité est essentielle à la continuité des activités et à la protection des données et des opérations.</p>
          <p className="enterprise-intro-text">Chez <strong>Almutaqaddim</strong>, nous proposons des solutions de cybersécurité intégrées contre les menaces actuelles, tout en préservant l’efficacité opérationnelle et en soutenant une croissance numérique stable.</p>
          <p className="enterprise-intro-text">Nous abordons la cybersécurité comme une stratégie intégrée qui réduit les risques et renforce la fiabilité de l’entreprise, plutôt que comme un produit isolé.</p>
        </div>
      </section>

      <section className="enterprise-services cyber-security-scope" aria-labelledby="cyber-security-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cyber-security-scope-title">Un cadre de protection intégré</h2>
            <p>Almutaqaddim associe les personnes, les processus et les technologies pour offrir une protection équilibrée et durable.</p>
          </div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-users" aria-hidden="true"></i><h3>Personnes <bdi>(Personnes)</bdi></h3></div><p>La cybersécurité commence par les utilisateurs. Nous renforçons la sensibilisation à la sécurité et appliquons des pratiques de protection des données qui réduisent les erreurs humaines, l’une des principales causes de violations de sécurité.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-list-check" aria-hidden="true"></i><h3>Processus <bdi>(Processus)</bdi></h3></div><p>Nous élaborons des procédures claires de gestion des risques et de réponse aux incidents, depuis la détection et l’analyse des menaces jusqu’à la reprise rapide et au rétablissement des opérations.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>Technologie <bdi>(Technologie)</bdi></h3></div><p>Une protection avancée associant pare-feu de nouvelle génération, détection et prévention des intrusions, protection des courriels et des terminaux, ainsi que sécurisation des réseaux et des environnements cloud, avec détection et réponse avancées aux menaces.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cyber-security-why" aria-labelledby="cyber-security-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Une protection plus claire et une vision opérationnelle intégrée</span>
            <h2 id="cyber-security-why-title">Qu’est-ce qui distingue Almutaqaddim en cybersécurité ?</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Nous parlons votre langage</h3>
              <p>Nous transformons les concepts techniques complexes en solutions claires pour aider les décideurs à comprendre les risques et à agir en toute confiance.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Une approche claire et concrète</h3>
              <p>Nous suivons des étapes de mise en œuvre soigneusement planifiées pour renforcer la sécurité sans complexité ni perturbation inutiles.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Nous réfléchissons avec le client</h3>
              <p>Nous partons de vos objectifs commerciaux pour concevoir une sécurité qui soutient la croissance et réduit les risques opérationnels.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Expertise sectorielle</h3>
              <p>Nous comprenons les exigences des différents secteurs et adaptons la protection à chaque environnement de travail.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cyber-security-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cyber-security-cta-title">Commencez votre parcours vers un environnement numérique plus sûr</h2>
          <p><strong>Almutaqaddim, votre partenaire pour un environnement numérique sécurisé.</strong> Grâce à une stratégie de cybersécurité intégrée associant expertise technique et compréhension des opérations, Almutaqaddim aide les organisations à protéger leurs activités, à renforcer leur résilience numérique et à progresser en toute confiance.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Demander une première évaluation de votre préparation en sécurité <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
