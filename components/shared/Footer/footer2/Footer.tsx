import { CurvyRect } from "@/components/shared/ui";

import FooterBottom from "./Bottom/Bottom";
import FooterHead from "./Head/Head";
import FooterNav from "./Nav/Nav";
import FooterStatus from "./Status/Status";
import FooterTopDivider from "./TopDivider/TopDivider";

export default function Footer() {
  return (
    <>
      <FooterTopDivider />

      <div className="container -mt-1">
        <FooterHead />

        <div className="flex relative -mt-1 lg-max:hidden">
          <CurvyRect className="overlay" allSides />
          <div className="h-1 top-0 w-full absolute left-0 bg-border-faint" />

          {Array.from({ length: 2 }, (_, i) => (
            <div
              className="relative flex flex-1 gap-12 p-15 last:-ml-1"
              key={i}
            >
              {i === 1 && (
                <div className="h-full bg-border-faint w-1 absolute bottom-0 left-0" />
              )}
              <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
              <div className="size-12 rounded-full relative before:inside-border before:border-border-faint" />
              <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
            </div>
          ))}
        </div>

        <div className="h-60 lg:h-80 relative -mt-1">
          <div className="h-1 w-full top-0 left-0 bg-border-faint absolute" />
          <CurvyRect className="overlay" allSides />
        </div>

        <FooterNav />

        <div className="h-60 lg:h-80 relative -mt-1">
          <div className="h-1 w-full top-0 left-0 bg-border-faint absolute" />
          <CurvyRect className="overlay" allSides />
          <div className="h-full w-1 top-0 left-[calc(50%-0.5px)] absolute bg-border-faint" />
        </div>

        <FooterBottom />
        <FooterStatus />

        <div className="flex relative -mt-1">
          <CurvyRect className="overlay" allSides />
          <CurvyRect
            className="h-full top-[calc(100%-1px)] left-0 w-full absolute"
            top
          />
          <div className="h-1 top-0 w-full absolute left-0 bg-border-faint" />
          <div className="h-1 bottom-0 w-full absolute left-0 bg-border-faint" />

          {Array.from({ length: 2 }, (_, i) => (
            <div
              className="relative flex flex-1 gap-12 p-15 last:-ml-1 lg-max:last:hidden"
              key={i}
            >
              {i === 1 && (
                <div className="h-full bg-border-faint w-1 absolute bottom-0 left-0" />
              )}
              <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
              <div className="size-12 rounded-full relative before:inside-border before:border-border-faint" />
              <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
