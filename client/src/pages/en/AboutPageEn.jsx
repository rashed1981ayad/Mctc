import React from "react";
import EnglishLink from "../../components/EnglishLink.jsx";
import "../../styles/reference.en.css";

export default function AboutPageEn() {
  return (
<div id="main-content" className="about-main">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero-grid" aria-hidden="true"></div>
        <div className="about-hero-orbit about-orbit-one" aria-hidden="true"></div>
        <div className="about-hero-orbit about-orbit-two" aria-hidden="true"></div>

        <div className="about-hero-content">
          <span className="about-eyebrow">About Almutaqaddim</span>
          <h1 id="about-hero-title">Innovating Today to Empower Tomorrow</h1>
          <p>We believe the future begins with the solutions we design today. We develop intelligent technology infrastructure and integrated digital solutions that help organizations operate more efficiently and prepare for tomorrow's challenges. From networks and infrastructure to smart systems and cloud services, we focus on building reliable technology environments that support growth and continuity in a rapidly evolving digital world.</p>
        </div>

        <div className="about-hero-visual" aria-hidden="true">
          <div className="about-tech-core"><strong>Toward a<br />Smarter Future</strong></div>
          <span className="about-tech-chip chip-one"><i className="fa-solid fa-network-wired"></i> Reliable Infrastructure</span>
          <span className="about-tech-chip chip-two"><i className="fa-solid fa-cloud"></i> Digital Solutions</span>
          <span className="about-tech-chip chip-three"><i className="fa-solid fa-shield-halved"></i> Secure Operations</span>
        </div>
      </section>

      <section className="about-introduction" aria-labelledby="about-intro-title">
        <div className="about-introduction-inner">
          <figure className="about-logo-panel">
            <img src="/site-assets/mctc-about-logo-transparent.webp" alt="MCTC Almutaqaddim logo" />
          </figure>
          <div className="about-introduction-copy">
            <span className="section-kicker">Who We Are</span>
            <h2 id="about-intro-title">Integrated Expertise to Global Professional Standards</h2>
            <p>Since its establishment in 2013, our company has taken a practical, client-centered approach that enables organizations to turn technology challenges into real growth opportunities. Based in Benghazi, we understand the local market and combine local implementation expertise with global professional standards in every project we deliver.</p>
            <p>Our strength lies in turning technology needs into practical implementation plans with speed and quality, while focusing on security, scalability, and operating cost efficiency. We work as a long-term technology partner and remain committed to delivering results that move your business forward.</p>
          </div>
        </div>

      <div className="about-values about-values-embedded" aria-labelledby="about-values-title">
        <div className="about-values-intro">
          <div className="about-section-heading">
            <span className="section-kicker">What Drives Us</span>
            <h2 id="about-values-title">Our Values</h2>
          </div>
          <p>People live by values that shape how they approach life, themselves, and others, and guide many of their choices and goals. We therefore see Almutaqaddim as a living organization that thinks, grows, influences, and is influenced through its values.</p>
        </div>

        <div className="value-cards">
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-eye"></i></span><h3>Transparency</h3><p>We believe in clarity across business dealings, management, and finance, strengthening trust and improving the work environment and decision-making.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-hand-holding-heart"></i></span><h3>Excellence</h3><p>We pursue excellence in every service we provide and in our relationships inside and outside the company, because quality begins with values.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-lightbulb"></i></span><h3>Innovation</h3><p>We embrace change and continually develop creative solutions that keep pace with technological progress.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-shield-halved"></i></span><h3>Credibility</h3><p>We promise only what we can deliver and stand by our words and actions, because trust is built, not bought.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-user-group"></i></span><h3>People First</h3><p>We believe our true success comes from empowering our team, our clients, and the community around us.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-people-group"></i></span><h3>Teamwork</h3><p>We believe the best results come from an integrated, collaborative team that brings its expertise together around one goal.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-seedling"></i></span><h3>Sustainable Development</h3><p>We continually invest in developing our people and the technologies that serve the future and sustain success.</p></article>
        </div>
      </div>
      </section>

      <section className="about-partners" aria-labelledby="about-partners-title">
        <div className="about-section-heading partners-heading">
          <span className="section-kicker">Partnerships That Make a Difference</span>
          <h2 id="about-partners-title">Our Partners</h2>
          <p>We collaborate with leading global technology companies to deliver integrated solutions that combine quality, innovation, and reliability.</p>
        </div>

        <div className="partners-viewport">
          <div className="partners-track">
            <div className="partners-set">
              <EnglishLink className="partner-logo" href="https://www.eelectron.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the eelectron website"><img src="/site-assets/partners/eelectron.webp" alt="eelectron" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://saltosystems.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the SALTO website"><img src="/site-assets/partners/salto.webp" alt="SALTO" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.schrack-seconet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Schrack Seconet website"><img src="/site-assets/partners/schrack-seconet.webp" alt="Schrack Seconet" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.eaton.com/us/en-us.html" target="_blank" rel="noopener noreferrer" aria-label="Visit the Eaton website"><img src="/site-assets/partners/eaton.webp" alt="Eaton" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.huawei.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Huawei website"><img src="/site-assets/partners/huawei.webp" alt="Huawei" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Cisco website"><img src="/site-assets/partners/cisco.webp" alt="Cisco" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://reyee.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Reyee website"><img src="/site-assets/partners/reyee.webp" alt="Reyee" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Ruijie website"><img src="/site-assets/partners/ruijie.webp" alt="Ruijie" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.hikvision.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Hikvision website"><img src="/site-assets/partners/hikvision.webp" alt="Hikvision" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://unicableco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Unicable website"><img src="/site-assets/partners/unicable.webp" alt="Unicable" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.rovapa.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Rovapa website"><img src="/site-assets/partners/rovapa.webp" alt="Rovapa" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.fortinet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Fortinet website"><img src="/site-assets/partners/fortinet.webp" alt="Fortinet" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.itctech.com.cn/" target="_blank" rel="noopener noreferrer" aria-label="Visit the ITC website"><img src="/site-assets/partners/itc.webp" alt="ITC" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.splunk.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Splunk website"><img src="/site-assets/partners/splunk.webp" alt="Splunk" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.microsoft.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Microsoft website"><img src="/site-assets/partners/microsoft.webp" alt="Microsoft" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.dell.com/en-us" target="_blank" rel="noopener noreferrer" aria-label="Visit the Dell Technologies website"><img src="/site-assets/partners/dell-technologies.webp" alt="Dell Technologies" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.vmware.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the VMware website"><img src="/site-assets/partners/vmware.webp" alt="VMware" loading="lazy" /></EnglishLink>
            </div>
            <div className="partners-set partners-set-duplicate" aria-hidden="true">
              <EnglishLink className="partner-logo" href="https://www.eelectron.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the eelectron website" tabIndex="-1"><img src="/site-assets/partners/eelectron.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://saltosystems.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the SALTO website" tabIndex="-1"><img src="/site-assets/partners/salto.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.schrack-seconet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Schrack Seconet website" tabIndex="-1"><img src="/site-assets/partners/schrack-seconet.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.eaton.com/us/en-us.html" target="_blank" rel="noopener noreferrer" aria-label="Visit the Eaton website" tabIndex="-1"><img src="/site-assets/partners/eaton.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.huawei.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Huawei website" tabIndex="-1"><img src="/site-assets/partners/huawei.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Cisco website" tabIndex="-1"><img src="/site-assets/partners/cisco.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://reyee.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Reyee website" tabIndex="-1"><img src="/site-assets/partners/reyee.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Ruijie website" tabIndex="-1"><img src="/site-assets/partners/ruijie.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.hikvision.com/en/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Hikvision website" tabIndex="-1"><img src="/site-assets/partners/hikvision.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://unicableco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Unicable website" tabIndex="-1"><img src="/site-assets/partners/unicable.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.rovapa.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Rovapa website" tabIndex="-1"><img src="/site-assets/partners/rovapa.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.fortinet.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Fortinet website" tabIndex="-1"><img src="/site-assets/partners/fortinet.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.itctech.com.cn/" target="_blank" rel="noopener noreferrer" aria-label="Visit the ITC website" tabIndex="-1"><img src="/site-assets/partners/itc.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.splunk.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Splunk website" tabIndex="-1"><img src="/site-assets/partners/splunk.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.microsoft.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the Microsoft website" tabIndex="-1"><img src="/site-assets/partners/microsoft.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.dell.com/en-us" target="_blank" rel="noopener noreferrer" aria-label="Visit the Dell Technologies website" tabIndex="-1"><img src="/site-assets/partners/dell-technologies.webp" alt="" loading="lazy" /></EnglishLink>
              <EnglishLink className="partner-logo" href="https://www.vmware.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the VMware website" tabIndex="-1"><img src="/site-assets/partners/vmware.webp" alt="" loading="lazy" /></EnglishLink>
            </div>
          </div>
        </div>
      </section>


      <section className="about-operations" aria-labelledby="about-operations-title">
        <div className="about-operations-intro">
          <span className="section-kicker">How We Work</span>
          <h2 id="about-operations-title">How Does Almutaqaddim Work?</h2>
          <p>Every company needs an organizational structure that coordinates its internal work. This section presents Almutaqaddim's structure so every team member can understand their role, responsibilities, and where to direct questions or reports.</p>
          <p>We believe an organizational structure should not be a fixed template. Almutaqaddim has its own characteristics, so adopting a ready-made structure would not be effective. As the company grows, we update the structure to maintain clear responsibilities and smooth decision-making.</p>
        </div>

        <div className="operations-grid">
          <article className="operation-card operation-card-featured">
            <span className="operation-icon"><i className="fa-solid fa-sitemap"></i></span>
            <div><h3>General Management</h3><p>Almutaqaddim Technology Solutions is governed by a board that sets strategic direction and general policies, while executive management leads daily operations and coordinates departments to achieve corporate objectives efficiently. The company follows a flexible organizational structure based on governance and team integration, with continuous performance monitoring and process improvement to ensure quality execution and sustainable growth.</p></div>
          </article>

          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-chart-line"></i></span><h3>Finance Department</h3><p>This department leads accounting operations, manages financial resources, prepares periodic reports, and monitors revenue, liabilities, and budgets. It also applies internal controls and provides senior management with information that supports strategic decisions.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-diagram-project"></i></span><h3>Project Management</h3><p>This department plans, organizes, executes, and monitors client projects from end to end. It leads site teams, defines schedules and resources, and coordinates site and operations engineers to ensure efficient, professional delivery that meets technical requirements.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-cart-flatbed"></i></span><h3>Sales & Procurement</h3><p>This department grows the client base, secures project requirements, prepares commercial proposals, and manages supplier relationships to balance quality, cost, and delivery time while ensuring material availability and uninterrupted execution.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-users-gear"></i></span><h3>Our People</h3><p>We rely on an integrated team of technical and administrative professionals, including site and implementation engineers, marketing and media specialists, and systems operations and technical support teams responsible for infrastructure management, system monitoring, and security standards that ensure service stability.</p></article>
        </div>
      </section>

      <section className="contact-cta about-community" aria-labelledby="about-community-title">
        <div className="contact-cta-copy">
          <span className="section-kicker">Impact Beyond Technology</span>
          <h2 id="about-community-title">Social Responsibility</h2>
          <p>As part of our commitment to supporting the community and strengthening the local economy, MCTC provides dedicated training opportunities for recent graduates to gain practical experience and develop their skills. We also create strong employment opportunities for promising talent after training, reflecting our belief in investing in local capabilities and building professionals who can contribute effectively to sustainable development.</p>
        </div>
      </section>
    </div>
  );
}
