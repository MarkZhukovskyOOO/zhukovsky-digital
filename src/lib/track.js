export function track(name, params = {}) {
  const payload = { event: name, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  const id = window.__YM_ID;
  if (id && typeof window.ym === "function") {
    window.ym(id, "reachGoal", name, params);
  }
}

const SLUGS = {
  "/services": "mobile",
  "/services/web-development": "web-development",
  "/services/personal-accounts": "personal-accounts",
  "/services/product-audit": "product-audit",
  "/services/support": "support",
  "/services/ux-ui": "ux-ui",
};

export function serviceSlugFromPath(path) {
  return SLUGS[path] || "";
}
