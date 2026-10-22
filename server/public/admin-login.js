const form = document.getElementById("login-form");
const button = form.querySelector('button[type="submit"]');
const message = document.getElementById("message");
const widgetContainer = document.getElementById("login-turnstile");
let widgetId = null;
let turnstileToken = "";

function resetChallenge() {
  turnstileToken = "";
  button.disabled = true;
  if (window.turnstile && widgetId !== null) window.turnstile.reset(widgetId);
}

async function renderChallenge() {
  try {
    const response = await fetch("/api/auth/turnstile-config", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) throw new Error("التحقق الأمني للوحة التحكم غير مهيأ. راجع إعدادات الخادم.");
    const { siteKey } = await response.json();
    if (!siteKey) throw new Error("مفتاح التحقق الأمني غير متاح.");

    let attempts = 0;
    const waitForScript = () => {
      if (window.turnstile) {
        widgetId = window.turnstile.render(widgetContainer, {
          sitekey: siteKey,
          action: "admin_login",
          theme: "light",
          language: "ar",
          callback: (token) => { turnstileToken = token; button.disabled = false; message.textContent = ""; },
          "expired-callback": resetChallenge,
          "timeout-callback": resetChallenge,
          "error-callback": () => { turnstileToken = ""; button.disabled = true; message.textContent = "تعذر تشغيل التحقق الأمني. حدّث الصفحة وحاول مجددًا."; }
        });
      } else if (++attempts < 40) {
        setTimeout(waitForScript, 250);
      } else {
        message.textContent = "تعذر تحميل التحقق الأمني. تحقق من الاتصال ثم حدّث الصفحة.";
      }
    };
    waitForScript();
  } catch (error) {
    message.textContent = error.message;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!turnstileToken) {
    message.textContent = "أكمل التحقق الأمني أولًا.";
    return;
  }
  button.disabled = true;
  message.textContent = "";
  try {
    const data = { ...Object.fromEntries(new FormData(form)), turnstileToken };
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.message || "تعذر تسجيل الدخول");
    }
    window.location.assign("/products");
  } catch (error) {
    message.textContent = error.message;
    resetChallenge();
  }
});

renderChallenge();
