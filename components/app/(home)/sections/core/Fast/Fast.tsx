import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";

import CoreFastFlame from "./Flame/Flame";
import CoreFastRows from "./Rows/Rows";

export default function CoreFast() {
  return (
    <div className="w-full">
      <div className="px-20 lg:px-64 py-14 border-b border-border-faint flex lg:gap-48 text-body-small text-black-alpha-48">
        <div className="flex-1">URL</div>

        <div className="w-72">Crawl</div>
        <div className="w-72">Scrape</div>
      </div>

      <CoreFastRows />
      <div className="h-310 pointer-events-none inset-x-1 bottom-1 absolute bg-gradient-to-t from-background-base to-transparent to-[80%] from-[30%]" />

      <div
        className="h-96 rounded-full cw-96 z-[2] bg-accent-white flex-center absolute bottom-42"
        style={{
          boxShadow:
            "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03), 0px 0px 0px 12px #F9F9F9",
        }}
      >
        <FirecrawlIcon className="size-56" innerFillColor="#fff" />
      </div>

      <CoreFastFlame />
    </div>
  );
}
