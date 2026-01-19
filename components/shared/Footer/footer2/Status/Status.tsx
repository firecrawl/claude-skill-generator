"use client";

import Button from "@/components/ui/shadcn/button";
import { CurvyRect } from "@/components/shared/ui";
import Link from "next/link";

export default function FooterStatus() {
  // Static status - no backend required
  const state = "operational";
  const label = "All systems operational";

  const dotClass =
    state === "operational"
      ? "bg-accent-bluetron"
      : state === "degraded" || state === "maintenance"
        ? "bg-yellow-400"
        : state === "down"
          ? "bg-red-500"
          : "bg-neutral-400";

  const textClass =
    state === "operational"
      ? "text-accent-bluetron"
      : state === "degraded" || state === "maintenance"
        ? "text-yellow-400"
        : state === "down"
          ? "text-red-500"
          : "text-neutral-400";

  return (
    <div className="p-16 lg:p-24 text-body-medium -mt-1 relative">
      <CurvyRect className="overlay" allSides />
      <div className="h-full lg-max:hidden w-1 top-0 left-[calc(50%-0.5px)] absolute bg-border-faint" />

      <Link
        className="contents"
        href="https://status.firecrawl.dev"
        target="_blank"
      >
        <Button size="large" variant="tertiary">
          <div className="size-20 flex-center">
            <div className={`size-6 rounded-full ${dotClass}`} />
          </div>

          <span className={textClass}>{label}</span>
        </Button>
      </Link>
    </div>
  );
}
