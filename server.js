import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
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
  ".webmanifest": "application/manifest+json",
};

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

function sendFile(res, file) {
  const type = types[extname(file)] || "application/octet-stream";
  const cache =
    file.includes(`${sep}assets${sep}`)
      ? "public, max-age=31536000, immutable"
      : "no-cache";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": cache });
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

    let file = fileInDist(req.url || "/");
    if (file && existsSync(file) && statSync(file).isDirectory()) {
      file = join(file, "index.html");
    }
    if (file && existsSync(file) && statSync(file).isFile()) {
      if (req.method === "HEAD") {
        res.writeHead(200);
        res.end();
        return;
      }
      sendFile(res, file);
      return;
    }

    const index = join(dist, "index.html");
    if (!existsSync(index)) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(index).pipe(res);
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
