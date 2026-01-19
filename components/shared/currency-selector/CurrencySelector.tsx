"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CURRENCIES,
  useCurrency,
  type CurrencyCode,
} from "@/contexts/CurrencyContext";

export default function CurrencySelector({
  className,
}: {
  className?: string;
}) {
  const {
    selectedCurrency,
    setSelectedCurrency,
    getCurrencyInfo,
    exchangeRates,
    error,
  } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentCurrency = getCurrencyInfo(selectedCurrency);

  // Filter currencies based on search
  const filteredCurrencies = CURRENCIES.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (code: CurrencyCode) => {
    // If exchange rates are not available and user tries to select non-USD currency
    if (!exchangeRates && code !== "USD") {
      console.warn("Exchange rates unavailable, only USD is supported");
      // You could show a toast notification here if you have that system
      return;
    }
    setSelectedCurrency(code);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center gap-4 h-28 w-[76px] rounded-full relative",
          "before:inside-border before:border-border-faint before:rounded-full",
          "border-none",
          "hover:bg-background-lighter transition-colors",
          "text-label-small text-accent-black",
          "",
        )}
        aria-label="Select currency"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-[16px]">{currentCurrency?.flag}</span>
        <span className="text-[11px] font-[500] pr-10">
          {currentCurrency?.code}
        </span>
        <ChevronDown
          className={cn(
            "w-10 h-10 text-black-alpha-56 transition-transform absolute right-8",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50",
            "min-w-[200px] bg-white rounded-12 border border-border-muted",

            "animate-in fade-in-0 zoom-in-95 duration-200",
          )}
        >
          {/* Search Input */}
          <div className="p-8 border-b border-border-faint">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search currency..."
              className={cn(
                "w-full px-8 py-4 text-body-small",
                "bg-background-lighter rounded-6",
                "border border-border-faint",
                "placeholder:text-black-alpha-56",
                "focus:outline-none focus:border-border-muted",
                "transition-colors",
              )}
            />
          </div>

          {/* Currency List */}
          <div className="max-h-[320px] overflow-y-auto p-4" role="listbox">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleSelect(currency.code)}
                  className={cn(
                    "w-full px-8 py-6 rounded-6",
                    "flex items-center gap-8",
                    "transition-colors",
                    selectedCurrency === currency.code
                      ? "bg-heat-12 text-heat-100"
                      : "hover:bg-background-lighter text-accent-black",
                  )}
                  role="option"
                  aria-selected={selectedCurrency === currency.code}
                >
                  <span className="text-[18px]">{currency.flag}</span>
                  <span
                    className={cn(
                      "font-[450]",
                      selectedCurrency === currency.code ? "text-heat-100" : "",
                    )}
                  >
                    {currency.code}
                  </span>
                  <span
                    className={cn(
                      "ml-auto text-[11px]",
                      selectedCurrency === currency.code
                        ? "text-heat-100/80"
                        : "text-black-alpha-56",
                    )}
                  >
                    {currency.symbol}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-8 py-16 text-center text-body-small text-black-alpha-56">
                No currencies found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
