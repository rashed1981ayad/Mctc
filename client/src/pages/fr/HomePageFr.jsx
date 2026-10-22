import React from "react";
import HeroSlider from "../../components/home/HeroSlider.jsx";
import SolutionsShowcase from "../../components/home/SolutionsShowcase.jsx";
import IndustryCarousel from "../../components/home/IndustryCarousel.jsx";
import ProductReels from "../../components/home/ProductReels.jsx";
import HomeCta from "../../components/home/HomeCta.jsx";
import { homeSlides, homeSolutions, industrySlides } from "../../constants/home.fr.js";
import "../../styles/reference.fr.css";
import "../../styles/home-controls.css";

export default function HomePageFr() {
  return (
    <div className="landing-main" lang="fr" dir="ltr">
      <HeroSlider slides={homeSlides} french />
      <SolutionsShowcase solutions={homeSolutions} french />
      <IndustryCarousel slides={industrySlides} french />
      <ProductReels french />
      <HomeCta french />
    </div>
  );
}
