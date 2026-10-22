import React from "react";
import FrenchLink from "../../components/FrenchLink.jsx";
import "../../styles/reference.fr.css";

export default function AboutPageFr() {
  return (
    <div id="main-content" className="about-main" lang="fr" dir="ltr">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero-grid" aria-hidden="true"></div>
        <div className="about-hero-orbit about-orbit-one" aria-hidden="true"></div>
        <div className="about-hero-orbit about-orbit-two" aria-hidden="true"></div>

        <div className="about-hero-content">
          <span className="about-eyebrow">À propos d’Almutaqaddim</span>
          <h1 id="about-hero-title">Innover aujourd’hui pour bâtir demain</h1>
          <p>Nous sommes convaincus que l’avenir commence par les solutions que nous concevons aujourd’hui. Nous développons des infrastructures technologiques intelligentes et des solutions numériques intégrées qui aident les organisations à gagner en efficacité et à se préparer aux défis de demain. Des réseaux et infrastructures aux systèmes intelligents et aux services cloud, nous créons des environnements technologiques fiables qui soutiennent la croissance et la continuité dans un monde numérique en constante évolution.</p>
        </div>

        <div className="about-hero-visual" aria-hidden="true">
          <div className="about-tech-core"><strong>Vers un<br />avenir plus intelligent</strong></div>
          <span className="about-tech-chip chip-one"><i className="fa-solid fa-network-wired"></i> Infrastructure fiable</span>
          <span className="about-tech-chip chip-two"><i className="fa-solid fa-cloud"></i> Solutions numériques</span>
          <span className="about-tech-chip chip-three"><i className="fa-solid fa-shield-halved"></i> Opérations sécurisées</span>
        </div>
      </section>

      <section className="about-introduction" aria-labelledby="about-intro-title">
        <div className="about-introduction-inner">
          <figure className="about-logo-panel">
            <img src="/site-assets/mctc-about-logo-transparent.webp" alt="Logo MCTC Almutaqaddim" />
          </figure>
          <div className="about-introduction-copy">
            <span className="section-kicker">Qui sommes-nous ?</span>
            <h2 id="about-intro-title">Une expertise intégrée aux standards professionnels internationaux</h2>
            <p>Depuis sa création en 2013, notre entreprise adopte une approche concrète, centrée sur le client, qui permet aux organisations de transformer leurs défis technologiques en véritables opportunités de croissance. Installés à Benghazi, nous connaissons le marché local et associons une expertise de terrain aux standards professionnels internationaux dans chacun de nos projets.</p>
            <p>Notre force consiste à traduire les besoins technologiques en plans de mise en œuvre concrets, avec rapidité et qualité, tout en privilégiant la sécurité, l’évolutivité et la maîtrise des coûts d’exploitation. Partenaire technologique à long terme, nous nous engageons à fournir des résultats qui font progresser votre entreprise.</p>
          </div>
        </div>

      <div className="about-values about-values-embedded" aria-labelledby="about-values-title">
        <div className="about-values-intro">
          <div className="about-section-heading">
            <span className="section-kicker">Ce qui nous anime</span>
            <h2 id="about-values-title">Nos valeurs</h2>
          </div>
          <p>Les valeurs façonnent notre façon d’aborder la vie, de nous percevoir et de nous engager auprès des autres. Elles guident nos choix et nos objectifs. Nous considérons ainsi Almutaqaddim comme une organisation vivante, qui réfléchit, grandit, influence son environnement et s’enrichit de ses échanges à travers ses valeurs.</p>
        </div>

        <div className="value-cards">
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-eye"></i></span><h3>Transparence</h3><p>Nous privilégions la clarté dans les relations commerciales, la gestion et les finances pour renforcer la confiance, améliorer l’environnement de travail et faciliter les décisions.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-hand-holding-heart"></i></span><h3>Excellence</h3><p>Nous recherchons l’excellence dans chaque service et dans nos relations, au sein comme à l’extérieur de l’entreprise, car la qualité commence par les valeurs.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-lightbulb"></i></span><h3>Innovation</h3><p>Nous accueillons le changement et développons continuellement des solutions créatives en phase avec les progrès technologiques.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-shield-halved"></i></span><h3>Crédibilité</h3><p>Nous ne promettons que ce que nous pouvons accomplir et assumons nos paroles comme nos actions, car la confiance se construit.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-user-group"></i></span><h3>L’humain au premier plan</h3><p>Nous sommes convaincus que notre réussite repose sur le développement de nos équipes, de nos clients et de la communauté qui nous entoure.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-people-group"></i></span><h3>Travail d’équipe</h3><p>Nous croyons que les meilleurs résultats naissent d’une équipe soudée et collaborative, qui réunit ses expertises autour d’un objectif commun.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-seedling"></i></span><h3>Développement durable</h3><p>Nous investissons continuellement dans le développement de nos équipes et dans les technologies qui préparent l’avenir et assurent une réussite durable.</p></article>
        </div>
      </div>
      </section>

      <section className="about-partners" aria-labelledby="about-partners-title">
        <div className="about-section-heading partners-heading">
          <span className="section-kicker">Des partenariats qui font la différence</span>
          <h2 id="about-partners-title">Nos partenaires</h2>
          <p>Nous collaborons avec des entreprises technologiques de premier plan à l’échelle mondiale pour proposer des solutions intégrées associant qualité, innovation et fiabilité.</p>
        </div>

        <div className="partners-viewport">
          <div className="partners-track">
            <div className="partners-set">
              <FrenchLink className="partner-logo" href="https://www.eelectron.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de eelectron"><img src="/site-assets/partners/eelectron.webp" alt="eelectron" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://saltosystems.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de SALTO"><img src="/site-assets/partners/salto.webp" alt="SALTO" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.schrack-seconet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Schrack Seconet"><img src="/site-assets/partners/schrack-seconet.webp" alt="Schrack Seconet" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.eaton.com/us/en-us.html" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Eaton"><img src="/site-assets/partners/eaton.webp" alt="Eaton" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.huawei.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Huawei"><img src="/site-assets/partners/huawei.webp" alt="Huawei" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Cisco"><img src="/site-assets/partners/cisco.webp" alt="Cisco" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://reyee.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Reyee"><img src="/site-assets/partners/reyee.webp" alt="Reyee" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Ruijie"><img src="/site-assets/partners/ruijie.webp" alt="Ruijie" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.hikvision.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Hikvision"><img src="/site-assets/partners/hikvision.webp" alt="Hikvision" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://unicableco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Unicable"><img src="/site-assets/partners/unicable.webp" alt="Unicable" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.rovapa.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Rovapa"><img src="/site-assets/partners/rovapa.webp" alt="Rovapa" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.fortinet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Fortinet"><img src="/site-assets/partners/fortinet.webp" alt="Fortinet" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.itctech.com.cn/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de ITC"><img src="/site-assets/partners/itc.webp" alt="ITC" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.splunk.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Splunk"><img src="/site-assets/partners/splunk.webp" alt="Splunk" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.microsoft.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Microsoft"><img src="/site-assets/partners/microsoft.webp" alt="Microsoft" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.dell.com/en-us" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Dell Technologies"><img src="/site-assets/partners/dell-technologies.webp" alt="Dell Technologies" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.vmware.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de VMware"><img src="/site-assets/partners/vmware.webp" alt="VMware" loading="lazy" /></FrenchLink>
            </div>
            <div className="partners-set partners-set-duplicate" aria-hidden="true">
              <FrenchLink className="partner-logo" href="https://www.eelectron.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de eelectron" tabIndex="-1"><img src="/site-assets/partners/eelectron.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://saltosystems.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de SALTO" tabIndex="-1"><img src="/site-assets/partners/salto.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.schrack-seconet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Schrack Seconet" tabIndex="-1"><img src="/site-assets/partners/schrack-seconet.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.eaton.com/us/en-us.html" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Eaton" tabIndex="-1"><img src="/site-assets/partners/eaton.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.huawei.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Huawei" tabIndex="-1"><img src="/site-assets/partners/huawei.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Cisco" tabIndex="-1"><img src="/site-assets/partners/cisco.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://reyee.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Reyee" tabIndex="-1"><img src="/site-assets/partners/reyee.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Ruijie" tabIndex="-1"><img src="/site-assets/partners/ruijie.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.hikvision.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Hikvision" tabIndex="-1"><img src="/site-assets/partners/hikvision.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://unicableco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Unicable" tabIndex="-1"><img src="/site-assets/partners/unicable.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.rovapa.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Rovapa" tabIndex="-1"><img src="/site-assets/partners/rovapa.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.fortinet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Fortinet" tabIndex="-1"><img src="/site-assets/partners/fortinet.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.itctech.com.cn/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de ITC" tabIndex="-1"><img src="/site-assets/partners/itc.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.splunk.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Splunk" tabIndex="-1"><img src="/site-assets/partners/splunk.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.microsoft.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Microsoft" tabIndex="-1"><img src="/site-assets/partners/microsoft.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.dell.com/en-us" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de Dell Technologies" tabIndex="-1"><img src="/site-assets/partners/dell-technologies.webp" alt="" loading="lazy" /></FrenchLink>
              <FrenchLink className="partner-logo" href="https://www.vmware.com/" target="_blank" rel="noopener noreferrer" aria-label="Visiter le site de VMware" tabIndex="-1"><img src="/site-assets/partners/vmware.webp" alt="" loading="lazy" /></FrenchLink>
            </div>
          </div>
        </div>
      </section>


      <section className="about-operations" aria-labelledby="about-operations-title">
        <div className="about-operations-intro">
          <span className="section-kicker">Notre fonctionnement</span>
          <h2 id="about-operations-title">Comment fonctionne Almutaqaddim ?</h2>
          <p>Toute entreprise a besoin d’une structure organisationnelle pour coordonner ses activités internes. Cette section présente celle d’Almutaqaddim afin que chaque membre de l’équipe comprenne son rôle, ses responsabilités et à qui adresser ses questions ou ses rapports.</p>
          <p>Nous pensons qu’une structure organisationnelle doit évoluer. Almutaqaddim possède ses propres caractéristiques : un modèle standard ne serait donc pas adapté. À mesure que l’entreprise grandit, nous actualisons notre organisation pour préserver la clarté des responsabilités et la fluidité des décisions.</p>
        </div>

        <div className="operations-grid">
          <article className="operation-card operation-card-featured">
            <span className="operation-icon"><i className="fa-solid fa-sitemap"></i></span>
            <div><h3>Direction générale</h3><p>Almutaqaddim est dirigée par un conseil qui définit les orientations stratégiques et les politiques générales. La direction exécutive pilote les activités quotidiennes et coordonne les départements pour atteindre efficacement les objectifs de l’entreprise. Notre organisation flexible repose sur la gouvernance et la collaboration des équipes, avec un suivi continu des performances et une amélioration des processus pour garantir la qualité des réalisations et une croissance durable.</p></div>
          </article>

          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-chart-line"></i></span><h3>Département financier</h3><p>Ce département assure les opérations comptables, gère les ressources financières, prépare les rapports périodiques et suit les revenus, les engagements et les budgets. Il applique également les contrôles internes et fournit à la direction les informations nécessaires aux décisions stratégiques.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-diagram-project"></i></span><h3>Gestion de projets</h3><p>Ce département planifie, organise, réalise et suit les projets clients de bout en bout. Il encadre les équipes de terrain, définit les calendriers et les ressources, et coordonne les ingénieurs de site et d’exploitation pour assurer une réalisation efficace, professionnelle et conforme aux exigences techniques.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-cart-flatbed"></i></span><h3>Ventes et achats</h3><p>Ce département développe la clientèle, assure les approvisionnements nécessaires aux projets, prépare les propositions commerciales et gère les relations fournisseurs. Il concilie qualité, coût et délais tout en garantissant la disponibilité du matériel et la continuité des réalisations.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-users-gear"></i></span><h3>Nos équipes</h3><p>Nous nous appuyons sur une équipe intégrée de professionnels techniques et administratifs : ingénieurs de site et de déploiement, spécialistes du marketing et de la communication, équipes d’exploitation et d’assistance technique. Ensemble, ils assurent la gestion des infrastructures, la supervision des systèmes et le respect des normes de sécurité pour garantir la stabilité des services.</p></article>
        </div>
      </section>

      <section className="contact-cta about-community" aria-labelledby="about-community-title">
        <div className="contact-cta-copy">
          <span className="section-kicker">Un impact au-delà de la technologie</span>
          <h2 id="about-community-title">Responsabilité sociale</h2>
          <p>Dans le cadre de notre engagement envers la communauté et l’économie locale, MCTC propose des formations dédiées aux jeunes diplômés pour leur permettre d’acquérir une expérience pratique et de développer leurs compétences. Nous offrons également des perspectives d’emploi aux talents prometteurs à l’issue de leur formation. Cet engagement traduit notre volonté d’investir dans les compétences locales et de former des professionnels capables de contribuer au développement durable.</p>
        </div>
      </section>
    </div>
  );
}
