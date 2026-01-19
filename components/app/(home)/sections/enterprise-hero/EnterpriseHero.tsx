import Link from "next/link";
import Button from "@/components/ui/shadcn/button";

import { Connector } from "@/components/shared/layout/curvy-rect";

import EnterpriseHeroBadge from "./Badge/Badge";
import EnterpriseHeroTitle from "./Title/Title";
import EnterpriseFlame from "./Flame/EnterpriseFlame";

export default function EnterpriseHero() {
  return (
    <section className="overflow-x-clip" id="enterprise-hero">
      <div
        className="pt-28 lg:pt-254 lg:-mt-100 pb-115 relative"
        id="hero-content"
      >
        <EnterpriseFlame />

        <div className="relative container px-16">
          <EnterpriseHeroBadge />
          <EnterpriseHeroTitle />

          <p className="text-center text-body-large mb-32">
            Enterprise-grade reliability and scale for mission-critical
            applications.
            <span className="lg:hidden"> </span>
            <br className="lg-max:hidden" />
            Trusted by leading companies worldwide.
          </p>

          <div className="flex flex-col lg:flex-row gap-16 justify-center items-center">
            <Link
              href="https://calendly.com/your-link"
              className="relative block w-max z-[20]"
            >
              <Button className="w-150 z-[20]" size="large" variant="primary">
                Contact sales
              </Button>
              <span className="z-[-1] !absolute -inset-10 bg-background-base" />
            </Link>
            <Link href="/docs" className="relative block w-max z-[20]">
              <Button
                className="min-w-150 z-[20]"
                size="large"
                variant="secondary"
              >
                Explore docs
              </Button>
              <span className="z-[-1] !absolute -inset-10 bg-background-base" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container lg:contents !p-16 relative -mt-90">
        <div className="absolute top-0 left-[calc(50%-50vw)] w-screen h-1 bg-border-faint lg:hidden" />
        <div className="absolute bottom-0 left-[calc(50%-50vw)] w-screen h-1 bg-border-faint lg:hidden" />

        <Connector className="-top-10 -left-[10.5px] lg:hidden" />
        <Connector className="-top-10 -right-[10.5px] lg:hidden" />
        <Connector className="-bottom-10 -left-[10.5px] lg:hidden" />
        <Connector className="-bottom-10 -right-[10.5px] lg:hidden" />
      </div>
    </section>
  );
}
