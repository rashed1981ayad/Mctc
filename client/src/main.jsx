import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app/App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./styles/index.css";

const legacyHashPath = window.location.hash.slice(1);
if (legacyHashPath.startsWith("/")) {
  window.history.replaceState(null, "", legacyHashPath);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000,
      gcTime: 30 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider><App /></CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
