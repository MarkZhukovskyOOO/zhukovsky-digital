import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import { useState } from "react";
import { AdonisMockup, NarodnayaPhones, OlympPhones } from "../components/ProjectMockup.jsx";
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
    media: <AdonisMockup />,
    title: "Адонис: сайт и приложение для аптечной сети",
    desc: "Каталог, наличие в аптеках, бронирование и карта лояльности. Сайт и приложение для iOS и Android с интеграцией в аптечную систему.",
    to: "/case/adonis/",
    categories: ["Мобильные приложения", "Сайты и веб-сервисы", "Личные кабинеты"],
  },
  {
    media: <OlympPhones />,
    title: "Olymp Clinic — сайт для сети клиник",
    desc: "Полный цикл создания новой версии сайта: от инициации проекта и дизайна до разработки на 1С-Битрикс и выпуска в продакшен. Срок — 1,5 месяца.",
    to: "/case/olymp-clinic/",
    categories: ["Сайты и веб-сервисы"],
  },
  {
    media: <NarodnayaPhones />,
    title: "Аптека Народная — сайт аптечной сети",
    desc: "Каталог, карточка с ценой и инструкцией, выбор аптеки на карте. Заказ на аптеканародная.рф оформляется как бронь и забирается самовывозом.",
    to: "/case/narodnaya/",
    categories: ["Сайты и веб-сервисы"],
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
                    <div className="cases-card__media">{c.media}</div>
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
