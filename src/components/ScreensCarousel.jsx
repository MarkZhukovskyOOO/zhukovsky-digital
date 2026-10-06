import mainShot from "../assets/figma/case-shot-main.png";
import catalogShot from "../assets/figma/case-shot-catalog.png";
import cabinetShot from "../assets/figma/case-shot-cabinet.png";
import bookingShot from "../assets/figma/case-energo-cover.png";
import olympShot from "../assets/figma/case-olymp-cover.png";
import "./ScreensCarousel.css";

const ADONIS_SHOTS = [
  { src: catalogShot, alt: "Поиск товара и информация о наличии", caption: "Каталог" },
  { src: bookingShot, alt: "Выбор аптеки для получения заказа", caption: "Бронирование" },
  { src: cabinetShot, alt: "Заказы и карта лояльности", caption: "Личный кабинет" },
];
const OLYMP_SHOTS = [
  { src: olympShot, alt: "Адаптивные страницы сайта Олимп Клиник", caption: "Сайт клиники" },
];

/*
 * Автопрокручивающаяся лента экранов сайта и приложения «Адонис».
 * Трек — две одинаковые группы карточек; @keyframes сдвигает трек на -50%
 * (ровно одну группу), поэтому лента бесконечная и бесшовная.
 * Пауза — на hover, при prefers-reduced-motion анимация отключается.
 */
export default function ScreensCarousel({ project = "adonis" }) {
  const shots = project === "olympClinic" ? OLYMP_SHOTS : ADONIS_SHOTS;
  return (
    <section className="shots" aria-label={`Экраны проекта ${project === "olympClinic" ? "Олимп Клиник" : "Адонис"}`}>
      <div className="shots__track">
        {[0, 1].map((copy) => (
          <ul
            className="shots__group"
            key={copy}
            aria-hidden={copy === 1 || undefined}
          >
            {[...shots, ...shots].map((s, i) => (
              <li className="shots__card" key={i}>
                <img
                  src={s.src}
                  alt={copy === 0 && i < shots.length ? s.alt : ""}
                  loading="lazy"
                  draggable="false"
                />
                {copy === 0 && i < shots.length && (
                  <span className="shots__caption">{s.caption}</span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
