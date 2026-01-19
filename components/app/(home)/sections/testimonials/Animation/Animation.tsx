"use client";

import { animate } from "motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function TestimonialsRowAnimation({
  children,
  reverse,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  const { isMobile } = useMediaQuery();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = ref.current?.animate(
      {
        transform: reverse
          ? ["translateX(-50%)", "translateX(0)"]
          : ["translateX(0)", "translateX(-50%)"],
      },
      {
        duration: isMobile ? 20000 : 45000,
        iterations: Infinity,
      },
    );

    ref.current?.addEventListener("mouseenter", () => {
      animate(animation?.playbackRate ?? 1, 0, {
        duration: 0.4,
        onUpdate: (value) => {
          animation!.playbackRate = value;
        },
      });
    });

    ref.current?.addEventListener("mouseleave", () => {
      animate(animation?.playbackRate ?? 0, 1, {
        duration: 0.4,
        onUpdate: (value) => {
          animation!.playbackRate = value;
        },
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animation?.play();
        } else {
          animation?.pause();
        }
      });

      observer.observe(ref.current!);
    });

    return () => {
      animation?.cancel();
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <div className={cn("flex w-max", className)} ref={ref}>
      {children}
      {children}
    </div>
  );
}
