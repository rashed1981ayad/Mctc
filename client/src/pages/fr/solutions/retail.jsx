import React from "react";
import FrenchLink from "../../../components/FrenchLink.jsx";
import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";
import "../../../styles/reference.fr.css";

export default function SolutionRetailFr() {
  useWorkflowReveal(".reference-site-fr");
  return (
    <div className="enterprise-main retail-main" lang="fr" dir="ltr">
      <section className="enterprise-hero retail-hero" aria-labelledby="retail-hero-title">
        <img src="/site-assets/retail-hero.webp" alt="Solutions fiables de connectivité et de réseau pour les activités commerciales" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="retail-hero-title">Des produits et solutions technologiques fiables pour soutenir les activités quotidiennes, assurer des performances stables, simplifier la gestion et accompagner la croissance.</h1>
        </div>
      </section>

      <section className="enterprise-introduction retail-introduction" aria-labelledby="retail-audience-title">
        <div className="enterprise-introduction-inner">
          <div className="retail-intro-copy">
            <p className="enterprise-intro-text">Les environnements de travail modernes et les commerces dépendent de technologies stables et faciles à utiliser. C’est pourquoi <strong>Almutaqaddim</strong> propose des solutions de <strong>produits et systèmes technologiques</strong> fondées sur des produits soigneusement sélectionnés et certifiés à l’international pour les entreprises, bureaux et projets commerciaux.</p>
            <p className="enterprise-intro-text">Nous proposons des systèmes essentiels fiables, avec fourniture, installation, programmation, mise en service et assistance spécialisée.</p>
          </div>

          <div className="enterprise-audience-layout">
            <div className="enterprise-audience-heading">
              <span>Nos clients</span>
              <h2 id="retail-audience-title">À qui s’adressent ces solutions ?</h2>
            </div>

            <div className="enterprise-audience-grid" role="list">
              <article className="enterprise-audience-card" role="listitem"><span>Entrepreneurs et entreprises de construction</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Magasins et points de vente</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Entreprises et bureaux</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Projets commerciaux de toutes tailles</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Réseaux d’agences et de succursales</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Installations et opérations quotidiennes</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>Installations nécessitant une sûreté et une sécurité fiables</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-services retail-services" aria-labelledby="retail-services-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="retail-services-title">Systèmes et produits technologiques <bdi>Commerce de détail</bdi> Solutions</h2>
            <p>Une offre intégrée pour la connectivité, la sûreté et la sécurité opérationnelle, avec des systèmes compatibles et faciles à gérer.</p>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><div><h3>Réseaux et infrastructure</h3><span className="retail-service-english" dir="ltr">Réseaux et connectivité</span></div></div>
              <p>Des réseaux intégrés offrent une connectivité stable et sécurisée, des routeurs et commutateurs aux systèmes <bdi>Wi-Fi</bdi> haute performance et aux solutions multisites faciles à gérer.</p>
              <p className="retail-service-partners"><strong>Partenaires réseau :</strong><span className="retail-partner-logos"><img src="/site-assets/partners/ruijie.webp" alt="Ruijie Networks" /><img src="/site-assets/partners/reyee.webp" alt="Reyee" /><img src="/site-assets/partners/huawei.webp" alt="Huawei" /><img src="/site-assets/partners/cisco.webp" alt="Cisco" /></span></p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-video" aria-hidden="true"></i><div><h3>Sécurité et vidéosurveillance</h3><span className="retail-service-english" dir="ltr">Sécurité et vidéosurveillance</span></div></div>
              <p>Vidéosurveillance intégrée, gestion vidéo, suivi des présences et contrôle d’accès renforcent la sécurité et la traçabilité des opérations.</p>
              <p className="retail-service-partners"><strong>Solutions de sécurité certifiées proposées par :</strong><span className="retail-partner-logos"><img src="/site-assets/partners/hikvision.webp" alt="Hikvision" /></span></p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-fire-flame-curved" aria-hidden="true"></i><div><h3>Systèmes de détection et d’alarme incendie</h3><span className="retail-service-english" dir="ltr">Systèmes d’alarme incendie</span></div></div>
              <p>Des alarmes incendie fiables, conventionnelles ou adressables, et des systèmes d’évacuation vocale, avec conception complète et assistance aux essais.</p>
              <p className="retail-service-partners"><strong>Partenaires de solutions :</strong><span className="retail-partner-logos"><img src="/site-assets/partners/eaton.webp" alt="Eaton" /></span></p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-ethernet" aria-hidden="true"></i><div><h3>Câblage et supports réseau</h3><span className="retail-service-english" dir="ltr">Câblage et supports de transmission</span></div></div>
              <p>Un câblage de qualité assure des performances stables et simplifie la maintenance et les extensions.</p>
              <p className="retail-service-partners"><strong>Des produits fiables proposés par :</strong><span className="retail-partner-logos"><img src="/site-assets/partners/unicable.webp" alt="Unicable" /></span></p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-layer-group" aria-hidden="true"></i><div><h3>Systèmes et solutions complémentaires</h3><span className="retail-service-english" dir="ltr">Solutions complémentaires pour le commerce</span></div></div>
              <p>Nous proposons bâtiments intelligents, cloud, virtualisation, serveurs, cybersécurité, centres de données et contrôle d’accès grâce à nos partenaires internationaux.</p>
              <p className="retail-service-partners"><strong>Partenaires technologiques :</strong><span className="retail-partner-logos"><img src="/site-assets/partners/eelectron.webp" alt="Eelectron" /><img src="/site-assets/partners/vmware.webp" alt="VMware" /><img src="/site-assets/partners/microsoft.webp" alt="Microsoft" /><img src="/site-assets/partners/dell.webp" alt="Dell Technologies" /><img src="/site-assets/partners/splunk.webp" alt="Splunk" /><img src="/site-assets/partners/salto.webp" alt="Salto Systems" /><img src="/site-assets/partners/schrack-seconet.webp" alt="Schrack Seconet" /><img src="/site-assets/partners/knx.webp" alt="KNX" /><img src="/site-assets/partners/itc.webp" alt="ITC" /><img src="/site-assets/partners/rovapa.webp" alt="Rovapa" /><img src="/site-assets/partners/fortinet.webp" alt="Fortinet" /></span></p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow retail-trust" aria-labelledby="retail-trust-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>Un partenariat technologique sur lequel vous pouvez compter</span>
            <h2 id="retail-trust-title">Pourquoi faire confiance à Almutaqaddim</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>Des produits fiables et certifiés à l’international</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>Disponibilité rapide et livraison professionnelle</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>Installation et mise en service entièrement intégrées</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>Assistance technique locale et expertise de terrain</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>Des solutions évolutives, prêtes pour l’avenir</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta retail-contact-cta" aria-labelledby="retail-cta-title">
        <div className="contact-cta-copy">
          <h2 id="retail-cta-title">Vous recherchez une technologie fiable pour vos activités quotidiennes ?</h2>
          <p>Nous définissons la solution adaptée et un plan de mise en œuvre clair permettant de futures extensions.</p>
        </div>
        <FrenchLink className="contact-cta-button" href="#contact">Contactez notre équipe commerciale <span aria-hidden="true">→</span></FrenchLink>
      </section>
    </div>
  );
}
