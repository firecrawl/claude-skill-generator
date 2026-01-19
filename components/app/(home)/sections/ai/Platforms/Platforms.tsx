//@ts-nocheck
"use client";

import { AnimatePresence, motion } from "motion/react";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

import { Connector } from "@/components/shared/layout/curvy-rect";
import useSwitchingCode from "@/hooks/useSwitchingCode";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import Image from "@/components/shared/image/Image";
import Spinner from "@/components/ui/spinner";
import useEncryptedLoading from "@/hooks/useEncryptedLoading";
import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

import AiPlatformsFlame from "./Flame/Flame";

export default function AiPlatforms() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textIndex = useRef(4);

  useEffect(() => {
    const stop = setIntervalOnVisible({
      element: document.getElementById("ai-platforms")!,
      callback: () => {
        setActiveIndex((prev) => (prev + 1) % 4);
      },
      interval: 4000,
    });

    return () => stop?.();
  }, []);

  const activeBadgeIndex = useMemo(() => {
    if ([0, 3].includes(activeIndex)) return 0;
    if ([1, 2].includes(activeIndex)) return 1;
  }, [activeIndex]);

  return (
    <div className="lg-max:h-355 lg-max:relative">
      <AiPlatformsFlame />

      <div
        className="cs-80 lg:cs-100 z-[2] absolute rounded-full bg-[#FDFDFD] flex-center"
        style={{
          boxShadow:
            "0px 24px 32px -12px rgba(0, 0, 0, 0.03), 0px 16px 24px -8px rgba(0, 0, 0, 0.03), 0px 8px 16px -4px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03), 0px 0px 0px 10px #F9F9F9",
        }}
      >
        <FirecrawlIcon className="size-52" innerFillColor="#FDFDFD" />
      </div>

      <div
        className="w-52 lg:w-230 ch-52 absolute left-33 lg:left-17 bg-background-base before:inside-border before:border-border-faint rounded-full z-[3]"
        style={{
          boxShadow: "0px 0px 0px 10px #F9F9F9",
        }}
      />
      <div
        className="w-52 lg:w-230 ch-52 absolute right-33 lg:right-17 bg-background-base before:inside-border before:border-border-faint rounded-full z-[3]"
        style={{
          boxShadow: "0px 0px 0px 10px #F9F9F9",
        }}
      />

      <Logo
        active={activeIndex === 0}
        className="left-19 lg:left-149 top-19 lg:top-18"
        index={1}
      />
      <Logo
        active={activeIndex === 1}
        className="right-19 lg:right-149 top-19 lg:top-18"
        index={2}
      />
      <Logo
        active={activeIndex === 2}
        className="right-19 lg:right-149 bottom-19 lg:bottom-18"
        index={4}
      />
      <Logo
        active={activeIndex === 3}
        className="left-19 lg:left-149 bottom-19 lg:bottom-18"
        index={3}
      />

      <div className="lg-max:center-x lg-max:w-1/3 lg:cw-396 border-x border-border-faint h-full top-0 absolute" />
      <div className="lg-max:hidden cw-132 border-x border-border-faint h-full top-0 absolute" />
      <div className="lg-max:center-y lg-max:h-1/3 lg:ch-136 border-y border-border-faint w-full left-0 absolute" />

      <div className="w-1 h-159 lg:h-174 absolute top-98 lg:top-113 left-59 lg:left-197 bg-border-faint">
        <Connector className="-left-[10.5px] top-[10.5px] lg:top-9" />
        <Connector className="-left-[10.5px] bottom-[10.5px] lg:bottom-9" />
      </div>

      <div className="w-1 h-159 lg:h-174 absolute top-98 lg:top-113 right-59 lg:right-197 bg-border-faint">
        <Connector className="-left-[10.5px] top-[10.5px] lg:top-9" />
        <Connector className="-left-[10.5px] bottom-[10.5px] lg:bottom-9" />
      </div>

      {Array.from({ length: 2 }, (_, i) => (
        <AnimatePresence initial={false} key={i}>
          {activeBadgeIndex === i && (
            <motion.div
              animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
              className={cn(
                "absolute w-52 lg:w-230 ch-52 bg-[#FDFDFD] z-[4] flex gap-12 items-center pl-16 py-16 rounded-full",
                i === 0 ? "left-33 lg:left-17" : "right-33 lg:right-17",
              )}
              exit={{ y: 2, scale: 0.95, opacity: 0, filter: "blur(1px)" }}
              initial={{ y: 2, scale: 0.95, opacity: 0, filter: "blur(1px)" }}
              key={i}
              style={{
                boxShadow:
                  "0px 24px 32px -12px rgba(0, 0, 0, 0.03), 0px 16px 24px -8px rgba(0, 0, 0, 0.03), 0px 8px 16px -4px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03), 0px 0px 0px 10px #F9F9F9",
              }}
            >
              <Spinner />
              <BadgeText textIndex={textIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

const TEXTS = [
  "Following links",
  "Waiting for page",
  "Smart wait",
  "Scrolling content",
  "Extracting HTML",
  "Extracting text",
  "Extracting markdown",
  "Extracting tables",
  "Extracting metadata",
  "Chunking content",
  "Tagging blocks",
  "Capturing screenshot",
  "Exporting PDF",
  "Parsing Notion",
  "Parsing slides",
  "Processing URLs",
  "Vectorizing",
  "Pushing to vector DB",
  "Generating JSON",
  "Generating QA pairs",
  "Formatting for AI",
  "Notifying agent",
  "Linking to agent",
  "Creating prompts",
  "Webhook triggered",
  "URL fetched",
  "Document uploaded",
  "Sync initialized",
];

const incrementIndex = (ref: RefObject<number>) => {
  ref.current++;

  if (ref.current >= TEXTS.length) ref.current = 0;

  return ref.current;
};

const BadgeText = ({ textIndex }: { textIndex: RefObject<number> }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [activeText, setActiveText] = useState(
    TEXTS[incrementIndex(textIndex)],
  );

  const encryptedText = useSwitchingCode(activeText, 30);

  const text = useEncryptedLoading({
    enabled: true,
    text: "",
    ref,
  });

  useEffect(() => {
    const stopInterval = setIntervalOnVisible({
      element: ref.current,
      callback: () => {
        setActiveText(TEXTS[incrementIndex(textIndex)]);
      },
      interval: 2000,
      immediate: false,
    });

    return () => stopInterval?.();
  }, [textIndex]);

  return (
    <div className="text-body-medium lg-max:hidden" ref={ref}>
      {encryptedText.replaceAll("\n", "")}
      {text}
    </div>
  );
};

const Logo = ({
  active,
  index,
  className,
}: {
  active: boolean;
  index: number;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "absolute size-80 lg:size-96 before:inside-border before:border-border-faint rounded-full flex-center",
        className,
      )}
    >
      <Image
        alt={`Logo ${index}`}
        className={cn("size-48 transition-all", !active && "opacity-48")}
        height={48}
        src={`ai/platforms-${index}`}
        width={48}
      />
    </div>
  );
};
