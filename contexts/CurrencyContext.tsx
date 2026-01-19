"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Popular currencies with their flag emojis
export const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", symbol: "$", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", symbol: "€", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", symbol: "£", name: "British Pound" },
  { code: "JPY", flag: "🇯🇵", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", flag: "🇨🇳", symbol: "¥", name: "Chinese Yuan" },
  { code: "CAD", flag: "🇨🇦", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", flag: "🇦🇺", symbol: "$", name: "Australian Dollar" },
  { code: "CHF", flag: "🇨🇭", symbol: "CHF", name: "Swiss Franc" },
  { code: "HKD", flag: "🇭🇰", symbol: "$", name: "Hong Kong Dollar" },
  { code: "SGD", flag: "🇸🇬", symbol: "$", name: "Singapore Dollar" },
  { code: "SEK", flag: "🇸🇪", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", flag: "🇳🇴", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", flag: "🇩🇰", symbol: "kr", name: "Danish Krone" },
  { code: "NZD", flag: "🇳🇿", symbol: "$", name: "New Zealand Dollar" },
  { code: "MXN", flag: "🇲🇽", symbol: "$", name: "Mexican Peso" },
  { code: "BRL", flag: "🇧🇷", symbol: "R$", name: "Brazilian Real" },
  { code: "ARS", flag: "🇦🇷", symbol: "$", name: "Argentine Peso" },
  { code: "CLP", flag: "🇨🇱", symbol: "$", name: "Chilean Peso" },
  { code: "COP", flag: "🇨🇴", symbol: "$", name: "Colombian Peso" },
  { code: "PEN", flag: "🇵🇪", symbol: "S/", name: "Peruvian Sol" },
  { code: "UYU", flag: "🇺🇾", symbol: "$", name: "Uruguayan Peso" },
  { code: "INR", flag: "🇮🇳", symbol: "₹", name: "Indian Rupee" },
  { code: "RUB", flag: "🇷🇺", symbol: "₽", name: "Russian Ruble" },
  { code: "ZAR", flag: "🇿🇦", symbol: "R", name: "South African Rand" },
  { code: "KRW", flag: "🇰🇷", symbol: "₩", name: "South Korean Won" },
  { code: "THB", flag: "🇹🇭", symbol: "฿", name: "Thai Baht" },
  { code: "MYR", flag: "🇲🇾", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "IDR", flag: "🇮🇩", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "PHP", flag: "🇵🇭", symbol: "₱", name: "Philippine Peso" },
  { code: "PLN", flag: "🇵🇱", symbol: "zł", name: "Polish Złoty" },
  { code: "HUF", flag: "🇭🇺", symbol: "Ft", name: "Hungarian Forint" },
  { code: "RON", flag: "🇷🇴", symbol: "lei", name: "Romanian Leu" },
  { code: "BGN", flag: "🇧🇬", symbol: "лв", name: "Bulgarian Lev" },
  { code: "HRK", flag: "🇭🇷", symbol: "kn", name: "Croatian Kuna" },
  { code: "UAH", flag: "🇺🇦", symbol: "₴", name: "Ukrainian Hryvnia" },
  { code: "TRY", flag: "🇹🇷", symbol: "₺", name: "Turkish Lira" },
  { code: "AED", flag: "🇦🇪", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", flag: "🇸🇦", symbol: "﷼", name: "Saudi Riyal" },
  { code: "ILS", flag: "🇮🇱", symbol: "₪", name: "Israeli Shekel" },
  { code: "CZK", flag: "🇨🇿", symbol: "Kč", name: "Czech Koruna" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

interface CurrencyContextType {
  selectedCurrency: CurrencyCode;
  setSelectedCurrency: (currency: CurrencyCode) => void;
  exchangeRates: Record<string, number> | null;
  loading: boolean;
  error: string | null;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (priceInUSD: number, showSymbol?: boolean) => string;
  getCurrencyInfo: (
    code: CurrencyCode,
  ) => (typeof CURRENCIES)[number] | undefined;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");
  const [exchangeRates, setExchangeRates] = useState<Record<
    string,
    number
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect user's location and set currency accordingly
  useEffect(() => {
    const initializeCurrency = () => {
      // First check if there's a saved preference
      const savedCurrency = localStorage.getItem("selectedCurrency");
      if (savedCurrency && CURRENCIES.some((c) => c.code === savedCurrency)) {
        setSelectedCurrency(savedCurrency as CurrencyCode);
        return;
      }

      // Default to USD for UI library mode
      setSelectedCurrency("USD");
      localStorage.setItem("selectedCurrency", "USD");
    };

    initializeCurrency();
  }, []);

  // Save currency preference to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

  // Stub exchange rates for UI library mode - always use USD
  useEffect(() => {
    // Set static exchange rates for UI display (not used since we default to USD)
    setExchangeRates({
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      // Add other rates if needed, but won't be used in UI library mode
    });
    setLoading(false);
  }, []);

  const convertPrice = (priceInUSD: number): number => {
    if (selectedCurrency === "USD" || !exchangeRates) return priceInUSD;

    const rate = exchangeRates[selectedCurrency];
    if (!rate) return priceInUSD;

    return priceInUSD * rate;
  };

  const formatPrice = (priceInUSD: number, showSymbol = true): string => {
    const convertedPrice = convertPrice(priceInUSD);
    const currencyInfo = getCurrencyInfo(selectedCurrency);

    if (!currencyInfo) return `$${priceInUSD}`;

    // Special formatting for certain currencies
    const isWholeNumber =
      selectedCurrency === "JPY" ||
      selectedCurrency === "KRW" ||
      selectedCurrency === "IDR";

    const formatted = new Intl.NumberFormat("en-US", {
      style: showSymbol ? "currency" : "decimal",
      currency: selectedCurrency,
      minimumFractionDigits: isWholeNumber ? 0 : 0,
      maximumFractionDigits: isWholeNumber ? 0 : 0,
    }).format(convertedPrice);

    return formatted;
  };

  const getCurrencyInfo = (code: CurrencyCode) => {
    return CURRENCIES.find((c) => c.code === code);
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        exchangeRates,
        loading,
        error,
        convertPrice,
        formatPrice,
        getCurrencyInfo,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
