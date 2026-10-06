import "./Hero.css";

export default function Hero() {
  const scrollToCases = (e) => {
    e.preventDefault();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <h1 className="hero__title">Мы решаем digital-задачи медицинских сетей</h1>
        <p className="hero__sub">
          Сайты, мобильные приложения и личные кабинеты для клиник, стоматологий,
          лабораторий и аптечных сетей. От онлайн-записи до интеграций с МИС и
          внутренними системами.
        </p>
        <a
          href="#products"
          className="btn btn-primary hero__cta"
          onClick={scrollToCases}
        >
          Посмотреть проекты
        </a>
      </div>
    </section>
  );
}
