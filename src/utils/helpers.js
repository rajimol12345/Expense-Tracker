// src/utils/helpers.js
import { format } from "date-fns";

export function formatMoney(num) {
  return Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatDate(d) {
  try {
    return format(new Date(d), "yyyy-MM-dd");
  } catch {
    return "";
  }
}
