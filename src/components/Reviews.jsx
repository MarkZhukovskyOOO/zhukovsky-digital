import { Link } from "react-router-dom";
import "./Reviews.css";

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="reviews__head">
          <div className="reviews__copy">
            <h2 className="section-title">Отзывы</h2>
            <p className="reviews__sub">
              Собираем продукты, которые выдерживают рост.
            </p>
          </div>
          <Link to="/cases" className="reviews__link">
            Все проекты
          </Link>
        </div>

        <article className="review-card">
          <div className="review-card__media">
            <span>Фото команды клиента</span>
          </div>

          <div className="review-card__body">
            <span className="review-card__logo">Логотип</span>

            <blockquote className="review-card__quote">
              «Собрали приложение и всю архитектуру за три месяца — запустили
              первый город раньше плана. За год выросли до миллиона активных
              пользователей.»
            </blockquote>

            <div className="review-card__footer">
              <div className="review-card__author">
                <div className="review-card__name">Имя Фамилия</div>
                <div className="review-card__role">
                  Генеральный директор, EnerGO
                </div>
              </div>

              {/* Декоративная навигация карусели — как в макете */}
              <div className="review-card__nav" aria-hidden="true">
                <div className="review-card__dashes">
                  <i className="is-active" />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="review-card__arrows">
                  <span className="review-card__arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 5l-7 7 7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="review-card__arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
