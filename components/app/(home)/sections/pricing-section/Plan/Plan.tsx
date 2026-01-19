import Button from "@/components/ui/shadcn/button";
import CurvyRect from "@/components/shared/layout/curvy-rect";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

import Checkmark from "./_svg/Checkmark";
import HomePricingPlanFlame from "./Flame/Flame";
import HomePricingPlanPrice from "./Price/Price";
import CreditIcon from "../_svg/Credit";
import Tooltip from "@/components/ui/shadcn/tooltip";
import Toggle from "@/components/ui/shadcn/toggle";
import { isRecurringPrice } from "../utils";
import { useCurrency } from "@/contexts/CurrencyContext";

const integerFormatter = new Intl.NumberFormat("en-US");
const creditRateFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

const Feature = ({
  children,
  underline,
  dense = false,
}: {
  children: React.ReactNode;
  underline?: boolean;
  dense?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex gap-12 items-start border-b text-black-alpha-72",
        dense
          ? "px-16 py-8 !text-body-small gap-8 border-border-muted"
          : "px-24 xl:px-28 py-16 !text-body-medium border-border-faint",
        underline && "cursor-help",
      )}
    >
      <div className={cn("mt-1", dense && "mt-0")}>
        <Checkmark />
      </div>
      <div className={cn("relative", underline && "dotted-underline")}>
        {children}
      </div>
    </div>
  );
};

export interface Plan {
  id: {
    monthly: string;
    yearly: string;
  };
  name: string;
  description: React.ReactNode;
  credits: number;
  price:
    | {
        monthly: number;
        yearly: number;
      }
    | {
        oneTime: number;
      };
  concurrency: number;
  additionalFeatures?: { label: string; description?: string }[];
  mostPopular?: boolean;
  autoRechargePack?: {
    monthly: { credits: number; price: number };
    yearly: { credits: number; price: number };
  };
}

export default function HomePricingPlan({
  plan,
  onCheckout,
  isSubscribed,
  currentPriceId,
  teamName,
  isYearly,
  setIsYearly,
  currentPlanPrice,
  currentPlanName,
  dense = false,
}: {
  plan: Plan;
  onCheckout: (
    price: string,
    quantity?: number,
    currentPath?: string,
    meta?: {
      planName: string;
      interval: "monthly" | "yearly";
      planPrice?: number;
      source?: string;
    },
  ) => void;
  isSubscribed: boolean;
  currentPriceId?: string;
  teamName?: string | null;
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
  currentPlanPrice?: number;
  currentPlanName?: string;
  /**
   * If true, the plan will be displayed in a more compact way to accomodate the onboarding modal.
   */
  dense?: boolean;
}) {
  const { convertPrice, formatPrice, getCurrencyInfo, selectedCurrency } =
    useCurrency();

  // Custom price formatting to match the main pricing component style
  const formatPriceConsistent = (
    priceInUSD: number,
    decimalPlaces?: number,
  ): string => {
    const convertedPrice = convertPrice(priceInUSD);
    const currencyInfo = getCurrencyInfo(selectedCurrency);

    if (!currencyInfo) {
      return decimalPlaces !== undefined
        ? `$${priceInUSD.toFixed(decimalPlaces)}`
        : `$${priceInUSD}`;
    }

    // Use the same symbol logic as the main pricing component
    const symbol = currencyInfo.symbol === "$" ? "$" : currencyInfo.symbol;

    let formattedNumber: string;
    if (decimalPlaces !== undefined) {
      formattedNumber = convertedPrice.toFixed(decimalPlaces);
    } else {
      formattedNumber = integerFormatter.format(Math.round(convertedPrice));
    }

    return `${symbol}${formattedNumber}`;
  };

  const activePriceId = isYearly ? plan.id.yearly : plan.id.monthly;
  const isCurrentPlan = Boolean(
    isSubscribed && currentPriceId && currentPriceId === activePriceId,
  );
  const isSamePlanTier = currentPlanName === plan.name;

  const targetPlanPrice = isRecurringPrice(plan.price)
    ? isYearly
      ? plan.price.yearly
      : plan.price.monthly
    : null;

  const isDowngrade =
    currentPlanPrice !== undefined &&
    targetPlanPrice !== null &&
    targetPlanPrice < currentPlanPrice;

  const buttonText = useMemo(() => {
    if (!isSubscribed) {
      return plan.name === "Free Plan" ? "Get started" : "Subscribe";
    }

    if (isCurrentPlan) {
      return "Current plan";
    }

    if (plan.name === "Free Plan") {
      return "Get started";
    }

    if (isSamePlanTier || isDowngrade) {
      return "Change plan";
    }

    return "Upgrade";
  }, [isSubscribed, isCurrentPlan, isSamePlanTier, isDowngrade, plan.name]);

  return (
    <>
      <div
        className={cn(
          "flex-1 lg:border-x lg-max:-mt-1 lg:-ml-1 first:ml-0 relative",
          dense
            ? "lg:border-border-muted border-border-muted bg-background-lighter rounded-8 border shadow-sm"
            : "border-border-faint",
        )}
      >
        <CurvyRect className="overlay lg:hidden" allSides />

        <div
          className={cn(
            "flex gap-8 items-center",
            dense
              ? "px-16 pt-12 pb-4 text-label-medium mb-4"
              : "px-24 xl:px-28 pt-24 xl:pt-28 text-label-large mb-8",
          )}
        >
          {plan.name}

          {plan.mostPopular && (
            <div
              className={cn(
                "text-heat-100 font-[450] bg-heat-12 rounded-4",
                dense
                  ? "px-4 py-1 text-[10px]/[12px]"
                  : "px-6 py-2 text-[12px]/[16px]",
              )}
            >
              Most popular
            </div>
          )}
        </div>

        {!dense && (
          <div className="pl-24 xl:min-h-40 lg:min-h-60 xl:pl-28 pr-24 text-black-alpha-72 text-body-medium mb-20 xl:mb-32">
            {plan.description}
          </div>
        )}

        <div
          className={cn(
            "items-center border-b flex gap-8 xl:gap-12",
            dense
              ? "px-16 pb-12 border-border-muted"
              : "px-28 pb-32 border-border-faint",
          )}
        >
          <CreditIcon />
          <div className={cn(dense ? "text-body-small" : "text-body-medium")}>
            {integerFormatter.format(plan.credits)} credits
          </div>
        </div>

        <div
          className={cn(
            "border-b relative",
            dense
              ? "p-16 border-border-muted"
              : "p-24 xl:p-28 border-border-faint",
          )}
        >
          <div className={cn(dense ? "mb-12" : "mb-24")}>
            <HomePricingPlanPrice
              price={plan.price}
              interval={isYearly ? "yearly" : "monthly"}
              dense={dense}
            />
          </div>

          {/* Billing Toggle or Spacer */}
          <div
            className={cn(
              "h-[28px] flex items-center relative z-[3]",
              dense ? "mb-12" : "mb-24",
            )}
          >
            {"monthly" in plan.price && (
              <>
                <div className="flex items-center gap-12">
                  <Toggle checked={isYearly} onChange={setIsYearly} />
                  <span
                    className={cn(
                      "text-label-medium transition-colors whitespace-nowrap",
                      isYearly ? "text-accent-black" : "text-black-alpha-64",
                    )}
                  >
                    Billed yearly
                  </span>
                </div>
                <AnimatePresence>
                  {isYearly && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -right-4 py-1 px-4 text-heat-100 rounded-4 text-[11px]/[14px] font-[450] whitespace-nowrap"
                      style={{ backgroundColor: "#fdf0ec" }}
                    >
                      2 months free
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          <Button
            className="w-full z-[1]"
            size={dense ? "default" : "large"}
            variant={plan.mostPopular ? "primary" : "secondary"}
            disabled={isCurrentPlan}
            onClick={() => {
              // GA tracking
              if (typeof window !== "undefined") {
                window.dataLayer = window.dataLayer || [];
                const price = isRecurringPrice(plan.price)
                  ? isYearly
                    ? plan.price.yearly
                    : plan.price.monthly
                  : plan.price.oneTime;
                window.dataLayer.push({
                  event: "pricing_plan_click",
                  plan_name: plan.name,
                  billing_interval: isYearly ? "yearly" : "monthly",
                  plan_price: price,
                  location: "pricing_page",
                  button_text: buttonText,
                });
              }
              const planPrice = isRecurringPrice(plan.price)
                ? isYearly
                  ? plan.price.yearly
                  : plan.price.monthly
                : plan.price.oneTime;
              onCheckout(
                isYearly ? plan.id.yearly : plan.id.monthly,
                1,
                "/app/usage",
                {
                  planName: plan.name,
                  interval: isYearly ? "yearly" : "monthly",
                  planPrice,
                  source: dense ? "onboarding" : "pricing_page",
                },
              );
            }}
          >
            {buttonText}
          </Button>

          {teamName && (
            <div
              className={cn(
                "text-center text-black-alpha-56 text-mono-x-small mt-4 w-fit mx-auto p-6 relative z-[10]",
                plan.mostPopular && "bg-white backdrop-blur-sm rounded-4",
              )}
            >
              (for <span className="text-heat-100">{teamName}</span> team)
            </div>
          )}

          {plan.mostPopular && <HomePricingPlanFlame />}
        </div>

        <Feature dense={dense}>
          Scrape{" "}
          <span className="text-accent-black">
            {integerFormatter.format(plan.credits)}
          </span>{" "}
          pages
        </Feature>

        <Feature underline dense={dense}>
          <span className="text-accent-black">{plan.concurrency}</span>{" "}
          concurrent requests
          <Tooltip
            description="The number of scrapers running in parallel. More browsers mean faster results."
            offset={-8}
          />
        </Feature>

        {plan.additionalFeatures?.map((feature) => (
          <Feature
            key={feature.label}
            underline={!!feature.description}
            dense={dense}
          >
            {feature.label}
            <Tooltip description={feature.description} offset={-8} />
          </Feature>
        ))}

        {plan.autoRechargePack && (
          <Feature underline dense={dense}>
            <span className="text-accent-black">
              {formatPriceConsistent(
                isYearly
                  ? plan.autoRechargePack.yearly.price
                  : plan.autoRechargePack.monthly.price,
              )}
            </span>{" "}
            per extra{" "}
            <span className="text-accent-black">
              {(isYearly
                ? plan.autoRechargePack.yearly.credits
                : plan.autoRechargePack.monthly.credits) / 1000}
              k
            </span>{" "}
            credits
            <Tooltip
              description={`If enabled, each auto-recharge pack gives you ${integerFormatter.format(isYearly ? plan.autoRechargePack.yearly.credits : plan.autoRechargePack.monthly.credits)} credits, costing ${formatPriceConsistent(isYearly ? plan.autoRechargePack.yearly.price / plan.autoRechargePack.yearly.credits : plan.autoRechargePack.monthly.price / plan.autoRechargePack.monthly.credits, 4)} per credit.`}
              offset={-8}
            />
          </Feature>
        )}
      </div>

      {!dense && (
        <div className="lg:hidden [&:nth-last-child(2)]:hidden -mt-1 h-45 relative border-y border-border-faint">
          <CurvyRect
            className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
            allSides
          />
        </div>
      )}
    </>
  );
}
