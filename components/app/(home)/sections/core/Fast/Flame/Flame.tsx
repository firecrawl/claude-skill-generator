"use client";

import { useEffect, useRef } from "react";

import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";
import data from "@/components/app/(home)/sections/hero-flame/data.json";

export default function CoreFastFlame() {
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
    <div
      className="pointer-events-none inset-10 select-none absolute overflow-clip"
      ref={wrapperRef}
    >
      <div className="absolute -bottom-40 h-240 left-[calc(50%-340px)] w-577 overflow-hidden">
        <div
          className="text-heat-100 font-mono fc-decoration"
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
