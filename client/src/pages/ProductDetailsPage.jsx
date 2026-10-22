import React from "react";
import ProductDetailsPageView from "../components/ProductDetailsPageView.jsx";
import { productsArabicContent } from "../constants/products.ar.js";

export default function ProductDetailsPage() {
  return <ProductDetailsPageView content={productsArabicContent} />;
}
