import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import { AdonisMockup, OlympBrowsers, OlympPhones } from "../components/ProjectMockup.jsx";
import "./CasePage.css";
import "./ProjectCasePage.css";

const PROJECTS = {
  adonis: {
    name: "Адонис",
    eyebrow: "Кейс · Аптечная сеть",
    title: "Адонис — от поиска лекарства до бронирования в аптеке",
    lead: "С нуля создали сайт и приложение для iOS и Android, связали их с аптечной CRM и выпустили в работу. После релиза продолжаем развивать продукт, ASO и GEO.",
    tags: ["Сайт", "Мобильное приложение", "Личный кабинет", "Интеграции"],
    media: <AdonisMockup />,
    coverAlt: "Сайт и мобильное приложение аптечной сети «Адонис»",
    facts: [
      ["Клиент", "Аптечная сеть «Адонис»"],
      ["Отрасль", "Фармацевтика"],
      ["Платформы", "Веб, iOS и Android"],
      ["Наша роль", "Весь проект: дизайн, сайт, приложение, сервер и интеграции"],
    ],
    highlightsTitle: "Что входит в решение",
    highlights: [
      ["Каталог", "Поиск с опечатками и карточки товаров"],
      ["Бронирование", "Выбор аптеки и оформление заказа"],
      ["Личный кабинет", "Заказы покупателя"],
      ["Интеграция", "Обмен с аптечной CRM"],
    ],
    contextTitle: "Цифровизация и выход в онлайн-торговлю",
    context: [
      "Аптечная сеть «Адонис» пришла к нам с задачей цифровизации бизнеса и выхода в онлайн-торговлю. Собственного сайта и мобильного приложения для этого направления ещё не было. Предстояло с нуля создать сервисы для покупателей и связать их с ежедневной работой аптек.",
      "Мы взяли на себя весь проект: от проектирования и дизайна до разработки сайта, приложения для iOS и Android, серверной части и интеграций. Все работы выполнили сотрудники Zhukovsky Digital. Это позволило нашей команде последовательно пройти путь от первых требований до готового продукта и продолжить его развитие после запуска.",
    ],
    considerations: [
      "Покупателю нужен путь от поиска товара до бронирования в выбранной аптеке.",
      "Сайт и приложение должны получать из аптечной CRM товары, цены и наличие, а сотрудникам — передавать заказы и статусы.",
      "Если аптека подтверждает только часть заказа, покупатель должен увидеть изменения и принять решение.",
    ],
    taskTitle: "Создать сервисы с нуля и связать их с работой аптек",
    task: "Предстояло с нуля создать сервисы для покупателей и связать их с ежедневной работой аптек: от проектирования и дизайна до сайта, приложения для iOS и Android, серверной части и интеграций.",
    stepsTitle: "Решение",
    steps: [
      ["01", "Путь покупателя", "Для покупателя собрали путь от поиска товара до бронирования в выбранной аптеке. Реализовали каталог, поиск, карточки товаров, выбор аптеки, оформление заказа и личный кабинет. В поиске предусмотрели обработку опечаток, чтобы неточный ввод названия не мешал найти нужную позицию."],
      ["02", "Интеграция с аптечной CRM", "Сайту и приложению нужны данные о товарах, ценах и наличии, а сотрудникам аптек — заказы и возможность передавать покупателю изменения их статуса. Мы реализовали этот обмен и разработали необходимую функциональность в самой аптечной системе."],
      ["03", "Частичное подтверждение заказа", "Отдельно проработали ситуацию, когда аптека может подтвердить только часть заказа. Покупатель видит первоначальный и обновлённый состав, а также новую сумму. Он может согласиться с изменениями или отказаться; его решение передаётся обратно в аптечную систему."],
      ["04", "Выпуск и продолжение работы", "Сайт и приложение полностью готовы и выпущены. После релиза развиваем функциональность проекта, занимаемся ASO приложения в магазинах приложений и GEO сайта — работой над его видимостью в ответах ИИ."],
    ],
    outcomeTitle: "Собственные цифровые каналы",
    outcome: "Сайт и приложение полностью готовы и выпущены. У «Адониса» появились собственные цифровые каналы: покупатели могут находить товары и оформлять бронирования, а сотрудники — обрабатывать поступившие заказы в связке с аптечной системой. После релиза работа продолжается: развиваем функциональность, ASO приложения и GEO сайта.",
    technologies: ["iOS", "Android", "Аптечная CRM"],
    other: { to: "/case/olymp-clinic", label: "Олимп Клиник" },
  },
  olympClinic: {
    name: "Olymp Clinic",
    eyebrow: "Кейс · Сеть клиник",
    title: "Olymp Clinic — новая версия сайта на 1С-Битрикс",
    lead: "Как партнёрская команда заново разработали дизайн, согласовали его с заказчиком и реализовали сайт на 1С-Битрикс.",
    tags: ["Сайт", "Дизайн", "1С-Битрикс", "Партнёрский проект"],
    media: <OlympPhones />,
    screens: <OlympBrowsers />,
    coverAlt: "Сайт Olymp Clinic",
    facts: [
      ["Клиент", "Olymp Clinic"],
      ["Формат", "Партнёрская команда"],
      ["Платформа", "1С-Битрикс"],
      ["Наша роль", "Дизайн, согласование макетов, вёрстка и подключение CMS"],
    ],
    highlightsTitle: "Что получилось",
    highlights: [
      ["Дизайн", "Новые макеты"],
      ["Согласование", "Утверждение с заказчиком"],
      ["Вёрстка", "Реализация после утверждения"],
      ["1С-Битрикс", "Система управления контентом"],
    ],
    contextTitle: "Новая версия вместо устаревшего сайта",
    context: [
      "У Olymp Clinic уже был сайт, но его визуальное решение устарело. Требовалось создать новую версию: заново разработать дизайн, согласовать его с заказчиком и реализовать сайт на 1С-Битрикс.",
      "Нас привлекли к проекту как партнёрскую команду. Zhukovsky Digital взяла на себя полный цикл создания новой версии сайта — от макетов до вёрстки и подключения системы управления контентом.",
    ],
    considerations: [
      "Заново разработать дизайн.",
      "Согласовать макеты с заказчиком.",
      "Выполнить вёрстку и подключить 1С-Битрикс.",
    ],
    taskTitle: "Полный цикл новой версии сайта",
    task: "Zhukovsky Digital взяла на себя полный цикл создания новой версии сайта — от макетов до вёрстки и подключения системы управления контентом.",
    stepsTitle: "Решение",
    steps: [
      ["01", "Дизайн", "Работу начали с дизайна и подготовили новые макеты."],
      ["02", "Согласование", "Согласовали макеты с заказчиком."],
      ["03", "Вёрстка", "После утверждения перешли к реализации и выполнили вёрстку."],
      ["04", "1С-Битрикс", "Подключили 1С-Битрикс. Дизайн, согласование, вёрстку и подключение системы выполняла наша команда."],
    ],
    outcomeTitle: "Заново разработанный сайт",
    outcome: "Результат — заново разработанный сайт Olymp Clinic с обновлённым дизайном и управлением через 1С-Битрикс. В рамках партнёрского проекта мы отвечали за дизайн, согласование макетов и техническую реализацию.",
    technologies: ["1С-Битрикс"],
    other: { to: "/case/adonis", label: "Адонис" },
  },
};

export default function ProjectCasePage({ project }) {
  const data = PROJECTS[project];

  return (
    <>
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

        <div className="case-stage" aria-label={data.coverAlt}>
          {data.media}
        </div>

        <section className="container case-facts" aria-label="Факты о проекте">
          {data.facts.map(([label, value]) => (
            <div className="case-fact" key={label}>
              <span className="case-overline">{label}</span>
              <span className="case-fact__value">{value}</span>
            </div>
          ))}
        </section>

        {data.screens && (
          <div className="case-stage case-stage--follow">{data.screens}</div>
        )}

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
