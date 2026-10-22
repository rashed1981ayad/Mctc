import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h3>شركة المتقدم لحلول تقنية المعلومات</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/mctcly" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/mctcly" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@mctcly" target="_blank" rel="noreferrer" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
          </div>
          <p><i className="fa-solid fa-location-dot footer-icon"></i> البركة بجوار مسجد بوغولة – بنغازي – ليبيا</p>
        </section>

        <section>
          <h3>تواصل معنا</h3>
          <a href="tel:00218930001191"><i className="fa-solid fa-phone-flip footer-icon"></i> 00218930001191</a>
          <a href="tel:00218930001190"><i className="fa-solid fa-phone-flip footer-icon"></i> 00218930001190</a>
          <a href="mailto:support@mctc.ly"><i className="fa-solid fa-envelope footer-icon"></i> support@mctc.ly</a>
        </section>

        <section>
          <h3>أوقات العمل</h3>
          <p><i className="fa-solid fa-clock footer-icon"></i> من السبت إلى الأربعاء: 9:00 صباحًا – 9:00 مساءً</p>
          <p><i className="fa-solid fa-clock footer-icon"></i> الخميس: 9:00 صباحًا – 5:00 مساءً</p>
        </section>
      </div>
      <div className="footer-bottom">
        © {year} شركة المتقدم لحلول تقنية المعلومات. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
