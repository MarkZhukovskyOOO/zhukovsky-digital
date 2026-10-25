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
          <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#2AABEE" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.1.155.234.171.328.016.094.036.306.02.472z"/>
          </svg>
        </a>
        <ThemeToggle />
      </div>
      <ContactModal />
    </ThemeProvider>
  );
}
