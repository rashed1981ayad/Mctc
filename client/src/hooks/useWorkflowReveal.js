import { useEffect } from "react";

export function useWorkflowReveal(siteSelector = ".reference-site-ar") {
  useEffect(() => {
    const section = document.querySelector(`${siteSelector} .enterprise-workflow`);
    const container = section?.querySelector(".enterprise-workflow-steps");
    const steps = [...(container?.querySelectorAll(".enterprise-workflow-step") || [])];
    if (!section || !container || !steps.length) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const styles = getComputedStyle(section);
      const stickyTop = Number.parseFloat(styles.getPropertyValue("--workflow-sticky-top")) || 0;
      const distance = Number.parseFloat(styles.getPropertyValue("--workflow-scroll-distance")) || 760;
      const scrolled = Math.max(0, stickyTop - section.getBoundingClientRect().top);
      const stepDistance = distance * 0.82 / Math.max(1, steps.length - 1);
      const visibleCount = Math.max(1, Math.min(steps.length, 1 + Math.floor(scrolled / stepDistance)));
      steps.forEach((step, index) => step.classList.toggle("is-visible", index < visibleCount));
      container.style.setProperty("--workflow-progress", String((visibleCount - 1) / Math.max(1, steps.length - 1)));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [siteSelector]);
}
