export const SITE = "https://zhukovsky-digital.com";

export const ROUTES = [
  "/",
  "/services",
  "/services/web-development",
  "/services/personal-accounts",
  "/services/product-audit",
  "/services/support",
  "/services/ux-ui",
  "/company",
  "/industries/pharmacy",
  "/cases",
  "/case/adonis",
  "/case/olymp-clinic",
  "/case/narodnaya",
  "/policy",
];

export const REDIRECTS = {
  "/case/olymp": "/case/olymp-clinic/",
};

/* Черновик политики остаётся доступным, но не попадает в поиск и карту. */
export const ROBOTS = {
  "/policy": "noindex, follow",
};

export const SITEMAP_ROUTES = ROUTES.filter((route) => !ROBOTS[route]);

/* Внутренний ключ маршрута остаётся без завершающего слеша.
   Публичный адрес страницы на Timeweb — со слешем, кроме главной. */
export function publicPath(value) {
  if (value === undefined || value === null || value === "") return "/";
  const raw = String(value);
  if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
  const suffixAt = raw.search(/[?#]/);
  const pathPart = suffixAt === -1 ? raw : raw.slice(0, suffixAt);
  const suffix = suffixAt === -1 ? "" : raw.slice(suffixAt);
  const key = normalizePath(pathPart);
  if (!key) return raw;
  if (key === "/") return `/${suffix}`;
  if (/\.[a-z0-9]+$/i.test(key) || key.startsWith("/api/") || key.startsWith("/assets/") || key.startsWith("/og/")) {
    return `${key}${suffix}`;
  }
  const page = ROUTES.includes(key) || Object.prototype.hasOwnProperty.call(REDIRECTS, key);
  if (!page) return `${key}${suffix}`;
  return `${key}/${suffix}`;
}

export function sitemapXml() {
  const urls = SITEMAP_ROUTES.map((route) => `  <url><loc>${SITE}${publicPath(route)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function normalizePath(value) {
  if (!value) return "/";
  let path = String(value).split("?")[0];
  try {
    path = decodeURIComponent(path);
  } catch {
    return null;
  }
  if (path.includes("\0")) return null;
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}
