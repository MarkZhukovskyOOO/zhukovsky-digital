import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Footer from "../components/Footer.jsx";
import "./CompanyPage.css";

const STATS = [
  { num: "2023", label: "год основания" },
  { num: "Краснодар", label: "город студии" },
  { num: "Удалённо", label: "встречи с заказчиками" },
  { num: "Постоянная", label: "команда на проектах" },
];

const PRINCIPLES = [
  {
    title: "Первое обсуждение",
    desc: "Первое обсуждение проводит Марк. На созвоне или в переписке разбираем задачу и собираем требования.",
  },
  {
    title: "Список функций и оценка",
    desc: "Составляем список функций, оцениваем работы и согласуем состав проекта с заказчиком. Оценка опирается на конкретный объём разработки.",
  },
  {
    title: "Передача проекта",
    desc: "Готовим документ о подключённых сервисах: их назначении и доступах. Записываем текстовые и видеоинструкции, чтобы команда заказчика могла работать с продуктом и пользоваться необходимыми сервисами.",
  },
  {
    title: "Развитие после запуска",
    desc: (
      <>
        {"После запуска можем продолжить развитие: добавлять функции, дорабатывать интеграции и пользовательские сценарии. Для "}
        <Link className="company-link" to="/case/adonis">«Адониса»</Link>
        {" ведём ASO приложения и GEO сайта. Состав дальнейших работ согласуем отдельно."}
      </>
    ),
  },
];

const INDUSTRIES = [
  "Клиники",
  "Аптечные сети",
  "Электронная коммерция",
  "Магазины одежды",
];

const CONTACTS = [
  { label: "Город", value: "Краснодар" },
  { label: "Встречи", value: "Удалённо" },
];

export default function CompanyPage() {
  return (
    <>
      <main className="company-page">
        {/* ===== Company Hero ===== */}
        <section className="company-hero">
          <div className="container">
            <Breadcrumbs
              items={[{ label: "Главная", to: "/" }, { label: "О студии" }]}
            />
            <div className="company-hero__intro">
              <span className="company-overline company-overline--brand">
                О студии
              </span>
              <h1 className="company-hero__title">
                Zhukovsky Digital — студия заказной разработки
              </h1>
              <p className="company-hero__lead">
                Создаём сайты, интернет-магазины и мобильные приложения для
                бизнеса. Работаем с 1С-Битрикс, React и Flutter, разрабатываем
                серверную часть и интеграции с системами заказчика.
              </p>
              <p className="company-hero__lead">
                Студию основал Марк Жуковский в 2023 году. Проекты выполняет
                постоянная команда из 11 человек; запущено 21 продукт. Мы
                находимся в Краснодаре и проводим встречи с заказчиками удалённо.
              </p>
            </div>
          </div>
        </section>

        {/* ===== Numbers ===== */}
        <section className="company-numbers">
          <div className="container">
            <div className="company-stats">
              {STATS.map((s) => (
                <div className="company-stat" key={s.label}>
                  <div className="company-stat__num">{s.num}</div>
                  <div className="company-stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Principles ===== */}
        <section className="company-section">
          <div className="container">
            <div className="company-section__head">
              <span className="company-overline">Как мы работаем</span>
              <h2 className="company-section__title">
                От первого разговора до развития после запуска
              </h2>
            </div>
            <div className="company-principles">
              {PRINCIPLES.map((p) => (
                <article className="company-principle" key={p.title}>
                  <h3 className="company-principle__title">{p.title}</h3>
                  <p className="company-principle__desc">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Industries ===== */}
        <section className="company-section">
          <div className="container company-industries">
            <div className="company-section__head company-industries__head">
              <span className="company-overline">С кем работаем</span>
              <h2 className="company-section__title">
                Клиники, аптеки и электронная коммерция
              </h2>
              <p className="company-principle__desc">
                {"Для аптечной сети "}
                <Link className="company-link" to="/case/adonis">«Адонис»</Link>
                {" мы с нуля создали сайт и мобильное приложение. Для "}
                <Link className="company-link" to="/case/olymp-clinic">Olymp Clinic</Link>
                {" в партнёрском формате выполнили весь цикл создания новой версии сайта — от инициации и дизайна до разработки на 1С-Битрикс и выпуска в продакшен за 1,5 месяца."}
              </p>
            </div>
            <ul className="company-chips">
              {INDUSTRIES.map((t) => (
                <li className="company-chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Contacts ===== */}
        <section className="company-section">
          <div className="container">
            <div className="company-section__head">
              <span className="company-overline">Контакты</span>
              <h2 className="company-section__title">Как с нами связаться</h2>
            </div>
            <div className="company-contacts">
              <div className="company-contacts__details">
                <div className="company-contacts__rows">
                  {CONTACTS.map((c) => (
                    <div className="company-contact-row" key={c.label}>
                      <span className="company-contact-row__label">
                        {c.label}
                      </span>
                      {c.href ? (
                        <a
                          className="company-contact-row__value"
                          href={c.href}
                          {...(c.href.startsWith("http")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="company-contact-row__value">
                          {c.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="company-contacts__legal">
                  Основатель — Марк Жуковский, 2023 год.
                </p>
              </div>
              <ContactForm
                title="Обсудить проект"
                note="Первое обсуждение проводит Марк. На созвоне или в переписке разбираем задачу и собираем требования."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer slim />
    </>
  );
}
