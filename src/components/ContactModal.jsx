import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./ContactModal.css";

/* Модалка «Обсудить проект» — фреймы modal-1440/768/375.
   Открывается по window-событию `open-contact-modal`. */
export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState("new");
  const lastFocusRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onOpen = () => {
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
        <form className="cmodal__card" onSubmit={(e) => e.preventDefault()}>
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
            Ответим в течение рабочего дня. Для первого разговора достаточно
            коротко описать задачу — без длинных брифов и технического задания.
          </p>

          <div className="cmodal__row">
            <input type="text" placeholder="Имя" aria-label="Имя" />
            <input type="text" placeholder="Компания" aria-label="Компания" />
          </div>
          <input
            type="text"
            className="cmodal__input"
            placeholder="Телефон, почта или Telegram"
            aria-label="Телефон, почта или Telegram"
          />

          <div className="cmodal__label">Что нужно?</div>
          <div className="cmodal__options">
            <label className={`cmodal-option ${need === "new" ? "is-active" : ""}`}>
              <input
                type="radio"
                name="cmodal-need"
                checked={need === "new"}
                onChange={() => setNeed("new")}
              />
              <i className="cmodal-option__dot" aria-hidden="true" />
              <span>Новый продукт с нуля</span>
            </label>
            <label className={`cmodal-option ${need === "dev" ? "is-active" : ""}`}>
              <input
                type="radio"
                name="cmodal-need"
                checked={need === "dev"}
                onChange={() => setNeed("dev")}
              />
              <i className="cmodal-option__dot" aria-hidden="true" />
              <span>Развитие или аудит существующего</span>
            </label>
          </div>

          <textarea
            rows="4"
            placeholder="Коротко о задаче: продукт, сроки, что уже есть"
            aria-label="Расскажите о задаче"
          />

          <button type="submit" className="btn btn-primary cmodal__submit">
            Отправить заявку
          </button>
          <p className="cmodal__note">
            Нажимая кнопку, вы соглашаетесь с{" "}
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
