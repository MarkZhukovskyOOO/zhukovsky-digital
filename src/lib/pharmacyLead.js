import { track } from "./track.js";

export const PHARMACY_PATH = "/industries/pharmacy";

export const PHARMACY_LEAD = {
  service: "pharmacy",
  page: PHARMACY_PATH,
  placeholder:
    "Например: 45 аптек, используем [название системы], хотим сайт и приложение с бронированием",
  note: "Заявка на сайт и приложение для аптечной сети. Покажем работающие проекты и обсудим задачу. Для первого разговора достаточно нескольких вводных.",
};

export function openPharmacyLead(place, eventName) {
  if (place && eventName) {
    track(eventName, { page_path: PHARMACY_PATH, place });
  }
  window.dispatchEvent(
    new CustomEvent("open-contact-modal", { detail: PHARMACY_LEAD }),
  );
}
