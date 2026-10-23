import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import Seo from "./Seo.jsx";
import ContactModal from "./ContactModal.jsx";
import { ThemeProvider } from "../theme-context.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";
import { serviceSlugFromPath, track } from "../lib/track.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <Seo />
      <Header />
      <Outlet />
      <div className="corner">
        <a
          className="corner__tg"
          href="https://t.me/Mark_Zhukovskiy"
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
          onClick={() => track("telegram_click", { service_slug: serviceSlugFromPath(pathname), place: "corner" })}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2.5 7.6 13.2 6 8.6 1.6 6.8 14 2.5Z" />
            <path d="M14 2.5 6 8.6" />
          </svg>
        </a>
        <ThemeToggle />
      </div>
      <ContactModal />
    </ThemeProvider>
  );
}
