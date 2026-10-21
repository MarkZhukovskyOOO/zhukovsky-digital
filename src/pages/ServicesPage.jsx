import { useEffect, useState } from "react";
import { track } from "../lib/track.js";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import adonisImg from "../assets/figma/adonis-cover.webp";
import olympImg from "../assets/figma/case-olymp-cover.webp";
import "./ServicesPage.css";

const openContactModal = () =>
  window.dispatchEvent(new CustomEvent("open-contact-modal"));

const META = [
  { label: "Срок", value: "от 30 рабочих дней" },
  { label: "Бюджет", value: "от 900 000 ₽" },
  { label: "Платформы", value: "Flutter, Swift, Kotlin" },
  { label: "Формат", value: "фиксированная оплата, почасовая оплата" },
];

const FIT = [
  {
    title: "Регулярное использование",
    desc: "Упрощаем повторную запись, заказ, получение результатов и другие регулярные сценарии.",
  },
  {
    title: "Собственный маркетинговый канал",
    desc: "Возвращаем аудиторию через push-уведомления, напоминания и персональные предложения.",
  },
  {
    title: "Лояльность и удержание",
    desc: "Собираем сервис вокруг клиента: личный кабинет, история, бонусы и персональные сценарии.",
  },
];

const INCLUDED = [
  {
    n: "01",
    title: "Пользовательские сценарии и конверсия",
    desc: "Изучаем, как пользователь принимает решение и проходит путь внутри продукта. Проектируем сценарии так, чтобы сократить путь до записи, заказа, оплаты или другого целевого действия.",
  },
  {
    n: "02",
    title: "UX/UI-дизайн",
    desc: "Проектируем структуру, прототипы и интерфейсы приложения. Проверяем ключевые сценарии до разработки и создаём дизайн-систему для дальнейшего развития продукта.",
  },
  {
    n: "03",
    title: "Разработка приложения",
    desc: "Разрабатываем приложения для iOS и Android на Flutter или нативных технологиях. Отвечаем за архитектуру, производительность и стабильную работу ключевых сценариев.",
  },
  {
    n: "04",
    title: "Backend, админка и интеграции",
    desc: "Создаём серверную часть и административную панель, чтобы команда могла управлять контентом, пользователями и данными без участия разработчиков. Интегрируем приложение с МИС, CRM, 1С, платежами и другими системами.",
  },
  {
    n: "05",
    title: "Публикация и ASO",
    desc: "Публикация и ASO — по отдельной оценке. Когда этот объём согласован, готовим материалы для магазинов приложений и сопровождаем модерацию.",
  },
  {
    n: "06",
    title: "Аналитика и развитие",
    desc: "Настраиваем аналитику ключевых действий, если она входит в согласованный объём. Поддержка, ASO и новый функционал после запуска оцениваются отдельно.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Погружаемся в задачу",
    desc: "Разбираем бизнес-модель, цели продукта, аудиторию, текущие системы и ограничения. Определяем, что должно войти в первую версию.",
  },
  {
    n: "02",
    title: "Проектируем продукт",
    desc: "Разбираем пользовательские сценарии: от первого входа до записи, заказа, оплаты или другого целевого действия. Формируем структуру продукта и требования к интеграциям.",
  },
  {
    n: "03",
    title: "Создаём дизайн",
    desc: "Собираем прототип, проектируем UX/UI и показываем ключевые сценарии до начала полноценной разработки. Согласовываем дизайн, состояния экранов и крайние случаи, а интерфейс собираем на дизайн-системе — чтобы новые функции добавлялись без пересборки.",
  },
  {
    n: "04",
    title: "Разрабатываем и тестируем",
    desc: "Параллельно создаём мобильное приложение, backend, админ-панель и интеграции. Регулярно показываем рабочие сборки и проверяем ключевые сценарии.",
  },
  {
    n: "05",
    title: "Запускаем и развиваем",
    desc: "Проводим финальное тестирование согласованной версии. Публикация и ASO — по отдельной оценке. После запуска развитие продукта согласуем отдельно.",
  },
];

const DELIVER_COLS = [
  [
    "Код и права на продукт: исходный код приложения и backend, репозитории и материалы проекта",
    "Дизайн и дизайн-система: макеты, компоненты и правила интерфейса",
    "Документация: архитектура, API, интеграции и ключевые технические решения",
    "Аккаунты магазинов приложений и доступы к ним согласуем отдельно при подготовке публикации",
  ],
  [
    "Передача команде: объясняем архитектуру, процессы и особенности продукта разработчикам заказчика",
    "Свобода развития: продолжаете с нами, своей командой или другим подрядчиком",
  ],
];

const STACK = [
  "Flutter",
  "Dart",
  "Swift",
  "SwiftUI",
  "Kotlin",
  "Jetpack Compose",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Firebase",
  "Sentry",
  "Grafana",
];

const PLANS = [
  {
    eyebrow: "Первая версия приложения",
    price: "от 900 000 ₽",
    term: "Срок: от 30 рабочих дней",
    lead: "Приложение для iOS и Android в согласованном объёме.",
    features: [
      "Дизайн;",
      "Согласованные функции приложения;",
      "Серверная часть и интеграции в утверждённом объёме;",
      "Тестирование.",
    ],
    example: "Примеры: приложение для записи или бронирования.",
    featured: false,
  },
  {
    eyebrow: "Сайт и мобильное приложение",
    price: "от 1 700 000 ₽",
    term: "Срок: от 1,5 месяца",
    lead: "Два канала для клиентов с общей серверной частью и связанными сценариями. В бюджет входит их совместная работа; минимумы отдельных продуктов относятся к более ограниченному объёму.",
    features: [
      "Дизайн сайта и приложения;",
      "Сайт и приложение для iOS и Android;",
      "Общая серверная часть и API;",
      "Административная часть по согласованным задачам;",
      "Интеграции по согласованному перечню;",
      "Тестирование сайта, приложения и обмена данными.",
    ],
    example: "Примеры: сайт и приложение аптечной сети; сервисы для записи и взаимодействия с клиникой.",
    featured: true,
  },
  {
    eyebrow: "Цифровая платформа для сети",
    price: "от 3 000 000 ₽",
    term: "Срок: от 3 месяцев; точный срок после оценки",
    lead: "Сайт и приложение с логикой филиалов, ролями пользователей и несколькими интеграциями. Объём фиксируем перед разработкой.",
    features: [
      "Сайт, приложение для iOS и Android и сервер;",
      "Сценарии работы с филиалами;",
      "Несколько ролей и разграничение доступа;",
      "Интеграции с несколькими внутренними системами;",
      "Личные кабинеты и админ-инструменты по требованиям;",
      "Тестирование связанной логики и интеграций.",
    ],
    example: "Примеры: сеть клиник с разными сценариями для пациентов и сотрудников; аптечная сеть со сложной обработкой заказов.",
    featured: false,
  },
];

const CASES = [
  {
    img: adonisImg,
    title: "Адонис: сайт и приложение для аптечной сети",
    desc: "Каталог, наличие в аптеках, бронирование и карта лояльности с интеграцией в аптечную систему.",
    to: "/case/adonis",
  },
  {
    img: olympImg,
    title: "Olymp Clinic — сайт для сети клиник",
    desc: "Полный цикл создания новой версии сайта: от инициации проекта и дизайна до разработки на 1С-Битрикс и выпуска в продакшен. Срок — 1,5 месяца.",
    to: "/case/olymp-clinic",
  },
];

const FAQ = [
  {
    q: "Сколько стоит мобильное приложение и от чего зависит цена?",
    a: "От 900 000 ₽ за приложение для iOS и Android в согласованном объёме. Цена зависит от числа пользовательских сценариев, сложности дизайна, серверной части и интеграций. Дизайн, разработку и тестирование фиксируем в смете; внешние сервисы, публикацию и дальнейшее развитие оцениваем отдельно.",
  },
  {
    q: "Нативная разработка или Flutter — как выбрать?",
    a: "Работаем с Flutter, Swift и Kotlin. Flutter позволяет использовать общую кодовую базу для iOS и Android. Нативную разработку рассматриваем, когда требования продукта оправдывают отдельную реализацию для каждой платформы. Выбираем подход с учётом функций, бюджета, производительности и дальнейшего развития; стоимость и сроки оцениваем для выбранного варианта.",
  },
  {
    q: "Можно ли начать с MVP и дорастить потом?",
    a: "Да. Сначала определяем задачи первой версии и согласуем необходимый набор функций. Остальные возможности выносим в последующие этапы. Для каждого этапа отдельно оцениваем состав работ, стоимость и срок.",
  },
  {
    q: "Кому принадлежат исходники, макеты и аккаунты в сторах?",
    a: "Порядок передачи прав, исходников, макетов и доступов фиксируем в договоре. При передаче проекта готовим описание подключённых сервисов и инструкции по работе с ними. Владение аккаунтами магазинов приложений и порядок предоставления доступа согласуем отдельно при подготовке публикации.",
  },
  {
    q: "Что происходит после релиза?",
    a: "Можем продолжить поддержку и развитие: дорабатывать функции, интеграции и пользовательские сценарии. ASO приложения и GEO сайта согласуем как отдельные направления работы. Состав, стоимость и сроки этих услуг определяем отдельно от первоначальной разработки.",
  },
];

function SectionHead({ overline, title, desc }) {
  return (
    <header className="svc-head">
      {overline && <span className="svc-overline">{overline}</span>}
      <h2 className="svc-title">{title}</h2>
      {desc && <p className="svc-lead">{desc}</p>}
    </header>
  );
}

export default function ServicesPage() {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    track("service_view", { service_slug: "mobile", page_path: "/services" });
  }, []);

  return (
    <>
      <main className="svc">
        {/* Hero */}
        <section className="svc-hero container">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Мобильные приложения" },
            ]}
          />
          <div className="svc-hero__head">
            <span className="svc-overline svc-overline--brand">Услуга</span>
            <h1 className="svc-hero__title">
              Мобильные приложения для медицинского бизнеса
            </h1>
          </div>
          <p className="svc-hero__lead">
            Проектируем и разрабатываем приложения для клиник, стоматологий,
            лабораторий и аптечных сетей — от записи и личного кабинета до
            программы лояльности, заказов и интеграций с внутренними системами.
            Разрабатываем на Flutter, а для задач, где это оправдано, — нативно
            для iOS и Android. Срок от 30 рабочих дней считаем с согласованного
            старта при наличии исходных данных и доступов. Ожидание данных,
            готовности внешних систем и публикация в магазинах в этот срок не
            входят.
          </p>
          <div className="svc-hero__actions">
            <button
              type="button"
              className="btn btn-primary svc-btn-lg"
              onClick={openContactModal}
            >
              Обсудить проект
            </button>
            <Link to="/cases" className="btn btn-ghost">
              Смотреть кейсы
            </Link>
          </div>

          <div className="svc-meta">
            {META.map((m) => (
              <div className="svc-meta__item" key={m.label}>
                <span className="svc-overline">{m.label}</span>
                <div className="svc-meta__value">{m.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Кому подходит */}
        <section className="svc-section">
          <div className="container">
            <SectionHead
              overline="Кому подходит"
              title="Когда мобильное приложение требуется бизнесу"
              desc="В медицине приложение имеет смысл там, где клиент возвращается к сервису регулярно. Тогда оно становится одновременно сервисом, собственным маркетинговым каналом и инструментом удержания."
            />
            <div className="svc-fit">
              {FIT.map((c) => (
                <article className="svc-fit__card" key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Что входит */}
        <section className="svc-section">
          <div className="container">
            <SectionHead
              overline="Что входит"
              title="Подходим комплексно к разработке мобильного приложения"
              desc="Работа начинается с аналитики пользовательского пути до целевого действия в приложении: покупка, заказ, бронь и так далее."
            />
            <div className="svc-included">
              {INCLUDED.map((item) => (
                <article className="svc-included__item" key={item.n}>
                  <span className="svc-included__n">{item.n}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Как мы работаем */}
        <section className="svc-section">
          <div className="container">
            <div className="svc-process">
              <header className="svc-head svc-head--tight">
                <span className="svc-overline">Как мы работаем</span>
                <h2 className="svc-title">
                  От задачи до релиза — с понятным результатом на каждом этапе
                </h2>
              </header>
              <div className="svc-process__steps">
                {PROCESS.map((s) => (
                  <article className="svc-step" key={s.n}>
                    <span className="svc-step__n">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* На выходе */}
        <section className="svc-section">
          <div className="container svc-deliver">
            <SectionHead
              overline="На выходе"
              title="Продукт остаётся у вас — вместе со знаниями о нём"
              desc="Передаём код, дизайн и документацию согласованного объёма. Аккаунты магазинов приложений согласуем отдельно. Если развитие переходит внутренней команде или другому подрядчику — помогаем передать контекст так, чтобы работу можно было продолжить без пересборки продукта с нуля."
            />
            {DELIVER_COLS.map((col, i) => (
              <ul className="svc-deliver__col" key={i}>
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

        {/* Стек */}
        <section className="svc-section">
          <div className="container">
            <SectionHead
              overline="Стек"
              title="Выбираем технологию вместе с вами"
              desc="Не привязываем продукт к одному стеку. Сравниваем варианты по срокам, стоимости, производительности и дальнейшему развитию — объясняем компромиссы и принимаем техническое решение вместе с вашей командой. Если у вас есть CTO или внутренняя команда разработки, архитектуру и выбор стека согласовываем вместе с ними."
            />
            <div className="svc-chips">
              {STACK.map((t) => (
                <span className="svc-chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Стоимость */}
        <section className="svc-pricing">
          <div className="container">
            <header className="svc-pricing__head">
              <h2 className="svc-title">Стоимость</h2>
              <p className="svc-lead svc-pricing__desc">
                Срок зависит от согласованного объёма и считается с согласованного
                старта при наличии исходных данных и доступов. Ожидание данных,
                внешних систем и публикация в срок не входят. В стоимость входят
                дизайн, разработка и тестирование согласованного объёма. Внешние
                сервисы, публикация, продвижение и поддержка оцениваются отдельно.
              </p>
            </header>
            <div className="svc-plans">
              {PLANS.map((plan) => (
                <article
                  className={`svc-plan${plan.featured ? " svc-plan--featured" : ""}`}
                  key={plan.price}
                >
                  <span className="svc-overline svc-plan__eyebrow">
                    {plan.eyebrow}
                  </span>
                  <div className="svc-plan__price">{plan.price}</div>
                  <hr className="svc-plan__divider" />
                  <div className="svc-plan__term">{plan.term}</div>
                  <div className="svc-plan__lead">{plan.lead}</div>
                  <ul className="svc-plan__features">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <p className="svc-plan__example">{plan.example}</p>
                  <button
                    type="button"
                    className={`btn btn-block svc-plan__btn ${
                      plan.featured ? "btn-primary" : "btn-ghost"
                    }`}
                    onClick={openContactModal}
                  >
                    Оценить мой проект
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Кейсы */}
        <section className="svc-section">
          <div className="container">
            <header className="svc-cases__head">
              <h2 className="svc-title">Примеры наших проектов</h2>
              <Link to="/cases" className="svc-action">
                Все кейсы
              </Link>
            </header>
            <div className="svc-cases">
              {CASES.map((c) => {
                const inner = (
                  <>
                    <div className="svc-case__media">
                      <img src={c.img} alt={c.title} loading="lazy" />
                    </div>
                    <h3 className="svc-case__title">{c.title}</h3>
                    <p className="svc-case__desc">{c.desc}</p>
                  </>
                );
                return c.to ? (
                  <Link className="svc-case" to={c.to} key={c.title}>
                    {inner}
                  </Link>
                ) : (
                  <article className="svc-case" key={c.title}>
                    {inner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="svc-section">
          <div className="container svc-faq">
            <SectionHead
              overline="Вопросы"
              title="Что спрашивают чаще всего"
              desc="Не нашли свой вопрос — напишите в Telegram, ответим в течение рабочего дня."
            />
            <div className="svc-faq__list">
              {FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    className={`svc-faq__item${isOpen ? " is-open" : ""}`}
                    key={item.q}
                  >
                    <button
                      type="button"
                      className="svc-faq__q"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      <span>{item.q}</span>
                      <i className="svc-faq__icon" aria-hidden="true" />
                    </button>
                    <div className="svc-faq__a-wrap">
                      <div className="svc-faq__a-inner">
                        <p className="svc-faq__a">{item.a}</p>
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
