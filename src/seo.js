import { REDIRECTS, ROBOTS, ROUTES, SITE, normalizePath, publicPath } from "../seo-routes.js";

export { REDIRECTS, ROUTES, SITE, normalizePath, publicPath };

export const FAQ = [
  {
    q: "Сколько стоит разработка цифрового продукта?",
    a: "Сайты и интернет-магазины — от 700 000 ₽, мобильные приложения для iOS и Android — от 900 000 ₽. Комплекс из сайта и приложения — от 1,7 млн ₽, платформа для сети с несколькими ролями и сложными интеграциями — от 3 млн ₽. Стоимость рассчитываем по согласованному набору функций, дизайну и интеграциям. Внешние сервисы, публикация приложений, продвижение и поддержка оцениваются отдельно.",
  },
  {
    q: "Сколько времени занимает запуск?",
    a: "Разработка сайта — от 30 рабочих дней, приложения — от 30 рабочих дней, сайта и приложения вместе — от полутора месяцев. Для сложной платформы ориентир — от трёх месяцев. Ожидание исходных данных и готовности внешних систем не входит в эти сроки; публикация приложения учитывается отдельно. Точный график согласуем после определения объёма работ.",
  },
  {
    q: "Вы работаете с уже существующими продуктами?",
    a: "Да. Подключаемся к существующим сайтам, приложениям и backend-системам: проводим аудит, разбираемся в архитектуре и коде, после чего предлагаем план развития. Переписывать продукт с нуля рекомендуем только там, где это действительно оправдано.",
  },
  {
    q: "Можно ли интегрироваться с нашей МИС или CRM?",
    a: "Да. Работаем с МИС, CRM, 1С, телефонией, платёжными сервисами и другими внутренними системами. Сначала изучаем доступные API и ограничения, после чего предлагаем архитектуру интеграции.",
  },
  {
    q: "Кому принадлежит код и дизайн?",
    a: "Порядок передачи прав, исходников, макетов и доступов фиксируем в договоре. При передаче проекта готовим описание подключённых сервисов и инструкции по работе с ними. Владение аккаунтами магазинов приложений и порядок предоставления доступа согласуем отдельно при подготовке публикации.",
  },
  {
    q: "Что происходит после запуска?",
    a: "Можем продолжить поддержку и развитие: дорабатывать функции, интеграции и пользовательские сценарии. ASO приложения и GEO сайта согласуем как отдельные направления работы. Состав, стоимость и сроки этих услуг определяем отдельно от первоначальной разработки.",
  },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Zhukovsky Digital",
  url: `${SITE}/`,
  email: "sales@zhukovsky-digital.com",
  telephone: "+7 495 120-14-08",
  sameAs: ["https://t.me/Mark_Zhukovskiy"],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: "Zhukovsky Digital",
  inLanguage: "ru",
  publisher: { "@id": `${SITE}/#organization` },
};

export function pageJsonLd(path, page) {
  const type =
    path === "/company"
      ? "AboutPage"
      : path === "/cases"
        ? "CollectionPage"
        : path.startsWith("/services")
          ? "Service"
          : path.startsWith("/case/")
            ? "CreativeWork"
            : "WebPage";
  const node = {
    "@type": type,
    "@id": `${pageUrl(path)}#webpage`,
    url: pageUrl(path),
    name: page.title,
    description: page.description,
    inLanguage: "ru",
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
  };
  if (type === "Service") node.provider = { "@id": `${SITE}/#organization` };
  return node;
}

export function faqPageJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      },
    })),
  };
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const OG = {
  adonis: {
    image: `${SITE}/og/adonis.jpg`,
    width: "1440",
    height: "810",
    alt: "Сайт и приложение аптечной сети «Адонис»",
  },
  olymp: {
    image: `${SITE}/og/olymp.jpg`,
    width: "1440",
    height: "810",
    alt: "Сайт сети клиник Olymp Clinic",
  },
  narodnaya: {
    image: `${SITE}/og/narodnaya.jpg`,
    width: "1400",
    height: "788",
    alt: "Сайт аптечной сети «Аптека Народная»",
  },
};

export const PAGES = {
  "/": {
    title: "Zhukovsky Digital — digital-задачи медицинских сетей",
    description:
      "Сайты, мобильные приложения и личные кабинеты для клиник, стоматологий, лабораторий и аптечных сетей. От онлайн-записи до интеграций с МИС и внутренними системами.",
    faq: true,
    image: OG.adonis,
  },
  "/services": {
    title: "Мобильные приложения для медицинского бизнеса — Zhukovsky Digital",
    description:
      "Проектируем и разрабатываем приложения для клиник, стоматологий, лабораторий и аптечных сетей — от записи и личного кабинета до программы лояльности, заказов и интеграций с внутренними системами. Разрабатываем на Flutter, а для задач, где это оправдано, — нативно для iOS и Android.",
    image: OG.adonis,
  },
  "/services/web-development": {
    title: "Разработка сайтов и интернет-магазинов на Битрикс | Zhukovsky Digital",
    description:
      "Создаём сайты и интернет-магазины для клиник, аптек и e-commerce. Дизайн, разработка, интеграции и тестирование. От 700 000 ₽ и 30 рабочих дней.",
    image: OG.adonis,
  },
  "/services/personal-accounts": {
    title: "Разработка личных кабинетов и клиентских сервисов | Zhukovsky Digital",
    description:
      "Разрабатываем личные кабинеты для клиентов, пациентов и партнёров. Сценарии самообслуживания, роли, серверная часть и интеграции по требованиям бизнеса.",
    image: OG.adonis,
  },
  "/services/product-audit": {
    title: "Технический аудит сайтов и приложений | Zhukovsky Digital",
    description:
      "Проверяем сайты и приложения в согласованном объёме: код, скорость, сценарии и техническое SEO. От 80 000 ₽. Результат — отчёт и список правок с приоритетами.",
    image: OG.adonis,
  },
  "/services/support": {
    title: "Поддержка и доработка сайтов и приложений | Zhukovsky Digital",
    description:
      "Подключаемся к работающим сайтам и приложениям: исправляем ошибки, развиваем функции и интеграции. Состав сопровождения и стоимость согласуем после знакомства с проектом.",
    image: OG.adonis,
  },
  "/services/ux-ui": {
    title: "UX/UI-дизайн сайтов, приложений и сервисов | Zhukovsky Digital",
    description:
      "Проектируем интерфейсы сайтов, приложений и личных кабинетов: сценарии, прототипы и макеты в Figma. Состав исследований согласуем под задачу продукта.",
    image: OG.adonis,
  },
  "/company": {
    title: "Zhukovsky Digital — студия заказной разработки",
    description:
      "Создаём сайты, интернет-магазины и мобильные приложения для бизнеса. Работаем с 1С-Битрикс, React и Flutter, разрабатываем серверную часть и интеграции с системами заказчика.",
    image: OG.adonis,
  },
  "/industries/pharmacy": {
    title: "Сайты и приложения для аптечных сетей — Zhukovsky Digital",
    description:
      "Разрабатываем сайты и мобильные приложения для аптечных сетей: каталог, бронирование, остатки и интеграция с учётной системой. Работающие кейсы «Адонис» и «Аптека Народная», запуск и развитие онлайн-канала.",
    image: OG.adonis,
  },
  "/cases": {
    title: "Продукты, которые создают ценность для бизнеса — Zhukovsky Digital",
    description:
      "От мобильных приложений до сложных веб-сервисов — проектируем продукты под конкретную бизнес-модель, процессы и цели компании.",
    image: OG.adonis,
  },
  "/case/adonis": {
    title: "Адонис — запуск онлайн-направления аптечной сети — Zhukovsky Digital",
    description:
      "С нуля разработали сайт и приложение для iOS и Android, связали их с аптечной CRM и выпустили в работу. Покупатели получили возможность находить товары и оформлять бронирования, а сотрудники аптек — обрабатывать онлайн-заказы в своей системе.",
    kind: "article",
    image: OG.adonis,
  },
  "/case/narodnaya": {
    title: "Аптека Народная — сайт аптечной сети — Zhukovsky Digital",
    description:
      "Сайт аптеканародная.рф: каталог и поиск, карточка товара с инструкцией, выбор аптеки и бронирование с самовывозом.",
    kind: "article",
    image: OG.narodnaya,
  },
  "/case/olymp-clinic": {
    title: "Olymp Clinic: новая версия сайта на 1С-Битрикс — Zhukovsky Digital",
    description:
      "Партнёрская команда выполнила весь цикл новой версии сайта Olymp Clinic: от инициации и дизайна до разработки на 1С-Битрикс и выпуска в продакшен за 1,5 месяца.",
    kind: "article",
    image: OG.olymp,
  },
  "/policy": {
    title: "Политика конфиденциальности — Zhukovsky Digital",
    description: "Черновик структуры: объём и порядок разделов.",
    robots: ROBOTS["/policy"],
    image: OG.adonis,
  },
};

export const NOT_FOUND = {
  title: "Такой страницы нет — Zhukovsky Digital",
  description:
    "Возможно, страница переехала или в ссылке опечатка. Начните с главной или посмотрите, что мы уже сделали.",
};

export function pageUrl(path) {
  return `${SITE}${publicPath(path)}`;
}
