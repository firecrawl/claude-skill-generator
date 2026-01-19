"use client";

import { Shield } from "lucide-react";
import CurvyRect from "@/components/shared/layout/curvy-rect";
import Badge from "@/components/ui/shadcn/badge";
import { whyFirecrawlData as whyFirecrawl } from "@/marketing-global/shared/why-firecrawl";
import Link from "next/link";

export default function WhyFirecrawl() {
  return (
    <section className="container -mt-1">
      <div className="relative -mt-1" id="why-firecrawl">
        <div className="h-1 bg-border-faint top-0 left-0 w-full absolute" />
        <div className="overlay border-x border-border-faint pointer-events-none z-[2]" />
        <CurvyRect
          className="absolute -top-1 h-[calc(100%+1px)] left-0 w-full"
          allSides
        />

        <div className="p-32 lg:pt-60 lg:pb-60 lg:px-64 relative z-[1]">
          {/* Header */}
          <div className="max-w-900 mx-auto mb-40">
            <div className="flex flex-wrap gap-12 justify-center mb-20">
              <Badge className="px-12 pt-16">
                <div className="px-8 text-label-x-small">
                  Used by over 500,000 developers
                </div>
              </Badge>
              <Link
                href="/blog/the-worlds-best-web-data-api-v25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge className="px-12 pt-16 hover:bg-heat-100 hover:text-white transition-colors cursor-pointer">
                  <div className="px-8 text-label-x-small">
                    The most reliable web scraping API
                  </div>
                </Badge>
              </Link>
            </div>

            <h2 className="text-label-x-large text-accent-black mb-12 text-center">
              {whyFirecrawl.title}
            </h2>

            <p className="text-body-large text-black-alpha-64 mb-32 text-center">
              {whyFirecrawl.description}
            </p>
          </div>

          {/* Benefits List */}
          <div className="max-w-900 mx-auto space-y-24">
            {whyFirecrawl.benefits.map((benefit, index) => (
              <div
                key={index}
                className="border-b border-border-faint pb-24 last:border-0 last:pb-0"
              >
                <h3 className="text-body-large font-semibold text-accent-black mb-8">
                  {benefit.title}
                </h3>
                <p className="text-body-medium text-black-alpha-64">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
