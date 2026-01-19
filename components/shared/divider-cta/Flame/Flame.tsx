"use client";

import { useEffect, useRef } from "react";

import data from "@/components/app/(home)/sections/hero-flame/data.json";
import CurvyRect from "@/components/shared/layout/curvy-rect";
import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

import data2 from "./dataVariant.json";

export default function DividerCtaFlame({ variant = 0 }: { variant?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const localData = variant === 1 ? data2 : data;

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= localData.length) index = 0;

        ref.current!.innerHTML = localData[index];
      },
      interval: 85,
    });

    return () => interval?.();
  }, [localData]);

  return (
    <div
      className={cn(
        "pointer-events-none select-none p-10 lg-max:absolute lg-max:bottom-0 lg-max:left-0 lg-max:w-full lg-max:h-214",
        variant === 0 && "lg:relative",
      )}
      ref={wrapperRef}
    >
      <CurvyRect
        className="h-214 lg-max:hidden w-full absolute bottom-0 left-0"
        allSides
      />

      <div
        className={cn(
          "overflow-hidden",
          variant === 0 ? "relative h-193" : "absolute inset-10",
        )}
      >
        <div
          className={cn(
            "text-heat-100 font-mono fc-decoration",
            variant === 0
              ? "-bottom-10 center-x"
              : "absolute cw-462 -bottom-81",
          )}
          dangerouslySetInnerHTML={{ __html: localData[0] }}
          ref={ref}
          style={{
            whiteSpace: "pre",
            fontSize: "8px",
            lineHeight: "10px",
          }}
        />
      </div>
    </div>
  );
}
