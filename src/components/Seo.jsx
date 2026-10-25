import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  NOT_FOUND,
  PAGES,
  faqJsonLd,
  normalizePath,
  organizationJsonLd,
  pageUrl,
} from "../seo.js";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function setMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo() {
  const { pathname } = useLocation();
  const path = normalizePath(pathname);
  const page = path ? PAGES[path] : null;
  const meta = page || NOT_FOUND;
  const url = page && path ? pageUrl(path) : "";

  useEffect(() => {
    document.title = meta.title;
    document.querySelectorAll("title").forEach((node, index) => {
      if (index > 0) node.remove();
    });
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", page ? page.robots || "" : "noindex, nofollow");
    setMeta("property", "og:type", page?.kind || "website");
    setMeta("property", "og:site_name", "Zhukovsky Digital");
    setMeta("property", "og:locale", "ru_RU");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", page?.image?.image || "");
    setMeta("property", "og:image:alt", page?.image?.alt || "");
    setMeta("property", "og:image:width", page?.image?.width || "");
    setMeta("property", "og:image:height", page?.image?.height || "");
    setMeta("name", "twitter:card", page?.image ? "summary_large_image" : "");
    setMeta("name", "twitter:title", page?.image ? meta.title : "");
    setMeta("name", "twitter:description", page?.image ? meta.description : "");
    setMeta("name", "twitter:image", page?.image?.image || "");
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (url) {
      const link = canonical || document.createElement("link");
      link.rel = "canonical";
      link.href = url;
      if (!canonical) document.head.appendChild(link);
    } else {
      canonical?.remove();
    }
  }, [page, meta.title, meta.description, url]);

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      {page?.faq && <JsonLd data={faqJsonLd} />}
    </>
  );
}
