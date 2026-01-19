"use client";

import { animate } from "motion";
import { useRef, useState } from "react";

import CurvyRect from "@/components/shared/layout/curvy-rect";
import { cn } from "@/lib/utils";

import { TabsProvider, TabsValue } from "./TabsContext";

const tabs = [
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Annual",
    value: "yearly",
    discount: 20,
  },
];

export default function HomePricingTabs({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<TabsValue>("yearly");
  const backgroundRef = useRef<HTMLDivElement>(null);

  return (
    <TabsProvider setValue={setActiveTab} value={activeTab}>
      <div className="relative">
        <CurvyRect className="overlay" allSides />

        <div className="lg:w-max lg:mx-auto flex justify-center relative">
          <div
            className="absolute top-12 left-0 z-[2] inset-y-12 bg-white-alpha-72 rounded-full w-[calc(50%-24px)] lg:w-156 backdrop-blur-4"
            ref={backgroundRef}
            style={{
              // Start under the right (yearly) tab by default using translateX relative to self width
              // Explanation: element width = 50% - 24px (on small). To land under the right tab: x = elementWidth + 36px → translateX(calc(100% + 36px))
              // On lg, element width is 156px → x ≈ 192px, matching padding/border spacing.
              transform: "translateX(calc(100% + 36px))",
              boxShadow:
                "0px 24px 32px -12px rgba(0, 0, 0, 0.03), 0px 16px 24px -8px rgba(0, 0, 0, 0.03), 0px 8px 16px -4px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
            }}
          />

          {tabs.map((tab, index) => (
            <div
              className={cn(
                "p-12 border-x lg-max:flex-1 border-border-faint",
                index !== 0 && "-ml-1",
              )}
              key={tab.value}
            >
              <button
                className="w-full lg:w-156 py-12 flex items-center justify-center relative z-[2] gap-4"
                key={tab.value}
                data-tab={tab.value}
                onClick={(e) => {
                  setActiveTab(tab.value as TabsValue);

                  const t = e.target as HTMLElement;

                  const target =
                    t instanceof HTMLButtonElement
                      ? t
                      : (t.closest("button") as HTMLButtonElement);

                  if (backgroundRef.current) {
                    animate(backgroundRef.current, { scale: 0.95 }).then(() =>
                      animate(backgroundRef.current!, { scale: 1 }),
                    );

                    animate(
                      backgroundRef.current,
                      {
                        x: target.offsetLeft,
                      },
                      {
                        type: "spring",
                        stiffness: 200,
                        damping: 23,
                      },
                    );
                  }
                }}
              >
                <span
                  className={cn(
                    "px-4 text-label-medium transition-all",
                    tab.value === activeTab
                      ? "text-accent-black"
                      : "text-black-alpha-64",
                  )}
                >
                  {tab.label}
                </span>

                {tab.discount && (
                  <span className="py-2 px-6 text-heat-100 bg-heat-12 rounded-4 text-[12px]/[16px] font-[450]">
                    {tab.discount}% off
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {children}
    </TabsProvider>
  );
}
