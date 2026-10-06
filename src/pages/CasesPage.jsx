import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import energoImg from "../assets/figma/case-card-energo.png";
import motivatorsImg from "../assets/figma/case-card-motivators.png";
import kemImg from "../assets/figma/case-card-kem.png";
import wawImg from "../assets/figma/case-card-waw.png";
import "./CasesPage.css";

const FILTERS = [
  "Все кейсы",
  "Мобильные приложения",
  "Сайты и веб-сервисы",
  "Личные кабинеты",
  "Аудит и развитие",
];

const CASES = [
  {
    img: energoImg,
    title: "EnerGO: приложение для аренды пауэрбанков",
    desc: "IoT, Чаты, Apple Pay и Google Pay, 1 млн. активных пользователей, 6,6к оценок в App Store и Google Play",
    to: "/case/energo",
  },
  {
    img: motivatorsImg,
    title:
      "Мотиваторы: приложение для трекинга полезных привычек от звезд шоу «Импровизаторы»",
    desc: "Лайфстайл, Видео, 200к активных пользователей",
  },
  {
    img: kemImg,
    title: "KEM: платформа мобильных платежей в Кувейте",
    desc: "Финтех, Привязка банковских карт, QR-коды, $1 млн инвестиций",
  },
  {
    img: wawImg,
    title: "WAW: приложение со скидочными купонами и лотереями для рынка Египта",
    desc: "E-commerce, Карты и GPS, 130k активных пользователей",
  },
];

export default function CasesPage() {
  return (
    <>
      <main className="cases-page">
        {/* List Hero */}
        <section className="cases-hero">
          <div className="container">
            <Breadcrumbs
              items={[{ label: "Главная", to: "/" }, { label: "Кейсы" }]}
            />
            <p className="cases-hero__eyebrow">Кейсы</p>
            <h1 className="cases-hero__title">
              Продукты, которые создают ценность для бизнеса
            </h1>
            <p className="cases-hero__lead">
              От мобильных приложений до сложных веб-сервисов — проектируем
              продукты под конкретную бизнес-модель, процессы и цели компании.
            </p>
          </div>
        </section>

        {/* Cases Grid Section */}
        <section className="cases-list">
          <div className="container">
            <div className="cases-filters" aria-label="Фильтры кейсов">
              {FILTERS.map((label, i) => (
                <button
                  type="button"
                  key={label}
                  className={
                    "cases-chip" + (i === 0 ? " cases-chip--active" : "")
                  }
                  aria-pressed={i === 0}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="cases-grid">
              {CASES.map((c) => {
                const inner = (
                  <>
                    <div className="cases-card__media">
                      <img
                        src={c.img}
                        alt={c.title}
                        className="cases-card__img"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="cases-card__title">{c.title}</h3>
                    <p className="cases-card__desc">{c.desc}</p>
                  </>
                );
                return c.to ? (
                  <Link
                    className="cases-card cases-card--link"
                    to={c.to}
                    key={c.title}
                  >
                    {inner}
                  </Link>
                ) : (
                  <article className="cases-card" key={c.title}>
                    {inner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
