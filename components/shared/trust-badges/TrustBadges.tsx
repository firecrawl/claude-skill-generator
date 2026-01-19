"use client";

import Badge from "@/components/ui/shadcn/badge";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";

export default function TrustBadges() {
  return (
    <section className="container -mt-1">
      <div className="relative -mt-1 py-32 lg:py-40">
        <div className="h-1 bg-border-faint top-0 left-0 w-full absolute" />
        <div className="h-1 bg-border-faint bottom-0 left-0 w-full absolute" />

        <div className="flex flex-wrap gap-12 justify-center">
          <Badge className="px-12 pt-16">
            <FirecrawlIcon className="size-20" />
            <div className="text-label-x-small">
              Used by over 500,000 developers
            </div>
          </Badge>
        </div>
      </div>
    </section>
  );
}
