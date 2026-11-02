import type { SchoolConfig } from "./types";

export function media(src?: string | null) {
  if (!src) return "";
  if (/^(https?:|data:|blob:|\/)/.test(src)) return src;
  return `/${src.replace(/^\.\//, "")}`;
}

export function digits(phone: string) {
  let value = phone.replace(/\D/g, "");
  if (value.startsWith("0")) value = `234${value.slice(1)}`;
  return value;
}

export function waHref(config: Pick<SchoolConfig, "whatsapp" | "whatsappMessage">, message?: string) {
  const text = encodeURIComponent(message || config.whatsappMessage);
  const number = digits(config.whatsapp);
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function telHref(phone: string) {
  const number = digits(phone);
  return number ? `tel:+${number}` : undefined;
}

export function formatDate(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "?"
  );
}

export const FEE_FIELDS: [string, string][] = [
  ["tuition", "Tuition fee"],
  ["registration", "Registration fee"],
  ["levy", "Development levy"],
  ["books", "Books"],
  ["uniform", "Uniform"],
  ["other", "Other applicable fees"],
];
