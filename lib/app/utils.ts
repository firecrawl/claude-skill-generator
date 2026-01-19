// Utility functions for UI components
// Note: Import cn directly from "@/lib/utils" instead of this file

// Focus ring utility for Tremor components
export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Focus input utility
export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
];

// Error input utility
export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
];

// Percentage formatter
export function percentageFormatter(
  value: number,
  decimals: number = 0,
): string {
  return `${value.toFixed(decimals)}%`;
}

// Badge type helper
export function getBadgeType(
  value: number,
): "success" | "warning" | "error" | "default" {
  if (value >= 80) return "success";
  if (value >= 50) return "warning";
  if (value >= 0) return "error";
  return "default";
}
