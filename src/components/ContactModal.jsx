import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useLeadForm } from "../lib/useLeadForm.js";
import "./ContactModal.css";

/* Модалка «Обсудить проект» — фреймы modal-1440/768/375.
   Открывается по window-событию `open-contact-modal`. */
export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState({ placeholder: "", note: "" });
  const form = useLeadForm();
  const lastFocusRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onOpen = (event) => {
      const detail = event.detail || {};
      form.setLeadContext({
        service: detail.service || "",
        page: detail.page || "",
      });
      setHint({
        placeholder: detail.placeholder || "",
        note: detail.note || "",
      });
      lastFocusRef.current = document.activeElement;
      setOpen(true);
    };
    window.addEventListener("open-contact-modal", onOpen);
    return () => window.removeEventListener("open-contact-modal", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      /* Вернуть фокус туда, откуда модалку открыли */
      if (lastFocusRef.current instanceof HTMLElement) {
        lastFocusRef.current.focus();
      }
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  return createPortal(
    <div
      className="cmodal"
      role="dialog"
      aria-modal="true"
      aria-label="Обсудить проект"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="cmodal__frame">
        <form className="cmodal__card" onSubmit={form.onSubmit}>
          <button
            type="button"
            ref={closeBtnRef}
            className="cmodal__close"
            aria-label="Закрыть"
            onClick={close}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2l12 12M14 2 2 14" />
            </svg>
          </button>

          <h3 className="cmodal__title">Обсудить проект</h3>
          <p className="cmodal__sub">
            {hint.note || "Ответим в течение рабочего дня. Для первого разговора достаточно коротко описать задачу — без длинных брифов и технического задания."}
          </p>

          <div className="cmodal__row">
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
            className="cmodal__input"
            name="contact"
            autoComplete="on"
            placeholder="Телефон, почта или Telegram"
            aria-label="Телефон, почта или Telegram"
            value={form.contact}
            onChange={(event) => form.setContact(event.target.value)}
          />

          <div className="cmodal__label">Что нужно?</div>
          <div className="cmodal__options">
            <label className={`cmodal-option${form.need === "new" ? " is-active" : ""}`}>
              <input
                type="radio"
                name="cmodal-need"
                checked={form.need === "new"}
                onChange={() => form.setNeed("new")}
              />
              <i className="cmodal-option__dot" aria-hidden="true" />
              <span>Новый продукт с нуля</span>
            </label>
            <label className={`cmodal-option${form.need === "dev" ? " is-active" : ""}`}>
              <input
                type="radio"
                name="cmodal-need"
                checked={form.need === "dev"}
                onChange={() => form.setNeed("dev")}
              />
              <i className="cmodal-option__dot" aria-hidden="true" />
              <span>Развитие или аудит существующего</span>
            </label>
          </div>

          <textarea
            rows="4"
            name="message"
            placeholder={hint.placeholder || "Коротко о задаче: продукт, сроки, что уже есть"}
            aria-label="Расскажите о задаче"
            value={form.message}
            onChange={(event) => form.setMessage(event.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary cmodal__submit"
            disabled={form.status === "sending"}
          >
            {form.status === "sending" ? "Отправляем…" : "Отправить заявку"}
          </button>
          {form.status === "success" && (
            <p className="cmodal__status cmodal__status--ok" role="status">
              Заявка отправлена. Марк свяжется с вами по указанному контакту, чтобы обсудить задачу и следующий шаг.
            </p>
          )}
          {form.status === "error" && (
            <p className="cmodal__status cmodal__status--err" role="alert">
              {form.error}
            </p>
          )}
          <p className="cmodal__note">
            {"Нажимая кнопку, вы соглашаетесь с "}
            <Link to="/policy" className="cmodal__policy" onClick={close}>
              политикой конфиденциальности
            </Link>
          </p>
        </form>
      </div>
    </div>,
    document.body
  );
}
