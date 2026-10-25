import { useRef, useState } from "react";
import { track } from "./track.js";

export function useLeadForm() {
  const [need, setNeed] = useState("new");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const extraRef = useRef({ service: "", page: "", placeholder: "" });

  function setLeadContext(context) {
    extraRef.current = {
      service: context?.service || "",
      page: context?.page || "",
      placeholder: context?.placeholder || "",
    };
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const payload = {
      name: name.trim(),
      company: company.trim(),
      contact: contact.trim(),
      need,
      message: message.trim(),
      service: extraRef.current.service,
      page: extraRef.current.page,
    };
    const problem = validateLead(payload);
    if (problem) {
      setStatus("error");
      setError(problem);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const type = response.headers.get("content-type") || "";
      const data = type.toLowerCase().includes("application/json")
        ? await response.json().catch(() => null)
        : null;
      if (!response.ok || !data || data.ok !== true) {
        track("lead_error", {
          service_slug: extraRef.current.service,
          page_path: extraRef.current.page,
          error_category: response.ok ? "invalid_response" : String(response.status),
        });
        setStatus("error");
        setError(data?.error || "Не получилось отправить заявку. Напишите в Telegram.");
        return;
      }
      track("lead_success", {
        service_slug: extraRef.current.service,
        page_path: extraRef.current.page,
      });
      setStatus("success");
      setName("");
      setCompany("");
      setContact("");
      setMessage("");
      setNeed("new");
    } catch {
      track("lead_error", {
        service_slug: extraRef.current.service,
        page_path: extraRef.current.page,
        error_category: "network",
      });
      setStatus("error");
      setError("Нет соединения. Проверьте интернет и попробуйте ещё раз.");
    }
  }

  return {
    need,
    setNeed,
    name,
    setName,
    company,
    setCompany,
    contact,
    setContact,
    message,
    setMessage,
    status,
    error,
    placeholder: extraRef.current.placeholder,
    setLeadContext,
    onSubmit,
  };
}

function validateLead(payload) {
  if (!payload.name) return "Укажите имя.";
  if (!payload.contact) return "Укажите телефон, почту или Telegram.";
  if (payload.need !== "new" && payload.need !== "dev") return "Выберите, что нужно.";
  if (!payload.message) return "Коротко опишите задачу.";
  return "";
}
