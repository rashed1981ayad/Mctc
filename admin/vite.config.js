import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react(), {
    name: "block-admin-uploads",
    configureServer(server) {
      server.middlewares.use("/uploads", (_req, res) => {
        res.statusCode = 404;
        res.end();
      });
    }
  }],
  resolve: { preserveSymlinks: true, dedupe: ["react", "react-dom", "react-router-dom", "@tanstack/react-query"] },
  build: { outDir: "dist", sourcemap: false },
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
    allowedHosts: ["admin.localhost", "localhost"],
    headers: {
      "Content-Security-Policy": "default-src 'none'; base-uri 'none'; object-src 'none'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' ws: https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; form-action 'self'; frame-ancestors 'none'"
    },
    proxy: {
      "/api": "http://127.0.0.1:5000",
      "/login": "http://127.0.0.1:5000",
      "/admin-login.css": "http://127.0.0.1:5000",
      "/admin-login.js": "http://127.0.0.1:5000"
    }
  }
});
