import Link from "next/link";

import { Connector } from "@/components/shared/layout/curvy-rect";
import HeroFlame from "@/components/shared/effects/flame/hero-flame";

import HomeHeroBackground from "./Background/Background";
import { BackgroundOuterPiece } from "./Background/BackgroundOuterPiece";
import HomeHeroPixi from "./Pixi/Pixi";
import HomeHeroTitle from "./Title/Title";
import SkillGenerator from "../skill-generator/SkillGenerator";

export default function HomeHero() {
  return (
    <section className="overflow-x-clip" id="home-hero">
      <div
        className="pt-28 lg:pt-254 lg:-mt-100 pb-115 relative"
        id="hero-content"
      >
        <HomeHeroPixi />
        <HeroFlame />

        <BackgroundOuterPiece />

        <HomeHeroBackground />

        <div className="relative container px-16">
          <HomeHeroTitle />

          <p className="text-center text-body-large">
            Paste a documentation URL and instantly generate
            <br className="lg-max:hidden" /> ready-to-use Claude Code skills.
            <Link
              className="bg-black-alpha-4 hover:bg-black-alpha-6 lg:ml-4 rounded-6 px-8 lg:px-6 text-label-large lg-max:py-2 h-30 lg:h-24 block lg-max:mt-8 lg-max:mx-auto lg-max:w-max lg:inline-block gap-4 transition-all"
              href="https://code.claude.com/docs/en/skills"
              target="_blank"
            >
              Learn about Claude Skills
            </Link>
          </p>
        </div>
      </div>

      <div className="container !p-16 relative -mt-90">
        <div className="absolute top-0 left-[calc(50%-50vw)] w-screen h-1 bg-border-faint lg:hidden" />
        <div className="absolute bottom-0 left-[calc(50%-50vw)] w-screen h-1 bg-border-faint lg:hidden" />

        <Connector className="-top-10 -left-[10.5px] lg:hidden" />
        <Connector className="-top-10 -right-[10.5px] lg:hidden" />
        <Connector className="-bottom-10 -left-[10.5px] lg:hidden" />
        <Connector className="-bottom-10 -right-[10.5px] lg:hidden" />

        <SkillGenerator />
      </div>
    </section>
  );
}
