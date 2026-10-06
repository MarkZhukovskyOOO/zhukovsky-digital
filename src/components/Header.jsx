import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import MobileMenu from "./MobileMenu.jsx";
import "./Header.css";

/* Список услуг для дропдауна и мобильного аккордеона (тексты — из макета) */
const SERVICES = [
  "Сайты и веб-сервисы",
  "Мобильные приложения",
  "Личные кабинеты и цифровые сервисы",
  "Аудит и развитие существующих продуктов",
  "Развитие и поддержка",
  "Продуктовые исследования и UX/UI",
];

/* Иконки пунктов навигации (16px, из макета) */
function IconWorks() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="2" y="2" width="5.2" height="5.2" rx="1.6" />
      <rect x="8.8" y="2" width="5.2" height="5.2" rx="1.6" />
      <rect x="2" y="8.8" width="5.2" height="5.2" rx="1.6" />
      <rect x="8.8" y="8.8" width="5.2" height="5.2" rx="1.6" />
    </svg>
  );
}
function IconServices() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2 14 5.4 8 8.8 2 5.4 8 2Z" />
      <path d="m2 8.4 6 3.4 6-3.4" />
      <path d="m2 11.2 6 3.4 6-3.4" />
    </svg>
  );
}
function IconCompany() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 13.5V6.6L8 3l5 3.6v6.9" />
      <path d="M1.8 13.5h12.4" />
      <path d="M6.4 13.5v-3.3h3.2v3.3" />
    </svg>
  );
}
function IconTelegram() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2.5 7.6 13.2 6 8.6 1.6 6.8 14 2.5Z" />
      <path d="M14 2.5 6 8.6" />
    </svg>
  );
}

function openContactModal() {
  window.dispatchEvent(new CustomEvent("open-contact-modal"));
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);
  const dropBtnRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Смена маршрута — закрыть всё */
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  /* Дропдаун: Escape + клик вне */
  useEffect(() => {
    if (!dropOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDropOpen(false);
        dropBtnRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [dropOpen]);

  const servicesActive = pathname.startsWith("/services");

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header__inner">
        <Link to="/" className="logo" aria-label="Zhukovsky Digital — на главную">
          <span className="logo__full">
            Zhukovsky <span className="logo__accent">Digital</span>
          </span>
          <span className="logo__short">Жуковский</span>
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          <NavLink
            to="/cases"
            className={({ isActive }) => `header__nav-link ${isActive ? "is-current" : ""}`}
          >
            <span className="header__nav-icon"><IconWorks /></span>
            Кейсы
          </NavLink>

          <div
            className="header__nav-item"
            ref={dropRef}
            /* hover-открытие только там, где hover есть на самом деле:
               на тач-устройствах тап эмулирует mouseenter и сразу же click,
               из-за чего дропдаун открывался бы и тут же закрывался */
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) setDropOpen(true);
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover)").matches) setDropOpen(false);
            }}
          >
            <button
              type="button"
              ref={dropBtnRef}
              className={`header__nav-link ${servicesActive ? "is-current" : ""}`}
              aria-haspopup="true"
              aria-expanded={dropOpen}
              onClick={() => setDropOpen((v) => !v)}
            >
              <span className="header__nav-icon"><IconServices /></span>
              Услуги
            </button>

            <div className={`nav-drop ${dropOpen ? "is-open" : ""}`} role="menu">
              <div className="nav-drop__cols">
                {[SERVICES.slice(0, 3), SERVICES.slice(3)].map((col, ci) => (
                  <ul className="nav-drop__col" key={ci}>
                    {col.map((label, i) => (
                      <li key={label}>
                        <Link
                          to="/services"
                          role="menuitem"
                          className="nav-drop__item"
                          onClick={() => setDropOpen(false)}
                        >
                          <span className="nav-drop__index">
                            {String(ci * 3 + i + 1).padStart(2, "0")}
                          </span>
                          <span className="nav-drop__label">{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          <NavLink
            to="/company"
            className={({ isActive }) => `header__nav-link ${isActive ? "is-current" : ""}`}
          >
            <span className="header__nav-icon"><IconCompany /></span>
            О студии
          </NavLink>
        </nav>

        <div className="header__actions">
          <a
            href="https://t.me/zhukovsky_studio"
            className="header__tg"
            target="_blank"
            rel="noreferrer"
          >
            <IconTelegram />
            Telegram
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-primary header__cta"
            onClick={openContactModal}
          >
            Обсудить проект
          </button>
          <button
            className={`burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        services={SERVICES}
        onClose={() => setMenuOpen(false)}
        onContact={() => {
          setMenuOpen(false);
          openContactModal();
        }}
      />
    </header>
  );
}
