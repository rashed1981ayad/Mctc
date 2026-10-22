import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function IndustryCarousel({ slides, english = false, french = false }) {
  const [active, setActive] = useState(0);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const videosRef = useRef([]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    videosRef.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && pageVisible) video.play().catch(() => {});
      else video.pause();
    });
  }, [active, pageVisible]);

  useEffect(() => {
    if (!pageVisible || slides.length < 2) return undefined;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 12000);
    return () => window.clearTimeout(timer);
  }, [active, pageVisible]);

  const goTo = (index) => setActive((index + slides.length) % slides.length);

  return (
    <section className="industry-section" aria-labelledby="industry-title">
      <div className="industry-slides">
        {slides.map((slide, index) => (
          <article className={`industry-slide ${index === active ? "is-active" : ""}`} key={slide.slug} aria-hidden={index !== active}>
            <div className="industry-slide-inner">
              <div className="industry-copy">
                <span className="industry-kicker" id={index === 0 ? "industry-title" : undefined}>{french ? "PAR SECTEUR D’ACTIVITÉ" : "BY INDUSTRIAL"}</span>
                {english && slide.slug === "small-office" ? (
                  <h2 className="industry-office-title"><span>Small Office</span><span>&amp; Business Solutions</span></h2>
                ) : <h2>{slide.title}</h2>}
                <p>{slide.description}</p>
                <Link className="industry-link" to={`${french ? "/fr" : english ? "/en" : ""}/solutions/${slide.slug}`}>{slide.action} <span aria-hidden="true">{english || french ? "→" : "←"}</span></Link>
              </div>
              <div className="industry-video-wrap">
                <video ref={(node) => { videosRef.current[index] = node; }} muted loop playsInline preload={index === active ? "metadata" : "none"} aria-label={french ? `Présentation visuelle de ${slide.title}` : english ? `Visual presentation of ${slide.title}` : `عرض مرئي: ${slide.title}`}>
                  <source src={`/site-assets/videos/${slide.video}`} type="video/mp4" />
                </video>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="industry-controls">
        <button className="industry-arrow industry-previous" type="button" aria-label={french ? "Diapositive précédente" : english ? "Previous slide" : "الشريحة السابقة"} onClick={() => goTo(active - 1)}>‹</button>
        <div className="industry-dots" role="tablist" aria-label={french ? "Choisir les solutions par secteur d’activité" : english ? "Select industry solutions" : "اختيار حلول القطاعات"}>
          {slides.map((slide, index) => <button key={slide.slug} className={index === active ? "is-active" : ""} type="button" role="tab" aria-selected={index === active} aria-label={slide.title} onClick={() => goTo(index)} />)}
        </div>
        <button className="industry-arrow industry-next" type="button" aria-label={french ? "Diapositive suivante" : english ? "Next slide" : "الشريحة التالية"} onClick={() => goTo(active + 1)}>›</button>
      </div>
    </section>
  );
}
