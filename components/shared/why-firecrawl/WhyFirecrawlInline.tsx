"use client";

import { whyFirecrawlData as whyFirecrawl } from "@/marketing-global/shared/why-firecrawl";

export default function WhyFirecrawlInline() {
  return (
    <div className="pt-48 pb-32 px-20 lg:px-64 border-t border-border-faint -mt-1">
      <div className="mb-40">
        <h3 className="text-label-x-large text-accent-black mb-12">
          {whyFirecrawl.title}
        </h3>

        <p className="text-body-large text-black-alpha-64">
          {whyFirecrawl.description}
        </p>
      </div>

      <div className="space-y-24">
        {whyFirecrawl.benefits.map((benefit, index) => (
          <div
            key={index}
            className="border-b border-border-faint pb-24 last:border-0 last:pb-0"
          >
            <h4 className="text-body-large font-semibold text-accent-black mb-8">
              {benefit.title}
            </h4>
            <p className="text-body-medium text-black-alpha-64">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
