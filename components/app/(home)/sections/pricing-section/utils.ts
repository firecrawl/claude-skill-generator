import type { Plan } from "./Plan/Plan";

/**
 * Type guard to check if a plan has recurring pricing (monthly/yearly)
 * as opposed to one-time pricing
 */
export function isRecurringPrice(
  price: Plan["price"],
): price is { monthly: number; yearly: number } {
  return !("oneTime" in price);
}
