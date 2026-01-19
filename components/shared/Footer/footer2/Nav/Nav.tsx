import { Fragment } from "react";

import { CurvyRect } from "@/components/shared/ui";

import FooterNavItem from "./Item/Item";

export default function FooterNav() {
  return (
    <div className="flex flex-wrap relative pl-1">
      {items.map((group, index) => (
        <Fragment key={group.label}>
          <div
            className="lg-max:w-[calc(50%+1px)] lg:flex-1 lg-max:-mt-1 -ml-1"
            key={group.label}
          >
            <div className="text-label-medium py-16 px-20 lg:p-28 relative before:inside-border before:border-border-faint">
              {group.label}
            </div>

            {group.items.map((item) => (
              <FooterNavItem
                className="-mt-1"
                href={item.href}
                key={item.label}
                label={item.label}
                target={item.target ?? undefined}
              />
            ))}
          </div>

          {index === 1 && (
            <div className="lg:hidden w-[calc(100%+1px)] -ml-1 -mt-1 h-52 relative border-y border-border-faint">
              <CurvyRect
                className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
                allSides
              />
              <CurvyRect
                className="h-200 absolute top-full left-0 w-full"
                top
              />
              <CurvyRect
                className="h-200 absolute bottom-full left-0 w-full"
                bottom
              />
            </div>
          )}
        </Fragment>
      ))}

      <CurvyRect
        className="-top-1 h-[calc(100%+1px)] w-full absolute left-0"
        allSides
      />
    </div>
  );
}

const items = [
  {
    label: "Products",
    items: [
      { label: "Playground", href: "/playground" },
      { label: "Extract", href: "/extract" },
      { label: "Pricing", href: "/pricing" },
      { label: "Templates", href: "/templates" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    label: "Use Cases",
    items: [
      {
        label: "AI Platforms",
        href: "/use-cases/ai-platforms",
      },
      {
        label: "Lead Enrichment",
        href: "/use-cases/lead-enrichment",
      },
      {
        label: "SEO Teams",
        href: "/use-cases/seo-teams",
      },
      {
        label: "Deep Research",
        href: "/use-cases/deep-research",
      },
      {
        label: "Competitive Intelligence",
        href: "/use-cases/competitive-intelligence",
      },
    ],
  },
  {
    label: "Documentation",
    items: [
      {
        label: "Getting started",
        href: "https://docs.firecrawl.dev/introduction",
        target: "_blank",
      },
      {
        label: "API Reference",
        href: "https://docs.firecrawl.dev/api-reference/introduction",
        target: "_blank",
      },
      { label: "Integrations", href: "https://www.firecrawl.dev/app" },
      {
        label: "Examples",
        href: "https://docs.firecrawl.dev/use-cases/overview",
      },
      {
        label: "SDKs",
        href: "https://docs.firecrawl.dev/sdks/overview",
        target: "_blank",
      },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Creator & OSS program", href: "/creator-oss-program" },
      { label: "Student program", href: "/student-program" },
    ],
  },
];
