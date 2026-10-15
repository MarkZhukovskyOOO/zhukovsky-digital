import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Footer from "../components/Footer.jsx";
import teamPhoto from "../assets/figma/team-photo.png";
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
    desc: "После запуска можем продолжить развитие: добавлять функции, дорабатывать интеграции и пользовательские сценарии. Для «Адониса» ведём ASO приложения и GEO сайта. Состав дальнейших работ согласуем отдельно.",
  },
];

const TEAM = [
  { name: "Марк Жуковский", role: "Основатель" },
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
                постоянная команда. Мы находимся в Краснодаре и проводим встречи
                с заказчиками удалённо.
              </p>
            </div>
            <img
              className="company-hero__photo"
              src={teamPhoto}
              alt="Zhukovsky Digital"
            />
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

        {/* ===== Team ===== */}
        <section className="company-section">
          <div className="container">
            <div className="company-section__head">
              <span className="company-overline">Команда</span>
              <h2 className="company-section__title">
                Проекты выполняет постоянная команда
              </h2>
            </div>
            <div className="company-team">
              {TEAM.map((m, i) => (
                <div className="company-member" key={i}>
                  <div className="company-member__photo">Фото</div>
                  <div className="company-member__name">{m.name}</div>
                  <div className="company-member__role">{m.role}</div>
                </div>
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
                Для аптечной сети «Адонис» мы с нуля создали сайт и мобильное
                приложение. В проекте Olymp Clinic участвовали как партнёрская
                команда: разработали дизайн, согласовали макеты, выполнили
                вёрстку и подключили 1С-Битрикс.
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
                <div className="company-contacts__map">
                  Краснодар · встречи удалённо
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
