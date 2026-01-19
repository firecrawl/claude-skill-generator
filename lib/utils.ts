import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isCompletelyEmpty(value: any): boolean {
  return (
    (typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function removeEmptyByKey(obj: any, keyToRemove: string): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeEmptyByKey(item, keyToRemove));
  }

  if (obj !== null && typeof obj === "object") {
    const cleaned: any = {};

    for (const key in obj) {
      const rawValue = obj[key];
      const cleanedValue = removeEmptyByKey(rawValue, keyToRemove);

      // Only remove if it's the target key AND it's completely empty ({} or [])
      if (key === keyToRemove && isCompletelyEmpty(cleanedValue)) {
        continue;
      }

      cleaned[key] = cleanedValue;
    }

    return cleaned;
  }

  return obj;
}

export function deepEqual(
  a: any,
  b: any,
  shouldRemoveEmptyByKey?: boolean,
  keyToRemove?: string,
): boolean {
  let _a = a;
  let _b = b;

  if (shouldRemoveEmptyByKey && keyToRemove) {
    _a = removeEmptyByKey(a, keyToRemove);
    _b = removeEmptyByKey(b, keyToRemove);
  }

  if (_a === _b) return true;

  if (typeof _a !== typeof _b || _a === null || _b === null) return false;

  if (Array.isArray(_a)) {
    if (!Array.isArray(_b) || _a.length !== _b.length) return false;
    return _a.every((item, index) => deepEqual(item, _b[index]));
  }

  if (typeof _a === "object") {
    const aKeys = Object.keys(_a);
    const bKeys = Object.keys(_b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(
      (key) => _b.hasOwnProperty(key) && deepEqual(_a[key], _b[key]),
    );
  }

  return false;
}

/**
 * Normalizes an email address to lowercase for consistent storage and querying.
 * Email addresses should be case-insensitive per RFC standards.
 */
export function normalizeEmail(email: string | null | undefined): string {
  if (!email) return "";
  return email.trim().toLowerCase();
}
