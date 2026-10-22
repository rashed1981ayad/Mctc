import React from "react";
import ProductsPageView from "../../components/ProductsPageView.jsx";
import { productsEnglishContent } from "../../constants/products.en.js";
import ProductsLandingHeroEn from "./ProductsLandingHeroEn.jsx";

export default function ProductsPageEn() {
  return <ProductsPageView content={productsEnglishContent} LandingHero={ProductsLandingHeroEn} />;
}
