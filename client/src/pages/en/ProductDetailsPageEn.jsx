import React from "react";
import ProductDetailsPageView from "../../components/ProductDetailsPageView.jsx";
import { productsEnglishContent } from "../../constants/products.en.js";

export default function ProductDetailsPageEn() {
  return <ProductDetailsPageView content={productsEnglishContent} />;
}
