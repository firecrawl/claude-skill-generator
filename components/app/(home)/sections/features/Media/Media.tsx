"use client";

import { AnimatePresence, motion, Transition } from "motion/react";
import { useCallback, useRef, useState } from "react";

import { CurvyRect } from "@/components/shared/ui";

import FeaturesMediaTab from "./Tab/Tab";

const TABS_MOCK_DATA = [
  "https://example.com/docs/report.pdf",
  "https://example.com/files/brief.docx",
  "https://example.com/docs/guide.html",
  "https://example.com/files/summary.pdf",
  "https://example.com/files/notes.docx",
  "https://example.com/docs/manual.html",
];

export const TAB_SWITCH_TRANSITION = {
  type: "spring",
  stiffness: 100,
  damping: 20,
} as Transition;

export default function FeaturesMedia() {
  const [tabs, setTabs] = useState<string[]>(TABS_MOCK_DATA.slice(0, 3));
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
          <AnimatePresence initial={false}>
            {tabs.map((tab, index) => {
              const lastSlashIndex = tab.lastIndexOf("/");
              const base =
                lastSlashIndex !== -1 ? tab.slice(0, lastSlashIndex) : tab;
              const file =
                lastSlashIndex !== -1 ? tab.slice(lastSlashIndex + 1) : "";

              return (
                <motion.div
                  animate={{ x: (index - 1) * 320 }}
                  className="px-15 py-11 w-320 h-full text-body-small absolute top-0 left-0 border-l border-border-faint"
                  exit={{ x: -320 }}
                  initial={{ x: 320 * 2 }}
                  key={tab}
                  transition={TAB_SWITCH_TRANSITION}
                >
                  <span className="text-black-alpha-32">{base}/</span>
                  <span className="text-accent-black">{file}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative h-311 -mt-1 overflow-hidden">
        <CurvyRect className="overlay" allSides />

        <AnimatePresence initial={false}>
          {tabs.map((tab, index) => {
            return (
              <motion.div
                animate={{ x: (index - 1) * 264 }}
                className="absolute top-0 left-[calc(50%-132px)] w-264 h-310 border-l border-border-faint"
                exit={{ x: -264 * 2 }}
                initial={{ x: 264 * 2 }}
                key={tab}
                transition={TAB_SWITCH_TRANSITION}
              >
                <FeaturesMediaTab
                  active={index === 1}
                  extension={tab.split(".").pop() as string}
                  onDone={nextTab}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
