import { useThemeCtx } from "../theme-context.jsx";
import "./HeroGradient.css";

/**
 * Фон hero — лёгкий CSS-градиент из мягких дрейфующих «блобов».
 * Без WebGL/three.js: быстрее грузится, не даёт рывков и warm-up.
 * Анимация отключается при prefers-reduced-motion (см. CSS).
 */
export default function HeroGradient() {
  const { theme } = useThemeCtx();
  return (
    <div className="hero-gradient" data-theme-layer={theme} aria-hidden="true">
      <span className="hero-gradient__blobs" />
    </div>
  );
}
