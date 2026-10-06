import { useThemeCtx } from "../theme-context.jsx";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggle } = useThemeCtx();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      aria-pressed={isDark}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      {/* Иконка-контраст: круг с закрашенной половиной */}
      <svg
        className="theme-toggle__icon"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 2a8 8 0 0 1 0 16V2Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
