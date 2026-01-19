"use client";

import { HTMLAttributes, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

import data from "./data.json";

export default function AiPlatformsFlame(
  attrs: HTMLAttributes<HTMLDivElement>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= data.length) index = 0;

        const newStr = data[index];

        ref.current!.innerHTML = newStr;
      },
      interval: 60,
    });

    return () => interval?.();
  }, []);

  return (
    <div
      ref={wrapperRef}
      {...attrs}
      className={cn(
        "cw-[308px] z-[1] ch-320 absolute pointer-events-none select-none",
        attrs.className,
      )}
    >
      <div
        className="text-heat-100 font-ascii fc-decoration"
        ref={ref}
        style={{
          whiteSpace: "pre",
          fontSize: 8,
          lineHeight: "10px",
        }}
      />
    </div>
  );
}
