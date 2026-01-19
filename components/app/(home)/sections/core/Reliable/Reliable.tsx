import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import Image from "@/components/shared/image/Image";

import Curl from "./_svg/Curl";
import CoreReliableBar from "./Bar/Bar";

export default function CoreReliable() {
  return (
    <div className="w-full">
      <Wrapper
        icon={<FirecrawlIcon className="size-28" />}
        label="Firecrawl"
        style={{ "--border": "var(--heat-12)" } as React.CSSProperties}
      >
        <CoreReliableBar value={96} isPrimary />
      </Wrapper>
      <Wrapper
        icon={
          <Image
            alt="Puppeteer icon"
            className="size-40"
            height={40}
            src="puppeteer"
            width={40}
          />
        }
        label="Puppeteer"
        style={{ "--border": "var(--border-faint)" } as React.CSSProperties}
      >
        <CoreReliableBar value={79} />
      </Wrapper>
      <Wrapper
        icon={<Curl />}
        label="cURL"
        style={{ "--border": "var(--border-faint)" } as React.CSSProperties}
      >
        <CoreReliableBar value={75} />
      </Wrapper>
    </div>
  );
}

const Wrapper = ({
  label,
  icon,
  children,
  style,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className="flex items-center py-24 lg:py-32 px-20 lg:px-64 gap-16 lg:gap-20 border-y border-border-faint -mt-1 first:mt-0"
      style={style}
    >
      <div className="flex gap-12 lg:gap-16 w-140 lg:w-136 items-center">
        <div className="size-40 flex-center relative before:inside-border before:border-border-faint rounded-full">
          {icon}
        </div>

        <div className="text-body-large">{label}</div>
      </div>

      <div className="flex-1 rounded-full p-2 h-40 before:inside-border relative before:border-[--border]">
        {children}
      </div>
    </div>
  );
};
