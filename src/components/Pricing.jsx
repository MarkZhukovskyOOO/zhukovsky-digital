import "./Pricing.css";

const PLANS = [
  {
    eyebrow: "первая версия",
    price: "от 750 000 ₽",
    term: "Срок: 1–1,5 месяца",
    lead: "Несколько пользовательских сценариев и необходимая инфраструктура для запуска",
    features: [
      "Сайт или приложение;",
      "Базовый личный кабинет;",
      "Онлайн-запись или заказ;",
      "Одна–две ключевые интеграции;",
      "Административная часть;",
      "Запуск и публикация.",
    ],
    example: "Примеры: запись к врачу, личный кабинет пациента.",
    cta: "Обсудить проект",
    featured: false,
  },
  {
    eyebrow: "Собственный digital-канал привлечения трафика",
    price: "от 1 700 000 ₽",
    term: "Срок: 1–3 месяца",
    lead: "iOS и Android | Полный цикл",
    features: [
      "Мобильное приложение и веб-сервис;",
      "Личный кабинет;",
      "Backend и API;",
      "Административная панель;",
      "Интеграции с МИС / CRM / 1С;",
      "Платежи и уведомления;",
      "Аналитика;",
      "Тестирование и запуск.",
    ],
    example: "Примеры: сеть клиник, аптечная сеть, стоматология.",
    cta: "Обсудить задачу",
    featured: true,
  },
  {
    eyebrow: "Экосистема",
    price: "от 3 000 000 ₽",
    term: "Срок: от 3 месяцев",
    lead: "Экосистема продуктов | Глубокая интеграция",
    features: [
      "Сайт + мобильное приложение;",
      "Личные кабинеты;",
      "Несколько ролей пользователей;",
      "Сложные интеграции;",
      "Единый backend;",
      "Работа с филиальной сетью;",
      "Программы лояльности;",
      "Высокая нагрузка;",
      "Развитие после запуска.",
    ],
    example:
      "Примеры: маркетплейс услуг, финтех-сервис, портал с несколькими ролями.",
    cta: "Обсудить архитектуру проекта",
    featured: false,
  },
];

const openContactModal = () =>
  window.dispatchEvent(new CustomEvent("open-contact-modal"));

export default function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="pricing__head">
          <h2 className="section-title">Стоимость</h2>
          <p className="pricing__intro">
            Стоимость зависит от масштаба продукта, количества интеграций и
            глубины бизнес-логики. Ниже — ориентиры, чтобы вы могли заранее
            понять порядок бюджета.
          </p>
        </div>

        <div className="pricing__grid">
          {PLANS.map((plan) => (
            <article
              className={`plan ${plan.featured ? "plan--featured" : ""}`}
              key={plan.eyebrow}
            >
              <span className="plan__eyebrow">{plan.eyebrow}</span>
              <div className="plan__price">{plan.price}</div>
              <hr className="plan__divider" />
              <div className="plan__term">{plan.term}</div>
              <p className="plan__lead">{plan.lead}</p>

              <ul className="plan__features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <p className="plan__example">{plan.example}</p>

              <button
                type="button"
                className={`btn btn-block plan__btn ${
                  plan.featured ? "btn-primary" : "btn-ghost"
                }`}
                onClick={openContactModal}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
