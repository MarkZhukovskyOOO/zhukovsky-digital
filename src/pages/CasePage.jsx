import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ScreensCarousel from "../components/ScreensCarousel.jsx";
import Footer from "../components/Footer.jsx";
import coverImg from "../assets/figma/case-energo-cover.png";
import motivatorsImg from "../assets/figma/case-card-motivators.png";
import kemImg from "../assets/figma/case-card-kem.png";
import "./CasePage.css";

const CRUMBS = [
  { label: "Главная", to: "/" },
  { label: "Кейсы", to: "/cases" },
  { label: "EnerGO" },
];

const TAGS = ["iOS", "Android", "IoT", "Платежи", "Карты", "Поддержка 24/7"];

const FACTS = [
  { label: "Клиент", value: "EnerGO" },
  { label: "Отрасль", value: "Sharing-сервисы, IoT" },
  { label: "Срок", value: "3 месяца до релиза" },
  { label: "Роль", value: "Продукт, дизайн, разработка, поддержка" },
];

const RESULTS = [
  { num: "1 млн", label: "активных пользователей" },
  { num: "4,8", label: "средняя оценка в сторах" },
  { num: "6,6к", label: "оценок в App Store и Google Play" },
  { num: "3 мес", label: "от старта до первого релиза" },
];

const PROBLEMS = [
  "До 40% обращений заканчивались отказом — пользователь не дожидался ответа",
  "Станции не сообщали о поломках: о пустом слоте узнавали от пользователя",
  "Оплату принимал сторонний терминал, деньги доходили с задержкой в двое суток",
];

const SOLUTION = [
  {
    n: "01",
    title: "Исследование и карта сценариев",
    desc: "Проехали двадцать станций, поговорили с четырнадцатью пользователями и тремя операторами. Собрали карту сценариев и список причин, по которым аренда срывалась.",
  },
  {
    n: "02",
    title: "Прототип и проверка на людях",
    desc: "За четыре недели собрали кликабельный прототип аренды и возврата. Протестировали в двух торговых центрах — на живых пользователях, а не на коллегах.",
  },
  {
    n: "03",
    title: "Приложение и платежи",
    desc: "Нативные iOS и Android. Apple Pay и Google Pay, привязка карты, автосписание за время аренды и понятная история платежей в профиле.",
  },
  {
    n: "04",
    title: "Телеметрия и кабинет партнёра",
    desc: "Станции шлют состояние слотов по MQTT. Оператор видит заряд, поломки и выручку по каждой точке, не выезжая на место.",
  },
];

const STACK = [
  "Swift", "Kotlin", "Flutter", "Node.js", "PostgreSQL", "Redis",
  "MQTT", "Apple Pay", "Google Pay", "Firebase", "Sentry", "Grafana",
];

const OTHER = [
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
];

export default function CasePage() {
  return (
    <>
      <main>
        {/* Case Hero */}
        <section className="container case-hero">
          <Breadcrumbs items={CRUMBS} />
          <div className="case-hero__body">
            <span className="case-overline case-overline--brand">
              Кейс · 2024
            </span>
            <h1 className="case-hero__title">
              EnerGO — аренда пауэрбанков без очереди к оператору
            </h1>
            <p className="case-hero__lead">
              Собрали мобильное приложение, платежи и телеметрию станций. Через
              три месяца после старта сеть запустила первый город, через год —
              миллион активных пользователей.
            </p>
            <ul className="case-chips" aria-label="Направления работы">
              {TAGS.map((t) => (
                <li className="case-chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Обложка — полноширинная картинка (image 4) */}
        <img
          className="case-cover"
          src={coverImg}
          alt="Три экрана мобильного приложения EnerGO"
        />

        {/* Facts — 4 метрики проекта */}
        <section className="container case-facts">
          {FACTS.map((f) => (
            <div className="case-fact" key={f.label}>
              <span className="case-overline">{f.label}</span>
              <span className="case-fact__value">{f.value}</span>
            </div>
          ))}
        </section>

        {/* Results */}
        <section className="case-section">
          <div className="container">
            <div className="case-results">
              <div className="case-results__head">
                <span className="case-overline case-overline--brand">
                  Результаты
                </span>
                <h2 className="case-h2">Что получилось</h2>
              </div>
              <div className="case-results__metrics">
                {RESULTS.map((r) => (
                  <div className="case-stat" key={r.label}>
                    <span className="case-stat__num">{r.num}</span>
                    <span className="case-stat__label">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Context */}
        <section className="case-section">
          <div className="container case-context">
            <div className="case-context__head">
              <span className="case-overline">Контекст</span>
              <h2 className="case-h2">
                Сеть росла быстрее, чем справлялась поддержка
              </h2>
            </div>
            <div className="case-context__body">
              <p className="case-context__lead">
                К моменту старта у EnerGO было 180 станций в четырёх городах.
                Аренда начиналась со звонка оператору: человек называл номер
                станции, оператор открывал слот вручную. В пиковые часы очередь
                в поддержку доходила до восьми минут.
              </p>
              <ol className="case-problems">
                {PROBLEMS.map((p, i) => (
                  <li className="case-problem" key={i}>
                    <span className="case-problem__n">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="case-problem__text">{p}</span>
                  </li>
                ))}
              </ol>
              <div className="case-task">
                <span className="case-overline case-overline--brand">
                  Задача
                </span>
                <p>
                  Сделать так, чтобы пользователь брал пауэрбанк без участия
                  человека, а сеть видела состояние каждой станции в реальном
                  времени.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Карусель скриншотов (на месте image 5) */}
        <ScreensCarousel />

        {/* Solution */}
        <section className="case-section">
          <div className="container">
            <div className="case-head">
              <span className="case-overline">Решение</span>
              <h2 className="case-h2">Как мы это собирали</h2>
            </div>
            <div className="case-steps">
              {SOLUTION.map((s) => (
                <div className="case-step" key={s.n}>
                  <span className="case-step__n">{s.n}</span>
                  <h3 className="case-step__title">{s.title}</h3>
                  <p className="case-step__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="case-section">
          <div className="container case-stack">
            <div className="case-head">
              <span className="case-overline">Стек</span>
              <h2 className="case-h2">На чём работает</h2>
            </div>
            <ul className="case-chips case-stack__chips" aria-label="Технологии">
              {STACK.map((t) => (
                <li className="case-chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quote */}
        <section className="case-section">
          <div className="container">
            <figure className="case-quote">
              <blockquote>
                «Мы пришли с задачей “сделайте приложение”, а получили
                работающую операционку: аренда, телеметрия и выручка по точкам
                в одном месте. Первый город запустили раньше плана.»
              </blockquote>
              <figcaption className="case-quote__author">
                <span className="case-quote__avatar" aria-hidden="true" />
                <span className="case-quote__who">
                  <span className="case-quote__name">Имя Фамилия</span>
                  <span className="case-quote__role">
                    Продукт-директор EnerGO
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Other Cases */}
        <section className="case-section">
          <div className="container">
            <div className="case-head case-head--row">
              <h2 className="case-h2">Другие кейсы</h2>
              <Link className="case-head__action" to="/cases">
                Все кейсы
              </Link>
            </div>
            <div className="case-others">
              {OTHER.map((c) => (
                <article className="case-other" key={c.title}>
                  <div className="case-other__media">
                    <img src={c.img} alt={c.title} loading="lazy" />
                  </div>
                  <h3 className="case-other__title">{c.title}</h3>
                  <p className="case-other__desc">{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
