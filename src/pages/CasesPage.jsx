import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import adonisImg from "../assets/figma/case-energo-cover.png";
import olympImg from "../assets/figma/case-olymp-cover.png";
import { useState } from "react";
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
    img: adonisImg,
    title: "Адонис: сайт и приложение для аптечной сети",
    desc: "Каталог, наличие в аптеках, бронирование и карта лояльности. Сайт и приложение для iOS и Android с интеграцией в аптечную систему.",
    to: "/case/adonis",
    categories: ["Мобильные приложения", "Сайты и веб-сервисы", "Личные кабинеты"],
  },
  {
    img: olympImg,
    title: "Олимп Клиник: сайт и личный кабинет для сети клиник",
    desc: "Полная пересборка сайта, доработка готовых макетов и интеграция с 1С-Битрикс. От подключения к проекту до запуска — около трёх месяцев.",
    to: "/case/olymp-clinic",
    categories: ["Сайты и веб-сервисы", "Личные кабинеты"],
  },
];

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const visibleCases = activeFilter === FILTERS[0]
    ? CASES
    : CASES.filter((item) => item.categories?.includes(activeFilter));

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
              {FILTERS.map((label) => (
                <button
                  type="button"
                  key={label}
                  className={
                    "cases-chip" + (activeFilter === label ? " cases-chip--active" : "")
                  }
                  aria-pressed={activeFilter === label}
                  onClick={() => setActiveFilter(label)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="cases-grid">
              {visibleCases.map((c) => {
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
