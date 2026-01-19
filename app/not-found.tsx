"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import { Connector } from "@/components/shared/layout/curvy-rect";
import { AsciiExplosion } from "@/components/shared/effects/flame/ascii-explosion";
import ScrambleText from "@/components/ui/motion/scramble-text";
import { ChevronSlide } from "@/components/shared/icons/chevron-slide";

export default function NotFound() {
  const router = useRouter();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
  }, []);

  // Memoize the logo section to prevent ASCII animation from re-rendering
  const logoSection = useMemo(
    () => (
      <div className="relative">
        {/* Full width top border */}
        <div className="absolute top-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
        <Connector className="absolute -top-[10px] -left-[10.5px]" />
        <Connector className="absolute -top-[10px] -right-[10.5px]" />

        <div className="pt-48 pb-32 relative overflow-hidden">
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

  // Use shared animated chevron, rotated to point left

  return (
    <div className="h-screen bg-background-base relative flex flex-col overflow-hidden">
      <div className="w-full max-w-[400px] mx-auto relative h-full flex flex-col">
        {/* Full height vertical borders that frame the content - positioned to align with connectors */}
        <div className="absolute left-0 top-0 h-full w-1 bg-border-faint" />
        <div className="absolute right-0 top-0 h-full w-1 bg-border-faint" />

        {/* Content wrapper */}
        <div className="relative">
          {/* Logo section - Fixed and Memoized */}
          {logoSection}

          {/* 404 Content section with soft red background */}
          <div className="relative bg-red-50/50">
            <div className="px-16 py-32 text-center">
              <h1 className="font-mono text-heading-xl text-primary">
                <ScrambleText
                  text="404 - Not Found"
                  delay={0.2}
                  duration={1.5}
                  isInView={isInView}
                />
              </h1>
            </div>
            {/* Full width bottom border */}
            <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
            <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
            <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
          </div>

          {/* Spacer pushes the CTA section to the bottom like error boundary */}
          <div className="flex-1" />

          <div className="relative">
            <div className="px-16 py-24">
              <button
                className="group inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 h-48 px-24 text-label-large gap-10 bg-white text-black border border-black-alpha-8 hover:bg-black-alpha-4 hover:border-black-alpha-12 active:scale-[0.98] w-full"
                onClick={() => router.push("/")}
              >
                <ChevronSlide direction="left" className="-ml-2" />
                <span>Go Back Home</span>
              </button>
            </div>

            {/* Full width bottom border */}
            <div className="absolute bottom-0 w-screen left-[calc(50%-50vw)] h-1 bg-border-faint" />
            <Connector className="absolute -bottom-[10px] -left-[10.5px]" />
            <Connector className="absolute -bottom-[10px] -right-[10.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
