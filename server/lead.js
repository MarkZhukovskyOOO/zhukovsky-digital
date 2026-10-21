import "./env.js";

const MAX_BODY = 8_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map();

const NEED = {
  new: "Новый продукт с нуля",
  dev: "Развитие или аудит существующего",
};

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

function clip(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(Object.assign(new Error("too large"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export async function handleLead(req, res) {
  const path = (req.url || "").split("?")[0];
  if (path !== "/api/lead") return false;

  if (req.method !== "POST") {
    json(res, 405, { ok: false, error: "Метод не поддерживается." });
    return true;
  }

  if (limited(clientIp(req))) {
    json(res, 429, {
      ok: false,
      error: "Слишком много заявок. Попробуйте позже или напишите в Telegram.",
    });
    return true;
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch (error) {
    const status = error?.status === 413 ? 413 : 400;
    json(res, status, { ok: false, error: "Слишком длинная заявка." });
    return true;
  }

  let data;
  try {
    data = JSON.parse(raw || "{}");
  } catch {
    json(res, 400, { ok: false, error: "Некорректные данные." });
    return true;
  }

  const name = clip(data?.name, 80);
  const company = clip(data?.company, 120);
  const contact = clip(data?.contact, 120);
  const message = clip(data?.message, 2000);
  const need = Object.hasOwn(NEED, data?.need) ? data.need : "";
  const service = clip(data?.service, 80);
  const page = clip(data?.page, 160);

  if (!name) {
    json(res, 400, { ok: false, error: "Укажите имя." });
    return true;
  }
  if (!contact) {
    json(res, 400, { ok: false, error: "Укажите телефон, почту или Telegram." });
    return true;
  }
  if (!need) {
    json(res, 400, { ok: false, error: "Выберите, что нужно." });
    return true;
  }
  if (!message) {
    json(res, 400, { ok: false, error: "Коротко опишите задачу." });
    return true;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    json(res, 503, { ok: false, error: "Отправка заявок временно недоступна." });
    return true;
  }

  const text = [
    "Новая заявка с сайта",
    "",
    `Имя: ${name}`,
    `Компания: ${company || "—"}`,
    `Контакт: ${contact}`,
    `Что нужно: ${NEED[need]}`,
    ...(service ? [`Услуга: ${service}`] : []),
    ...(page ? [`Страница: ${page}`] : []),
    "",
    "О задаче:",
    message,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true) {
      console.error("Telegram send failed", response.status, result.description || "");
      json(res, 502, {
        ok: false,
        error: "Не получилось отправить заявку. Напишите в Telegram.",
      });
      return true;
    }
  } catch (error) {
    console.error("Telegram request failed", error);
    json(res, 502, {
      ok: false,
      error: "Не получилось отправить заявку. Напишите в Telegram.",
    });
    return true;
  }

  json(res, 200, { ok: true });
  return true;
}
