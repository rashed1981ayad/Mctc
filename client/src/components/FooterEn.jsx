import React from "react";

export default function FooterEn() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer-ltr" dir="ltr">
      <div className="footer-grid">
        <section>
          <h3>Almutaqaddim IT Solutions Company</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/mctcly" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/mctcly" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@mctcly" target="_blank" rel="noreferrer" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
          </div>
          <p><i className="fa-solid fa-location-dot footer-icon"></i> Al-Baraka, Next to Bougoula Mosque – Benghazi, Libya</p>
        </section>

        <section>
          <h3>Contact Us</h3>
          <a href="tel:00218930001191"><i className="fa-solid fa-phone footer-icon"></i> 00218930001191</a>
          <a href="tel:00218930001190"><i className="fa-solid fa-phone footer-icon"></i> 00218930001190</a>
          <a href="mailto:support@mctc.ly"><i className="fa-solid fa-envelope footer-icon"></i> support@mctc.ly</a>
        </section>

        <section>
          <h3>Business Hours</h3>
          <p><i className="fa-solid fa-clock footer-icon"></i> Saturday to Wednesday: 9:00 AM – 9:00 PM</p>
          <p><i className="fa-solid fa-clock footer-icon"></i> Thursday: 9:00 AM – 5:00 PM</p>
        </section>
      </div>
      <div className="footer-bottom">
        © {year} Almutaqaddim IT Solutions Company. All rights reserved.
      </div>
    </footer>
  );
}
