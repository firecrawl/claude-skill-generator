"use client";

import { CurvyRect } from "@/components/shared/ui";
import SectionHead from "@/components/shared/section-head/SectionHead";

import BadgeIcon from "./_svg/BadgeIcon";
import FaqContent from "./FaqContent";
import FaqFlame from "./Flame/Flame";
type Prop = {
  showKeys?: string[];
};

export default function Faq({ showKeys }: Prop) {
  return (
    <section className="container -mt-1">
      <SectionHead
        badgeClassName="h-max lg:!mx-[0px]"
        badgeContent={
          <>
            <BadgeIcon />
            <span>FAQ</span>
          </>
        }
        className="!mx-[0px] !py-109"
        containerClassName="lg:max-w-[736px] lg:mx-auto lg:flex justify-between"
        description="Everything you need to know about Firecrawl."
        descriptionClassName="lg:!mx-[0px] lg:!text-start lg:!max-w-[unset]"
        title={
          <>
            Frequently <br /> asked{" "}
            <span className="text-heat-100">questions</span>
          </>
        }
        titleClassName="lg:max-w-600 lg:!text-title-h3 lg:!mx-[0px] lg:!text-start lg:!pt-0"
      >
        <FaqFlame />
      </SectionHead>

      <div className="relative -mt-1">
        <CurvyRect className="overlay" allSides />

        <FaqContent showKeys={showKeys} />
      </div>
    </section>
  );
}
