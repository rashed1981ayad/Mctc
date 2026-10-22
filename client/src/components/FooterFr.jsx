import React from "react";

export default function FooterFr() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer-ltr" dir="ltr" lang="fr">
      <div className="footer-grid">
        <section>
          <h3>Almutaqaddim – Solutions informatiques</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/mctcly" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/mctcly" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@mctcly" target="_blank" rel="noreferrer" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
          </div>
          <p><i className="fa-solid fa-location-dot footer-icon"></i> Al-Berka, près de la mosquée Bougoula – Benghazi – Libye</p>
        </section>

        <section>
          <h3>Contactez-nous</h3>
          <a href="tel:00218930001191"><i className="fa-solid fa-phone footer-icon"></i> 00218930001191</a>
          <a href="tel:00218930001190"><i className="fa-solid fa-phone footer-icon"></i> 00218930001190</a>
          <a href="mailto:support@mctc.ly"><i className="fa-solid fa-envelope footer-icon"></i> support@mctc.ly</a>
        </section>

        <section>
          <h3>Horaires d’ouverture</h3>
          <p><i className="fa-solid fa-clock footer-icon"></i> Du samedi au mercredi : de 9 h à 21 h</p>
          <p><i className="fa-solid fa-clock footer-icon"></i> Jeudi : de 9 h à 17 h</p>
        </section>
      </div>
      <div className="footer-bottom">
        © {year} Almutaqaddim – Solutions informatiques. Tous droits réservés.
      </div>
    </footer>
  );
}
