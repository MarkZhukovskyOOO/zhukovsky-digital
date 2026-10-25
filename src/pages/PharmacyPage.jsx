import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import adonisHome from "../assets/figma/adonis-glavnaya.webp";
import adonisCatalog from "../assets/figma/adonis-katalog.webp";
import adonisMobileHome from "../assets/figma/adonis-m-glavnaya.webp";
import adonisMobileCart from "../assets/figma/adonis-m-korzina.webp";
import adonisMobileOrder from "../assets/figma/adonis-m-zakaz.webp";
import narodnayaHome from "../assets/figma/narodnaya-glavnaya.webp";
import narodnayaPharmacies from "../assets/figma/narodnaya-apteki.webp";
import narodnayaMobileProduct from "../assets/figma/narodnaya-m-tovar.webp";
import { openPharmacyLead, PHARMACY_PATH } from "../lib/pharmacyLead.js";
import { track } from "../lib/track.js";
import "./PharmacyPage.css";

const IMPLEMENTATION = "1 900 000 ₽";
const SUPPORT = "40 000 ₽";
const GROWTH = "110 000 ₽";
const GENERAL_SITE_APP = "1 700 000 ₽";

const ADONIS_SITE = "https://new.aptekadonis.ru/";
const NARODNAYA_SITE = "https://аптеканародная.рф/";

const FAQ = [
  {
    q: "Можно ли интегрировать решение с нашей учётной системой?",
    a: "Чаще всего это зависит от доступных API и структуры данных. На первом этапе изучаем систему, проверяем товары, остатки, цены, заказы и статусы. После этого фиксируем состав и стоимость интеграции.",
  },
  {
    q: "У нас уже есть сайт или интернет-аптека. Нужна новая разработка?",
    a: "Не обязательно. Начинаем с оценки действующего канала и можем предложить развитие существующего решения, мобильное приложение или отдельные интеграции. Переписывание с нуля — только если оно обоснованно.",
  },
  {
    q: "Какие функции входят в стоимость от 1,9 млн ₽?",
    a: "Базовый ориентир предполагает сайт и приложение для iOS и Android с каталогом, поиском, бронированием и согласованной интеграцией. Точный набор функций, ограничения и этапы закрепляем в ТЗ и коммерческом предложении.",
  },
  {
    q: "Можно ли сначала запустить сайт, а потом приложение?",
    a: "Да. Очерёдность и стоимость этапов определяем после диагностики, чтобы не дублировать серверную часть и интеграции.",
  },
  {
    q: "Кто будет привлекать покупателей после запуска?",
    a: "Можем отдельно помочь с планом запуска: работа с текущими покупателями сети, аналитика, CRM-коммуникации, SEO, ASO и продвижение через подрядчиков. Объём маркетинга и бюджет согласуем независимо от разработки.",
  },
  {
    q: "Какие права мы получим на продукт?",
    a: "Права на код, дизайн, используемые компоненты и условия передачи материалов указываем в договоре. Условия зависят от выбранной модели внедрения и заранее обсуждаются до подписания.",
  },
  {
    q: "Можно ли посмотреть реальное решение до обсуждения договора?",
    a: "Да. Покажем работающие пользовательские сценарии на примере проектов «Адонис» и «Аптека Народная» и расскажем, как заказы связаны с аптечной системой.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function DemoButton({ place, children, variant = "btn btn-primary" }) {
  return (
    <button
      type="button"
      className={variant}
      onClick={() => openPharmacyLead(place, "pharmacy_demo_click")}
    >
      {children}
    </button>
  );
}

function OfferButton({ place, children }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => openPharmacyLead(place, "pharmacy_offer_click")}
    >
      {children}
    </button>
  );
}

function CaseLink({ to, place, children, className = "btn btn-ghost" }) {
  return (
    <Link
      to={to}
      className={className}
      onClick={() => track("pharmacy_case_click", { page_path: PHARMACY_PATH, place })}
    >
      {children}
    </Link>
  );
}

function LiveLink({ href, project, children }) {
  return (
    <a
      href={href}
      className="btn btn-ghost"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("pharmacy_live_site_click", {
        page_path: PHARMACY_PATH,
        place: "case",
        project,
      })}
    >
      {children}
    </a>
  );
}

function Shot({ src, alt, caption, priority = false }) {
  return (
    <figure className="ph-figure">
      <div className="ph-shot">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export default function PharmacyPage() {
  return (
    <>
      <main className="ph">
        <div className="container ph-crumbs">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Аптечным сетям" }]} />
        </div>

        <section className="ph-hero">
          <div className="container ph-hero__grid">
            <div className="ph-hero__copy">
              <p className="ph-eyebrow">Цифровые решения для аптечных сетей</p>
              <h1>Собственный сайт и приложение для вашей аптечной сети.</h1>
              <p className="ph-lead">
                Разработаем интернет-аптеку и мобильное приложение для аптеки с каталогом, наличием препаратов, онлайн-бронированием лекарств и интеграцией с вашей учётной системой. Поможем организовать запуск и дальнейшее развитие собственного канала заказов.
              </p>
              <ul className="ph-pills">
                <li>Сайт + iOS + Android</li>
                <li>Онлайн-бронирование и самовывоз</li>
                <li>Интеграция с аптечной системой</li>
              </ul>
              <div className="ph-actions">
                <DemoButton place="hero">Запросить демонстрацию</DemoButton>
                <CaseLink to="/case/adonis" place="hero">Посмотреть кейс «Адонис»</CaseLink>
              </div>
              <p className="ph-price">{`Внедрение под ключ — от ${IMPLEMENTATION}`}</p>
              <p className="ph-trust">
                Для «Адониса» уже работают сайт, приложение и обмен заказами с аптечной системой. «Аптеку Народную» тоже сделали мы: каталог, выбор аптеки и бронирование с самовывозом.
              </p>
            </div>

            <div className="ph-hero__visual">
              <div className="ph-browser">
                <div className="ph-browser__bar" aria-hidden="true">
                  <i /><i /><i />
                </div>
                <div className="ph-browser__screen">
                  <img
                    src={adonisHome}
                    alt="Главная страница сайта аптечной сети «Адонис»"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="ph-phone">
                <img
                  src={adonisMobileHome}
                  alt="Главный экран мобильного приложения «Адонис»"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="ph-section">
          <div className="container">
            <div className="ph-head">
              <h2>Онлайн-канал, который работает на вашу сеть</h2>
              <p>
                Сайт и приложение не заменяют офлайн-аптеки или агрегаторы. Они дают покупателю дополнительный прямой путь к вашей сети: проверить наличие, выбрать точку и оформить бронь.
              </p>
            </div>
            <div className="ph-cards ph-cards--3">
              <article className="ph-card">
                <h3>Прямой заказ</h3>
                <p>Покупатель может оформить бронь через собственный сервис аптечной сети.</p>
              </article>
              <article className="ph-card">
                <h3>Удобный самовывоз</h3>
                <p>Выбор филиала, доступности товара и получение заказа в аптеке.</p>
              </article>
              <article className="ph-card">
                <h3>Повторные обращения</h3>
                <p>История заказов, личный кабинет и инструменты дальнейшей коммуникации с покупателями при наличии необходимых согласий.</p>
              </article>
            </div>
            <div className="ph-actions ph-actions--next">
              <OfferButton place="value">Обсудить вашу задачу</OfferButton>
            </div>
          </div>
        </section>

        <section className="ph-section ph-section--subtle" id="solution">
          <div className="container">
            <div className="ph-head">
              <h2>Один цифровой канал — сайт, приложение и аптечная система</h2>
              <p>
                Разработка сайта для аптечной сети здесь — это не отдельная витрина, а связанный канал: сайт, мобильное приложение и учётная система работают с одним заказом.
              </p>
            </div>
            <div className="ph-cards ph-cards--3">
              <article className="ph-card">
                <h3>Сайт аптечной сети</h3>
                <ul>
                  <li>Индексируемый каталог товаров и категории;</li>
                  <li>Поиск, карточки, цены и наличие в объёме данных учётной системы;</li>
                  <li>Выбор аптеки, корзина, бронирование, самовывоз;</li>
                  <li>Региональные страницы и филиалы по согласованной архитектуре.</li>
                </ul>
              </article>
              <article className="ph-card">
                <h3>Приложение iOS и Android</h3>
                <ul>
                  <li>Каталог и быстрый поиск;</li>
                  <li>Выбор аптеки, корзина, бронирование;</li>
                  <li>Личный кабинет, история и статусы заказов;</li>
                  <li>Push и программа лояльности — отдельным составом работ, если они нужны.</li>
                </ul>
              </article>
              <article className="ph-card">
                <h3>Интеграция с учётной системой</h3>
                <ul>
                  <li>Номенклатура, цены и остатки, когда эти данные отдаёт система;</li>
                  <li>Передача бронирований и возврат статусов;</li>
                  <li>Недоступные позиции и изменения заказа в согласованной логике;</li>
                  <li>Проверка API и зон ответственности до утверждения точной стоимости.</li>
                </ul>
              </article>
            </div>
            <ol className="ph-path" aria-label="Как заказ проходит от покупателя до статуса">
              <li>Покупатель</li>
              <li>Сайт или приложение</li>
              <li>Заказ</li>
              <li>Учётная система</li>
              <li>Подтверждение аптекой</li>
              <li>Статус покупателю</li>
            </ol>
            <p className="ph-note">
              Состав и глубину интеграции фиксируем после знакомства с вашей учётной системой и доступными API.
            </p>
          </div>
        </section>

        <section className="ph-section" id="case">
          <div className="container">
            <div className="ph-head">
              <h2>Это уже работает в аптечных сетях</h2>
              <p>
                Для сети «Адонис» Zhukovsky Digital разработала сайт и приложения для iOS и Android, связала каталог и онлайн-бронирование с аптечной системой. Покупатели ищут товары, выбирают аптеку и оформляют бронь. Сотрудники обрабатывают заказ в своей системе.
              </p>
            </div>
            <div className="ph-gallery">
              <Shot
                src={adonisCatalog}
                alt="Каталог и поиск препаратов на сайте «Адонис»"
                caption="Каталог и поиск"
              />
              <Shot
                src={adonisMobileCart}
                alt="Корзина и бронирование в приложении «Адонис»"
                caption="Выбор аптеки и бронирование"
              />
              <Shot
                src={adonisMobileOrder}
                alt="Статус заказа в приложении «Адонис»"
                caption="История и статусы заказа"
              />
            </div>
            <div className="ph-actions">
              <CaseLink to="/case/adonis" place="case" className="btn btn-primary">Открыть подробный кейс</CaseLink>
              <LiveLink href={ADONIS_SITE} project="adonis">Посмотреть работающий сайт</LiveLink>
              <DemoButton place="case" variant="btn btn-ghost">Показать такое решение на созвоне</DemoButton>
            </div>

            <div className="ph-case-more">
              <h3>«Аптека Народная» — тоже наш проект</h3>
              <p>
                Сайт аптеканародная.рф сделали целиком: каталог и поиск, карточка товара, выбор аптеки, бронирование и самовывоз. Покупатель подтверждает город, смотрит наличие и забирает заказ в выбранной точке.
              </p>
              <div className="ph-gallery">
                <Shot
                  src={narodnayaHome}
                  alt="Главная страница сайта «Аптека Народная»"
                  caption="Каталог и поиск"
                />
                <Shot
                  src={narodnayaPharmacies}
                  alt="Список аптек на сайте «Аптека Народная»"
                  caption="Выбор аптеки и бронирование"
                />
                <Shot
                  src={narodnayaMobileProduct}
                  alt="Карточка товара на сайте «Аптека Народная»"
                  caption="Карточка товара"
                />
              </div>
              <div className="ph-actions">
                <CaseLink to="/case/narodnaya" place="case">Открыть кейс «Аптека Народная»</CaseLink>
                <LiveLink href={NARODNAYA_SITE} project="narodnaya">Открыть аптеканародная.рф</LiveLink>
              </div>
            </div>
          </div>
        </section>

        <section className="ph-section ph-section--subtle">
          <div className="container">
            <div className="ph-head">
              <h2>От поиска препарата до получения в аптеке</h2>
            </div>
            <ol className="ph-steps">
              <li>
                <h3>Найти товар</h3>
                <p>Пользователь открывает каталог или ищет препарат.</p>
              </li>
              <li>
                <h3>Проверить наличие</h3>
                <p>Смотрит цену и доступность по филиалам в рамках данных, которые отдаёт учётная система.</p>
              </li>
              <li>
                <h3>Выбрать аптеку</h3>
                <p>Указывает удобную точку самовывоза.</p>
              </li>
              <li>
                <h3>Оформить бронь</h3>
                <p>Заказ уходит в учётную систему сети.</p>
              </li>
              <li>
                <h3>Получить подтверждение</h3>
                <p>Аптека обрабатывает заказ, пользователь видит согласованный статус.</p>
              </li>
            </ol>
            <p className="ph-note">
              Если наличие изменилось, сценарий заказа должен корректно обработать частичное подтверждение и согласование покупателем. Гарантированное наличие и мгновенную синхронизацию не обещаем: это зависит от учётной системы.
            </p>
          </div>
        </section>

        <section className="ph-section" id="growth">
          <div className="container">
            <div className="ph-head">
              <h2>С запуском работа не заканчивается</h2>
              <p>
                Само по себе приложение не создаёт поток покупателей. Вместе с разработкой можем спланировать запуск цифрового канала и дальнейшее продвижение — отдельными этапами и бюджетами.
              </p>
            </div>
            <ol className="ph-sequence" aria-label="Последовательность развития канала">
              <li>Внедрение</li>
              <li>Привлечение действующих покупателей</li>
              <li>Повторные заказы</li>
              <li>Масштабирование</li>
            </ol>
            <div className="ph-cards ph-cards--4">
              <article className="ph-card">
                <h3>Покупатели действующих аптек</h3>
                <p>QR-коды в точках, ссылки и материалы для покупателей, сценарий предложения сервиса сотрудником.</p>
              </article>
              <article className="ph-card">
                <h3>Повторные заказы</h3>
                <p>Аналитика, сообщения и push-коммуникации при согласиях пользователей, лояльность — если это технически возможно и входит в договор.</p>
              </article>
              <article className="ph-card">
                <h3>Локальный спрос</h3>
                <p>Яндекс Карты и 2ГИС, страницы филиалов, техническая подготовка к поиску и развитие поискового трафика.</p>
              </article>
              <article className="ph-card">
                <h3>Новая аудитория</h3>
                <p>Отдельные SEO- и ASO-проекты и рекламные кампании при согласованном бюджете и с учётом отраслевых требований.</p>
              </article>
            </div>
            <p className="ph-note">
              Продвижение, SEO, ASO, медиабюджеты и поддержка не входят в цену разработки.
            </p>
          </div>
        </section>

        <section className="ph-section ph-section--subtle" id="pricing">
          <div className="container">
            <div className="ph-head">
              <h2>Прозрачная стоимость внедрения и развития</h2>
            </div>
            <article className="ph-offer">
              <div>
                <h3>Сайт + приложение для аптечной сети</h3>
                <p>
                  Брендированный сайт, приложение iOS и Android, каталог, онлайн-бронирование, серверная часть, согласованная интеграция, тестирование и запуск.
                </p>
                <p className="ph-note">
                  {`Цена — ориентир внедрения под ключ при наличии подходящего API. Общий пакет «сайт и приложение» на сайте студии начинается от ${GENERAL_SITE_APP}: это другой состав, без отраслевых интеграций и аптечного сценария этой страницы. Точная смета — после технического обследования. Сторонние лицензии и работы вне технического задания считаются отдельно.`}
                </p>
              </div>
              <div className="ph-offer__side">
                <p className="ph-offer__price">{`от ${IMPLEMENTATION}`}</p>
                <OfferButton place="pricing">Обсудить внедрение</OfferButton>
              </div>
            </article>
            <div className="ph-cards ph-cards--2">
              <article className="ph-card">
                <h3>Техническая поддержка</h3>
                <p className="ph-card__price">{`от ${SUPPORT}/мес`}</p>
                <ul>
                  <li>Мониторинг доступности и ключевых сценариев;</li>
                  <li>Инциденты и ошибки по согласованному SLA;</li>
                  <li>Регламентные обновления и ограниченные мелкие исправления в рамках договора;</li>
                  <li>Контроль интеграций и отчёт о состоянии.</li>
                </ul>
              </article>
              <article className="ph-card">
                <h3>Запуск и развитие цифрового канала</h3>
                <p className="ph-card__price">{`от ${GROWTH}/мес`}</p>
                <ul>
                  <li>Согласованный объём технической поддержки;</li>
                  <li>Аналитика установок, бронирований и пользовательских сценариев;</li>
                  <li>Программа перевода покупателей действующих аптек в цифровой канал;</li>
                  <li>Ограниченное число CRM-кампаний и продуктовых гипотез в месяц;</li>
                  <li>Ежемесячный разбор и план развития.</li>
                </ul>
              </article>
            </div>
            <p className="ph-note">
              Финальный состав, лимиты часов и стоимость определяются договором. SEO, ASO, платная реклама, сервисы и рекламные расходы оплачиваются отдельно.
            </p>
          </div>
        </section>

        <section className="ph-section">
          <div className="container">
            <div className="ph-head">
              <h2>Как мы запускаем проект</h2>
              <p>Срок считаем после проверки API и объёма. Готового срока «для любой сети» нет.</p>
            </div>
            <ol className="ph-steps">
              <li>
                <h3>Диагностика задачи</h3>
                <p>Уточняем точки сети, текущий способ заказа, учётную систему, приоритетные процессы и участников.</p>
              </li>
              <li>
                <h3>Проверка интеграций и согласование задания</h3>
                <p>Изучаем API, ограничения, доступность данных, границы состава и сроки.</p>
              </li>
              <li>
                <h3>Дизайн и разработка</h3>
                <p>Адаптируем интерфейс под бренд, реализуем согласованные сценарии и обмен данными.</p>
              </li>
              <li>
                <h3>Тестирование и запуск</h3>
                <p>Проверяем бронирование, статусы, ошибки наличия и работу в выбранных средах.</p>
              </li>
              <li>
                <h3>Развитие после релиза</h3>
                <p>При необходимости подключаем поддержку и отдельную программу привлечения покупателей.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="ph-section ph-section--subtle" id="faq">
          <div className="container ph-faq-wrap">
            <h2>Вопросы перед внедрением</h2>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
            />
            <div className="ph-faq">
              {FAQ.map((item) => (
                <details key={item.q} className="ph-faq__item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ph-final">
          <div className="container">
            <h2>Покажем, как собственный онлайн-канал может работать в вашей сети</h2>
            <p>
              На коротком разговоре покажем реальные проекты «Адонис» и «Аптека Народная», уточним вашу учётную систему и составим предварительный план внедрения под вашу сеть.
            </p>
            <div className="ph-actions ph-actions--center">
              <DemoButton place="final">Запросить демонстрацию</DemoButton>
              <CaseLink to="/case/adonis" place="final">Посмотреть кейс «Адонис»</CaseLink>
            </div>
            <p className="ph-note ph-note--center">
              Первый разговор — о задачах, интеграциях и вариантах запуска. Подготовка точной сметы — после уточнения требований.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
