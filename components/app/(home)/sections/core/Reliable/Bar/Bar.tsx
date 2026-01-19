"use client";

import { animate, cubicBezier } from "motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import "./Bar.css";
import CoreReliableBarFlame from "./Flame/Flame";

export default function CoreReliableBar({
  value,
  isPrimary,
  heightClass = "h-full",
  showLabel = true,
  withTrack = false,
  trackClass = "",
  trackBgClass = "bg-black-alpha-4",
  innerPaddingClass = "p-1",
}: {
  value: number;
  isPrimary?: boolean;
  heightClass?: string;
  showLabel?: boolean;
  withTrack?: boolean;
  trackClass?: string;
  trackBgClass?: string;
  innerPaddingClass?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animate(0, value, {
      duration: 5,
      delay: value / 100,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
      onUpdate: (currentValue) => {
        if (wrapperRef.current) {
          // If rendering with a track, animate from 0 to value%; else use original offset behavior
          const widthPct = withTrack
            ? currentValue
            : 23 + (currentValue / value) * (value - 23);
          wrapperRef.current.style.width = `${widthPct}%`;
        }

        if (textRef.current) {
          textRef.current.textContent = `${Math.floor(currentValue)}%`;
        }
      },
    });
  }, [value, withTrack]);

  // With track: render a full-width track and animate the inner fill bar
  if (withTrack) {
    return (
      <div className={cn("w-full relative", trackClass)}>
        <div
          className={cn(
            "relative rounded-full overflow-clip before:inside-border before:border-border-faint",
            trackBgClass,
            heightClass,
            innerPaddingClass,
          )}
        >
          <div
            className={cn(
              "h-full rounded-full",
              isPrimary ? "core-reliable-bar-primary" : "bg-heat-100",
            )}
            ref={wrapperRef}
            style={{ width: "0%" }}
          >
            {isPrimary && <CoreReliableBarFlame />}
          </div>
          {showLabel && (
            <div
              className={cn(
                "absolute top-6 right-6 rounded-full py-2 w-48 text-center text-mono-small font-mono before:inside-border",
                isPrimary
                  ? "bg-white/8 before:border-white/12 text-accent-white"
                  : "before:border-black-alpha-5 text-black-alpha-56",
              )}
              ref={textRef}
            >
              0%
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original behavior without track
  return (
    <div
      className={cn(
        heightClass,
        "relative rounded-full w-[23%] overflow-clip",
        !isPrimary && "before:inside-border before:border-border-faint",
        isPrimary && "core-reliable-bar-primary",
      )}
      ref={wrapperRef}
    >
      {isPrimary && <CoreReliableBarFlame />}

      {showLabel && (
        <div
          className={cn(
            "absolute top-6 right-6 rounded-full py-2 w-48 text-center text-mono-small font-mono before:inside-border",
            isPrimary
              ? "bg-white/8 before:border-white/12 text-accent-white"
              : "before:border-black-alpha-5 text-black-alpha-56",
          )}
          ref={textRef}
        >
          0%
        </div>
      )}
    </div>
  );
}
