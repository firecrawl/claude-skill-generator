"use client";

import { AnimatePresence, motion, Transition } from "motion/react";
import { useCallback, useRef, useState } from "react";

import { CurvyRect } from "@/components/shared/ui";
import useSwitchingCode from "@/hooks/useSwitchingCode";

import FeaturesWaitTab, { SpinningDiv } from "./Tab/Tab";

const TABS_MOCK_DATA = [
  "https://example-react.com",
  "https://example-spa.com",
  "https://example-js.com",
  "https://example-load.com",
  "https://example-doc.com",
];

export const TAB_SWITCH_TRANSITION = {
  type: "spring",
  stiffness: 100,
  damping: 20,
} as Transition;

export default function FeaturesWait() {
  const [tabs, setTabs] = useState<string[]>(TABS_MOCK_DATA.slice(0, 3));
  const [loading, setLoading] = useState(true);
  const tabIndex = useRef(0);

  const nextTab = useCallback(() => {
    tabIndex.current = (tabIndex.current + 1) % TABS_MOCK_DATA.length;

    setTabs(
      Array.from(
        { length: 3 },
        (_, j) =>
          TABS_MOCK_DATA[(tabIndex.current + j) % TABS_MOCK_DATA.length],
      ),
    );
    setLoading(true);
  }, []);

  return (
    <div className="w-full">
      <div className="relative flex h-42">
        <CurvyRect className="overlay" bottom />
        <div className="h-1 bottom-0 left-0 w-full absolute bg-border-faint" />

        <div className="px-15 flex gap-10 border-r border-border-faint items-center h-full">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              className="size-12 rounded-full before:inside-border before:border-border-muted relative"
              key={i}
            />
          ))}
        </div>

        <div className="flex-1 h-full relative overflow-hidden -ml-1">
          <div className="px-15 py-11 w-462 h-full flex gap-10 items-center text-body-small absolute top-0 left-0 border-l border-border-faint">
            <SpinningDiv active={loading} key={tabs[1]}>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.svg
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.2, delay: 0.2 },
                  }}
                  className="size-full absolute top-0 left-0"
                  exit={{ opacity: 0 }}
                  fill="none"
                  height="20"
                  initial={{ opacity: 0 }}
                  key={loading ? "loading" : "success"}
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {!loading ? (
                    <rect
                      fill="black"
                      fillOpacity="0.06"
                      height="16"
                      rx="4"
                      width="16"
                      x="2"
                      y="2"
                    />
                  ) : (
                    <>
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        stroke="var(--black-alpha-6)"
                        strokeWidth="1.25"
                      />
                      <g
                        clipPath="url(#features-wait-svg-loading)"
                        data-figma-skip-parse="true"
                      >
                        <g transform="matrix(0.006 0.0034641 -0.0034641 0.006 10 10)">
                          <foreignObject
                            height="3253.28"
                            width="3253.28"
                            x="-1626.64"
                            y="-1626.64"
                          >
                            <div
                              style={{
                                background:
                                  "conic-gradient(from 90deg,rgba(234, 234, 234, 0) 0deg,rgba(234, 234, 234, 1) 180deg, #262626 360deg)",
                                height: "100%",
                                width: "100%",
                                opacity: 1,
                              }}
                            />
                          </foreignObject>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="features-wait-svg-loading">
                          <path d="M16.375 10C16.375 10.3452 16.6548 10.625 17 10.625C17.3452 10.625 17.625 10.3452 17.625 10H16.375ZM15.8203 6.11101L16.34 5.76378L15.8203 6.11101ZM12.6788 3.53284L12.4396 4.11027L12.6788 3.53284ZM8.63437 3.1345L8.7563 3.74749L8.63437 3.1345ZM5.05025 5.05025L5.49219 5.49219L5.05025 5.05025ZM6.11101 15.8203L6.45824 15.3006L6.11101 15.8203ZM10 17.625C10.3452 17.625 10.625 17.3452 10.625 17C10.625 16.6548 10.3452 16.375 10 16.375V17.625ZM17 10H17.625C17.625 8.49192 17.1778 7.0177 16.34 5.76378L15.8203 6.11101L15.3006 6.45824C16.0011 7.5066 16.375 8.73914 16.375 10H17ZM15.8203 6.11101L16.34 5.76378C15.5021 4.50985 14.3112 3.53254 12.918 2.95542L12.6788 3.53284L12.4396 4.11027C13.6045 4.59278 14.6001 5.40988 15.3006 6.45824L15.8203 6.11101ZM12.6788 3.53284L12.918 2.95542C11.5247 2.3783 9.99154 2.2273 8.51244 2.52151L8.63437 3.1345L8.7563 3.74749C9.99293 3.50151 11.2747 3.62776 12.4396 4.11027L12.6788 3.53284ZM8.63437 3.1345L8.51244 2.52151C7.03333 2.81572 5.67469 3.54194 4.60831 4.60831L5.05025 5.05025L5.49219 5.49219C6.38375 4.60063 7.51967 3.99347 8.7563 3.74749L8.63437 3.1345ZM5.05025 5.05025L4.60831 4.60831C3.54194 5.67469 2.81572 7.03333 2.52151 8.51244L3.1345 8.63437L3.74749 8.7563C3.99347 7.51967 4.60063 6.38375 5.49219 5.49219L5.05025 5.05025ZM3.1345 8.63437L2.52151 8.51244C2.2273 9.99154 2.3783 11.5247 2.95542 12.918L3.53284 12.6788L4.11027 12.4396C3.62776 11.2747 3.50151 9.99293 3.74749 8.7563L3.1345 8.63437ZM3.53284 12.6788L2.95542 12.918C3.53254 14.3112 4.50985 15.5021 5.76378 16.34L6.11101 15.8203L6.45824 15.3006C5.40988 14.6001 4.59278 13.6045 4.11027 12.4396L3.53284 12.6788ZM6.11101 15.8203L5.76378 16.34C7.0177 17.1778 8.49192 17.625 10 17.625V17V16.375C8.73914 16.375 7.5066 16.0011 6.45824 15.3006L6.11101 15.8203Z" />
                        </clipPath>
                      </defs>
                    </>
                  )}
                </motion.svg>
              </AnimatePresence>
            </SpinningDiv>

            <TabName tab={tabs[1]} />
          </div>
        </div>
      </div>

      <div className="flex h-311 -mt-1 relative">
        <CurvyRect className="overlay" allSides />

        <div className="lg-max:hidden w-86 h-full flex flex-col">
          <div className="pr-12 pb-12 flex-1">
            <div className="rounded-br-16 w-full h-full border-r border-b border-border-faint" />
          </div>

          <div className="pr-12 pt-12 flex-1 border-t border-border-faint">
            <div className="rounded-tr-16 w-full h-full border-r border-t border-border-faint" />
          </div>
        </div>

        <div className="flex-1 border-x border-border-faint relative overflow-hidden">
          <AnimatePresence initial={false}>
            {tabs.map((tab, index) => {
              return (
                <motion.div
                  animate={{ y: (index - 1) * 228 }}
                  className="absolute top-[calc(50%-114px)] left-0 p-12 w-full h-229"
                  exit={{ y: -228 * 2 }}
                  initial={{ y: 228 * 2 }}
                  key={tab}
                  style={{
                    zIndex: index,
                  }}
                  transition={TAB_SWITCH_TRANSITION}
                >
                  <div className="h-1 top-0 left-0 absolute w-full pointer-events-none bg-black-alpha-5 z-[1000]" />

                  <FeaturesWaitTab
                    active={index === 1}
                    setLoading={setLoading}
                    onDone={nextTab}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="lg-max:hidden w-86 h-full flex flex-col">
          <div className="pl-12 pb-12 flex-1">
            <div className="rounded-bl-16 w-full h-full border-l border-b border-border-faint" />
          </div>

          <div className="pl-12 pt-12 flex-1 border-t border-border-faint">
            <div className="rounded-tl-16 w-full h-full border-l border-t border-border-faint" />
          </div>
        </div>
      </div>
    </div>
  );
}

const TabName = ({ tab }: { tab: string }) => {
  const text = useSwitchingCode(tab);

  return text;
};
