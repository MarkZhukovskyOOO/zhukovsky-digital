import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { allowAnalytics, analyticsChoice, denyAnalytics } from "../lib/track.js";
import "./AnalyticsNotice.css";

export default function AnalyticsNotice() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(() => analyticsChoice() === "");

  useEffect(() => {
    const openSettings = () => setOpen(true);
    window.addEventListener("open-analytics-settings", openSettings);
    return () => window.removeEventListener("open-analytics-settings", openSettings);
  }, []);

  if (!open) return null;

  function choose(granted) {
    if (granted) allowAnalytics(pathname);
    else denyAnalytics();
    setOpen(false);
  }

  return (
    <aside className="analytics-notice" role="dialog" aria-label="Настройки аналитики">
      <p className="analytics-notice__text">
        <span>Сохраняем настройки сайта в вашем браузере. С вашего разрешения используем Яндекс.Метрику для анализа посещаемости. </span>
        <Link to="/policy/">Политика обработки персональных данных</Link>
      </p>
      <div className="analytics-notice__actions">
        <button type="button" className="btn btn-primary" onClick={() => choose(true)}>Разрешить аналитику</button>
        <button type="button" className="btn btn-ghost" onClick={() => choose(false)}>Продолжить без аналитики</button>
      </div>
    </aside>
  );
}
