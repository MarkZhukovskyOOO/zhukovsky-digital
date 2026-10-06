import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import ScreensCarousel from "../components/ScreensCarousel.jsx";
import adonisCover from "../assets/figma/case-energo-cover.png";
import olympCover from "../assets/figma/case-olymp-cover.png";
import "./CasePage.css";
import "./ProjectCasePage.css";

const PROJECTS = {
  adonis: {
    name: "Адонис",
    eyebrow: "Кейс · Аптечная сеть",
    title: "Адонис — от поиска лекарства до бронирования в аптеке",
    lead: "Разработали сайт и мобильное приложение для аптечной сети: каталог товаров, поиск, выбор аптеки, бронирование и личный кабинет. Связали цифровые сервисы с аптечной системой через API.",
    tags: ["Сайт", "Мобильное приложение", "Личный кабинет", "Интеграции"],
    cover: adonisCover,
    coverAlt: "Сайт и мобильное приложение аптечной сети «Адонис»",
    facts: [
      ["Клиент", "Аптечная сеть «Адонис»"],
      ["Отрасль", "Фармацевтика"],
      ["Платформы", "Веб, iOS и Android"],
      ["Наша роль", "Сайт, приложение и интеграция с аптечной системой"],
    ],
    highlightsTitle: "Что входит в решение",
    highlights: [
      ["Каталог", "Поиск товаров и информация о наличии"],
      ["Бронирование", "Выбор аптеки и получение заказа на месте"],
      ["Личный кабинет", "Заказы и карта лояльности"],
      ["API", "Связь с аптечной системой"],
    ],
    contextTitle: "Покупка начинается онлайн, а завершается в аптеке",
    context: [
      "«Адонис» — аптечная сеть с ассортиментом лекарств, витаминов, косметики и товаров для здоровья. На сайте покупатель может найти товар, выбрать аптеку и оформить бронирование. Оплата происходит при получении заказа.",
      "Для такого сервиса важно связать привычный интернет-каталог с работой конкретных аптек. Пользователю нужны сведения о товаре и его наличии, понятный выбор места получения и доступ к своим заказам.",
    ],
    considerations: [
      "Поиск лекарства должен вести к конкретному товару и аптеке, где его можно получить.",
      "Сайт и приложение должны поддерживать каталог, бронирование и личный кабинет.",
      "Данные о товарах, остатках, аптеках и программе лояльности связаны с внутренней системой сети.",
    ],
    taskTitle: "Перенести основные сценарии покупателя в сайт и приложение",
    task: "Создать цифровые сервисы, в которых покупатель может найти нужный товар, проверить наличие, выбрать аптеку и оформить бронь. Объединить эти действия с личным кабинетом и программой лояльности, подключив данные аптечной системы.",
    stepsTitle: "Решение",
    steps: [
      ["01", "Сайт с каталогом и бронированием", "Собрали основные разделы аптечного сайта: каталог, поиск, карточки товаров, корзину, информацию об аптеках и личный кабинет. В основе пользовательского пути — выбор товара и бронирование для получения в аптеке."],
      ["02", "Приложение для iOS и Android", "Разработали мобильное приложение на Flutter. В приложении предусмотрены каталог, поиск, выбор аптеки, бронирование, заказы и карта лояльности — основные действия покупателя доступны с телефона."],
      ["03", "Личный кабинет покупателя", "Объединили авторизацию по номеру телефона, работу с заказами и карту лояльности. Личный кабинет дополняет каталог и сохраняет связь покупателя с аптечной сетью после оформления брони."],
      ["04", "Интеграция с аптечной системой", "Подключили API «АйТи какая! Аптека». Интеграция охватывает каталог, остатки, аптеки, бронирование и данные программы лояльности."],
    ],
    outcomeTitle: "Сайт и приложение вокруг одного сценария покупки",
    outcome: "Разработали веб- и мобильную часть сервиса для аптечной сети. Каталог, бронирование, личный кабинет и интеграция с аптечной системой объединяют путь от поиска товара до получения заказа в выбранной аптеке.",
    technologies: ["Flutter", "iOS", "Android", "API «АйТи какая! Аптека»"],
    metaTitle: "Сайт и приложение для аптечной сети «Адонис» — Zhukovsky Digital",
    metaDescription: "Кейс разработки сайта и приложения для аптечной сети «Адонис»: каталог, бронирование, личный кабинет и интеграция с аптечной системой.",
    other: { to: "/case/olymp-clinic", label: "Олимп Клиник" },
  },
  olympClinic: {
    name: "Олимп Клиник",
    eyebrow: "Кейс · Сеть клиник",
    title: "Олимп Клиник — пересборка сайта медицинской сети",
    lead: "Подключились к обновлению сайта, доработали предоставленные макеты и реализовали клиентскую и серверную части, интеграцию с 1С-Битрикс и личный кабинет. Довели проект до запуска примерно за три месяца.",
    tags: ["Сайт", "Личный кабинет", "1С-Битрикс", "Перенос сайта"],
    cover: olympCover,
    coverAlt: "Сайт «Олимп Клиник»",
    facts: [
      ["Клиент", "Олимп Клиник"],
      ["Отрасль", "Многопрофильная медицина"],
      ["Срок", "Около трёх месяцев до запуска"],
      ["Наша роль", "Доработка макетов, разработка, интеграции и запуск"],
    ],
    highlightsTitle: "Что получилось",
    highlights: [
      ["≈ 3 месяца", "От подключения к проекту до запуска"],
      ["Новый сайт", "Клиентская и серверная части"],
      ["1С-Битрикс", "Интеграция с системой управления"],
      ["Личный кабинет", "Отдельная часть реализованного проекта"],
    ],
    contextTitle: "Обновить большой медицинский сайт и довести его до запуска",
    context: [
      "«Олимп Клиник» — сеть многопрофильных медицинских центров в Москве. Она объединяет диагностику, хирургическое лечение, эстетическую медицину, стоматологию и другие направления помощи взрослым и детям.",
      "К моменту нашего подключения существующий сайт требовал полной пересборки. Клиент предоставил макеты, которые нужно было доработать и превратить в работающий продукт. Проект включал большое количество информации о врачах и услугах, интеграции и личный кабинет.",
    ],
    considerations: [
      "Доработать готовые макеты и реализовать предусмотренные интерфейсы.",
      "Связать клиентскую часть сайта, серверную логику и 1С-Битрикс.",
      "Перенести сайт, учитывая накопленный контент и задачу сохранения поискового трафика.",
    ],
    taskTitle: "Пройти путь от предоставленных макетов до работающего сайта",
    task: "Взять на себя техническую реализацию обновления: доработать интерфейсы, разработать сайт и личный кабинет, выполнить интеграцию с 1С-Битрикс и довести проект до запуска. При переходе со старого сайта учесть требования к переносу и SEO.",
    stepsTitle: "Решение",
    steps: [
      ["01", "Доработка предоставленных макетов", "Продолжили работу на основе дизайна клиента. Доработали макеты для последующей реализации сайта и его интерфейсов."],
      ["02", "Клиентская и серверная разработка", "Пересобрали сайт и реализовали его клиентскую и серверную части. Работа охватывала медицинский сайт с большим объёмом информации о врачах, услугах и направлениях клиники."],
      ["03", "1С-Битрикс и личный кабинет", "Реализовали интеграцию с 1С-Битрикс и личный кабинет. Взяли на себя как публичную часть сайта, так и связанные с ней технические задачи."],
      ["04", "Перенос и запуск", "Отдельное внимание уделили переходу со старого сайта и задаче сохранения накопленного поискового трафика. Самостоятельно довели проект до запуска — примерно за три месяца с момента подключения."],
    ],
    outcomeTitle: "Полная пересборка — до работающего продукта",
    outcome: "Запустили обновлённый сайт «Олимп Клиник» с личным кабинетом и интеграцией с 1С-Битрикс. В рамках одного проекта выполнили доработку макетов, клиентскую и серверную разработку, перенос и подготовку к запуску.",
    technologies: ["React", "1С-Битрикс"],
    metaTitle: "Разработка сайта «Олимп Клиник» — кейс Zhukovsky Digital",
    metaDescription: "Пересборка сайта «Олимп Клиник»: доработка макетов, клиентская и серверная разработка, 1С-Битрикс, личный кабинет и запуск примерно за три месяца.",
    other: { to: "/case/adonis", label: "Адонис" },
  },
};

export default function ProjectCasePage({ project }) {
  const data = PROJECTS[project];

  return (
    <>
      <title>{data.metaTitle}</title>
      <meta name="description" content={data.metaDescription} />
      <main className="project-case">
        <section className="container case-hero">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Кейсы", to: "/cases" },
              { label: data.name },
            ]}
          />
          <div className="case-hero__body">
            <span className="case-overline case-overline--brand">{data.eyebrow}</span>
            <h1 className="case-hero__title">{data.title}</h1>
            <p className="case-hero__lead">{data.lead}</p>
            <ul className="case-chips" aria-label="Направления проекта">
              {data.tags.map((tag) => <li className="case-chip" key={tag}>{tag}</li>)}
            </ul>
          </div>
        </section>

        <img className="case-cover" src={data.cover} alt={data.coverAlt} />

        <section className="container case-facts" aria-label="Факты о проекте">
          {data.facts.map(([label, value]) => (
            <div className="case-fact" key={label}>
              <span className="case-overline">{label}</span>
              <span className="case-fact__value">{value}</span>
            </div>
          ))}
        </section>

        <ScreensCarousel project={project} />

        <section className="case-section">
          <div className="container">
            <div className="project-case__highlights">
              <div className="case-head">
                <span className="case-overline case-overline--brand">{data.highlightsTitle}</span>
              </div>
              <div className="project-case__highlight-grid">
                {data.highlights.map(([title, copy]) => (
                  <div className="project-case__highlight" key={title}>
                    <span className="project-case__highlight-title">{title}</span>
                    <span className="project-case__highlight-copy">{copy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="container project-case__context">
            <div>
              <span className="case-overline">Контекст</span>
              <h2 className="case-h2">{data.contextTitle}</h2>
            </div>
            <div>
              {data.context.map((paragraph) => <p className="case-context__lead project-case__paragraph" key={paragraph}>{paragraph}</p>)}
              <h3 className="project-case__subhead">Что нужно было учесть</h3>
              <ol className="case-problems">
                {data.considerations.map((item, index) => (
                  <li className="case-problem" key={item}>
                    <span className="case-problem__n">{String(index + 1).padStart(2, "0")}</span>
                    <span className="case-problem__text">{item}</span>
                  </li>
                ))}
              </ol>
              <div className="case-task">
                <span className="case-overline case-overline--brand">Задача</span>
                <h3 className="project-case__task-title">{data.taskTitle}</h3>
                <p>{data.task}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="container">
            <div className="case-head">
              <span className="case-overline">Решение</span>
              <h2 className="case-h2">Что сделали</h2>
            </div>
            <div className="case-steps">
              {data.steps.map(([n, title, copy]) => (
                <article className="case-step" key={n}>
                  <span className="case-step__n">{n}</span>
                  <h3 className="case-step__title">{title}</h3>
                  <p className="case-step__desc">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="container">
            <div className="project-case__outcome">
              <div>
                <span className="case-overline case-overline--brand">Результат работы</span>
                <h2 className="case-h2">{data.outcomeTitle}</h2>
              </div>
              <p>{data.outcome}</p>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="container project-case__technology">
            <div>
              <span className="case-overline">Технологии и интеграции</span>
              <h2 className="case-h2">Стек проекта</h2>
            </div>
            <ul className="case-chips" aria-label="Технологии проекта">
              {data.technologies.map((technology) => <li className="case-chip" key={technology}>{technology}</li>)}
            </ul>
          </div>
        </section>

        <section className="case-section">
          <div className="container">
            <div className="case-head case-head--row">
              <h2 className="case-h2">Другие кейсы</h2>
              <Link className="case-head__action" to="/cases">Все кейсы</Link>
            </div>
            <Link className="project-case__other" to={data.other.to}>
              Смотреть кейс «{data.other.label}» <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
