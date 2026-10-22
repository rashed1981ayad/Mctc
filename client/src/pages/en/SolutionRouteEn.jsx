import React, { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";

const loaders = import.meta.glob("./solutions/*.jsx");
const pages = Object.fromEntries(
  Object.entries(loaders).map(([path, loader]) => [path.split("/").pop().replace(/\.jsx$/, ""), React.lazy(loader)])
);

export function preloadEnglishSolution(slug) {
  loaders[`./solutions/${slug}.jsx`]?.().catch(() => {});
}

export default function SolutionRouteEn() {
  const { slug } = useParams();
  const Page = pages[slug];
  if (!Page) return <Navigate to="/en" replace />;
  return <Suspense key={slug} fallback={<section className="page-loading">Loading solution...</section>}><Page /></Suspense>;
}
