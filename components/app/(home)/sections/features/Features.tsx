"use client";
import { CurvyRect } from "@/components/shared/ui";
import SectionHead from "@/components/shared/section-head/SectionHead";

import ActionsIcon from "./_svg/ActionsIcon";
import BadgeIcon from "./_svg/BadgeIcon";
import DocsIcon from "./_svg/DocsIcon";
import InvisibleIcon from "./_svg/InvisibleIcon";
import WaitIcon from "./_svg/WaitIcon";
import FeaturesActions from "./Actions/Actions";
import FeaturesCached from "./Cached/Cached";
import FeaturesCard from "./Card/Card";
import FeaturesFlame from "./Flame/Flame";
import FeaturesMedia from "./Media/Media";
import FeaturesStealth from "./Stealth/Stealth";
import FeaturesWait from "./Wait/Wait";

export default function Features() {
  return (
    <section className="container -mt-1">
      <SectionHead
        badgeContent={
          <>
            <BadgeIcon />
            <div>Zero configuration</div>
          </>
        }
        description="Rotating proxies, orchestration, rate limits, js-blocked content and more."
        title={
          <>
            We handle the <span className="text-heat-100">hard stuff</span>
          </>
        }
      >
        <FeaturesFlame />
      </SectionHead>

      <div className="lg:grid grid-cols-2 relative gap-16">
        <div className="h-1 bg-border-faint w-full absolute bottom-0 left-0" />

        <CurvyRect
          className="lg-max:hidden w-18 h-[calc(100%+1px)] left-[calc(50%-9px)] absolute -top-1"
          allSides
        />

        <FeaturesCard
          animationClassName="h-352"
          className="features-media"
          description="Firecrawl can parse and output content from web hosted pdfs, docx, and more."
          icon={DocsIcon}
          subtitle="Docs to data"
          title="Media parsing."
        >
          <FeaturesMedia />
        </FeaturesCard>

        <div className="lg:hidden -mt-1 h-52 relative border-y border-border-faint">
          <CurvyRect
            className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
            allSides
          />
        </div>

        <FeaturesCard
          animationClassName="h-352"
          className="features-wait"
          description="Firecrawl intelligently waits for content to load, making scraping faster and more reliable."
          icon={WaitIcon}
          subtitle="Knows the moment"
          title="Smart wait."
        >
          <FeaturesWait />
        </FeaturesCard>
      </div>

      <div className="lg:hidden -mt-1 h-52 relative border-y border-border-faint">
        <CurvyRect
          className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
          allSides
        />
      </div>

      <FeaturesCached />

      <div className="lg:hidden -mt-1 h-52 relative border-y border-border-faint">
        <CurvyRect
          className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
          allSides
        />
      </div>

      <div className="lg:grid grid-cols-2 relative gap-16">
        <div className="h-1 bg-border-faint w-full absolute bottom-0 left-0" />

        <CurvyRect
          className="lg-max:hidden w-18 h-[calc(100%+1px)] left-[calc(50%-9px)] absolute -top-1"
          allSides
        />

        <FeaturesCard
          animationClassName="h-292"
          className="features-stealth"
          description={
            <>
              Crawls the web, including the sites other services can't. Get what
              you need without sharing your personal info.
            </>
          }
          icon={InvisibleIcon}
          subtitle="Invisible access"
          title="Stealth mode."
          titleWrapperClassName="!max-w-400"
        >
          <FeaturesStealth />
        </FeaturesCard>

        <div className="lg:hidden -mt-1 h-52 relative border-y border-border-faint">
          <CurvyRect
            className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
            allSides
          />
        </div>

        <FeaturesCard
          animationClassName="lg:h-292"
          description="Click, scroll, write, wait, press and more before extracting content."
          icon={ActionsIcon}
          subtitle="Interactive scraping"
          title="Actions."
          titleWrapperClassName="!max-w-330"
        >
          <FeaturesActions />
        </FeaturesCard>
      </div>
    </section>
  );
}
