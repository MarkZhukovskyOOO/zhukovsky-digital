import { Link } from "react-router-dom";
import "./Services.css";

const SERVICES = [
  {
    n: "01",
    title: "Сайты и веб-сервисы",
    to: "/services/web-development",
    desc: "Сайты компаний, каталоги и интернет-магазины на 1С-Битрикс и заказной разработке. От структуры и дизайна до заказа, интеграций и тестирования.",
  },
  {
    n: "02",
    title: "Мобильные приложения",
    to: "/services",
    desc: "Приложения для пациентов и клиентов: запись, личный кабинет, история обращений, программа лояльности, каталог и повторные покупки. iOS и Android на Flutter или нативной разработке.",
  },
  {
    n: "03",
    title: "Личные кабинеты и цифровые сервисы",
    to: "/services/personal-accounts",
    desc: "Кабинеты клиентов, пациентов и партнёров: история взаимодействий, документы, заказы и другие сценарии самообслуживания с согласованными интеграциями.",
  },
  {
    n: "04",
    title: "Аудит и развитие существующих продуктов",
    to: "/services/product-audit",
    desc: "Разбираемся в работающем сайте или приложении. Проверяем согласованные технические и пользовательские сценарии, готовим отчёт и план доработок с приоритетами.",
  },
  {
    n: "05",
    title: "Развитие и поддержка",
    to: "/services/support",
    desc: "Исправления, новые функции и развитие интеграций после запуска. Принимаем существующий продукт, согласуем приоритеты и объём сопровождения.",
  },
  {
    n: "06",
    title: "Продуктовые исследования и UX/UI",
    to: "/services/ux-ui",
    desc: "Пользовательские сценарии, прототипы и UX/UI-дизайн сайтов и приложений. Исследования и проверка решений — по согласованной задаче.",
  },
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="services__head">
          <div className="services__head-copy">
            <h2 className="section-title">Услуги</h2>
            <Link className="services__link" to="/#services">
              Все услуги
            </Link>
          </div>
          <p className="services__intro">
            Берём продукт на любом этапе — от пустого документа до легаси,
            которое надо разобрать и продолжить.
          </p>
        </div>

        <ul className="services__list">
          {SERVICES.map((s) => (
            <li className="service-row" key={s.n}>
              <span className="service-row__n">{s.n}</span>
              <h3 className="service-row__title">
                <Link to={s.to}>{s.title}</Link>
              </h3>
              <p className="service-row__desc">{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
