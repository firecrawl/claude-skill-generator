/**
 * Format large numbers with k/M/B suffixes
 * @param num - The number to format
 * @param threshold - The minimum number to start compacting (default: 10000)
 * @returns Formatted string with suffix
 */
export function formatCompactNumber(
  num: number,
  threshold: number = 10000,
): string {
  if (num < threshold) {
    // For numbers under threshold, show as is with comma separators
    return new Intl.NumberFormat("en-US").format(Math.round(num));
  }

  const units = ["k", "M", "B", "T"];
  const unitIndex = Math.floor(Math.log10(Math.abs(num)) / 3) - 1;
  const unit = units[Math.min(unitIndex, units.length - 1)];
  const value = num / Math.pow(1000, unitIndex + 1);

  // Format with appropriate decimals
  if (value >= 100) {
    // For values >= 100, no decimal places
    return `${Math.round(value)}${unit}`;
  } else if (value >= 10) {
    // For values >= 10, max 1 decimal place if needed
    const rounded = Math.round(value * 10) / 10;
    return `${rounded % 1 === 0 ? Math.round(rounded) : rounded}${unit}`;
  } else {
    // For values < 10, max 1 decimal place
    const rounded = Math.round(value * 10) / 10;
    return `${rounded}${unit}`;
  }
}

/**
 * Format currency with proper symbol placement and compact notation for large numbers
 * @param amount - The amount in the target currency
 * @param symbol - The currency symbol
 * @param code - The currency code
 * @returns Formatted currency string
 */
export function formatCurrencyCompact(
  amount: number,
  symbol: string,
  code: string,
): string {
  // Define thresholds for different currency groups
  // Lower thresholds prevent overflow in pricing displays
  const currencyThresholds: Record<string, number> = {
    // Currencies with very large numbers (compact aggressively)
    JPY: 1000,
    KRW: 1000,
    IDR: 1000,
    VND: 1000,
    CLP: 1000, // Chilean Peso
    COP: 1000, // Colombian Peso
    HUF: 1000, // Hungarian Forint
    ARS: 1000, // Argentine Peso (high inflation)
    UYU: 1000, // Uruguayan Peso
    PEN: 1000, // Peruvian Sol

    // Eastern European currencies
    PLN: 1000, // Polish Złoty
    CZK: 1000, // Czech Koruna
    RON: 1000, // Romanian Leu
    BGN: 1000, // Bulgarian Lev
    HRK: 1000, // Croatian Kuna
    UAH: 1000, // Ukrainian Hryvnia

    // Currencies with longer symbols that cause overflow
    CHF: 1000, // CHF999 → CHF999, CHF1000+ → CHF1k
    BRL: 1000, // R$999 → R$999, R$1000+ → R$1k
    ZAR: 1000, // South African Rand
    SEK: 1000, // Swedish Krona
    NOK: 1000, // Norwegian Krone
    DKK: 1000, // Danish Krone
    MXN: 1000, // Mexican Peso
    ILS: 1000, // Israeli Shekel
    TRY: 1000, // Turkish Lira
    THB: 1000, // Thai Baht
    PHP: 1000, // Philippine Peso
    MYR: 1000, // Malaysian Ringgit
    AED: 1000, // UAE Dirham
    SAR: 1000, // Saudi Riyal
    RUB: 1000, // Russian Ruble
    INR: 1000, // Indian Rupee

    // Standard currencies - can handle 4 digits before compacting
    USD: 10000,
    EUR: 10000,
    GBP: 10000,
    CAD: 10000,
    AUD: 10000,
    NZD: 10000,
    SGD: 10000,
    HKD: 10000,
    CNY: 10000,
  };

  const threshold = currencyThresholds[code] || 10000;
  const shouldCompact = amount >= threshold;

  if (shouldCompact) {
    const formatted = formatCompactNumber(amount, threshold);
    // Place symbol appropriately
    if (["USD", "GBP", "EUR", "JPY", "CNY", "INR"].includes(code)) {
      return `${symbol}${formatted}`;
    } else {
      // For other currencies, put symbol before without space for consistency
      return `${symbol}${formatted}`;
    }
  }

  // For smaller numbers, use regular formatting
  const formatted = new Intl.NumberFormat("en-US").format(Math.round(amount));
  if (["USD", "GBP", "EUR", "JPY", "CNY", "INR"].includes(code)) {
    return `${symbol}${formatted}`;
  } else {
    return `${symbol}${formatted}`;
  }
}
