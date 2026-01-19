import { CurvyRect } from "@/components/shared/ui";
import { cn } from "@/lib/utils";

import Checkmark from "./_svg/Checkmark";

interface FeatureTier {
  name: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const featureTiers: FeatureTier[] = [
  {
    name: "Core Features",
    description: "Available across all tiers",
    features: [
      "API and MCP access",
      "Markdown & JSON extraction",
      "Crawl, Scrape, Map, Search operations",
      "Email and live chat support",
      "Basic dashboard analytics",
    ],
  },
  {
    name: "Scale Features",
    description: "Enhanced capabilities for growing teams",
    features: [
      "100-150 concurrent browsers",
      "Dedicated Slack channel",
      "Cost-effective auto-charge packs",
      "Up to 2x monthly rollover cap",
      "Advanced dashboard analytics",
    ],
  },
  {
    name: "Enterprise Features",
    description: "Maximum performance and security",
    features: [
      "Custom concurrent browsers",
      "Priority support SLA",
      "Zero-data retention",
      "Whitelisted IP addresses",
      "Up to 3x monthly rollover cap",
    ],
  },
];

export default function EnterpriseFeatures() {
  return (
    <section className="container -mt-1">
      <div className="relative">
        <CurvyRect className="overlay" allSides />

        <div className="grid lg:grid-cols-3 gap-1">
          {featureTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={cn(
                "relative p-24 lg:p-32 border-b lg:border-b-0 lg:border-r border-border-faint last:border-r-0",
                tier.highlight && "bg-heat-4",
              )}
            >
              <div className="mb-16">
                <h3 className="text-title-h5 mb-8">{tier.name}</h3>
                <p className="text-body-medium text-black-alpha-72">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-12">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex gap-12 items-start">
                    <Checkmark />
                    <span className="text-body-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
