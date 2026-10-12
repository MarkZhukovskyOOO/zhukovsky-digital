import { useState } from "react";

export function useLeadForm() {
  const [need, setNeed] = useState("new");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const payload = {
      name: name.trim(),
      company: company.trim(),
      contact: contact.trim(),
      need,
      message: message.trim(),
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
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus("error");
        setError(data.error || "Не получилось отправить заявку. Напишите в Telegram.");
        return;
      }
      setStatus("success");
      setName("");
      setCompany("");
      setContact("");
      setMessage("");
      setNeed("new");
    } catch {
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
