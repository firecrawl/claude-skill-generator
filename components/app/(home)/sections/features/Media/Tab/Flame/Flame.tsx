"use client";

import { HTMLAttributes, useEffect, useRef } from "react";

import data from "@/components/app/(home)/sections/hero-flame/data.json";
import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

export default function MediaTabFlame({
  active,
  ...attrs
}: HTMLAttributes<HTMLDivElement> & { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        if (!active && index === 0) {
          ref.current!.innerHTML = "";
          interval?.();

          return;
        }

        index++;
        if (index >= data.length) index = 0;

        const newStr = data[index];

        if (!ref.current) return;

        ref.current!.innerHTML = newStr;
      },
      interval: 60,
    });

    return () => interval?.();
  }, [active]);

  return (
    <div className="absolute inset-10 overflow-hidden pointer-events-none">
      <div
        ref={wrapperRef}
        {...attrs}
        className={cn(
          "cw-308 h-380 -top-1 absolute select-none",
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
    </div>
  );
}
