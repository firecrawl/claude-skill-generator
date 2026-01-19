"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import { Connector } from "@/components/shared/layout/curvy-rect";
import { AsciiExplosion } from "@/components/shared/effects/flame/ascii-explosion";
import AnimatedWidth from "@/components/shared/layout/animated-width";
import CopyIcon from "@/components/shared/icons/copy";
import CopiedIcon from "@/components/shared/icons/copied";
import ScrambleText from "@/components/ui/motion/scramble-text";
import { AnimatePresence, motion } from "motion/react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const copiedTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    setIsInView(true);
  }, [error]);

  const handleCopy = () => {
    const errorText = `Error: ${error.message || "An unexpected error occurred"}${
      error.digest ? `\nID: ${error.digest}` : ""
    }${error.stack ? `\n\nStack:\n${error.stack}` : ""}`;

    void navigator.clipboard.writeText(errorText);
    setCopied(true);

    if (copiedTimeout.current) {
      clearTimeout(copiedTimeout.current);
    }

    copiedTimeout.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Memoize the logo section to prevent ASCII animation from re-rendering
  const logoSection = useMemo(
    () => (
      <div className="relative">
        {/* Full width top border */}
        <div className="absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
        <Connector className="absolute -top-[10px] -left-[10.5px]" />
        <Connector className="absolute -top-[10px] -right-[10.5px]" />

        <div className="pt-24 pb-32 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[300px]">
              <AsciiExplosion className="!relative !w-full !h-full opacity-80 !text-black-alpha-20" />
            </div>
          </div>
          <div className="flex items-center justify-center relative z-10">
            <FirecrawlIcon className="size-48" />
          </div>
        </div>

        {/* Full width bottom border */}
        <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
        <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
        <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
      </div>
    ),
    [],
  );

  // Custom animated arrow icon
  const AnimatedArrowLeft = () => (
    <svg
      className="-ml-1 mr-1.5 stroke-[1.5px]"
      fill="none"
      stroke="currentColor"
      width="11"
      height="11"
      viewBox="0 0 10 10"
      aria-hidden="true"
    >
      <path
        className="opacity-0 transition group-hover:opacity-100"
        d="M10 5h-7"
      />
      <path
        className="transition group-hover:-translate-x-[3px]"
        d="M9 1l-4 4 4 4"
      />
    </svg>
  );

  return (
    <div className="h-screen bg-background-base relative flex flex-col overflow-hidden">
      {/* Desktop layout */}
      <div className="w-full pt-108 max-w-[400px] mx-auto relative flex-col h-full hidden lg:flex">
        {/* Full height vertical borders that frame the content - positioned to align with connectors */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-border-faint" />
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-border-faint" />

        {/* Logo section - Fixed position from top */}
        {logoSection}

        {/* Error message panel - similar to 404 */}
        <div className="relative bg-red-50/50">
          <div className="px-16 py-32 text-center">
            <p className="font-mono text-body-large text-primary">
              <ScrambleText
                text="Something went wrong..."
                delay={0.2}
                duration={1.5}
                isInView={isInView}
              />
            </p>
          </div>
          {/* Full width bottom border */}
          <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
          <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
          <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
        </div>

        {/* Button section */}
        <div className="relative">
          <div className="px-16 py-24  flex gap-12">
            <button
              className="group inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 h-40 px-20 text-label-medium gap-8 bg-white text-black border border-black-alpha-8 hover:bg-black-alpha-4 hover:border-black-alpha-12 active:scale-[0.98] flex-1"
              onClick={() => router.push("/")}
            >
              <AnimatedArrowLeft />
              <span>Go Home</span>
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 h-40 px-20 text-label-medium gap-8 bg-heat-100 text-white hover:bg-heat-200 active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(250,93,25,0.25)] flex-1"
              onClick={reset}
            >
              Try Again
            </button>
          </div>

          {/* Full width bottom border */}
          <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
          <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
          <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
        </div>

        {/* Error diagnostic section - scrollable area; keeps copy button visible at bottom */}
        <div className="relative flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto px-16 py-24 font-mono text-body-small text-black-alpha-80 space-y-16">
            {/* Error message */}
            <div className="break-all">
              {error.message || "An unexpected error occurred"}
            </div>

            {/* Error ID if available */}
            {error.digest && (
              <div className="text-black-alpha-60">ID: {error.digest}</div>
            )}

            {/* Stack trace in dev mode */}
            {process.env.NODE_ENV === "development" && error.stack && (
              <pre className="text-body-x-small text-black-alpha-60 overflow-x-auto whitespace-pre-wrap break-all">
                {error.stack}
              </pre>
            )}
          </div>

          {/* Copy button section */}
          <div className="relative">
            {/* Full width top border */}
            <div className="absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
            <Connector className="absolute -top-[10px] -left-[10.5px]" />
            <Connector className="absolute -top-[10px] -right-[10.5px]" />

            <div className="px-16 py-24 ">
              <button
                className="group inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 h-48 px-24 text-label-large bg-black text-white hover:bg-black/90 active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-full overflow-hidden"
                onClick={handleCopy}
              >
                <AnimatedWidth initial={{ width: "auto" }}>
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      className="flex gap-8 items-center justify-center"
                      exit={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
                      initial={{ opacity: 0, filter: "blur(2px)", scale: 0.95 }}
                      key={copied ? "copied" : "copy"}
                    >
                      <div className="w-16 h-16">
                        {copied ? <CopiedIcon /> : <CopyIcon />}
                      </div>
                      <span>{copied ? "Copied!" : "Copy Error"}</span>
                    </motion.div>
                  </AnimatePresence>
                </AnimatedWidth>
              </button>
            </div>

            {/* Full width bottom border */}
            <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
            <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
            <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
          </div>
        </div>
      </div>

      {/* Mobile layout - optimized for proper alignment */}
      <div className="w-full max-w-[400px] mx-auto relative flex flex-col h-full lg:hidden">
        {/* Full height vertical borders that frame the content */}
        <div className="absolute left-0 top-0 h-full w-1 bg-border-faint" />
        <div className="absolute right-0 top-0 h-full w-1 bg-border-faint" />

        {/* Logo section - Fixed at top */}
        <div className="flex-shrink-0">{logoSection}</div>

        {/* Error message panel */}
        <div className="relative bg-red-50/50 flex-shrink-0">
          <div className="px-16 py-32 text-center">
            <p className="font-mono text-body-large text-primary">
              <ScrambleText
                text="Something went wrong..."
                delay={0.2}
                duration={1.5}
                isInView={isInView}
              />
            </p>
          </div>
          {/* Full width bottom border */}
          <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
          <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
          <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
        </div>

        {/* Button section */}
        <div className="relative flex-shrink-0">
          <div className="px-16 py-24  flex gap-12">
            <button
              className="group inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 h-40 px-20 text-label-medium gap-8 bg-white text-black border border-black-alpha-8 hover:bg-black-alpha-4 hover:border-black-alpha-12 active:scale-[0.98] flex-1"
              onClick={() => router.push("/")}
            >
              <AnimatedArrowLeft />
              <span>Go Home</span>
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 h-40 px-20 text-label-medium gap-8 bg-heat-100 text-white hover:bg-heat-200 active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(250,93,25,0.25)] flex-1"
              onClick={reset}
            >
              Try Again
            </button>
          </div>

          {/* Full width bottom border */}
          <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
          <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
          <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
        </div>

        {/* Error diagnostic section - Fills remaining space */}
        <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-16 py-24 font-mono text-body-small text-black-alpha-80 space-y-16">
            {/* Error message */}
            <div className="break-all">
              {error.message || "An unexpected error occurred"}
            </div>

            {/* Error ID if available */}
            {error.digest && (
              <div className="text-black-alpha-60">ID: {error.digest}</div>
            )}

            {/* Stack trace in dev mode */}
            {process.env.NODE_ENV === "development" && error.stack && (
              <pre className="text-body-x-small text-black-alpha-60 overflow-x-auto whitespace-pre-wrap break-all">
                {error.stack}
              </pre>
            )}
          </div>
        </div>

        {/* Copy button section - Fixed at bottom */}
        <div className="relative flex-shrink-0">
          {/* Full width top border */}
          <div className="absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
          <Connector className="absolute -top-[10px] -left-[10.5px]" />
          <Connector className="absolute -top-[10px] -right-[10.5px]" />

          <div className="px-16 py-24 ">
            <button
              className="group inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 h-48 px-24 text-label-large bg-black text-white hover:bg-black/90 active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-full overflow-hidden"
              onClick={handleCopy}
            >
              <AnimatedWidth initial={{ width: "auto" }}>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    className="flex gap-8 items-center justify-center"
                    exit={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
                    initial={{ opacity: 0, filter: "blur(2px)", scale: 0.95 }}
                    key={copied ? "copied" : "copy"}
                  >
                    <div className="w-16 h-16">
                      {copied ? <CopiedIcon /> : <CopyIcon />}
                    </div>
                    <span>{copied ? "Copied!" : "Copy Error"}</span>
                  </motion.div>
                </AnimatePresence>
              </AnimatedWidth>
            </button>
          </div>

          {/* Full width bottom border */}
          <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
          <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
          <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
        </div>
      </div>
    </div>
  );
}
