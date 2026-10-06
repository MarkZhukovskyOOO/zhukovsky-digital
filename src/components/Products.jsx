import { Link } from "react-router-dom";
import adonisImg from "../assets/figma/case-energo-cover.png";
import olympImg from "../assets/figma/case-olymp-cover.png";
import "./Products.css";

const PRODUCTS = [
  {
    img: adonisImg,
    title: "Адонис: сайт и приложение для аптечной сети",
    desc: "Каталог, наличие в аптеках, бронирование и карта лояльности. Сайт и приложение для iOS и Android с интеграцией в аптечную систему.",
    to: "/case/adonis",
  },
  {
    img: olympImg,
    title: "Олимп Клиник: сайт и личный кабинет для сети клиник",
    desc: "Полная пересборка сайта, доработка готовых макетов и интеграция с 1С-Битрикс. От подключения к проекту до запуска — около трёх месяцев.",
    to: "/case/olymp-clinic",
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
                <div className="product-card__media">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="product-card__img"
                    loading="lazy"
                  />
                </div>
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
