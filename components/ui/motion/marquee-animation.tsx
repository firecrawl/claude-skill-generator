"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export default function MarqueeAnimation({
  children,
  reverse,
  className,
  duration = 80000,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf1 = 0;
    let raf2 = 0;

    const measure = () => {
      const half = Math.floor(el.scrollWidth / 2);
      if (half > 0) setDistance(half);
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(measure);
    });

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro?.disconnect();
    };
  }, [children]);

  return (
    <motion.div
      className={cn(
        "flex w-max transform-gpu will-change-transform",
        className,
      )}
      ref={ref}
      animate={
        distance ? { x: reverse ? [-distance, 0] : [0, -distance] } : undefined
      }
      transition={{
        duration: duration / 1000,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {children}
      {children}
    </motion.div>
  );
}
