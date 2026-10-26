import { Link, useLocation } from "react-router-dom";
import { normalizePath, pageUrl } from "../seo.js";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ items }) {
  const { pathname } = useLocation();
  const path = normalizePath(pathname) || "/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const last = i === items.length - 1;
      const href = normalizePath(item.to || (last ? path : "/")) || "/";
      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        item: pageUrl(href),
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
    </>
  );
}
