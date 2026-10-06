import { useCallback, useEffect, useState } from "react";

/**
 * Тема сайта — light / dark.
 * Начальное значение уже проставлено инлайн-скриптом в index.html
 * (на <html data-theme>), поэтому читаем оттуда, чтобы не мигало.
 * По умолчанию — светлая; системную тему не наследуем.
 */
function getInitialTheme() {
  if (typeof document !== "undefined" && document.documentElement.dataset.theme) {
    return document.documentElement.dataset.theme;
  }
  return "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Применяем тему к <html> и запоминаем выбор.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* приватный режим — молча игнорируем */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}
