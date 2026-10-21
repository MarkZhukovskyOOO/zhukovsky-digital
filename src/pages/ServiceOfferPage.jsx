import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import adonisImg from "../assets/figma/adonis-cover.webp";
import olympImg from "../assets/figma/case-olymp-cover.webp";
import { SERVICE_OFFERS } from "../data/serviceOffers.js";
import { track } from "../lib/track.js";
import "./ServicesPage.css";

const IMAGES = { adonis: adonisImg, olymp: olympImg };

function RichText({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;
    return <Link key={index} to={match[2]}>{match[1]}</Link>;
  });
}

function openOffer(offer, slug, place) {
  track("service_cta_click", { service_slug: slug, place });
  window.dispatchEvent(new CustomEvent("open-contact-modal", {
    detail: {
      service: slug,
      page: `/services/${slug}`,
      placeholder: offer.placeholder,
      note: offer.ctaNote,
    },
  }));
}

export default function ServiceOfferPage() {
  const { slug } = useParams();
  const offer = SERVICE_OFFERS[slug];
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (!offer) return;
    track("service_view", { service_slug: slug, page_path: `/services/${slug}` });
  }, [offer, slug]);

  if (!offer) return <NotFoundPage />;

  return (
    <>
      <main className="svc">
        <section className="svc-hero container">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: offer.crumb }]} />
          <div className="svc-hero__head">
            <span className="svc-overline svc-overline--brand">Услуга</span>
            <h1 className="svc-hero__title">{offer.h1}</h1>
          </div>
          <p className="svc-hero__lead">{offer.lead}</p>
          <div className="svc-hero__actions">
            <button type="button" className="btn btn-primary svc-btn-lg" onClick={() => openOffer(offer, slug, "hero")}>
              {offer.cta}
            </button>
            <a className="btn btn-ghost" href={offer.secondary.href}>{offer.secondary.label}</a>
          </div>
          <p className="svc-lead">{offer.ctaNote}</p>
          <div className="svc-meta">
            {offer.meta.map((item) => (
              <div className="svc-meta__item" key={item.label}>
                <span className="svc-overline">{item.label}</span>
                <div className="svc-meta__value">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="svc-section">
          <div className="container">
            <header className="svc-head">
              <span className="svc-overline">Кому подходит</span>
              <h2 className="svc-title">{offer.fitTitle}</h2>
            </header>
            <div className="svc-fit">
              {offer.fit.map(([title, desc]) => (
                <article className="svc-fit__card" key={title}>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="svc-section">
          <div className="container">
            <header className="svc-head">
              <span className="svc-overline">Что входит</span>
              <h2 className="svc-title">{offer.includedTitle}</h2>
            </header>
            <div className="svc-included">
              {offer.included.map(([title, desc], index) => (
                <article className="svc-included__item" key={title}>
                  <span className="svc-included__n">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="svc-section" id="process">
          <div className="container">
            <div className="svc-process">
              <header className="svc-head svc-head--tight">
                <span className="svc-overline">Как мы работаем</span>
                <h2 className="svc-title">От задачи до результата — с понятным выходом каждого этапа</h2>
              </header>
              <div className="svc-process__steps">
                {offer.steps.map(([title, desc], index) => (
                  <article className="svc-step" key={title}>
                    <span className="svc-step__n">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="svc-section" id="result">
          <div className="container svc-deliver">
            <header className="svc-head">
              <span className="svc-overline">На выходе</span>
              <h2 className="svc-title">{offer.deliverTitle}</h2>
            </header>
            {[offer.deliver.slice(0, 3), offer.deliver.slice(3)].map((col) => (
              <ul className="svc-deliver__col" key={col[0]}>
                {col.map((text) => (
                  <li className="svc-deliver__item" key={text}>
                    <span className="svc-deliver__dot" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        <section className="svc-section">
          <div className="container">
            <header className="svc-head">
              <span className="svc-overline">{offer.stackOverline}</span>
              <h2 className="svc-title">{offer.stackTitle}</h2>
              <p className="svc-lead">{offer.stackDesc}</p>
            </header>
            {offer.chips.length > 0 && (
              <div className="svc-chips">
                {offer.chips.map((item) => <span className="svc-chip" key={item}>{item}</span>)}
              </div>
            )}
          </div>
        </section>

        <section className="svc-pricing">
          <div className="container">
            <header className="svc-pricing__head">
              <h2 className="svc-title">Стоимость</h2>
              <p className="svc-lead svc-pricing__desc">{offer.priceNote}</p>
            </header>
            <div className="svc-plans">
              {offer.plans.map(([title, price, term, desc]) => (
                <article className="svc-plan" key={title}>
                  <span className="svc-overline svc-plan__eyebrow">{title}</span>
                  <div className="svc-plan__price">{price}</div>
                  <hr className="svc-plan__divider" />
                  <div className="svc-plan__term">{term}</div>
                  <div className="svc-plan__lead">{desc}</div>
                  <button type="button" className="btn btn-block btn-ghost svc-plan__btn" onClick={() => openOffer(offer, slug, "pricing")}>
                    {offer.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="svc-section" id="cases">
          <div className="container">
            <header className="svc-cases__head">
              <h2 className="svc-title">{offer.casesTitle}</h2>
              <Link to="/cases" className="svc-action">Все кейсы</Link>
            </header>
            <div className="svc-cases">
              {offer.cases.map((item) => (
                <Link
                  className="svc-case"
                  to={item.to}
                  key={item.title}
                  onClick={() => track("service_case_click", { service_slug: slug, case_slug: item.caseSlug })}
                >
                  <div className="svc-case__media">
                    <img src={IMAGES[item.image]} alt={item.title} loading="lazy" />
                  </div>
                  <h3 className="svc-case__title">{item.title}</h3>
                  <p className="svc-case__desc">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="svc-section">
          <div className="container svc-faq">
            <header className="svc-head">
              <span className="svc-overline">Вопросы</span>
              <h2 className="svc-title">Что спрашивают чаще всего</h2>
            </header>
            <div className="svc-faq__list">
              {offer.faq.map(([question, answer], index) => {
                const isOpen = open === index;
                return (
                  <div className={`svc-faq__item${isOpen ? " is-open" : ""}`} key={question}>
                    <button
                      type="button"
                      className="svc-faq__q"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : index)}
                    >
                      <span>{question}</span>
                      <i className="svc-faq__icon" aria-hidden="true" />
                    </button>
                    <div className="svc-faq__a-wrap">
                      <div className="svc-faq__a-inner">
                        <p className="svc-faq__a"><RichText text={answer} /></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
