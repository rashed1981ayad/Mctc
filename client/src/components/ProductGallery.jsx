import React, { useEffect, useState } from "react";
import { imageUrl } from "../services/api.js";

export default function ProductGallery({ images = [], productName = "", fallback = "" }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const showPrev = () => setActiveImage((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setActiveImage((current) => (current + 1) % images.length);

  if (!images.length) return <span>{fallback}</span>;

  return (
    <>
      <div className="product-slider">
        <button type="button" className="slider-image-button" onClick={() => setLightboxOpen(true)} aria-label="تكبير الصورة">
          <img src={imageUrl(images[activeImage])} alt={`${productName} ${activeImage + 1}`} />
        </button>
        {images.length > 1 && (
          <>
            <button type="button" className="slider-button slider-prev" onClick={showPrev} aria-label="الصورة السابقة">‹</button>
            <button type="button" className="slider-button slider-next" onClick={showNext} aria-label="الصورة التالية">›</button>
            <div className="slider-dots">
              {images.map((item, index) => (
                <button
                  type="button"
                  key={`${item}-${index}`}
                  className={index === activeImage ? "active" : ""}
                  onClick={() => setActiveImage(index)}
                  aria-label={`عرض الصورة ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {lightboxOpen && (
        <div className="image-lightbox" role="dialog" aria-modal="true">
          <button type="button" className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="إغلاق">×</button>
          {images.length > 1 && <button type="button" className="lightbox-arrow lightbox-prev" onClick={showPrev} aria-label="الصورة السابقة">‹</button>}
          <img src={imageUrl(images[activeImage])} alt={`${productName} ${activeImage + 1}`} />
          {images.length > 1 && <button type="button" className="lightbox-arrow lightbox-next" onClick={showNext} aria-label="الصورة التالية">›</button>}
        </div>
      )}
    </>
  );
}
