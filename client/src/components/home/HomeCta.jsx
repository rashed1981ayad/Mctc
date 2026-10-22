import React from "react";
import { Link } from "react-router-dom";

export default function HomeCta({ english = false, french = false }) {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <div className="contact-cta-copy">
        <h2 id="contact-cta-title">{french ? "Entamez votre transformation numérique" : english ? "Start Your Digital Transformation Journey" : "ابدأ رحلتك نحو التحول التقني"}</h2>
        <p>{french ? "Construisons ensemble une infrastructure informatique fiable qui accompagne la croissance de votre entreprise et répond aux exigences de demain, grâce à des solutions technologiques complètes et à une expertise spécialisée." : english ? "Let us help you build reliable IT infrastructure that supports your business growth and meets the demands of the future through comprehensive technology solutions and specialized expertise." : "دعنا نساعدك في بناء بنية تقنية موثوقة تدعم نمو أعمالك وتواكب متطلبات المستقبل من خلال حلول تقنية متكاملة وخبرات متخصصة."}</p>
      </div>
      <Link className="contact-cta-button" to={french ? "/fr/contact" : english ? "/en/contact" : "/contact"}>{french ? "Lancez votre projet avec nous" : english ? "Start Your Project With Us" : "ابدأ مشروعك معنا"} <span aria-hidden="true">{english || french ? "→" : "←"}</span></Link>
    </section>
  );
}
