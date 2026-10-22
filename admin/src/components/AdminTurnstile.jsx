import React, { useEffect, useRef, useState } from "react";

export default function AdminTurnstile({ action, onToken, resetSignal }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let timer;
    async function load() {
      try {
        const response = await fetch("/api/auth/turnstile-config", { credentials: "same-origin", cache: "no-store" });
        if (!response.ok) throw new Error("التحقق الأمني للوحة التحكم غير مهيأ. راجع إعدادات الخادم.");
        const { siteKey } = await response.json();
        if (!siteKey) throw new Error("مفتاح التحقق الأمني غير متاح.");
        let attempts = 0;
        const resetChallenge = () => {
          onToken("");
          if (window.turnstile && widgetIdRef.current !== null) window.turnstile.reset(widgetIdRef.current);
        };
        const render = () => {
          if (!active) return;
          if (window.turnstile && containerRef.current) {
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
              sitekey: siteKey,
              action,
              theme: "light",
              language: "ar",
              callback: (token) => { onToken(token); setError(""); },
              "expired-callback": resetChallenge,
              "timeout-callback": resetChallenge,
              "error-callback": () => { onToken(""); setError("تعذر تشغيل التحقق الأمني. حدّث الصفحة وحاول مجددًا."); }
            });
          } else if (++attempts < 40) {
            timer = window.setTimeout(render, 250);
          } else {
            setError("تعذر تحميل التحقق الأمني. تحقق من الاتصال ثم حدّث الصفحة.");
          }
        };
        render();
      } catch (cause) {
        if (active) setError(cause.message);
      }
    }
    load();
    return () => {
      active = false;
      window.clearTimeout(timer);
      if (window.turnstile && widgetIdRef.current !== null) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
      onToken("");
    };
  }, [action, onToken]);

  useEffect(() => {
    if (!resetSignal || !window.turnstile || widgetIdRef.current === null) return;
    onToken("");
    window.turnstile.reset(widgetIdRef.current);
  }, [resetSignal, onToken]);

  return (
    <div className="admin-turnstile">
      <strong>التحقق الأمني <span aria-hidden="true">*</span></strong>
      <div ref={containerRef}></div>
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}
