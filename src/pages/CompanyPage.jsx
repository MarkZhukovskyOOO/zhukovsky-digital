import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Footer from "../components/Footer.jsx";
import teamPhoto from "../assets/figma/team-photo.png";
import "./CompanyPage.css";

const STATS = [
  { num: "2022", label: "год основания" },
  { num: "11", label: "человек в штате" },
  { num: "21", label: "продукт в проде" },
  { num: "4,5 года", label: "средний срок сотрудничества" },
];

const PRINCIPLES = [
  {
    title: "Считаем, а не угадываем",
    desc: "Выбор платформы, стека и объёма первой версии объясняем цифрами по вашей аудитории. Если данных нет — сначала собираем их.",
  },
  {
    title: "Показываем каждые две недели",
    desc: "Спринт заканчивается демо и сборкой в TestFlight. Вы видите продукт в работе, а не отчёт о проделанной работе.",
  },
  {
    title: "Отдаём всё",
    desc: "Исходники, макеты, аккаунты и документация принадлежат вам с первого дня. Уходить от нас не больно — но обычно не уходят.",
  },
  {
    title: "Остаёмся после релиза",
    desc: "Дежурство, мониторинг и отчёт по инцидентам. Продукт, который никто не ведёт, ломается через полгода.",
  },
];

const TEAM = [
  { name: "Имя Фамилия", role: "Основатель, продукт" },
  { name: "Имя Фамилия", role: "Технический директор" },
  { name: "Имя Фамилия", role: "Арт-директор" },
  { name: "Имя Фамилия", role: "Ведущий iOS-разработчик" },
  { name: "Имя Фамилия", role: "Продакт-менеджер" },
  { name: "Имя Фамилия", role: "Руководитель поддержки" },
];

const INDUSTRIES = [
  "Клиники",
  "Стоматологические сети",
  "Аптеки",
  "Магазины одежды",
  "Строительство",
  "Сфера услуг",
  "Спорттех",
  "Финтех",
  "Логистика",
  "Sharing-сервисы",
];

const CONTACTS = [
  {
    label: "Почта",
    value: "sales@zhukovsky-digital.com",
    href: "mailto:sales@zhukovsky-digital.com",
  },
  { label: "Телефон", value: "+7 495 120-14-08", href: "tel:+74951201408" },
  {
    label: "Telegram",
    value: "@zhukovsky_studio",
    href: "https://t.me/zhukovsky_studio",
  },
  { label: "Адрес", value: "Москва, ул. Примерная, 1, офис 200" },
  { label: "Часы", value: "Пн–Пт, 10:00–19:00 по Москве" },
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
                Проектируем и запускаем цифровые продукты для медицинского
                бизнеса
              </h1>
              <p className="company-hero__lead">
                Работаем с 2022 года. Берём продукты, от которых зависит
                операционка компании: запись, заказы, платежи, телеметрия. Редко
                берём новые проекты и почти всегда продолжаем старые.
              </p>
            </div>
            <img
              className="company-hero__photo"
              src={teamPhoto}
              alt="Команда в офисе | широкий кадр"
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
                Почему мы любим медицину
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
            <div className="company-section__head company-section__head--row">
              <div>
                <span className="company-overline">Команда</span>
                <h2 className="company-section__title">
                  Кто будет делать ваш продукт
                </h2>
              </div>
              <a
                className="company-section__action"
                href="mailto:sales@zhukovsky-digital.com"
              >
                Вакансии →
              </a>
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
                Отрасли, которые мы знаем изнутри
              </h2>
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
                  Карта | Москва, ул. Примерная, 1
                </div>
                <p className="company-contacts__legal">
                  ООО «Жуковский» · ИНН 7700000000 · ОГРН 1157700000000
                </p>
              </div>
              <ContactForm title="Обсудить проект" />
            </div>
          </div>
        </section>
      </main>
      <Footer slim />
    </>
  );
}
