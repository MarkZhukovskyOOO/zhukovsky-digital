import { useEffect, useRef } from "react";
import olympPoster from "../assets/figma/case-olymp-cover.png";
import adonisHome from "../assets/figma/case-shot-main.png";
import adonisCatalog from "../assets/figma/case-shot-catalog.png";
import adonisCabinet from "../assets/figma/case-shot-cabinet.png";
import "./ProjectMockup.css";

const ADONIS_SCREENS = [
  { src: adonisCabinet, place: "left", duration: "13s", delay: "-5s" },
  { src: adonisCatalog, place: "right", duration: "11s", delay: "-8s" },
  { src: adonisHome, place: "center", duration: "12s", delay: "-2s" },
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

function MockupWindow({ src, place, duration, delay }) {
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
        alt=""
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

export function AdonisMockup() {
  return (
    <MockupBrowsers
      label="Сайт «Адонис»: страницы прокручиваются в окнах браузера"
      screens={ADONIS_SCREENS}
    />
  );
}

export function OlympPhones() {
  return (
    <MockupVideo
      src="/mockups/olymp-phones.mp4"
      poster={olympPoster}
      label="Сайт «Олимп Клиник» на экранах трёх телефонов"
    />
  );
}

export function OlympBrowsers() {
  return (
    <MockupVideo
      src="/mockups/olymp-browsers.mp4"
      poster="/mockups/olymp-browsers-poster.png"
      label="Сайт «Олимп Клиник» в окнах браузера"
    />
  );
}
