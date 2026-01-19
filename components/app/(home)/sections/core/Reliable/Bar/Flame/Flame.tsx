"use client";

import { HTMLAttributes, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";
import data from "@/components/shared/effects/flame/explosion-data.json";

interface CoreReliableBarFlameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "bar" | "fill";
  textClassName?: string;
  fontSizePx?: number;
  lineHeightPx?: number;
}

export default function CoreReliableBarFlame({
  variant = "bar",
  textClassName = "text-accent-white opacity-40",
  fontSizePx = 10,
  lineHeightPx = 12.5,
  className,
  ...attrs
}: CoreReliableBarFlameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= data.length) index = 0;

        ref.current!.innerHTML = data[index];
      },
      interval: 80,
    });

    return () => interval?.();
  }, []);

  const wrapperClass =
    variant === "fill"
      ? "relative pointer-events-none select-none w-full h-full"
      : "right-63 w-720 -top-188 h-400 absolute pointer-events-none select-none";

  return (
    <div ref={wrapperRef} {...attrs} className={cn(wrapperClass, className)}>
      <div
        className={cn(
          "font-ascii fc-decoration",
          variant === "fill" ? "absolute inset-0" : "",
          textClassName,
        )}
        ref={ref}
        style={{
          whiteSpace: "pre",
          fontSize: `${fontSizePx}px`,
          lineHeight: `${lineHeightPx}px`,
        }}
      />
    </div>
  );
}
