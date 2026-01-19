"use client";

import { useEffect, useRef } from "react";

import data from "@/components/app/(home)/sections/hero-flame/data.json";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

export default function HomePricingPlanFlame() {
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
      interval: 85,
    });

    return () => interval?.();
  }, []);

  return (
    <div className="absolute inset-10 overflow-hidden pointer-events-none z-[0]">
      <div
        className="w-686 h-190 -left-97 -top-40 absolute pointer-events-none select-none"
        ref={wrapperRef}
      >
        <div
          className="text-heat-100 font-ascii fc-decoration"
          dangerouslySetInnerHTML={{ __html: data[0] }}
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
