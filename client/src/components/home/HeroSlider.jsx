import React, { useEffect, useState } from "react";

export default function HeroSlider({ slides, english = false, french = false }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (paused || !visible) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [active, paused, visible]);

  const goTo = (index) => setActive((index + slides.length) % slides.length);

  return (
    <section className="hero-slider" aria-label={french ? "Solutions Almutaqaddim" : english ? "Almutaqaddim Solutions" : "حلول المتقدم"} aria-roledescription={french ? "Diaporama" : english ? "Slideshow" : "عارض شرائح"} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className="slides-track">
        {slides.map((slide, index) => (
          <article className={`hero-slide ${index === active ? "is-active" : ""}`} key={slide.image} aria-hidden={index !== active}>
            <img src={slide.image} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} />
            <div className="slide-shade"></div>
            <div className="slide-content">
              {slide.logo && <div className="secondary-logo" aria-label={french ? "Logo secondaire d’Almutaqaddim" : english ? "Secondary Almutaqaddim logo" : "الشعار الثاني لشركة المتقدم"}><strong>MCTC</strong><span>ALMUTQADDIM</span></div>}
              <p>{slide.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="slider-controls" aria-label={french ? "Commandes du diaporama" : english ? "Slide controls" : "التحكم في الشرائح"}>
        <button className="slider-arrow slider-prev" type="button" aria-label={french ? "Image précédente" : english ? "Previous image" : "الصورة السابقة"} onClick={() => goTo(active - 1)}>‹</button>
        <div className="slider-dots" role="tablist" aria-label={french ? "Choisir une diapositive" : english ? "Select slide" : "اختيار الشريحة"}>
          {slides.map((slide, index) => <button key={slide.image} className={index === active ? "is-active" : ""} type="button" role="tab" aria-selected={index === active} aria-label={french ? `Diapositive ${index + 1}` : english ? `Slide ${index + 1}` : `الشريحة ${index + 1}`} onClick={() => goTo(index)} />)}
        </div>
        <button className="slider-arrow slider-next" type="button" aria-label={french ? "Image suivante" : english ? "Next image" : "الصورة التالية"} onClick={() => goTo(active + 1)}>›</button>
      </div>
      <div className="slider-progress" aria-hidden="true"><span key={`${active}-${paused}-${visible}`} className={!paused && visible ? "is-running" : ""}></span></div>
    </section>
  );
}
