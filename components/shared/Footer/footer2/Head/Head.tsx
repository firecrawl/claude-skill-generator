import { CurvyRect } from "@/components/shared/ui";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import FooterNavItem from "@/components/shared/Footer/footer2/Nav/Item/Item";

import Check from "./_svg/Check";
import Discord from "./_svg/Discord";
import Github from "./_svg/Github";
import Linkedin from "./_svg/Linkedin";
import Star from "./_svg/Star";
import X from "./_svg/X";
import FooterYCombinator from "./_svg/YCombinator";
import FooterFlame from "./Flame/Flame";
import Logo from "@/components/shared/header/_svg/Logo";

export default function FooterHead() {
  return (
    <div className="lg:flex relative -mt-1">
      <CurvyRect className="overlay" allSides />
      <div className="h-full w-1 lg-max:hidden top-0 left-[calc(50%-0.5px)] absolute bg-border-faint" />

      <div className="flex-1 relative">
        <CurvyRect className="overlay lg:hidden" bottom />

        <div className="lg-max:pb-76 p-32 lg:px-64 lg:py-56 h-full relative">
          <div className="flex items-center gap-2 mb-32">
            <FirecrawlIcon className="size-28" />
            <Logo />
          </div>

          <div className="text-label-x-large">
            The easiest way to extract <br />
            data from the web
          </div>
          <FooterFlame />
        </div>
      </div>

      <div className="flex-1 lg:-ml-1 flex lg-max:border-t lg-max:-mt-1 border-border-faint relative">
        <CurvyRect className="-top-1 absolute left-0 w-full lg:hidden" top />

        <div className="flex-1">
          <div className="py-16 px-20 lg:p-28 h-168 lg:h-192">
            <div className="mb-20 lg:mb-28 text-black-alpha-64 text-body-medium">
              Backed by
            </div>

            <div className="flex gap-16">
              <FooterYCombinator />
              <div className="text-body-medium whitespace-nowrap">
                Y Combinator
              </div>
            </div>
          </div>

          <FooterNavItem
            href="https://www.linkedin.com/company/firecrawl"
            label={
              <>
                <Linkedin />
                Linkedin
              </>
            }
            target="_blank"
          />
          <FooterNavItem
            className="-mt-1"
            href="https://github.com/firecrawl/firecrawl"
            label={
              <>
                <Github />
                Github
              </>
            }
            target="_blank"
          />
        </div>

        <div className="flex-1 -ml-1">
          <div className="py-16 px-20 lg:p-28 h-168 lg:h-192 relative">
            <div className="h-full w-1 absolute left-0 top-0 bg-border-faint" />
            <div className="mb-28 text-black-alpha-64 flex gap-8 items-center text-body-medium">
              <span>SOC II · Type 2</span>
              <Check />
            </div>

            <div className="size-88 relative p-9">
              <Star />

              <div
                className="size-70 text-center rounded-full pt-19"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.40) 100%)",
                  boxShadow:
                    "0px 16px 24px -6px rgba(0, 0, 0, 0.04), 0px 8px 12px -4px rgba(0, 0, 0, 0.04), 0px 4px 8px -2px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div className="text-[13px]/[20px] font-[500] tracking-[0.26px] text-heat-100">
                  AICPA
                </div>
                <div className="text-black-alpha-40 text-[10px]/[12px] font-[450]">
                  SOC 2
                </div>
              </div>
            </div>
          </div>

          <FooterNavItem
            href="https://x.com/firecrawl_dev"
            label={
              <>
                <X />
                <div>
                  X <span className="opacity-56">(Twitter)</span>
                </div>
              </>
            }
            target="_blank"
          />
          <FooterNavItem
            className="-mt-1"
            href="https://discord.gg/gSmWdAkdwd"
            label={
              <>
                <Discord />
                Discord
              </>
            }
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
}
