import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppMessage(fields: Record<string, string>) {
  const lines = Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value}`);

  return encodeURIComponent(`Rasheed Repairs quote request\n\n${lines.join("\n")}`);
}
