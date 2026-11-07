import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { handleApi } from "./server/api.js";
import { createFileDb } from "./server/fileDb.js";

function readEnvFile() {
  try {
    return Object.fromEntries(
      readFileSync(new URL("./.env", import.meta.url), "utf8")
        .split(/\r?\n/)
        .filter((row) => row && !row.startsWith("#") && row.includes("="))
        .map((row) => {
          const index = row.indexOf("=");
          return [row.slice(0, index).trim(), row.slice(index + 1).trim()];
        })
    );
  } catch {
    return {};
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function localApi() {
  // Local /api writes orders and reviews into .data. Production uses Netlify Blobs.
  const db = createFileDb();
  return {
    name: "vishwear-local-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || "").split("?")[0];
        if (!pathname.startsWith("/api/")) return next();
        try {
          const raw = req.method === "GET" || req.method === "HEAD" ? undefined : await readBody(req);
          const headers = {};
          if (req.headers["content-type"]) headers["content-type"] = req.headers["content-type"];
          if (req.headers.authorization) headers.authorization = req.headers.authorization;
          const request = new Request(`http://127.0.0.1${req.url}`, {
            method: req.method,
            headers,
            body: raw && raw.length ? raw : undefined,
          });
          const response = await handleApi(request, db);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : "API failed" }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  const file = readEnvFile();
  for (const key of ["ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_PIN"]) {
    process.env[key] = file[key] || process.env[key] || "";
  }
  return {
    plugins: [react(), localApi()],
  };
});
