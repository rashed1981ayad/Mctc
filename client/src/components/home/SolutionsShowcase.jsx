import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function SolutionsShowcase({ solutions, english = false, french = false }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!section || !sticky || !viewport || !track) return;
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 16;
      const visibleCards = window.innerWidth > 640 ? 4 : 2;
      const cardWidth = window.innerWidth > 640 ? (viewport.clientWidth - gap * 3) / 4 : (viewport.clientWidth - gap) / 2.2;
      track.style.setProperty("--solution-card-width", `${cardWidth}px`);
      const horizontalDistance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = `${sticky.offsetHeight + horizontalDistance}px`;
      const top = Number.parseFloat(getComputedStyle(sticky).top) || 0;
      const available = Math.max(1, section.offsetHeight - sticky.offsetHeight);
      const ratio = Math.min(1, Math.max(0, (top - section.getBoundingClientRect().top) / available));
      track.style.transform = `translate3d(${english || french ? -horizontalDistance * ratio : horizontalDistance * ratio}px, 0, 0)`;
      if (progressBar) progressBar.style.width = `${ratio * 100}%`;
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
    return () => { window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); if (frame) cancelAnimationFrame(frame); };
  }, [english, french]);

  return (
    <section className="solutions-scroll" id="solutions" aria-labelledby="solutions-title" ref={sectionRef}>
      <div className="solutions-sticky" ref={stickyRef}>
        <div className="solutions-heading"><span>{french ? "Nos offres" : english ? "What We Offer" : "ما نقدمه"}</span><h2 id="solutions-title">{french ? "Solutions informatiques complètes" : english ? "Comprehensive IT Solutions" : "حلول تقنية متكاملة"}</h2></div>
        <div className="solutions-viewport" ref={viewportRef}>
          <div className="solutions-track" ref={trackRef}>
            {solutions.map((solution) => (
              <Link className="solution-card" id={solution.slug} key={solution.slug} to={`${french ? "/fr" : english ? "/en" : ""}/solutions/${solution.slug}`} aria-label={solution.title}>
                <img src={`/site-assets/solutions/${solution.image}`} alt={solution.title} loading="lazy" />
                <div className="solution-title">{solution.title}</div>
                <div className="solution-info"><h3>{solution.title}</h3><p>{solution.description}</p><span aria-hidden="true">{english || french ? "→" : "←"}</span></div>
              </Link>
            ))}
          </div>
        </div>
        <div className="solutions-scroll-cue" aria-hidden="true"><span ref={progressRef}></span></div>
      </div>
    </section>
  );
}
