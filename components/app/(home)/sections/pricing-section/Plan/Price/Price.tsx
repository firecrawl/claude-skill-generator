"use client";

import NumberFlow from "@number-flow/react";

import { Plan } from "@/components/app/(home)/sections/pricing-section/Plan/Plan";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCompactNumber } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";

interface Props {
  price: Plan["price"];
  interval: "monthly" | "yearly";
  dense?: boolean;
}

export default function HomePricingPlanPrice({
  price,
  interval,
  dense = false,
}: Props) {
  const { convertPrice, getCurrencyInfo, selectedCurrency } = useCurrency();

  const priceInUSD = "oneTime" in price ? price.oneTime : price[interval];
  const convertedPrice = convertPrice(priceInUSD);
  const currencyInfo = getCurrencyInfo(selectedCurrency);

  // Determine threshold based on currency
  // Lower thresholds for currencies with longer symbols to prevent overflow
  const currencyThresholds: Record<string, number> = {
    // Currencies with very large numbers or longer symbols
    JPY: 1000,
    KRW: 1000,
    IDR: 1000,
    CHF: 1000,
    BRL: 1000,
    SEK: 1000,
    NOK: 1000,
    DKK: 1000,
    PLN: 1000,
    CZK: 1000,
    ZAR: 1000,
    MXN: 1000,
    ILS: 1000,
    TRY: 1000,
    THB: 1000,
    PHP: 1000,
    MYR: 1000,
    AED: 1000,
    SAR: 1000,
    RUB: 1000,
    INR: 1000,
    // New South American currencies
    ARS: 1000, // Argentine Peso
    CLP: 1000, // Chilean Peso
    COP: 1000, // Colombian Peso
    PEN: 1000, // Peruvian Sol
    UYU: 1000, // Uruguayan Peso
    // New Eastern European currencies
    HUF: 1000, // Hungarian Forint
    RON: 1000, // Romanian Leu
    BGN: 1000, // Bulgarian Lev
    HRK: 1000, // Croatian Kuna
    UAH: 1000, // Ukrainian Hryvnia
  };

  const threshold = currencyThresholds[selectedCurrency] || 10000;
  const displayPrice = Math.round(convertedPrice);
  const shouldUseCompact = displayPrice >= threshold;

  // Calculate the compact value and suffix separately for animation
  let compactValue = displayPrice;
  let suffix = "";

  if (shouldUseCompact) {
    const units = ["k", "M", "B", "T"];
    const unitIndex = Math.floor(Math.log10(Math.abs(displayPrice)) / 3) - 1;
    suffix = units[Math.min(unitIndex, units.length - 1)];
    compactValue = displayPrice / Math.pow(1000, unitIndex + 1);

    // Round appropriately
    if (compactValue >= 100) {
      compactValue = Math.round(compactValue);
    } else if (compactValue >= 10) {
      compactValue = Math.round(compactValue * 10) / 10;
    } else {
      compactValue = Math.round(compactValue * 10) / 10;
    }
  }

  return (
    <div className={cn("flex gap-8 items-baseline", dense ? "h-32" : "h-44")}>
      <div
        className={
          dense
            ? "text-title-h4 flex items-center"
            : "text-title-h3 flex items-center"
        }
      >
        <div className="flex items-baseline">
          <span>
            {currencyInfo?.symbol === "$" ? "$" : currencyInfo?.symbol}
          </span>
          <NumberFlow value={compactValue} />
          {suffix && (
            <span className={dense ? "text-title-h4" : "text-title-h3"}>
              {suffix}
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "text-black-alpha-40",
          dense ? "text-body-small" : "text-body-medium",
        )}
      >
        {"oneTime" in price ? "one-time" : "/monthly"}
      </div>
    </div>
  );
}
