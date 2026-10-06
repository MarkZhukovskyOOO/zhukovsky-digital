import { Link } from "react-router-dom";
import teamPhoto from "../assets/figma/team-photo.png";
import "./Team.css";

const STATS = [
  { num: "2022", label: "год основания" },
  { num: "11", label: "человек в штате" },
  { num: "21", label: "продукт в проде" },
];

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="container">
        <div className="team__head">
          <div className="team__copy">
            <h2 className="section-title">
              Команда
              <br />
              профессионалов
            </h2>
            <Link to="/cases" className="team__link">
              Все проекты
            </Link>
          </div>
          <p className="team__desc">
            Вы работаете напрямую с теми, кто делает продукт: продакт, дизайнер,
            тимлид и QA — без прослойки аккаунт-менеджеров. Состав команды
            меняется под задачу.
          </p>
        </div>

        <img
          className="team__photo"
          src={teamPhoto}
          alt="Команда студии Жуковский"
          loading="lazy"
        />

        <div className="team__stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num">{s.num}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
