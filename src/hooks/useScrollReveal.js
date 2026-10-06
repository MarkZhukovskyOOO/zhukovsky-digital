import { useEffect } from "react";

/**
 * Плавное появление секций при прокрутке.
 * Навешивает класс `reveal` на прямые <section> внутри <main> и на футер,
 * затем через IntersectionObserver добавляет `is-visible`.
 * Полностью отключается при prefers-reduced-motion.
 */
export default function useScrollReveal(dep) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const els = Array.from(
      document.querySelectorAll("main > section, .footer")
      // hero — первый экран: показываем сразу, без выезда/проявления,
      // иначе градиент «дёргается» при инициализации страницы
    ).filter((el) => !el.classList.contains("hero"));
    if (!els.length) return;

    document.documentElement.classList.add("reveal-ready");
    els.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    // Подстраховка: элементы, уже видимые на первом экране, показать сразу
    const raf = requestAnimationFrame(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9) el.classList.add("is-visible");
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [dep]);
}
