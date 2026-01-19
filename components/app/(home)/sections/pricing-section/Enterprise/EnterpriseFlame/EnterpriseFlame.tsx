"use client";

import { useEffect, useRef } from "react";

import data from "@/components/app/(home)/sections/hero-flame/data.json";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

export default function HomePricingEnterpriseFlame() {
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
    <div className="absolute inset-10 pointer-events-none overflow-hidden">
      <div
        className="w-686 h-190 left-93 bottom-30 absolute pointer-events-none select-none"
        ref={wrapperRef}
      >
        <div
          className="text-black-alpha-20 font-ascii fc-decoration"
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
