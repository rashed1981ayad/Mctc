import React from "react";
import ProductDetailsPageView from "../../components/ProductDetailsPageView.jsx";
import { productsFrenchContent } from "../../constants/products.fr.js";

export default function ProductDetailsPageFr() {
  return <ProductDetailsPageView content={productsFrenchContent} />;
}
