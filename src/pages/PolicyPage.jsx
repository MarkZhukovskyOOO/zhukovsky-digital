import Footer from "../components/Footer.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { LegalText } from "../components/LegalText.jsx";
import { POLICY_SECTIONS, POLICY_TITLE } from "../content/legal.js";
import "./PolicyPage.css";

export default function PolicyPage() {
  return (
    <>
      <main className="policy">
        <div className="container">
          <div className="policy__head">
            <Breadcrumbs
              items={[
                { label: "Главная", to: "/" },
                { label: POLICY_TITLE },
              ]}
            />
            <h1 className="policy__title">{POLICY_TITLE}</h1>
          </div>
          <div className="policy__sections">
            {POLICY_SECTIONS.map((section) => (
              <section className="policy__section" key={section.title}>
                <h2 className="policy__section-title">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p className="policy__section-body" key={paragraph}>
                    <LegalText text={paragraph} />
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer slim />
    </>
  );
}
