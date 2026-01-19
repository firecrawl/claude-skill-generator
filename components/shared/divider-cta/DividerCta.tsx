"use client";
import dynamic from "next/dynamic";
import { useMediaQuery } from "usehooks-ts";

import Badge from "@/components/ui/shadcn/badge";
import Button from "@/components/ui/shadcn/button";
import CurvyRect from "@/components/shared/layout/curvy-rect";
import { cn } from "@/lib/utils";

import DividerCtaMobile from "./Mobile/Mobile";
import DividerCtaPixi from "./Pixi/Pixi";
import FirecrawlIcon from "../firecrawl-icon/firecrawl-icon";
import DividerCtaFlame from "./Flame/Flame";
import Link from "next/link";

export default dynamic(
  () => {
    return Promise.resolve(
      (props: { className?: string; flameVariant?: number }) => {
        const mobile = useMediaQuery("(max-width: 996px)");

        if (mobile) {
          return <DividerCtaMobile {...props} />;
        }

        return <DividerCtaDesktop {...props} />;
      },
    );
  },
  {
    ssr: false,
    loading: () => <div className="h-416 w-full bg-background-base" />,
  },
);

function DividerCtaDesktop({
  className,
  flameVariant = 0,
}: {
  className?: string;
  flameVariant?: number;
}) {
  return (
    <div className={cn("container h-416 flex relative -mt-1", className)}>
      <div className="h-1 top-0 absolute w-screen bg-border-faint left-[calc(50%-50vw)]" />
      <div className="h-1 bottom-0 absolute w-screen bg-border-faint left-[calc(50%-50vw)]" />

      <div className="w-101 -left-101 absolute top-0 h-full !text-mono-x-small pointer-events-none select-none font-mono text-black-alpha-12 text-center">
        <CurvyRect className="w-102 absolute top-0 left-0 h-full" allSides />
        <CurvyRect className="w-102 absolute top-0 -left-101 h-full" right />
        <CurvyRect className="size-102 absolute -top-101 left-0" bottomRight />
        <CurvyRect className="size-102 absolute -bottom-101 left-0" topRight />
        <div className="h-full left-0 w-1 absolute bg-border-faint" />
        <div className="absolute top-10 w-full left-0">[ CTA ]</div>
        <div className="absolute bottom-10 w-full left-0">[ CRAWL ]</div>
      </div>

      <div className="w-101 -right-100 absolute top-0 h-full !text-mono-x-small pointer-events-none select-none font-mono text-black-alpha-12 text-center">
        <CurvyRect className="w-102 absolute top-0 left-0 h-full" allSides />
        <CurvyRect className="w-102 absolute top-0 -right-102 h-full" left />
        <CurvyRect className="size-102 absolute -top-101 left-0" bottomLeft />
        <CurvyRect className="size-102 absolute -bottom-101 left-0" topLeft />
        <div className="h-full -right-1 w-1 absolute bg-border-faint" />
        <div className="absolute top-10 w-full left-0">[ SCRAPE ]</div>
        <div className="absolute bottom-10 w-full left-0">[ CTA ]</div>
      </div>

      <DividerCtaPixi />

      <div className="w-304 relative">
        <div className="h-203">
          {Array.from({ length: 6 }, (_, i) => (
            <CurvyRect
              className="absolute before:inside-border before:border-border-faint before:!border-t-0 before:!border-l-0"
              key={i}
              style={{
                width: 102,
                height: 102,
                left: (i % 3) * 101,
                top: Math.floor(i / 3) * 101,
              }}
              allSides
            />
          ))}
        </div>

        <DividerCtaFlame variant={flameVariant} />
      </div>

      <div className="flex-1 px-24 py-92 text-center relative -ml-1">
        <div className="h-full top-0 absolute w-full pointer-events-none left-0 border-x border-border-faint" />

        <CurvyRect className="h-full w-full absolute top-0 left-0" allSides />

        <Badge className="mb-20 mx-auto">
          <FirecrawlIcon className="size-20" />
          Get started
        </Badge>

        <div className="text-title-h3 mb-16">Ready to build?</div>

        <div className="text-body-large mb-32">
          Start getting Web Data for free and scale seamlessly as your project
          expands.{" "}
          <span className="text-label-large">No credit card needed.</span>
        </div>

        <div className="flex gap-12 justify-center">
          <Link
            href="/signin"
            onClick={() => {
              // GA tracking
              if (typeof window !== "undefined") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "signup_cta_click",
                  cta_location: "divider_section",
                  cta_text: "Start for free",
                  page_url: window.location.pathname,
                });
              }
            }}
          >
            <Button size="large" variant="primary">
              Start for free
            </Button>
          </Link>
          <Link
            href="/pricing"
            onClick={() => {
              // GA tracking
              if (typeof window !== "undefined") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "cta_click",
                  cta_type: "see_our_plans",
                  cta_location: "divider_section",
                  destination: "/pricing",
                  page_url: window.location.pathname,
                });
              }
            }}
          >
            <Button size="large" variant="secondary">
              See our plans
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-304 relative -ml-1">
        <CurvyRect allSides />

        <div className="h-203">
          {Array.from({ length: 6 }, (_, i) => (
            <CurvyRect
              className="absolute before:inside-border before:border-border-faint before:!border-t-0 before:!border-l-0"
              key={i}
              style={{
                width: 102,
                height: 102,
                left: (i % 3) * 101,
                top: Math.floor(i / 3) * 101,
              }}
              allSides
            />
          ))}
        </div>

        <DividerCtaFlame variant={flameVariant} />
      </div>
    </div>
  );
}
