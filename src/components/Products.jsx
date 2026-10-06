import { Link } from "react-router-dom";
import energoImg from "../assets/figma/case-card-energo.png";
import motivatorsImg from "../assets/figma/case-card-motivators.png";
import kemImg from "../assets/figma/case-card-kem.png";
import wawImg from "../assets/figma/case-card-waw.png";
import "./Products.css";

const PRODUCTS = [
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
