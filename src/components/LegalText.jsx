const LINKED = [
  ["https://yandex.ru/support/metrica/ru/general/cookie-usage", "https://yandex.ru/support/metrica/ru/general/cookie-usage"],
  ["https://zhukovsky-digital.com/", "https://zhukovsky-digital.com/"],
  ["sales@zhukovsky-digital.com", "mailto:sales@zhukovsky-digital.com"],
  ["+7 918 253-14-30", "tel:+79182531430"],
];

function partsOf(text) {
  const found = [];
  for (const [label, href] of LINKED) {
    let from = 0;
    while (from < text.length) {
      const at = text.indexOf(label, from);
      if (at === -1) break;
      found.push({ at, label, href });
      from = at + label.length;
    }
  }
  found.sort((a, b) => a.at - b.at || b.label.length - a.label.length);
  const pieces = [];
  let cursor = 0;
  for (const item of found) {
    if (item.at < cursor) continue;
    if (item.at > cursor) pieces.push({ text: text.slice(cursor, item.at) });
    pieces.push(item);
    cursor = item.at + item.label.length;
  }
  if (cursor < text.length) pieces.push({ text: text.slice(cursor) });
  return pieces;
}

export function LegalText({ text }) {
  return partsOf(text).map((part, index) => {
    if (!part.href) return <span key={index}>{part.text}</span>;
    const external = part.href.startsWith("http");
    return (
      <a
        key={index}
        href={part.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {part.label}
      </a>
    );
  });
}
