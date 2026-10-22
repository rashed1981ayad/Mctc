import React from "react";
import HeroSlider from "../components/home/HeroSlider.jsx";
import SolutionsShowcase from "../components/home/SolutionsShowcase.jsx";
import IndustryCarousel from "../components/home/IndustryCarousel.jsx";
import ProductReels from "../components/home/ProductReels.jsx";
import HomeCta from "../components/home/HomeCta.jsx";
import { homeSlides, homeSolutions, industrySlides } from "../constants/home.ar.js";
import "../styles/reference.ar.css";
import "../styles/home-controls.css";

export default function HomePage() {
  return (
    <div className="landing-main" dir="rtl" lang="ar">
      <HeroSlider slides={homeSlides} />
      <SolutionsShowcase solutions={homeSolutions} />
      <IndustryCarousel slides={industrySlides} />
      <ProductReels />
      <HomeCta />
    </div>
  );
}
