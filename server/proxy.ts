/**
 * Simple Express proxy server for production.
 * Forwards /api/anthropic/* → https://api.anthropic.com/*
 *
 * Run with:  node --loader ts-node/esm server/proxy.ts
 * Or build:  tsc && node dist/server/proxy.js
 *
 * Set env: ANTHROPIC_API_KEY=sk-...
 * Then serve the Vite build on the same server.
 */

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3000;

// Proxy Anthropic API calls
app.use(
  "/api/anthropic",
  createProxyMiddleware({
    target: "https://api.anthropic.com",
    changeOrigin: true,
    pathRewrite: { "^/api/anthropic": "" },
    on: {
      proxyReq: (proxyReq) => {
        const key = process.env.ANTHROPIC_API_KEY ?? "";
        if (key) proxyReq.setHeader("x-api-key", key);
        proxyReq.setHeader("anthropic-version", "2023-06-01");
      },
    },
  })
);

// Serve Vite build
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "../dist/index.html"))
);

app.listen(PORT, () => console.log(`AlzPredict running on http://localhost:${PORT}`));
