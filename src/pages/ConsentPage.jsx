import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { LegalText } from "../components/LegalText.jsx";
import { CONSENT_PARAGRAPHS, CONSENT_TITLE } from "../content/legal.js";
import "./PolicyPage.css";

export default function ConsentPage() {
  return (
    <>
      <main className="policy">
        <div className="container">
          <div className="policy__head">
            <Breadcrumbs
              items={[
                { label: "Главная", to: "/" },
                { label: CONSENT_TITLE },
              ]}
            />
            <h1 className="policy__title">{CONSENT_TITLE}</h1>
          </div>
          <div className="policy__sections">
            <section className="policy__section">
              {CONSENT_PARAGRAPHS.map((paragraph) => (
                <p className="policy__section-body" key={paragraph}>
                  {paragraph.startsWith("Для приёма и доставки") ? (
                    <>
                      <LegalText text="Для приёма и доставки используются инфраструктура Timeweb Cloud, почта Timeweb и личный чат Оператора с Telegram-ботом. Условия передачи и сроки обработки описаны в " />
                      <Link to="/policy/">политике обработки персональных данных</Link>
                      .
                    </>
                  ) : (
                    <LegalText text={paragraph} />
                  )}
                </p>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer slim />
    </>
  );
}
