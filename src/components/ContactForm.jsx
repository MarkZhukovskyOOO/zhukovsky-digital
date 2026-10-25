import { Link } from "react-router-dom";
import { useLeadForm } from "../lib/useLeadForm.js";

export default function ContactForm({
  title = "Обсудим вашу задачу",
  note = "Ответим в течение рабочего дня. Для первого разговора достаточно коротко описать задачу — без длинных брифов и технического задания.",
}) {
  const form = useLeadForm();

  return (
    <div className="contact-card" id="contact">
      <form className="contact-form" onSubmit={form.onSubmit}>
        <h3 className="contact-form__title">{title}</h3>
        <p className="contact-form__sub">{note}</p>

        <div className="contact-form__row">
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Имя"
            aria-label="Имя"
            value={form.name}
            onChange={(event) => form.setName(event.target.value)}
          />
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            placeholder="Компания"
            aria-label="Компания"
            value={form.company}
            onChange={(event) => form.setCompany(event.target.value)}
          />
        </div>
        <input
          type="text"
          name="contact"
          autoComplete="on"
          placeholder="Телефон, почта или Telegram"
          aria-label="Телефон, почта или Telegram"
          value={form.contact}
          onChange={(event) => form.setContact(event.target.value)}
        />

        <div className="contact-form__label">Что нужно?</div>
        <div className="contact-form__options">
          <label className={`option-card${form.need === "new" ? " is-active" : ""}`}>
            <input
              type="radio"
              name="need"
              checked={form.need === "new"}
              onChange={() => form.setNeed("new")}
            />
            <i className="option-card__dot" aria-hidden="true" />
            <span>Новый продукт с нуля</span>
          </label>
          <label className={`option-card${form.need === "dev" ? " is-active" : ""}`}>
            <input
              type="radio"
              name="need"
              checked={form.need === "dev"}
              onChange={() => form.setNeed("dev")}
            />
            <i className="option-card__dot" aria-hidden="true" />
            <span>Развитие или аудит существующего</span>
          </label>
        </div>

        <textarea
          rows="4"
          name="message"
          placeholder="Коротко о задаче: продукт, сроки, что уже есть"
          aria-label="Расскажите о задаче"
          value={form.message}
          onChange={(event) => form.setMessage(event.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary contact-form__submit"
          disabled={form.status === "sending"}
        >
          {form.status === "sending" ? "Отправляем…" : "Отправить заявку"}
        </button>
        {form.status === "success" && (
          <p className="contact-form__status contact-form__status--ok" role="status">
            Заявка отправлена. Марк свяжется с вами по указанному контакту, чтобы обсудить задачу и следующий шаг.
          </p>
        )}
        {form.status === "error" && (
          <p className="contact-form__status contact-form__status--err" role="alert">
            {form.error}
          </p>
        )}
        <p className="contact-form__note">
          {"Нажимая кнопку, вы соглашаетесь с "}
          <Link to="/policy" className="contact-form__policy">
            политикой конфиденциальности
          </Link>
        </p>
      </form>
    </div>
  );
}
