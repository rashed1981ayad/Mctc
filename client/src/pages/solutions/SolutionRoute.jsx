import React, { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";

const solutionLoaders = {
  "access-control": () => import("./access-control.jsx"),
  "audio-visual": () => import("./audio-visual.jsx"),
  bms: () => import("./bms.jsx"),
  cctv: () => import("./cctv.jsx"),
  "cloud-services": () => import("./cloud-services.jsx"),
  "cyber-security": () => import("./cyber-security.jsx"),
  "data-center": () => import("./data-center.jsx"),
  "enterprise-projects": () => import("./enterprise-projects.jsx"),
  "fire-alarm": () => import("./fire-alarm.jsx"),
  "managed-it": () => import("./managed-it.jsx"),
  "network-infrastructure": () => import("./network-infrastructure.jsx"),
  retail: () => import("./retail.jsx"),
  "small-office": () => import("./small-office.jsx")
};

const solutionPages = Object.fromEntries(
  Object.entries(solutionLoaders).map(([slug, loader]) => [slug, React.lazy(loader)])
);

export function preloadSolution(slug) {
  solutionLoaders[slug]?.().catch(() => {});
}

export default function SolutionRoute() {
  const { slug } = useParams();
  const Page = solutionPages[slug];

  if (!Page) return <Navigate to="/" replace />;

  return (
    <Suspense key={slug} fallback={<section className="page-loading">جاري تحميل الحل...</section>}>
      <Page />
    </Suspense>
  );
}
