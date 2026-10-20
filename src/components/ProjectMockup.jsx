import { useEffect, useRef } from "react";
import adonisHome from "../assets/figma/adonis-glavnaya.webp";
import adonisCatalog from "../assets/figma/adonis-katalog.webp";
import adonisCabinet from "../assets/figma/adonis-kabinet.webp";
import adonisMobileHome from "../assets/figma/adonis-m-glavnaya.webp";
import adonisMobileCart from "../assets/figma/adonis-m-korzina.webp";
import adonisMobileOrder from "../assets/figma/adonis-m-zakaz.webp";
import olympKlinika from "../assets/figma/olymp-klinika.webp";
import olympNapravleniya from "../assets/figma/olymp-napravleniya.webp";
import olympVrachi from "../assets/figma/olymp-vrachi.webp";
import olympMobileSet from "../assets/figma/olymp-m-set.webp";
import olympMobileKlinika from "../assets/figma/olymp-m-klinika.webp";
import olympMobileVrachi from "../assets/figma/olymp-m-vrachi.webp";
import "./ProjectMockup.css";

const ADONIS_PHONES = [
  { src: adonisMobileHome, delay: 600, alt: "Главная приложения «Адонис» на телефоне" },
  { src: adonisMobileCart, delay: 1300, alt: "Корзина «Адонис» на телефоне" },
  { src: adonisMobileOrder, delay: 2000, alt: "Заказ «Адонис» на телефоне" },
];

const ADONIS_FRAMES = [
  { src: adonisHome, scroll: 640, alt: "Главная страница сайта «Адонис»" },
  { src: adonisCatalog, scroll: 640, alt: "Каталог товаров на сайте «Адонис»" },
  { src: adonisCabinet, scroll: 266, alt: "Личный кабинет на сайте «Адонис»" },
];

function useInViewPlayback(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = (inView) => {
      if (!inView || reduce.matches) {
        video.pause();
        if (reduce.matches) video.currentTime = 0;
        return;
      }
      const play = video.play();
      if (play) play.catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => apply(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(video);

    const onChange = () => {
      const rect = video.getBoundingClientRect();
      apply(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    reduce.addEventListener("change", onChange);

    return () => {
      io.disconnect();
      reduce.removeEventListener("change", onChange);
    };
  }, [videoRef]);
}

export function MockupVideo({ src, poster, label }) {
  const videoRef = useRef(null);
  useInViewPlayback(videoRef);

  return (
    <div className="mockup">
      <video
        ref={videoRef}
        className="mockup__video"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
      />
    </div>
  );
}

function MockupWindow({ src, alt, place, duration, delay }) {
  const frameRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      if (!img.naturalWidth || !frame.clientWidth) return;

      const ratio = img.naturalWidth / img.naturalHeight;
      const fittedHeight = frame.clientWidth / ratio;
      if (fittedHeight < frame.clientHeight * 1.45) {
        const targetHeight = frame.clientHeight * 1.85;
        const widthPct = ((targetHeight * ratio) / frame.clientWidth) * 100;
        img.style.width = `${widthPct}%`;
        img.style.marginLeft = "0";
      }

      const extra = Math.max(0, img.offsetHeight - frame.clientHeight);
      img.style.setProperty("--shift", `${extra}px`);
      img.classList.toggle("is-ready", extra > 0 && !reduce.matches);
    };

    img.addEventListener("load", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    if (img.complete) measure();

    const onChange = () => measure();
    reduce.addEventListener("change", onChange);

    return () => {
      img.removeEventListener("load", measure);
      observer.disconnect();
      reduce.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div className={`mockup__window mockup__window--${place}`} ref={frameRef}>
      <img
        ref={imgRef}
        className="mockup__shot"
        src={src}
        alt={alt}
        draggable="false"
        style={{ animationDuration: duration, animationDelay: delay }}
      />
    </div>
  );
}

export function MockupBrowsers({ label, screens }) {
  return (
    <div className="mockup mockup--live" role="img" aria-label={label}>
      <div className="mockup__scene">
        {screens.map((screen) => (
          <MockupWindow key={screen.place} {...screen} />
        ))}
      </div>
    </div>
  );
}

const OLYMP_PHONES = [
  { src: olympMobileSet, delay: 600, alt: "Список клиник Olymp Clinic на телефоне" },
  { src: olympMobileKlinika, delay: 1300, alt: "Страница клиники Olymp Clinic на телефоне" },
  { src: olympMobileVrachi, delay: 2000, alt: "Страница врачей Olymp Clinic на телефоне" },
];

function DevicePhones({ phones, label, variant }) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fit = () => {
      stage.style.transform = `scale(${wrap.clientWidth / 1440})`;
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);

    let inView = false;
    const sync = () => {
      const live = inView && document.visibilityState === "visible" && !reduce.matches;
      stage.classList.toggle("is-live", live);
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.2 });
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);

    return () => {
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      className={`mockup mockup--${variant}`}
      role="img"
      aria-label={label}
    >
      <div className="carousel" ref={wrapRef}>
        <div className="carousel__stage olymp-phones" ref={stageRef}>
          {phones.map((phone) => (
            <div className="olymp-phone" key={phone.delay}>
              <div className="olymp-phone__screen">
                <div className="olymp-phone__status" aria-hidden="true">
                  <span className="olymp-phone__island" />
                </div>
                <img src={phone.src} alt={phone.alt} draggable="false" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OlympPhones() {
  return (
    <DevicePhones
      phones={OLYMP_PHONES}
      label="Сайт Olymp Clinic на экранах трёх телефонов"
      variant="olymp"
    />
  );
}

export function AdonisMockup() {
  return (
    <DevicePhones
      phones={ADONIS_PHONES}
      label="Приложение «Адонис» на экранах трёх телефонов"
      variant="adonis"
    />
  );
}

const OLYMP_FRAMES = [
  { src: olympKlinika, scroll: 640, alt: "Страница клиники на сайте Olymp Clinic" },
  { src: olympNapravleniya, scroll: 640, alt: "Направления на сайте Olymp Clinic" },
  { src: olympVrachi, scroll: 640, alt: "Врачи на сайте Olymp Clinic" },
];

const CAROUSEL_SLOTS = [0, 1, 2, 3, -2, -1];
const HOLD_MS = 3200;
const MOVE_MS = 900;
const STEP_MS = HOLD_MS + MOVE_MS;
const SCROLL_DELAY_MS = 500;

function scrollLimit(card) {
  const img = card.querySelector("img");
  const requested = Number(card.dataset.scroll) || 0;
  const extra = Math.max(0, img.offsetHeight - card.clientHeight);
  return Math.min(requested, extra);
}

function DeviceCarousel({ frames, label, variant }) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const slides = [...frames, ...frames];

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return undefined;

    const cards = [...stage.querySelectorAll(".carousel__card")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const slots = [...CAROUSEL_SLOTS];
    let timers = [];
    let running = false;

    const later = (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
    };

    const clearTimers = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers = [];
    };

    const apply = (card, slot, instant) => {
      if (instant) card.classList.add("is-instant");
      card.style.setProperty("--slot", String(slot));
      card.style.setProperty("--sc", slot === 0 ? "1" : "0.8");
      card.style.zIndex = slot === 0 ? "3" : "1";
      if (instant) {
        card.offsetHeight;
        card.classList.remove("is-instant");
      }
    };

    const setScroll = (card, px, instant) => {
      const img = card.querySelector("img");
      if (instant) card.classList.add("is-instant");
      img.style.setProperty("--sy", `${-px}px`);
      if (instant) {
        card.offsetHeight;
        card.classList.remove("is-instant");
      }
    };

    cards.forEach((card, index) => {
      apply(card, slots[index], true);
      setScroll(card, 0, true);
    });

    const primeLeftCard = () => {
      if (reduce.matches) return;
      setScroll(cards[5], scrollLimit(cards[5]), true);
    };
    const leftImage = cards[5].querySelector("img");
    if (leftImage.complete) primeLeftCard();
    else leftImage.addEventListener("load", primeLeftCard, { once: true });

    const scrollCenter = () => {
      cards.forEach((card, index) => {
        if (slots[index] === 0) setScroll(card, scrollLimit(card), false);
      });
    };

    const advance = () => {
      cards.forEach((card, index) => {
        if (slots[index] !== -2) return;
        slots[index] = 4;
        apply(card, 4, true);
        setScroll(card, 0, true);
      });
      cards.forEach((card, index) => {
        slots[index] -= 1;
        apply(card, slots[index], false);
      });
    };

    const start = () => {
      if (running || reduce.matches) return;
      running = true;
      later(scrollCenter, SCROLL_DELAY_MS);
      later(function tick() {
        advance();
        later(scrollCenter, MOVE_MS + SCROLL_DELAY_MS);
        later(tick, STEP_MS);
      }, HOLD_MS);
    };

    const stop = () => {
      running = false;
      clearTimers();
    };

    const fit = () => {
      const scale = wrap.clientWidth / 1440;
      stage.style.transform = `scale(${scale})`;
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);

    let inView = false;
    const sync = () => {
      if (inView && document.visibilityState === "visible") start();
      else stop();
    };
    const onReduce = () => {
      stop();
      cards.forEach((card) => setScroll(card, 0, true));
      sync();
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.2 });
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", onReduce);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", onReduce);
      leftImage.removeEventListener("load", primeLeftCard);
    };
  }, []);

  return (
    <div
      className={`mockup mockup--carousel mockup--${variant}`}
      role="img"
      aria-label={label}
    >
      <div className="carousel" ref={wrapRef}>
        <div className="carousel__stage" ref={stageRef}>
          {slides.map((frame, index) => (
            <div className="carousel__card" data-scroll={frame.scroll} key={index}>
              <img
                src={frame.src}
                alt={index < frames.length ? frame.alt : ""}
                draggable="false"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OlympBrowsers() {
  return (
    <DeviceCarousel
      frames={OLYMP_FRAMES}
      label="Сайт Olymp Clinic: три макета сменяются по кругу"
      variant="olymp"
    />
  );
}

export function AdonisBrowsers() {
  return (
    <DeviceCarousel
      frames={ADONIS_FRAMES}
      label="Сайт «Адонис»: главная, каталог и кабинет сменяются по кругу"
      variant="adonis"
    />
  );
}
