"use client";

import { HTMLMotionProps, motion } from "motion/react";
import { Ref, useEffect, useRef } from "react";

// import data from '@/components/app/(home)/sections/hero-flame/data.json';
import data from "./data.json";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

export default function FeaturesStealthFlame({
  active,
  ...attrs
}: HTMLMotionProps<"div"> & { active?: boolean }) {
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
  }, [active]);

  return (
    <motion.div
      className={cn(
        "cw-[308px] z-[1] ch-320 absolute pointer-events-none select-none",
        attrs.className,
      )}
      //@ts-ignore
      ref={wrapperRef as Ref<HTMLDivElement> | undefined}
      {...attrs}
      animate={active ? { scale: 1, opacity: 1 } : { scale: 0.99, opacity: 0 }}
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
    </motion.div>
  );
}
