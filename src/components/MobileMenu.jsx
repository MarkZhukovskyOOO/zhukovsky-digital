import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import { serviceSlugFromPath, track } from "../lib/track.js";
import { PHARMACY_PATH } from "../lib/pharmacyLead.js";
import { publicPath } from "../seo.js";
import "./MobileMenu.css";

/* Полноэкранное мобильное меню (≤560) — по фреймам menu-mobile-*.
   Рендерится порталом в body: у хедера backdrop-filter, который
   делает его containing block для position: fixed. */
export default function MobileMenu({ open, services, onClose, onContact }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Блокировка скролла body, пока меню открыто */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Закрытие по Escape + сброс аккордеона при закрытии */
  useEffect(() => {
    if (!open) {
      setServicesOpen(false);
      return;
    }
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`mmenu${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Меню"
      aria-hidden={!open}
    >
      <div className="mmenu__top">
        <Link to="/" className="mmenu__logo" onClick={onClose} tabIndex={open ? 0 : -1}>
          Zhukovsky <span className="logo__accent">Digital</span>
        </Link>
        <button
          type="button"
          className="mmenu__close"
          aria-label="Закрыть меню"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M2 2l12 12M14 2 2 14" />
          </svg>
        </button>
      </div>

      <nav className="mmenu__nav" aria-label="Мобильная навигация">
        <NavLink
          to={publicPath(PHARMACY_PATH)}
          end
          className={({ isActive }) => `mmenu__link${isActive ? " is-current" : ""}`}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
          Аптечным сетям
        </NavLink>
        <NavLink
          to="/cases/"
          className={({ isActive }) => `mmenu__link${isActive ? " is-current" : ""}`}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
          Кейсы
        </NavLink>

        <button
          type="button"
          className={`mmenu__link mmenu__acc${servicesOpen ? " is-open" : ""}`}
          aria-expanded={servicesOpen}
          onClick={() => setServicesOpen((v) => !v)}
          tabIndex={open ? 0 : -1}
        >
          Услуги
          <svg className="mmenu__chevron" width="12" height="7" viewBox="0 0 12 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m1 1 5 5 5-5" />
          </svg>
        </button>
        {servicesOpen && (
          <ul className="mmenu__sub">
            {services.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="mmenu__sub-link" onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <NavLink
          to="/company/"
          className={({ isActive }) => `mmenu__link${isActive ? " is-current" : ""}`}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
          О студии
        </NavLink>
      </nav>

      <div className="mmenu__bottom">
        <div className="mmenu__contacts">
          <div className="mmenu__contact">
            <span className="mmenu__contact-label">Почта</span>
            <a href="mailto:sales@zhukovsky-digital.com" tabIndex={open ? 0 : -1}>
              sales@zhukovsky-digital.com
            </a>
          </div>
          <div className="mmenu__contact">
            <span className="mmenu__contact-label">Телефон</span>
            <a href="tel:+79182531430" tabIndex={open ? 0 : -1}>+7 (918) 253-14-30</a>
          </div>
          <div className="mmenu__contact">
            <span className="mmenu__contact-label">Telegram</span>
            <a
              href="https://t.me/Mark_Zhukovskiy"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("telegram_click", { service_slug: serviceSlugFromPath(window.location.pathname), place: "menu" })}
              tabIndex={open ? 0 : -1}
            >
              @Mark_Zhukovskiy
            </a>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block mmenu__cta"
          onClick={onContact}
          tabIndex={open ? 0 : -1}
        >
          Обсудить проект
        </button>
      </div>
    </div>,
    document.body
  );
}
