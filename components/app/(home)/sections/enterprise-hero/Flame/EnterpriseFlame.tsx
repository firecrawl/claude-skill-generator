"use client";

import { useEffect, useRef } from "react";

import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";
import data from "@/components/shared/effects/flame/hero-flame-data.json";

export default function EnterpriseFlame() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= data.length) index = 0;

        if (ref.current) {
          ref.current.innerHTML = data[index];
        }

        if (ref2.current) {
          ref2.current.innerHTML = data[index];
        }
      },
      interval: 85,
    });

    return () => interval?.();
  }, []);

  return (
    <div
      className="w-[686px] h-[190px] absolute top-[408px] left-1/2 -translate-x-1/2 flex gap-16 pointer-events-none select-none lg-max:hidden z-10"
      ref={wrapperRef}
    >
      <div className="flex-1 overflow-clip relative">
        <div
          className="text-black-alpha-20 font-ascii absolute bottom-0 -left-[380px] fc-decoration"
          dangerouslySetInnerHTML={{ __html: data[0] }}
          ref={ref}
          style={{
            whiteSpace: "pre",
            fontSize: "9px",
            lineHeight: "11px",
          }}
        />
      </div>

      <div className="flex-1 overflow-clip relative">
        <div
          className="text-black-alpha-20 font-ascii absolute bottom-0 -right-[380px] -scale-x-100 fc-decoration"
          dangerouslySetInnerHTML={{ __html: data[0] }}
          ref={ref2}
          style={{
            whiteSpace: "pre",
            fontSize: "9px",
            lineHeight: "11px",
          }}
        />
      </div>
    </div>
  );
}
