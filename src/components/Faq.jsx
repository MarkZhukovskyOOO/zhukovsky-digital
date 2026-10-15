import { useState } from "react";
import { FAQ as ITEMS } from "../seo.js";
import ContactForm from "./ContactForm.jsx";
import "./Faq.css";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <div className="faq__left">
          <h2 className="section-title">Частые вопросы</h2>
          <p className="faq__desc">
            Коротко ответили на вопросы, которые чаще всего возникают до начала
            проекта. Если вашей ситуации здесь нет — разберём её на коротком
            созвоне.
          </p>

          <div className="faq__list">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={item.q}>
                  <button
                    className="faq__q"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <i className="faq__icon" aria-hidden="true" />
                  </button>
                  <div className="faq__a-wrap">
                    <div className="faq__a-inner">
                      <p className="faq__a">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
