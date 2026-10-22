import React, { useEffect, useRef } from "react";
import { productReels } from "../../constants/home.shared.js";

export default function ProductReels({ english = false, french = false }) {
  const trackRef = useRef(null);
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!english && !french) return undefined;
    const track = trackRef.current;
    const bar = scrollbarRef.current;
    const thumb = thumbRef.current;
    if (!track || !bar || !thumb) return undefined;
    const update = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const progress = maxScroll ? Math.min(1, Math.max(0, track.scrollLeft / maxScroll)) : 0;
      const thumbWidth = Math.max(34, bar.clientWidth * track.clientWidth / Math.max(track.scrollWidth, 1));
      thumb.style.width = `${Math.min(bar.clientWidth, thumbWidth)}px`;
      thumb.style.transform = `translateX(${progress * Math.max(0, bar.clientWidth - thumbWidth)}px)`;
      bar.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    };
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [english, french]);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector(".product-reel");
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 16;
    const step = (first?.getBoundingClientRect().width || 260) + gap;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const scrollFromPointer = (clientX) => {
    const track = trackRef.current;
    const bar = scrollbarRef.current;
    if (!track || !bar) return;
    const rect = bar.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    track.scrollLeft = progress * Math.max(0, track.scrollWidth - track.clientWidth);
  };

  return (
    <section className="product-reels" aria-labelledby="product-reels-title">
      <div className="product-reels-heading">
        <div><span>{french ? "La minute techno" : english ? "Tech Minute" : "دقيقة تقنية"}</span><h2 id="product-reels-title">{french ? "Nos produits, réinventés" : english ? "Our Products, Reimagined" : "منتجاتنا كما لم ترها من قبل"}</h2></div>
        <p>{french ? "Faites défiler horizontalement pour en découvrir davantage" : english ? "Swipe horizontally to discover more" : "مرّر أفقيًا لاكتشاف المزيد"}</p>
      </div>
      <div className="product-reels-stage">
        <button className="reels-arrow reels-arrow-right" type="button" aria-label={french ? "Afficher les vidéos suivantes" : english ? "Show next videos" : "عرض الفيديوهات التالية"} onClick={() => scroll(english || french ? 1 : -1)}>›</button>
        <div className="product-reels-track" id="product-reels-track" aria-label={french ? "Vidéos des produits de l’entreprise" : english ? "Company product videos" : "فيديوهات منتجات الشركة"} ref={trackRef}>
          {productReels.map((id, index) => <article className="product-reel" key={id}><iframe src={`https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(`https://www.facebook.com/reel/${id}/`)}&show_text=false&width=267&t=0`} title={french ? `Vidéo de présentation des produits ${index + 1}` : english ? `Company product reel ${index + 1}` : `ريل منتجات الشركة ${index + 1}`} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen /></article>)}
        </div>
        <button className="reels-arrow reels-arrow-left" type="button" aria-label={french ? "Afficher les vidéos précédentes" : english ? "Show previous videos" : "عرض الفيديوهات السابقة"} onClick={() => scroll(english || french ? -1 : 1)}>‹</button>
      </div>
      {(english || french) && <div className="reels-scrollbar" role="scrollbar" aria-label={french ? "Faire défiler les vidéos des produits" : "Scroll product videos"} aria-controls="product-reels-track" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabIndex={0} ref={scrollbarRef} onPointerDown={(event) => { draggingRef.current = true; event.currentTarget.setPointerCapture(event.pointerId); scrollFromPointer(event.clientX); }} onPointerMove={(event) => { if (draggingRef.current) scrollFromPointer(event.clientX); }} onPointerUp={() => { draggingRef.current = false; }} onPointerCancel={() => { draggingRef.current = false; }} onKeyDown={(event) => { if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return; event.preventDefault(); const track = trackRef.current; if (track) track.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * track.clientWidth * 0.12, behavior: "smooth" }); }}><span ref={thumbRef}></span></div>}
    </section>
  );
}
