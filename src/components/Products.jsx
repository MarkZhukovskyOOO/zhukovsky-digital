import { Link } from "react-router-dom";
import { AdonisMockup, NarodnayaPhones, OlympPhones } from "./ProjectMockup.jsx";
import "./Products.css";

const PRODUCTS = [
  {
    media: <AdonisMockup />,
    title: "Адонис: сайт и приложение для аптечной сети",
    desc: "Каталог, наличие в аптеках, бронирование и карта лояльности. Сайт и приложение для iOS и Android с интеграцией в аптечную систему.",
    to: "/case/adonis",
  },
  {
    media: <OlympPhones />,
    title: "Olymp Clinic — сайт для сети клиник",
    desc: "Полный цикл создания новой версии сайта: от инициации проекта и дизайна до разработки на 1С-Битрикс и выпуска в продакшен. Срок — 1,5 месяца.",
    to: "/case/olymp-clinic",
  },
  {
    media: <NarodnayaPhones />,
    title: "Аптека Народная — сайт аптечной сети",
    desc: "Каталог, карточка с ценой и инструкцией, выбор аптеки на карте. Заказ на аптеканародная.рф оформляется как бронь и забирается самовывозом.",
    to: "/case/narodnaya",
  },
];

export default function Products() {
  return (
    <section className="section products" id="products">
      <div className="container">
        <div className="products__head">
          <h2 className="section-title">
            Продукты, которые создают ценность для бизнеса
          </h2>
          <p className="products__sub">
            От мобильных приложений до сложных веб-сервисов — проектируем
            продукты под конкретную бизнес-модель, процессы и цели компании.
          </p>
          <Link className="products__link" to="/cases">
            Все кейсы
          </Link>
        </div>

        <div className="products__grid">
          {PRODUCTS.map((p) => {
            const inner = (
              <>
                <div className="product-card__media">{p.media}</div>
                <h3 className="product-card__title">{p.title}</h3>
                <p className="product-card__desc">{p.desc}</p>
              </>
            );
            return p.to ? (
              <Link
                className="product-card product-card--link"
                to={p.to}
                key={p.title}
              >
                {inner}
              </Link>
            ) : (
              <article className="product-card" key={p.title}>
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
