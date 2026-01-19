"use client";

import { animate } from "motion";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type Props = {
  tabs: {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  position?: "left" | "center";
  itemButtonClassName?: string;
  itemClassName?: string;
  noScroll?: boolean;
};

export default function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  position = "left",
  itemButtonClassName,
  itemClassName,
  noScroll,
}: Props) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const activeIndex = useMemo(
    () => tabs.findIndex((tab) => tab.value === activeTab),
    [tabs, activeTab],
  );
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [styles, setStyles] = useState<{
    x: number;
    width: number;
  }>({
    x: 0,
    width: 0,
  });

  // Update styles when activeIndex changes
  useEffect(() => {
    if (activeIndex >= 0 && buttonRefs.current[activeIndex]) {
      const target = buttonRefs.current[activeIndex]!.closest(
        ".group",
      ) as HTMLElement;
      if (target) {
        setStyles({
          x: target.offsetLeft + 12,
          width: target.offsetWidth - 24,
        });
      }
    }
  }, [activeIndex]);

  return (
    <div
      className={cn(
        "overflow-x-auto whitespace-nowrap hide-scrollbar py-32 -my-32 max-w-full",
        noScroll && "!contents",
      )}
    >
      <div
        className={cn(
          "flex relative w-max max-w-full",
          position === "center" && "lg:mx-auto",
        )}
      >
        {styles.width !== 0 && (
          <motion.div
            animate={styles}
            className="absolute top-12 left-0 z-[2] inset-y-12 bg-white-alpha-72 rounded-full backdrop-blur-4"
            initial={styles}
            ref={backgroundRef}
            style={{
              boxShadow:
                "0px 24px 32px -12px rgba(0, 0, 0, 0.03), 0px 16px 24px -8px rgba(0, 0, 0, 0.03), 0px 8px 16px -4px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 26,
            }}
          />
        )}

        {tabs.map((tab, index) => (
          <div className={cn("relative p-12 group", itemClassName)} key={index}>
            <div className="h-full w-1 right-0 absolute bg-border-faint top-0" />
            {position === "center" && (
              <div className="h-full w-1 -left-1 lg-max:hidden absolute bg-border-faint top-0" />
            )}

            <button
              className={cn(
                "py-12 px-24 flex gap-4 justify-center items-center w-full relative z-[3] transition-colors",
                activeTab === tab.value
                  ? "text-accent-black"
                  : "text-black-alpha-64 hover:text-black-alpha-88 hover:before:opacity-100",
                "before:inside-border before:border-border-faint before:opacity-0 rounded-full before:scale-[0.98] hover:before:scale-100",
                itemButtonClassName,
              )}
              data-active={activeTab === tab.value}
              ref={(element) => {
                buttonRefs.current[index] = element;
              }}
              onClick={(e) => {
                setActiveTab(tab.value);

                const t = e.target as HTMLElement;

                let target =
                  t instanceof HTMLButtonElement
                    ? t
                    : (t.closest("button") as HTMLButtonElement);
                target = target.closest(".group") as HTMLButtonElement;

                if (backgroundRef.current && target) {
                  animate(backgroundRef.current, { scale: 0.96 }).then(() => {
                    if (backgroundRef.current) {
                      animate(backgroundRef.current, { scale: 1 });
                    }
                  });

                  setStyles({
                    x: target.offsetLeft + 12,
                    width: target.offsetWidth - 24,
                  });
                }

                if (window.innerWidth < 996 && target) {
                  const parent = backgroundRef.current?.parentElement
                    ?.parentElement as HTMLDivElement;
                  if (parent) {
                    parent.scrollTo({
                      left: target.offsetLeft - target.clientWidth / 2,
                      behavior: "smooth",
                    });
                  }
                }
              }}
            >
              {tab.icon}

              <div className="px-4 text-label-medium">{tab.label}</div>

              {tab.children}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
