import React from "react";
import HeroSlider from "../../components/home/HeroSlider.jsx";
import SolutionsShowcase from "../../components/home/SolutionsShowcase.jsx";
import IndustryCarousel from "../../components/home/IndustryCarousel.jsx";
import ProductReels from "../../components/home/ProductReels.jsx";
import HomeCta from "../../components/home/HomeCta.jsx";
import { homeSlides, homeSolutions, industrySlides } from "../../constants/home.en.js";
import "../../styles/reference.en.css";
import "../../styles/home-controls.css";

export default function HomePageEn() {
  return (
    <div className="landing-main" lang="en" dir="ltr">
      <HeroSlider slides={homeSlides} english />
      <SolutionsShowcase solutions={homeSolutions} english />
      <IndustryCarousel slides={industrySlides} english />
      <ProductReels english />
      <HomeCta english />
    </div>
  );
}
