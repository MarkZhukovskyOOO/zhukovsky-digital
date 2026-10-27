import { NOT_FOUND, PAGES, normalizePath, publicPath } from "../seo.js";

export const YM_COUNTER_ID = 113805957;
const YM_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${YM_COUNTER_ID}`;
const ANALYTICS_KEY = "zd-analytics";

export function analyticsChoice() {
  try {
    const value = localStorage.getItem(ANALYTICS_KEY);
    return value === "granted" || value === "denied" ? value : "";
  } catch {
    return "";
  }
}

function metrikaHostAllowed() {
  return window.location.hostname === "zhukovsky-digital.com" && navigator.webdriver !== true;
}

let loaderInstalled = false;

function installLoader() {
  if (!metrikaHostAllowed() || loaderInstalled) return false;
  loaderInstalled = true;
  window.__YM_ID = YM_COUNTER_ID;
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (let j = 0; j < document.scripts.length; j += 1) {
      if (document.scripts[j].src === r) return;
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", YM_SRC, "ym");
  return true;
}

export function prepareAnalytics() {
  if (analyticsChoice() === "granted") installLoader();
}

export function allowAnalytics(pathname) {
  const already = analyticsChoice() === "granted" && Boolean(window.__YM_ID);
  try {
    localStorage.setItem(ANALYTICS_KEY, "granted");
  } catch {
    /* Выбор останется до закрытия вкладки, если хранилище недоступно. */
  }
  if (!metrikaHostAllowed()) return;
  if (!loaderInstalled) installLoader();
  else window.__YM_ID = YM_COUNTER_ID;
  if (already) return;
  lastHitKey = "";
  window.__YM_LAST_HIT = "";
  trackNavigation(pathname);
}

export function denyAnalytics() {
  try {
    localStorage.setItem(ANALYTICS_KEY, "denied");
  } catch {
    /* Отказ всё равно прекращает отправку в этой вкладке. */
  }
  window.__YM_ID = "";
}

export function track(name, params = {}, { goal = true } = {}) {
  const payload = { event: name, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  const id = window.__YM_ID;
  if (goal && id && typeof window.ym === "function") {
    window.ym(id, "reachGoal", name, params);
  }
}

/* Номер счётчика задаёт владелец в window.__YM_ID. Без номера ym не вызывается
   и скрипт Метрики не подключается. Инициализация одна, с defer: автоматический
   просмотр отключён, каждый экран уходит отдельным hit. Поздняя загрузка ym
   не отменяет уже поставленные в очередь просмотры. */
let metrikaReady = false;
let metrikaWatching = false;
const metrikaQueue = [];
let lastHitKey = "";

function metrikaId() {
  const id = window.__YM_ID;
  if (id === undefined || id === null || id === "") return "";
  return id;
}

function hitKey(hit) {
  return `${hit.url}\n${hit.title}`;
}

function flushMetrika() {
  const id = metrikaId();
  if (!id || typeof window.ym !== "function" || metrikaQueue.length === 0) return;
  if (!metrikaReady) {
    window.ym(id, "init", { defer: true });
    metrikaReady = true;
  }
  while (metrikaQueue.length) {
    const hit = metrikaQueue.shift();
    const key = hitKey(hit);
    if (key === lastHitKey) continue;
    lastHitKey = key;
    window.ym(id, "hit", hit.url, { title: hit.title });
  }
}

function watchMetrika() {
  if (metrikaWatching || typeof window.ym === "function") return;
  metrikaWatching = true;
  let stored = window.ym;
  try {
    Object.defineProperty(window, "ym", {
      configurable: true,
      enumerable: true,
      get() {
        return stored;
      },
      set(value) {
        stored = value;
        if (typeof value === "function") flushMetrika();
      },
    });
  } catch {
    const timer = window.setInterval(() => {
      if (typeof window.ym !== "function") return;
      window.clearInterval(timer);
      flushMetrika();
    }, 50);
  }
}

export function trackNavigation(pathname) {
  const path = normalizePath(pathname);
  const page = path && PAGES[path] ? PAGES[path] : null;
  const title = (page || NOT_FOUND).title;
  const url = new URL(window.location.href);
  url.hash = "";
  if (path && page) url.pathname = publicPath(path);
  const hit = { url: url.toString(), title };
  track("page_view", { page_path: path || pathname }, { goal: false });
  if (!metrikaId()) return;
  const key = hitKey(hit);
  if (window.__YM_LAST_HIT === key) {
    lastHitKey = key;
    return;
  }
  window.__YM_LAST_HIT = key;
  const tail = metrikaQueue[metrikaQueue.length - 1];
  if ((tail && hitKey(tail) === key) || (!tail && key === lastHitKey)) return;
  metrikaQueue.push(hit);
  if (typeof window.ym === "function") flushMetrika();
  else watchMetrika();
}

const SLUGS = {
  "/services": "mobile",
  "/services/web-development": "web-development",
  "/services/personal-accounts": "personal-accounts",
  "/services/product-audit": "product-audit",
  "/services/support": "support",
  "/services/ux-ui": "ux-ui",
  "/industries/pharmacy": "pharmacy",
};

export function serviceSlugFromPath(path) {
  return SLUGS[normalizePath(path)] || "";
}
