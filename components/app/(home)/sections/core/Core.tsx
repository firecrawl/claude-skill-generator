import { CurvyRect } from "@/components/shared/ui";
import SectionHead from "@/components/shared/section-head/SectionHead";

import BadgeIcon from "./_svg/BadgeIcon";
import Proxy from "./_svg/Proxy";
import CoreCard from "./Card/Card";
import CoreFast from "./Fast/Fast";
import CoreFlame from "./Flame/Flame";
import CoreReliable from "./Reliable/Reliable";

export default function Core() {
  return (
    <section className="container -mt-1">
      <SectionHead
        badgeClassName="h-max lg:!mx-[0px]"
        badgeContent={
          <>
            <BadgeIcon />
            <span>Built to outperform</span>
          </>
        }
        className="!mx-[0px]"
        containerClassName="lg:max-w-[736px] lg:mx-auto lg:flex justify-between px-10"
        description="Built from the ground up to outperform traditional scrapers."
        descriptionClassName="lg:!mx-[0px] lg:!text-start lg:!max-w-[unset]"
        title={
          <>
            Core principles, <br /> proven{" "}
            <span className="text-heat-100">performance</span>
          </>
        }
        titleClassName="lg:max-w-600 lg:!text-title-h3 lg:!mx-[0px] lg:!text-start lg:!pt-0"
      >
        <CoreFlame />
      </SectionHead>

      <div className="relative lg:flex gap-16 -mt-1">
        <CurvyRect className="overlay" allSides />

        <CurvyRect
          className="w-18 h-full absolute top-0 left-[calc(50%-9px)]"
          allSides
        />

        <CoreCard
          description={
            <>
              Covers 96% of the web, <br className="lg-max:hidden" /> including
              JS-heavy and protected pages. No proxies, no puppets, just clean
              data.
            </>
          }
          icon={Proxy}
          subtitle="No proxy headaches"
          title="Reliable."
        >
          <CoreReliable />
        </CoreCard>

        <div className="lg:hidden -mt-1 h-52 relative border-t border-border-faint">
          <CurvyRect
            className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
            allSides
          />
        </div>

        <CoreCard
          className="core-fast"
          description={
            <>
              Delivers results in less than 1 second, fast for real-time agents{" "}
              <br className="lg-max:hidden" /> and dynamic apps.
            </>
          }
          icon={Proxy}
          subtitle="Speed that feels invisible"
          title="Blazingly fast."
        >
          <CoreFast />
        </CoreCard>
      </div>
    </section>
  );
}
