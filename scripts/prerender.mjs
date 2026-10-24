import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { REDIRECTS, ROUTES, SITE } from "../seo-routes.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

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

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  return candidates.find((path) => existsSync(path)) || null;
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

function redirectHtml(target) {
  const canonical = `${SITE}${target}`;
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Olymp Clinic — Zhukovsky Digital</title>
    <link rel="canonical" href="${canonical}" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <script>location.replace(${JSON.stringify(target)})</script>
  </head>
  <body>
    <p><a href="${target}">Кейс Olymp Clinic</a></p>
  </body>
</html>
`;
}

async function capture(page, port, route) {
  const response = await page.goto(`http://127.0.0.1:${port}${route}`, {
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
    document.querySelectorAll(".mockup [style], .carousel [style]").forEach((el) => {
      el.removeAttribute("style");
    });
  });
  const html = await page.content();
  if (marker && !html.includes(marker)) {
    throw new Error(`В HTML ${route} нет текста страницы`);
  }
  if (!html.includes('rel="canonical"') && !html.includes("rel='canonical'")) {
    throw new Error(`В HTML ${route} нет canonical`);
  }
  if (html.includes("noindex")) {
    throw new Error(`В HTML ${route} остался noindex`);
  }
  const titles = html.match(/<title>/g) || [];
  if (titles.length !== 1) {
    throw new Error(`В HTML ${route} заголовков title: ${titles.length}`);
  }
  return html;
}

async function main() {
  const chrome = chromePath();
  if (!chrome) {
    console.warn(
      "Chrome не найден, пререндер пропущен. Сайт соберётся без статических HTML-страниц. Чтобы включить пререндер, задайте CHROME_PATH.",
    );
    return;
  }
  if (!existsSync(join(dist, "index.html"))) {
    throw new Error("Сначала нужен dist/index.html — запустите vite build.");
  }

  const { server, port } = await startServer();
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

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
    if (!notFound.includes("Такой страницы нет")) {
      throw new Error("Не удалось собрать HTML для 404");
    }
    if (!notFound.includes("noindex")) {
      throw new Error("В HTML 404 нет noindex");
    }

    for (const [route, html] of htmlByRoute) {
      const dir = route === "/" ? dist : join(dist, route);
      await mkdir(dir, { recursive: true });
      const file = route === "/" ? join(dist, "index.html") : join(dir, "index.html");
      await writeFile(file, html);
    }
    await writeFile(join(dist, "404.html"), notFound);

    for (const [from, to] of Object.entries(REDIRECTS)) {
      const dir = join(dist, from);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, "index.html"), redirectHtml(to));
      console.log(`redirect ${from} -> ${to}`);
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
