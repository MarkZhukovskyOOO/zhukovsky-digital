import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { REDIRECTS, ROUTES, SITE, SITEMAP_ROUTES, publicPath, sitemapXml } from "../seo-routes.js";
import { NOT_FOUND, PAGES, pageUrl } from "../src/seo.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const chromeCache = join(root, ".cache", "chrome");

const MARKERS = {
  "/": "Мы решаем digital-задачи медицинских сетей",
  "/services": "Мобильные приложения для медицинского бизнеса",
  "/services/web-development": "Разработка сайтов и интернет-магазинов для бизнеса",
  "/services/personal-accounts": "Разработка личных кабинетов и клиентских сервисов",
  "/services/product-audit": "Аудит сайтов и мобильных приложений",
  "/services/support": "Поддержка и развитие сайтов и приложений",
  "/services/ux-ui": "UX/UI-дизайн сайтов, приложений и цифровых сервисов",
  "/company": "студия заказной разработки",
  "/industries/pharmacy": "Собственный сайт и приложение для вашей аптечной сети",
  "/cases": "Продукты, которые создают ценность для бизнеса",
  "/case/adonis": "Адонис — запуск онлайн-направления аптечной сети",
  "/case/olymp-clinic": "Olymp Clinic — новая версия сайта на 1С-Битрикс",
  "/case/narodnaya": "Аптека Народная — сайт аптечной сети",
  "/policy": "Политика конфиденциальности",
};

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
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function systemChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  return candidates.find((path) => existsSync(path)) || null;
}

async function resolveChrome() {
  const existing = systemChrome();
  if (existing) return existing;

  const {
    install,
    Browser,
    resolveBuildId,
    detectBrowserPlatform,
    computeExecutablePath,
  } = await import("@puppeteer/browsers");
  const platform = detectBrowserPlatform();
  if (!platform) throw new Error("Не удалось определить платформу для установки Chrome.");
  const buildId = await resolveBuildId(Browser.CHROME, platform, "stable");
  const executablePath = computeExecutablePath({
    browser: Browser.CHROME,
    buildId,
    cacheDir: chromeCache,
  });
  if (!existsSync(executablePath)) {
    console.log("Chrome не найден в системе, скачиваю его для сборки…");
    await install({ browser: Browser.CHROME, buildId, cacheDir: chromeCache });
  }
  if (!existsSync(executablePath)) {
    throw new Error("Chrome не установился. Задайте путь в CHROME_PATH.");
  }
  return executablePath;
}

function startServer() {
  const server = createServer((req, res) => {
    let pathname = "/";
    try {
      pathname = decodeURIComponent((req.url || "/").split("?")[0]);
    } catch {
      res.writeHead(400);
      res.end();
      return;
    }
    let file = join(dist, pathname);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file) || !statSync(file).isFile()) file = join(dist, "index.html");
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    createReadStream(file).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: server.address().port });
    });
  });
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function tagAttrs(raw) {
  const attrs = {};
  for (const match of raw.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? "");
  }
  return attrs;
}

function pageHead(html) {
  const head = (html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "");
  const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((match) => decodeEntities(match[1].trim()));
  const metas = [...head.matchAll(/<meta\b([^>]*)\/?>/gi)].map((match) => tagAttrs(match[1]));
  const links = [...head.matchAll(/<link\b([^>]*)\/?>/gi)].map((match) => tagAttrs(match[1]));
  const h1 = [...html.matchAll(/<h1\b/gi)].length;
  const linksInBody = [...html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  return { titles, metas, links, h1, linksInBody, jsonLd };
}

function metaContent(metas, name) {
  return metas.find((meta) => (meta.name || "").toLowerCase() === name)?.content || "";
}

function assertHtml(html, route) {
  const page = PAGES[route];
  const marker = MARKERS[route];
  const parsed = pageHead(html);
  if (!page) throw new Error(`Нет метаданных для ${route}`);
  if (!marker || !html.includes(marker)) throw new Error(`В HTML ${route} нет текста страницы`);
  if (parsed.h1 !== 1) throw new Error(`В HTML ${route} заголовков H1: ${parsed.h1}`);
  if (parsed.titles.length !== 1 || parsed.titles[0] !== page.title) {
    throw new Error(`В HTML ${route} title не совпал с реестром`);
  }
  if (metaContent(parsed.metas, "description") !== page.description) {
    throw new Error(`В HTML ${route} description не совпал с реестром`);
  }
  const canonical = parsed.links.find((link) => link.rel === "canonical")?.href || "";
  if (canonical !== pageUrl(route)) throw new Error(`В HTML ${route} неверный canonical: ${canonical}`);
  const ogUrl = parsed.metas.find((meta) => meta.property === "og:url")?.content || "";
  if (ogUrl !== pageUrl(route)) throw new Error(`В HTML ${route} неверный og:url: ${ogUrl}`);
  for (const href of parsed.linksInBody) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathOnly = href.split(/[?#]/)[0];
    if (pathOnly === "/" || /\.[a-z0-9]+$/i.test(pathOnly)) continue;
    const key = pathOnly.endsWith("/") ? pathOnly.slice(0, -1) : pathOnly;
    if (ROUTES.includes(key) && !pathOnly.endsWith("/")) {
      throw new Error(`В HTML ${route} ссылка без завершающего слеша: ${href}`);
    }
  }
  const robots = metaContent(parsed.metas, "robots");
  if (page.robots) {
    if (robots !== page.robots) throw new Error(`В HTML ${route} ожидался robots «${page.robots}», получен «${robots}»`);
  } else if (robots.toLowerCase().includes("noindex")) {
    throw new Error(`В HTML ${route} коммерческая страница закрыта от индексации`);
  }
  if (!parsed.linksInBody.some((href) => href.startsWith("/") || href.startsWith(SITE))) {
    throw new Error(`В HTML ${route} нет внутренних ссылок`);
  }
  const image = page?.image?.image || "";
  if (image && !image.startsWith(`${SITE}/og/`)) {
    throw new Error(`В HTML ${route} картинка для соцсетей не абсолютная`);
  }
  const twitter = metaContent(parsed.metas, "twitter:card");
  const ogImage = parsed.metas.find((meta) => meta.property === "og:image")?.content || "";
  if (page.image) {
    if (ogImage !== page.image.image) throw new Error(`В HTML ${route} нет og:image`);
    if (twitter !== "summary_large_image") throw new Error(`В HTML ${route} нет twitter:card`);
  }
  if (parsed.jsonLd.length === 0) throw new Error(`В HTML ${route} нет структурированных данных`);
  for (const block of parsed.jsonLd) JSON.parse(block);
  if (html.includes("reveal-ready")) throw new Error(`В HTML ${route} контент скрыт анимацией без JavaScript`);
}

function assertNotFound(html) {
  const parsed = pageHead(html);
  if (!html.includes("Такой страницы нет")) throw new Error("В HTML 404 нет текста страницы");
  if (parsed.h1 !== 1) throw new Error(`В HTML 404 заголовков H1: ${parsed.h1}`);
  if (parsed.titles.length !== 1 || parsed.titles[0] !== NOT_FOUND.title) {
    throw new Error("В HTML 404 title не совпал");
  }
  if (metaContent(parsed.metas, "robots") !== "noindex, nofollow") {
    throw new Error("В HTML 404 нет noindex в meta robots");
  }
  if (parsed.links.some((link) => link.rel === "canonical")) {
    throw new Error("В HTML 404 не должно быть canonical");
  }
}

function assertSitemap(xml) {
  if (xml.includes("<lastmod>")) throw new Error("В sitemap не должно быть lastmod");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = SITEMAP_ROUTES.map((route) => `${SITE}${publicPath(route)}`);
  if (locs.length !== expected.length || expected.some((loc, index) => locs[index] !== loc)) {
    throw new Error(`Sitemap не совпал с реестром: ${locs.length} адресов`);
  }
  const closed = new Set([
    `${SITE}/policy`,
    `${SITE}/policy/`,
    `${SITE}/case/olymp`,
    `${SITE}/case/olymp/`,
  ]);
  if (locs.some((loc) => closed.has(loc) || loc.includes("?"))) {
    throw new Error("В sitemap попала закрытая или неканоническая страница");
  }
}

function routeFile(route) {
  return route === "/" ? join(dist, "index.html") : join(dist, route, "index.html");
}

async function capture(page, port, route) {
  const response = await page.goto(`http://127.0.0.1:${port}${publicPath(route)}`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });
  if (!response) throw new Error(`Нет ответа для ${route}`);
  await page.waitForSelector("h1");
  const marker = MARKERS[route];
  if (marker) {
    await page.waitForFunction(
      (text) => document.body.innerText.includes(text),
      { timeout: 10000 },
      marker,
    );
  }
  await page.evaluate(() => {
    document.documentElement.classList.remove("reveal-ready");
    document.querySelectorAll(".reveal, .is-visible, .is-ready, .is-live").forEach((el) => {
      el.classList.remove("reveal", "is-visible", "is-ready", "is-live");
    });
    /* Стили анимации из эффектов не должны попадать в HTML: при гидратации
       первый рендер их ещё не ставит. Длительность из JSX сохраняем. */
    const effectProps = ["width", "margin-left", "transform", "z-index", "--shift", "--slot", "--sc", "--sy"];
    document.querySelectorAll(".mockup [style], .carousel [style]").forEach((el) => {
      effectProps.forEach((prop) => el.style.removeProperty(prop));
      if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
    });
    /* Портал меню появляется после монтирования. В снимке его быть не должно,
       иначе первый рендер (null) не совпадёт с HTML. */
    document.querySelectorAll("body > .mmenu").forEach((el) => el.remove());
  });
  const html = await page.content();
  assertHtml(html, route);
  return html;
}

async function main() {
  if (!existsSync(join(dist, "index.html"))) {
    throw new Error("Сначала нужен dist/index.html — запустите vite build.");
  }
  for (const route of ROUTES) {
    if (!PAGES[route] || !MARKERS[route]) throw new Error(`Маршрут ${route} не описан в реестре метаданных`);
  }

  const chrome = await resolveChrome();
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chrome,
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (error) {
    throw new Error(`Chrome не запустился (${chrome}): ${error.message}`);
  }

  const { server, port } = await startServer();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);

    const htmlByRoute = new Map();
    for (const route of ROUTES) {
      htmlByRoute.set(route, await capture(page, port, route));
      console.log(`prerender ${route}`);
    }

    await page.goto(`http://127.0.0.1:${port}/__missing_page__`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    await page.waitForFunction(
      () => document.body.innerText.includes("Такой страницы нет"),
      { timeout: 10000 },
    );
    const notFound = await page.content();
    assertNotFound(notFound);

    for (const [route, html] of htmlByRoute) {
      const file = routeFile(route);
      await mkdir(join(file, ".."), { recursive: true });
      await writeFile(file, html);
    }
    await writeFile(join(dist, "404.html"), notFound);

    for (const route of ROUTES) {
      const file = routeFile(route);
      if (!existsSync(file)) throw new Error(`Не создан HTML для ${route}`);
      assertHtml(await readFile(file, "utf8"), route);
    }
    if (!existsSync(join(dist, "404.html"))) throw new Error("Не создан 404.html");

    const xml = sitemapXml();
    assertSitemap(xml);
    await writeFile(join(dist, "sitemap.xml"), xml);
    await writeFile(join(root, "public", "sitemap.xml"), xml);
    console.log(`sitemap ${SITEMAP_ROUTES.length}`);

    for (const [from, to] of Object.entries(REDIRECTS)) {
      console.log(`redirect ${from} -> ${to} (HTTP 301 отдаёт server.js)`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
