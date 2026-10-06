import mainShot from "../assets/figma/case-shot-main.png";
import catalogShot from "../assets/figma/case-shot-catalog.png";
import cabinetShot from "../assets/figma/case-shot-cabinet.png";
import "./ScreensCarousel.css";

const SHOTS = [
  { src: mainShot, alt: "Скриншот интерфейса: главная страница" },
  { src: catalogShot, alt: "Скриншот интерфейса: каталог" },
  { src: cabinetShot, alt: "Скриншот интерфейса: личный кабинет" },
];

/*
 * Автопрокручивающаяся лента скриншотов (по фрейму «Карусель — 3 макета»).
 * Трек — две одинаковые группы карточек; @keyframes сдвигает трек на -50%
 * (ровно одну группу), поэтому лента бесконечная и бесшовная.
 * Пауза — на hover, при prefers-reduced-motion анимация отключается.
 */
export default function ScreensCarousel() {
  return (
    <section className="shots" aria-label="Скриншоты интерфейса EnerGO">
      <div className="shots__track">
        {[0, 1].map((copy) => (
          <ul
            className="shots__group"
            key={copy}
            aria-hidden={copy === 1 || undefined}
          >
            {[...SHOTS, ...SHOTS].map((s, i) => (
              <li className="shots__card" key={i}>
                <img
                  src={s.src}
                  alt={copy === 0 && i < SHOTS.length ? s.alt : ""}
                  loading="lazy"
                  draggable="false"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
