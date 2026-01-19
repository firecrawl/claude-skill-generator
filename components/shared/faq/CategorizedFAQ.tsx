"use client";

import { Fragment } from "react";
import CurvyRect, { Connector } from "@/components/shared/layout/curvy-rect";
import FaqContentItem from "@/components/app/(home)/sections/faq/FaqContentItem";
import { FAQ } from "@/marketing-global/types";

interface FAQCategory {
  label: string;
  items: FAQ[];
}

interface CategorizedFAQProps {
  categories: FAQCategory[];
}

export default function CategorizedFAQ({ categories }: CategorizedFAQProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div>
      {categories.map((group, index) => (
        <Fragment key={group.label}>
          {index !== 0 && (
            <div className="lg:hidden -mt-1 h-52 relative border-y border-border-faint">
              <CurvyRect
                className="h-[calc(100%+2px)] absolute -top-1 left-0 w-full"
                allSides
              />
            </div>
          )}
          <div className="lg:flex relative -mt-1" key={group.label}>
            <div className="h-1 top-0 w-full left-0 absolute bg-border-faint" />
            <div className="h-1 top-79 lg:top-112 w-full left-0 absolute bg-border-faint" />
            <div className="w-1 lg-max:hidden top-0 h-full left-1/2 absolute bg-border-faint" />
            <div className="text-title-h5 flex-1 relative">
              <div className="px-20 lg:px-64 py-24 lg:py-40 relative">
                {group.label}
              </div>
              <Connector className="absolute -right-[11px] top-[102px] lg-max:hidden" />
              <CurvyRect className="overlay lg:hidden" allSides />
            </div>

            <div className="lg:flex-1 lg:pt-111 lg:-ml-[0.5px] relative lg-max:-mt-1">
              <CurvyRect className="overlay lg:hidden" allSides />
              {group.items.map((item, itemIndex) => (
                <FaqContentItem item={item} key={itemIndex} />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
