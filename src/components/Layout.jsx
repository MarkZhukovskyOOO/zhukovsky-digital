import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import ContactModal from "./ContactModal.jsx";
import { ThemeProvider } from "../theme-context.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

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
      <Header />
      <Outlet />
      <ContactModal />
    </ThemeProvider>
  );
}
