import { Link } from "react-router-dom";
import footerMotion from "../assets/figma/footer-motion.png";
import "./Footer.css";

const CONTACTS = [
  {
    label: "Почта",
    value: "hello@zhukovsky.studio",
    href: "mailto:hello@zhukovsky.studio",
  },
  { label: "Телефон", value: "+7 495 120-14-08", href: "tel:+74951201408" },
  {
    label: "Telegram",
    value: "@zhukovsky_studio",
    href: "https://t.me/zhukovsky_studio",
  },
];

const NAV = [
  { label: "Кейсы", to: "/cases" },
  { label: "Услуги", to: "/services" },
  { label: "О студии", to: "/company" },
];

export default function Footer({ slim = false }) {
  return (
    <footer className="footer" id="contact-footer">
      {/* Фон: кадр Wrangle Motion + мягкие синие блобы */}
      <div className="footer__bg" aria-hidden="true">
        <img className="footer__texture" src={footerMotion} alt="" />
        <i className="footer__blob footer__blob--1" />
        <i className="footer__blob footer__blob--2" />
        <i className="footer__blob footer__blob--3" />
      </div>

      <div className="container footer__inner">
        {!slim && (
          <div className="footer__main">
            <span className="footer__eyebrow">
              Отвечаем в течение рабочего дня
            </span>
            <h2 className="footer__title">Давайте обсудим ваш продукт</h2>

            <div className="footer__contacts">
              {CONTACTS.map((c) => (
                <div className="footer__contact" key={c.label}>
                  <span className="footer__contact-label">{c.label}</span>
                  <a href={c.href} className="footer__contact-value">
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`footer__bottom ${slim ? "footer__bottom--slim" : ""}`}>
          <Link to="/" className="footer__brand">
            Жуковский
          </Link>
          <nav className="footer__nav">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="footer__copy">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
