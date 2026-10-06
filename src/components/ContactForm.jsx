import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactForm({ title = "Обсудим вашу задачу" }) {
  const [need, setNeed] = useState("new");

  return (
    <div className="contact-card" id="contact">
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <h3 className="contact-form__title">{title}</h3>
        <p className="contact-form__sub">
          Ответим в течение рабочего дня. Для первого разговора достаточно
          коротко описать задачу — без длинных брифов и технического задания.
        </p>

        <div className="contact-form__row">
          <input type="text" placeholder="Имя" aria-label="Имя" />
          <input type="text" placeholder="Компания" aria-label="Компания" />
        </div>
        <input
          type="text"
          placeholder="Телефон, почта или Telegram"
          aria-label="Телефон, почта или Telegram"
        />

        <div className="contact-form__label">Что нужно?</div>
        <div className="contact-form__options">
          <label className={`option-card ${need === "new" ? "is-active" : ""}`}>
            <input
              type="radio"
              name="need"
              checked={need === "new"}
              onChange={() => setNeed("new")}
            />
            <i className="option-card__dot" aria-hidden="true" />
            <span>Новый продукт с нуля</span>
          </label>
          <label className={`option-card ${need === "dev" ? "is-active" : ""}`}>
            <input
              type="radio"
              name="need"
              checked={need === "dev"}
              onChange={() => setNeed("dev")}
            />
            <i className="option-card__dot" aria-hidden="true" />
            <span>Развитие или аудит существующего</span>
          </label>
        </div>

        <textarea
          rows="4"
          placeholder="Коротко о задаче: продукт, сроки, что уже есть"
          aria-label="Расскажите о задаче"
        />

        <button type="submit" className="btn btn-primary contact-form__submit">
          Отправить заявку
        </button>
        <p className="contact-form__note">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <Link to="/policy" className="contact-form__policy">
            политикой конфиденциальности
          </Link>
        </p>
      </form>
    </div>
  );
}
