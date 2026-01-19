import { CurvyRect } from "@/components/shared/ui";
import { Connector } from "@/components/shared/layout/curvy-rect";
import CachedIcon from "@/components/app/(home)/sections/features/_svg/CachedIcon";

import FeaturesCachedInner from "./Inner/Inner";

export default function FeaturesCached() {
  return (
    <div className="relative lg:pb-112">
      <div className="overlay border-x z-[2] border-border-faint pointer-events-none" />
      <div className="cmw-[593px,16px] absolute top-0 h-full border-x border-border-faint lg-max:hidden">
        <Connector className="absolute top-[210px] -left-[11.5px]" />
        <Connector className="absolute top-[210px] -right-[11.5px]" />

        <Connector className="absolute bottom-22 -left-[11.5px]" />
        <Connector className="absolute bottom-22 -right-[11.5px]" />
      </div>

      <div className="h-[calc(100%-252px)] cw-121 overflow-hidden absolute top-[220px] lg-max:hidden">
        <Connector className="absolute cw-[21px] -top-10" />
        <Connector className="absolute cw-[21px] -bottom-10" />
        <div className="cw-1 absolute top-0 h-full bg-border-faint" />
      </div>

      <div className="top-220 w-full left-0 h-1 absolute bg-border-faint lg-max:hidden" />
      <div className="bottom-32 lg-max:bottom-0 w-full left-0 h-1 absolute bg-border-faint" />
      <CurvyRect allSides />

      <div className="-mt-1 lg:mb-68 w-full p-32 lg:pt-64 border-t lg-max:border-b z-[2] border-border-faint relative">
        <div className="flex gap-8  items-center text-label-small lg:justify-center text-black-alpha-64 mb-16">
          <CachedIcon />
          Scrapes the real thing
        </div>

        <div className="text-body-x-large lg:max-w-400 text-black-alpha-64 lg:mx-auto lg:text-center">
          <span className="contents text-label-x-large text-accent-black">
            Cached, when you need it.
          </span>{" "}
          Selective caching, you choose your caching patterns, growing web
          index.
        </div>
      </div>

      <FeaturesCachedInner />
    </div>
  );
}
