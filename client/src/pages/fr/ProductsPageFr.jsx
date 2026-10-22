import React from "react";
import ProductsPageView from "../../components/ProductsPageView.jsx";
import { productsFrenchContent } from "../../constants/products.fr.js";
import ProductsLandingHeroFr from "./ProductsLandingHeroFr.jsx";

export default function ProductsPageFr() {
  return <ProductsPageView content={productsFrenchContent} LandingHero={ProductsLandingHeroFr} />;
}
