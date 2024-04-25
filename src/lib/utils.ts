import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}
