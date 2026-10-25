import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { REDIRECTS, normalizePath } from "./seo-routes.js";
import { handleLead } from "./server/lead.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const dist = join(root, "dist");
const port = Number(process.env.PORT) || 3000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function canonicalHost(host) {
  const name = String(host || "").split(":")[0].toLowerCase();
  if (!name || name === "localhost" || name === "127.0.0.1" || name === "zhukovsky-digital.com") {
    return null;
  }
  if (name === "www.zhukovsky-digital.com" || name.endsWith(".twc1.net")) {
    return "https://zhukovsky-digital.com";
  }
  return null;
}

function fileInDist(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split("?")[0]);
  } catch {
    return null;
  }
  const relative = decoded.replace(/^\/+/, "");
  if (relative.includes("\0")) return null;
  const file = join(dist, relative);
  const rootWithSep = dist.endsWith(sep) ? dist : dist + sep;
  if (file !== dist && !file.startsWith(rootWithSep)) return null;
  return file;
}

function sendFile(res, file, status = 200) {
  const type = types[extname(file)] || "application/octet-stream";
  const cache =
    file.includes(`${sep}assets${sep}`)
      ? "public, max-age=31536000, immutable"
      : "no-cache";
  res.writeHead(status, { "Content-Type": type, "Cache-Control": cache });
  if (res.req.method === "HEAD") {
    res.end();
    return;
  }
  createReadStream(file).pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    if (await handleLead(req, res)) return;

    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Method not allowed");
      return;
    }

    const path = normalizePath(req.url || "/");
    if (!path) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad request");
      return;
    }

    const alias = canonicalHost(req.headers.host);
    if (alias) {
      const target = path === "/" ? `${alias}/` : `${alias}${path}`;
      res.writeHead(301, { Location: target });
      res.end();
      return;
    }

    const redirect = REDIRECTS[path];
    if (redirect) {
      res.writeHead(301, { Location: redirect });
      res.end();
      return;
    }

    if (path === "/index.html" || path.endsWith("/index.html")) {
      const clean = path.replace(/\/index\.html$/, "") || "/";
      res.writeHead(301, { Location: clean });
      res.end();
      return;
    }

    let file = fileInDist(req.url || "/");
    if (file && existsSync(file) && statSync(file).isDirectory()) {
      file = join(file, "index.html");
    }
    if (file && existsSync(file) && statSync(file).isFile()) {
      sendFile(res, file);
      return;
    }

    const missing = join(dist, "404.html");
    if (existsSync(missing)) {
      sendFile(res, missing, 404);
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Такой страницы нет");
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: "Не получилось отправить заявку." }));
    }
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`listening on ${port}`);
});
