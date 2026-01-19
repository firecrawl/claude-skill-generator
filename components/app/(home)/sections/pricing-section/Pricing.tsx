"use client";

import { CurvyRect } from "@/components/shared/ui";
import SectionHead from "@/components/shared/section-head/SectionHead";
import BadgeIcon from "./_svg/BadgeIcon";
import CreditIcon from "./_svg/Credit";
import HomePricingEnterprise from "./Enterprise/Enterprise";
import HomePricingFlame from "./Flame/Flame";
import HomePricingPlan, { Plan } from "./Plan/Plan";
import { useMemo, useState } from "react";
import { useCheckout } from "@/hooks/useCheckout";
import Modal from "@/components/shared/modal/Modal";
import Button from "@/components/ui/shadcn/button";
import { ArrowRightIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import CurrencySelector from "@/components/shared/currency-selector/CurrencySelector";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { isRecurringPrice } from "./utils";
import { createWebRoute } from "@/utils/create-web-route";

// Simplified types for UI library mode (no database)
type User = {
  id: string;
  email?: string;
} | null;

type Subscription = {
  id: string;
  status: string;
  prices?: { id: string } | null;
} | null;

export default function HomePricing({
  user,
  subscription,
  smallerHeader = false,
  teamName,
}: {
  user: User;
  subscription: Subscription;
  smallerHeader?: boolean;
  teamName?: string | null;
}) {
  const { convertPrice, getCurrencyInfo, selectedCurrency } = useCurrency();

  const currentPriceId: string | undefined = subscription?.prices
    ?.id as unknown as string | undefined;
  const currentPlanInfo = useMemo(() => {
    if (!currentPriceId) return null;
    for (const p of plans) {
      if (p.id.monthly === currentPriceId) {
        return {
          name: p.name,
          interval: "monthly" as const,
          amount: isRecurringPrice(p.price) ? p.price.monthly : undefined,
        };
      }
      if (p.id.yearly === currentPriceId) {
        return {
          name: p.name,
          interval: "yearly" as const,
          amount: isRecurringPrice(p.price) ? p.price.yearly : undefined,
        };
      }
    }
    return null;
  }, [currentPriceId]);

  // Use shared checkout hook
  const {
    handleCheckout: handleStripeCheckout,
    handleUpgrade,
    upgradePriceId,
    upgradeLoading,
    upgradeMeta,
    open,
    setOpen,
  } = useCheckout({
    user,
    subscription,
    currentPlanInfo,
  });

  const [isYearly, setIsYearly] = useState(
    currentPlanInfo?.interval === "monthly" ? false : true,
  );

  // Resolve selected plan info for dialog display
  const selectedPlanInfo = useMemo(() => {
    if (!upgradePriceId) return null;
    for (const p of plans) {
      if (p.id.monthly === upgradePriceId)
        return { name: p.name, interval: "monthly" as const };
      if (p.id.yearly === upgradePriceId)
        return { name: p.name, interval: "yearly" as const };
    }
    if (upgradeMeta)
      return { name: upgradeMeta.planName, interval: upgradeMeta.interval };
    return null;
  }, [upgradeMeta, upgradePriceId]);

  const selectedPlanDetails = useMemo(() => {
    if (!upgradePriceId || !selectedPlanInfo) return null;
    for (const p of plans) {
      if (p.id.monthly === upgradePriceId && isRecurringPrice(p.price)) {
        return {
          name: p.name,
          interval: "monthly" as const,
          amount: p.price.monthly,
        };
      }
      if (p.id.yearly === upgradePriceId && isRecurringPrice(p.price)) {
        return {
          name: p.name,
          interval: "yearly" as const,
          amount: p.price.yearly,
        };
      }
    }
    return null;
  }, [upgradePriceId, selectedPlanInfo]);

  return (
    <section className="container -mt-1">
      <SectionHead
        badgeContent={
          <>
            <BadgeIcon />
            <span>Transparent</span>
          </>
        }
        description={
          <>
            Explore transparent pricing built for real-world scraping.{" "}
            <span className="text-label-large contents">
              {" "}
              Start for free, then scale as you grow.
            </span>
          </>
        }
        descriptionClassName="!max-w-[450px]"
        title={
          <>
            Flexible <span className="text-heat-100">pricing</span>
          </>
        }
        smallerHeader={smallerHeader}
      >
        <HomePricingFlame />
      </SectionHead>

      <div className="relative -mt-1">
        <CurvyRect className="overlay" allSides />

        <div className="relative -mt-1 flex gap-12 p-15 before:inside-border before:border-border-faint before:!border-x-0">
          <CurvyRect className="overlay" allSides />

          <div className="flex-1 h-28 rounded-full relative before:inside-border before:border-border-faint" />
          <CurrencySelector />
          <div className="flex-1 h-28 rounded-full relative before:inside-border before:border-border-faint" />
        </div>

        <div className="lg:flex relative -mt-1">
          {plans.map((plan, i) => (
            <HomePricingPlan
              plan={plan}
              key={i}
              onCheckout={handleStripeCheckout}
              isSubscribed={Boolean(subscription)}
              currentPriceId={currentPriceId}
              teamName={teamName}
              isYearly={isYearly}
              setIsYearly={setIsYearly}
              currentPlanPrice={currentPlanInfo?.amount}
              currentPlanName={currentPlanInfo?.name}
            />
          ))}

          <CurvyRect className="overlay" allSides />
        </div>

        <div className="p-24 lg:p-32 relative -mt-1 flex lg-max:flex-col lg-max:text-center gap-8 items-center justify-center">
          <div className="h-1 bg-border-faint left-0 absolute w-full top-0" />
          <CurvyRect className="overlay" allSides />

          <CreditIcon />
          <div className="text-body-medium text-black-alpha-64">
            Extra credits are available via auto-recharge packs.{" "}
            <Link
              href={
                user
                  ? "/app/settings?tab=billing"
                  : createWebRoute.auth.signin({ view: "signup" })
              }
              className="text-heat-100 inline-flex items-center gap-4 hover:cursor-pointer hover:underline"
            >
              Enable <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* Exchange Rate Disclaimer */}
        {selectedCurrency !== "USD" && (
          <div className="text-center mb-24">
            <p className="text-body-small text-black-alpha-48 max-w-2xl mx-auto px-16">
              Actual price may vary based on the exchange rate in place between
              USD and {selectedCurrency} at the time of payment processing or
              invoicing. Prices exclude all taxes, levies and duties and are
              paid in USD.
            </p>
          </div>
        )}

        <div className="flex relative -mt-1">
          <CurvyRect className="overlay" allSides />
          <div className="h-1 top-0 w-full absolute left-0 bg-border-faint" />

          {Array.from({ length: 2 }, (_, i) => (
            <div
              className="relative flex flex-1 gap-12 p-15 last:-ml-1 lg-max:last:hidden"
              key={i}
            >
              {i === 1 && (
                <div className="h-full bg-border-faint w-1 absolute bottom-0 left-0" />
              )}
              <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
              <div className="size-12 rounded-full relative before:inside-border before:border-border-faint" />
              <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
            </div>
          ))}
        </div>

        <HomePricingEnterprise />
      </div>

      {/* Upgrade confirmation modal */}
      <Modal
        isOpen={open}
        setIsOpen={(o) => !upgradeLoading && setOpen(o)}
        initial={{ y: 64 }}
        exit={{ y: -64 }}
        contentClassName="p-20 max-w-[520px]"
      >
        <div className="text-title-h5 text-accent-black mb-8">
          Confirm upgrade
        </div>
        <div className="text-body-large text-black-alpha-72 mb-16">
          {currentPlanInfo && selectedPlanDetails ? (
            <>
              {(() => {
                const currencyInfo = getCurrencyInfo(selectedCurrency);
                const currentLocalizedAmount = currentPlanInfo.amount
                  ? convertPrice(currentPlanInfo.amount)
                  : 0;
                const selectedLocalizedAmount = selectedPlanDetails.amount
                  ? convertPrice(selectedPlanDetails.amount)
                  : 0;

                const currentPriceFormatted = formatCurrencyCompact(
                  Math.round(currentLocalizedAmount),
                  currencyInfo?.symbol || "$",
                  selectedCurrency,
                );
                const selectedPriceFormatted = formatCurrencyCompact(
                  Math.round(selectedLocalizedAmount),
                  currencyInfo?.symbol || "$",
                  selectedCurrency,
                );

                return (
                  <>
                    You're upgrading from{" "}
                    <span className="text-accent-black font-[500]">
                      {currentPlanInfo.name}
                    </span>{" "}
                    —{" "}
                    <span className="text-accent-black font-[500]">
                      {currentPlanInfo.interval === "yearly"
                        ? "Yearly"
                        : "Monthly"}
                    </span>{" "}
                    ({currentPriceFormatted}) to{" "}
                    <span className="text-accent-black font-[500]">
                      {selectedPlanDetails.name}
                    </span>{" "}
                    —{" "}
                    <span className="text-accent-black font-[500]">
                      {selectedPlanDetails.interval === "yearly"
                        ? "Yearly"
                        : "Monthly"}
                    </span>{" "}
                    ({selectedPriceFormatted}). You will be billed now based on
                    the remaining time in your billing period.
                  </>
                );
              })()}
            </>
          ) : selectedPlanInfo ? (
            <>
              You're about to upgrade your subscription to{" "}
              <span className="text-accent-black font-[500]">
                {selectedPlanInfo.name}
              </span>{" "}
              —{" "}
              <span className="text-accent-black font-[500]">
                {selectedPlanInfo.interval === "yearly" ? "Yearly" : "Monthly"}
              </span>
              . You will be billed now based on the remaining time in your
              billing period.
            </>
          ) : (
            <>
              You're about to upgrade your subscription. You will be billed now
              based on the remaining time in your billing period.
            </>
          )}
          {selectedCurrency !== "USD" && (
            <div className="mt-12 p-12 bg-black-alpha-4 rounded-8 text-body-small text-black-alpha-56">
              Note: Actual price may vary based on the exchange rate between USD
              and {selectedCurrency} at the time of payment processing.
            </div>
          )}
        </div>
        <div className="flex gap-8 justify-end p-16 pt-0">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={upgradeLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpgrade}
            disabled={upgradeLoading}
          >
            {upgradeLoading ? "Processing…" : "Confirm"}
          </Button>
        </div>
      </Modal>
    </section>
  );
}

export const plans: Plan[] = [
  {
    id: {
      yearly: "free_y",
      monthly: "free_m",
    },
    name: "Free Plan",
    description: (
      <>
        A lightweight way to try scraping.{" "}
        <div className="text-label-medium lg:contents">
          No cost, no card, no hassle.
        </div>
      </>
    ),
    credits: 500,
    price: {
      oneTime: 0,
    },
    concurrency: 2,
    additionalFeatures: [
      {
        label: "Low rate limits",
        description: "10 /scrape per min<br />1 /crawl per min",
      },
    ],
  },
  {
    id: {
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY_YEARLY ?? "",
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_HOBBY ?? "",
    },
    name: "Hobby",
    description: (
      <>
        Great for side projects and small tools.{" "}
        <div className="text-label-medium contents">
          Fast, simple, no overkill.
        </div>
      </>
    ),
    credits: 3000,
    price: {
      monthly: 19,
      yearly: 16,
    },
    concurrency: 5,
    additionalFeatures: [{ label: "Basic support" }],
    autoRechargePack: {
      monthly: { credits: 1000, price: 9 },
      yearly: { credits: 1000, price: 9 },
    },
  },
  {
    id: {
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STANDARD_NEW_YEARLY ?? "",
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STANDARD_NEW ?? "",
    },
    name: "Standard",
    mostPopular: true,
    description: (
      <>
        Perfect for scaling with less effort.{" "}
        <div className="text-label-medium contents">
          Simple, solid, dependable.
        </div>
      </>
    ),
    credits: 100000,
    price: {
      monthly: 99,
      yearly: 83,
    },
    concurrency: 50,
    additionalFeatures: [{ label: "Standard support" }],
    autoRechargePack: {
      monthly: { credits: 30000, price: 57 },
      yearly: { credits: 35000, price: 47 },
    },
  },
  {
    id: {
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_GROWTH_YEARLY ?? "",
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_GROWTH ?? "",
    },
    name: "Growth",
    description: (
      <>
        Built for high volume and speed.{" "}
        <div className="text-label-medium contents">
          Firecrawl at full force.
        </div>
      </>
    ),
    credits: 500000,
    price: {
      monthly: 399,
      yearly: 333,
    },
    concurrency: 100,
    additionalFeatures: [{ label: "Priority support" }],
    autoRechargePack: {
      monthly: { credits: 150000, price: 217 },
      yearly: { credits: 175000, price: 177 },
    },
  },
];
