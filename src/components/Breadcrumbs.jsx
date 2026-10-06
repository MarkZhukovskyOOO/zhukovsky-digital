import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span className="breadcrumbs__item" key={i}>
            {item.to && !last ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current={last ? "page" : undefined}>{item.label}</span>
            )}
            {!last && <span className="breadcrumbs__sep" aria-hidden="true">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
