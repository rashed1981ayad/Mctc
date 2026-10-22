import { createContext, createElement, useContext, useEffect, useState } from "react";
import { api } from "../services/api.js";
import { confirmLogout } from "../services/logout.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutError, setLogoutError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    api.getSession()
      .then((data) => { if (active) setSession(data.admin); })
      .catch(() => { if (active) window.location.replace("/login"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    setLogoutError("");
    try {
      await confirmLogout(api, () => setSession(null), (path) => window.location.replace(path));
    } catch {
      setLogoutError("تعذر تأكيد تسجيل الخروج. قد تكون جلستك ما زالت فعّالة؛ تحقق من الاتصال وأعد المحاولة.");
    } finally {
      setLoggingOut(false);
    }
  }

  return createElement(AuthContext.Provider, { value: { session, loading, logout, logoutError, loggingOut } }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
