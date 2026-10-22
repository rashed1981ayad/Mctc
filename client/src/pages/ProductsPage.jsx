import React from "react";
import ProductsLandingHeroAr from "../components/ProductsLandingHeroAr.jsx";
import ProductsPageView from "../components/ProductsPageView.jsx";
import { productsArabicContent } from "../constants/products.ar.js";

export default function ProductsPage() {
  return <ProductsPageView content={productsArabicContent} LandingHero={ProductsLandingHeroAr} />;
}
