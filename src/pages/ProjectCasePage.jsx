import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Footer from "../components/Footer.jsx";
import { AdonisBrowsers, AdonisMockup, OlympBrowsers, OlympPhones } from "../components/ProjectMockup.jsx";
import "./CasePage.css";
import "./ProjectCasePage.css";

const PROJECTS = {
  adonis: {
    name: "Адонис",
    eyebrow: "Кейс · Аптечная сеть",
    title: "Адонис — запуск онлайн-направления аптечной сети",
    lead: "С нуля разработали сайт и приложение для iOS и Android, связали их с аптечной CRM и выпустили в работу. Покупатели получили возможность находить товары и оформлять бронирования, а сотрудники аптек — обрабатывать онлайн-заказы в своей системе.",
    tags: ["Сайт", "Мобильное приложение", "Личный кабинет", "Интеграции"],
    media: <AdonisMockup />,
    screens: <AdonisBrowsers />,
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
    contextLayout: "split",
    contextTitle: "Аптечный бизнес выходит в онлайн",
    contextParagraphs: [
      "«Адонис» пришёл к нам с работающим аптечным бизнесом и планами развивать онлайн-продажи. Собственного сайта и мобильного приложения для этого направления ещё не было.",
      "Нужно было создать сервисы для покупателей и встроить их в работу сети. За выбором товара на экране стоят наличие в конкретной аптеке, обработка брони и подтверждение заказа сотрудником. Предстояло связать эти действия в последовательный процесс.",
    ],
    considerations: [
      ["Путь до бронирования", "Покупателю нужно найти товар, проверить наличие и выбрать аптеку, в которой он сможет получить заказ."],
      ["Обмен с аптечной системой", "Сайт и приложение должны получать товары, цены и остатки, передавать заказы и показывать покупателю изменения их статусов."],
      ["Изменения при сборке", "Если аптека подтверждает часть заказа, покупатель должен увидеть новый состав и сумму, затем согласиться или отказаться."],
    ],
    taskTitle: "Запустить онлайн-бронирование в связке с аптечной CRM",
    task: "Разработать сайт, приложение для iOS и Android и серверную часть. Обеспечить обмен данными с аптечной системой, чтобы покупатель и сотрудники могли пройти весь путь от оформления брони до её подтверждения.",
    stepsTitle: "Решение",
    steps: [
      ["01", "От поиска товара до выбора аптеки", [
        "Собрали основные действия покупателя в сайте и приложении: поиск, каталог, карточки товаров, выбор аптеки, бронирование и личный кабинет с заказами.",
        "Отдельно предусмотрели обработку опечаток в поиске. Названия препаратов не всегда просто запомнить и набрать, поэтому поиск должен помогать найти нужную позицию и при неточном вводе. После выбора товара покупатель может проверить наличие и перейти к бронированию в подходящей аптеке.",
      ]],
      ["02", "Связали онлайн-заказы с работой аптек", [
        "Самой сложной частью проекта стала интеграция с аптечной CRM. Сайту и приложению нужны данные о товарах, ценах и остатках. В обратную сторону должны уходить бронирования, а после обработки — возвращаться статусы заказов.",
        "Мы реализовали этот обмен и доработали необходимую функциональность внутри аптечной системы. Так действия покупателя на сайте или в приложении связали с обработкой заказа сотрудниками сети.",
      ]],
      ["03", "Дали покупателю возможность согласовать изменения", [
        "В работе аптеки возможна ситуация, когда заказ удаётся подтвердить только частично. Мы предусмотрели отдельный сценарий для такого случая.",
        "Покупатель видит первоначальный и обновлённый состав заказа, а также новую сумму. Он может принять изменения или отказаться. Решение передаётся обратно в аптечную систему — сотрудники получают ответ покупателя и могут продолжить обработку заказа с учётом его выбора.",
      ]],
      ["04", "Довели проект от первых требований до релиза", [
        "Весь цикл выполнили сотрудники Zhukovsky Digital: проектирование, дизайн, разработку сайта, приложения для iOS и Android, серверной части и интеграций.",
        "Одна команда работала с интерфейсами покупателя и логикой взаимодействия с аптечной системой. Мы довели сайт и приложение до выпуска и продолжаем работу над проектом после запуска.",
      ]],
    ],
    outcomeTitle: "Собственные цифровые каналы для аптечной сети",
    outcome: [
      "Сайт и приложение запущены. У «Адониса» появились собственные сервисы, через которые покупатели могут находить товары и оформлять бронирования. Онлайн-заказы связаны с внутренней системой сети, а изменения состава заказа при частичном подтверждении передаются покупателю для согласования.",
      "После релиза развиваем функциональность проекта. Занимаемся ASO — видимостью приложения в магазинах приложений — и GEO: работой над присутствием сайта в ответах ИИ. Запуск стал основой для дальнейшего развития онлайн-направления «Адониса».",
    ],
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

        {data.contextLayout === "split" ? (
          <section className="case-section case-section--adonis-context">
            <div className="container project-case__context project-case__context--split">
              <div className="adonis-context__intro">
                <span className="case-overline">Контекст</span>
                <h2 className="case-h2">{data.contextTitle}</h2>
                {data.contextParagraphs.map((paragraph) => (
                  <p className="adonis-context__lead" key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="adonis-context__needs">
                <h3 className="adonis-context__needs-title">Что нужно было учесть</h3>
                <ol className="adonis-context__list">
                  {data.considerations.map(([title, copy], index) => (
                    <li className="adonis-context__item" key={title}>
                      <span className="adonis-context__num">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="adonis-context__name">{title}</p>
                        <p className="adonis-context__note">{copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="case-task adonis-context__task">
                <span className="case-overline case-overline--brand">Задача</span>
                <h3 className="adonis-context__task-title">{data.taskTitle}</h3>
                <p className="adonis-context__task-copy">{data.task}</p>
              </div>
            </div>
          </section>
        ) : (
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
        )}

        <section className="case-section">
          <div className="container">
            <div className="case-head">
              <span className="case-overline">Решение</span>
              <h2 className="case-h2">Что сделали</h2>
            </div>
            <div className="case-steps">
              {data.steps.map(([n, title, copy]) => {
                const paragraphs = Array.isArray(copy) ? copy : [copy];
                return (
                  <article className="case-step" key={n}>
                    <span className="case-step__n">{n}</span>
                    <h3 className="case-step__title">{title}</h3>
                    <div className="case-step__copy">
                      {paragraphs.map((paragraph) => (
                        <p className="case-step__desc" key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                );
              })}
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
              {Array.isArray(data.outcome) ? (
                <div className="project-case__outcome-copy">
                  {data.outcome.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              ) : (
                <p>{data.outcome}</p>
              )}
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
