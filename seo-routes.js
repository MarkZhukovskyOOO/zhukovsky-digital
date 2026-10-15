export const SITE = "https://zhukovsky-digital.com";

export const ROUTES = [
  "/",
  "/services",
  "/company",
  "/cases",
  "/case/adonis",
  "/case/olymp-clinic",
  "/policy",
];

export const REDIRECTS = {
  "/case/olymp": "/case/olymp-clinic",
};

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
