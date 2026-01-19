"use client";

import { HTMLAttributes, memo, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

import data from "./explosion-data.json";

function AsciiExplosionImpl(attrs: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize first frame to avoid blank content and avoid resets on re-render
    if (ref.current) {
      ref.current.innerHTML = data[0];
    }

    let index = 0;
    let isFastPass = true;

    const cleanup = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        // Speed up the first playthrough, then revert to normal speed
        index += isFastPass ? 2 : 1;

        if (index >= data.length) {
          if (isFastPass) {
            isFastPass = false;
            index = -40; // add pause before normal-speed loops
            return;
          }
          index = -40;
          return;
        }
        if (index < 0) return;

        if (ref.current) {
          ref.current.innerHTML = data[index];
        }
      },
      interval: 40,
    });

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={wrapperRef}
      {...attrs}
      className={cn(
        "w-[720px] h-[400px] absolute gap-16 pointer-events-none select-none hidden lg:flex",
        attrs.className,
      )}
    >
      <div
        className="text-[#FA5D19] font-mono fc-decoration"
        ref={ref}
        style={{
          whiteSpace: "pre",
          fontSize: "10px",
          lineHeight: "12.5px",
        }}
      />
    </div>
  );
}

export const AsciiExplosion = memo(AsciiExplosionImpl);

// Default export for backward compatibility
export default AsciiExplosion;
