"use client";

import { useEffect, useRef } from "react";

import data from "@/components/shared/effects/flame/hero-flame-data.json";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

export default function Flame({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current as HTMLElement,
      callback: () => {
        index++;
        if (index >= data.length) index = 0;

        if (ref.current) {
          ref.current.innerHTML = data[index];
        }
      },
      interval: 85,
    });

    return () => interval?.();
  }, []);

  return (
    <div
      className={cn(
        "w-577 h-190 -top-102 absolute pointer-events-none select-none",
        className,
      )}
      ref={wrapperRef}
    >
      <div
        className="font-ascii fc-decoration"
        dangerouslySetInnerHTML={{ __html: data[0] }}
        ref={ref}
        style={{
          whiteSpace: "pre",
          fontSize: "8px",
          lineHeight: "10px",
        }}
      />
    </div>
  );
}
