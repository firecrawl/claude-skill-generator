"use client";

import React from "react";

type BrailleSpinnerProps = {
  className?: string;
  intervalMs?: number;
  label?: string;
};

export default function BrailleSpinner({
  className = "",
  intervalMs = 80,
  label = "Loading",
}: BrailleSpinnerProps) {
  const frames = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, frames.length]);

  return (
    <span
      className={`font-mono ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {frames[index]}
    </span>
  );
}
