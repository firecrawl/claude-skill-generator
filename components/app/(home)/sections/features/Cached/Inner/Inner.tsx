"use client";

import { animate } from "motion";
import Image from "next/image";
import { memo, useEffect, useMemo, useRef, useState } from "react";

import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import { cn } from "@/lib/utils";

import FeaturesCachedInnerSeparator, {
  HTMLFeaturesCachedInnerSeparatorElement,
} from "./Separator/Separator";
import useSwitchingCode from "@/hooks/useSwitchingCode";

export default function FeaturesCachedInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cacheOrWeb, setCacheOrWeb] = useState<"cache" | "web" | null>(null);

  useEffect(() => {
    const user = containerRef.current!.querySelector<HTMLDivElement>(
      ".features-cached-inner-user",
    )!;
    const firecrawl = containerRef.current!.querySelector<HTMLDivElement>(
      ".features-cached-inner-firecrawl",
    )!;
    const cacheOrWebGroup = containerRef.current!.querySelector<HTMLDivElement>(
      ".features-cached-inner-cache-or-web-group",
    )!;

    const separators =
      containerRef.current!.querySelectorAll<HTMLFeaturesCachedInnerSeparatorElement>(
        ".features-cached-inner-separator",
      );
    const cacheOrWebAnimations = Array.from(
      containerRef.current!.querySelectorAll<HTMLDivElement>(
        ".features-cached-inner-cache-or-web, .features-cached-inner-cache-or-web *",
      )!,
    ).flatMap((element) => element.getAnimations());

    let cached = 0;

    const cycle = async () => {
      user.animate({ scale: [1, 1.01, 0.98, 1] }, { duration: 500 });

      await new Promise((resolve) => setTimeout(resolve, 400));

      separators[0]!.sendLine();
      await new Promise((resolve) => setTimeout(resolve, 200));

      firecrawl.animate(
        {
          transform: [
            "translateX(0px)",
            "translateX(1px)",
            "translateX(-0.5px)",
            "translateX(0)",
          ],
        },
        { duration: 200 },
      );
      await new Promise((resolve) => setTimeout(resolve, 600));

      firecrawl.animate({ scale: [1, 1.01, 0.98, 1] }, { duration: 500 });
      await new Promise((resolve) => setTimeout(resolve, 400));

      separators[2]!.sendLine();
      await new Promise((resolve) => setTimeout(resolve, 200));

      cacheOrWebGroup.animate(
        {
          transform: [
            "translateX(0px)",
            "translateX(1px)",
            "translateX(-0.5px)",
            "translateX(0)",
          ],
        },
        { duration: 200 },
      );

      if (cached < 2) {
        await animate(1, 32, {
          duration: 1,
          onUpdate: (value) => {
            cacheOrWebAnimations.forEach((animation) => {
              animation.playbackRate = value;
            });
          },
        });

        setCacheOrWeb(cached > 0 ? "cache" : "web");
        await animate(32, 16, {
          duration: 1,
          delay: 0.3,
          onUpdate: (value) => {
            cacheOrWebAnimations.forEach((animation) => {
              animation.playbackRate = value;
            });
          },
        });
      }

      cached += 1;
      cacheOrWebGroup.animate({ scale: [1, 1.01, 0.98, 1] }, { duration: 500 });
      await new Promise((resolve) => setTimeout(resolve, 400));

      separators[3]!.sendLine();
      await new Promise((resolve) => setTimeout(resolve, 200));
      firecrawl.animate(
        {
          transform: [
            "translateX(0px)",
            "translateX(-1px)",
            "translateX(0.5px)",
            "translateX(0)",
          ],
        },
        { duration: 200 },
      );
      await new Promise((resolve) => setTimeout(resolve, 200));

      firecrawl.animate({ scale: [1, 1.01, 0.98, 1] }, { duration: 500 });
      await new Promise((resolve) => setTimeout(resolve, 400));

      separators[1]!.sendLine();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await user.animate(
        {
          transform: [
            "translateX(0px)",
            "translateX(-1px)",
            "translateX(0.5px)",
            "translateX(0)",
          ],
        },
        { duration: 200 },
      ).finished;

      if (cached === 1 || cached === 4) {
        setCacheOrWeb(null);
        await animate(16, 1, {
          duration: 1,
          onUpdate: (value) => {
            cacheOrWebAnimations.forEach((animation) => {
              animation.playbackRate = value;
            });
          },
        });
      }

      if (cached === 4) {
        cached = 0;
      }

      setTimeout(() => {
        cycle();
      }, 500);
    };

    cycle();
  }, []);

  return (
    <div
      className="lg:h-156 max-w-704 mx-auto lg-max:py-80 flex lg-max:flex-col justify-center items-center"
      ref={containerRef}
    >
      <Group
        boxClassName="features-cached-inner-user"
        height={96}
        label="User"
        width={96}
      >
        <div className="absolute cw-56 ch-56 rounded-full bg-accent-white">
          <div className="overlay before:inside-border before:border-black-alpha-4" />

          <Image
            alt="User"
            className="max-w-[unset] cs-80 absolute"
            height={80}
            src="/assets-original/features/cached-user.png"
            width={80}
          />

          <svg
            className="cs-56 absolute animate-spin [animation-duration:1s]"
            fill="none"
            height="56"
            viewBox="0 0 56 56"
            width="56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.563 20.8825C55.4976 24.3708 55.7361 28.009 55.2647 31.5895C54.7934 35.1699 53.6214 38.6225 51.8157 41.75C50.01 44.8775 47.606 47.6188 44.7409 49.8172C41.8759 52.0157 38.6058 53.6283 35.1175 54.563"
              stroke="var(--heat-100)"
            />
          </svg>
        </div>

        <svg
          className="absolute cs-80 features-cached-inner-user-razor"
          fill="none"
          height="80"
          viewBox="0 0 80 80"
          width="80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.35898 20C8.86972 13.9192 13.9192 8.86971 20 5.35898"
            stroke="black"
            strokeOpacity="0.04"
          />
          <path
            d="M74.641 60C71.1303 66.0808 66.0808 71.1303 60 74.641"
            stroke="black"
            strokeOpacity="0.04"
          />
        </svg>
      </Group>

      <div className="flex-1 z-[1] -my-1 lg:-mx-1 flex lg:flex-col gap-12 h-full justify-center">
        <FeaturesCachedInnerSeparator />
        <FeaturesCachedInnerSeparator reversed />
      </div>

      <Group
        boxClassName="features-cached-inner-firecrawl"
        height={140}
        label="Firecrawl"
        width={220}
      >
        <svg
          className="absolute top-0 left-0"
          fill="none"
          height="140"
          viewBox="0 0 220 140"
          width="220"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="5.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="98.25"
            y="134.25"
          />
          <rect
            height="2.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="154.25"
            y="137.25"
          />
          <rect
            height="4.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="87.25"
            y="135.25"
          />
          <rect
            height="3.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="143.25"
            y="136.25"
          />
          <rect
            height="3.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="76.25"
            y="136.25"
          />
          <rect
            height="4.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="132.25"
            y="135.25"
          />
          <rect
            height="2.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="65.25"
            y="137.25"
          />
          <rect
            height="5.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            width="0.5"
            x="121.25"
            y="134.25"
          />
          <rect
            height="5.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 98 5.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
          <rect
            height="2.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 154 2.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
          <rect
            height="4.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 87 4.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
          <rect
            height="3.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 143 3.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
          <rect
            height="3.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 76 3.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
          <rect
            height="4.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 132 4.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
          <rect
            height="2.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 65 2.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
          <rect
            height="5.5"
            stroke="black"
            strokeOpacity="0.04"
            strokeWidth="0.5"
            transform="matrix(1 0 0 -1 121 5.5)"
            width="0.5"
            x="0.25"
            y="-0.25"
          />
        </svg>

        <svg
          className="cs-116 absolute features-cached-inner-firecrawl-razor"
          fill="none"
          height="116"
          viewBox="0 0 116 116"
          width="116"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.77053 29C12.8611 20.1829 20.1829 12.8611 29 7.77052"
            stroke="black"
            strokeOpacity="0.04"
          />
          <path
            d="M7.77053 87C12.8611 95.8171 20.1829 103.139 29 108.229"
            stroke="black"
            strokeOpacity="0.04"
          />
          <path
            d="M108.229 29C103.139 20.1829 95.8171 12.8611 87 7.77052"
            stroke="black"
            strokeOpacity="0.04"
          />
          <path
            d="M108.229 87C103.139 95.8171 95.8171 103.139 87 108.229"
            stroke="black"
            strokeOpacity="0.04"
          />
        </svg>

        <div className="absolute cw-80 ch-80 rounded-full before:inside-border before:border-black-alpha-4 bg-accent-white flex-center">
          <FirecrawlIcon className="size-48" innerFillColor="white" />

          <svg
            className="absolute cs-80 animate-spin [animation-delay:-0.5s]"
            fill="none"
            height="80"
            viewBox="0 0 80 80"
            width="80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M74.208 20.25C76.8016 24.7423 78.485 29.7014 79.1621 34.8442C79.8391 39.9871 79.4966 45.2129 78.1541 50.2234C76.8115 55.2338 74.4952 59.9308 71.3375 64.0461C68.1797 68.1614 64.2423 71.6144 59.75 74.208"
              stroke="var(--heat-100)"
            />
          </svg>
        </div>
      </Group>

      <div className="flex-1 z-[1] -my-1 lg:-mx-1 flex lg:flex-col gap-12 h-full justify-center">
        <FeaturesCachedInnerSeparator />
        <FeaturesCachedInnerSeparator reversed />
      </div>

      <CacheOrWebGroup cacheOrWeb={cacheOrWeb} />
    </div>
  );
}

const CacheOrWebGroup = ({
  cacheOrWeb,
}: {
  cacheOrWeb: "cache" | "web" | null;
}) => {
  const text = useMemo(() => {
    if (cacheOrWeb === "cache") return "Cache";
    if (cacheOrWeb === "web") return "Web";

    return "Cache & Web";
  }, [cacheOrWeb]);

  const textEncrypted = useSwitchingCode(text);

  return (
    <Group
      boxClassName="features-cached-inner-cache-or-web-group"
      height={96}
      label={textEncrypted}
      width={96}
    >
      <CacheOrWeb cacheOrWeb={cacheOrWeb} />
    </Group>
  );
};

const Group = ({
  label,
  width,
  height,
  children,
  boxClassName,
}: {
  label: string;
  width: number;
  height: number;
  children?: React.ReactNode;
  boxClassName?: string;
}) => {
  return (
    <div className="p-8 rounded-16 relative before:inside-border before:border-border-faint">
      <div
        className={cn(
          "bg-accent-white relative rounded-8 z-[2] will-change-transform",
          boxClassName,
        )}
        style={{
          boxShadow:
            "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
          width,
          height,
        }}
      >
        <div className="absolute top-8 left-8 size-3 rounded-full bg-black-alpha-5" />
        <div className="absolute top-8 right-8 size-3 rounded-full bg-black-alpha-5" />
        <div className="absolute bottom-8 left-8 size-3 rounded-full bg-black-alpha-5" />
        <div className="absolute bottom-8 right-8 size-3 rounded-full bg-black-alpha-5" />
        <div className="ch-1 w-full left-0 bg-black-alpha-4 absolute" />
        <div className="h-full cw-1 top-0 bg-black-alpha-4 absolute" />

        {children}
      </div>

      <div
        className={cn(
          "whitespace-nowrap center-x px-14 py-4 !text-mono-x-small font-mono text-black-alpha-32 uppercase bg-background-base rounded-full before:inside-border before:border-border-faint",
          label === "User" && [
            "lg:top-[calc(100%+24px)] lg-max:bottom-[calc(100%+24px)]",
          ],

          !["Firecrawl", "User"].includes(label) && "top-[calc(100%+24px)]",
          label === "Firecrawl" && "lg-max:hidden top-[calc(100%+24px)]",
        )}
        style={{
          boxShadow: "0px 0px 0px 8px #F9F9F9",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const CacheOrWeb = memo(function CacheOrWeb({
  cacheOrWeb,
}: {
  cacheOrWeb: "cache" | "web" | null;
}) {
  return (
    <>
      <div
        className="overlay animate-spin [animation-duration:32s] features-cached-inner-cache-or-web"
        data-cache-or-web={cacheOrWeb}
      >
        <div className="size-50 absolute duration-[400ms] transition-[translate,width,height,opacity,filter] features-cached-inner-cache animate-spin-reverse [animation-duration:inherit] -top-1 -left-1">
          <Image
            alt="Cache"
            className="max-w-[unset] size-full absolute"
            height={50}
            src="/assets-original/features/cached-cache.png"
            width={50}
          />
          <Image
            alt="Cache"
            className="max-w-[unset] size-full absolute"
            height={50}
            src="/assets-original/features/cached-cache-color.png"
            width={50}
            data-color
          />
        </div>

        <div className="size-50 absolute duration-[400ms] transition-[translate,width,height,opacity,filter] features-cached-inner-web animate-spin-reverse [animation-duration:inherit] -bottom-1 -right-1">
          <Image
            alt="Web"
            className="max-w-[unset] size-full absolute"
            height={50}
            src="/assets-original/features/cached-web.png"
            width={50}
          />
          <Image
            alt="Web"
            className="max-w-[unset] size-full absolute"
            height={50}
            src="/assets-original/features/cached-web-color.png"
            width={50}
            data-color
          />
        </div>

        <div className="size-28 center duration-[400ms] transition-[width,height] features-cached-inner-cache-border absolute before:inside-border before:border-black-alpha-4 rounded-full">
          <svg
            className="overlay opacity-0 transition-[opacity] animate-spin-reverse [animation-duration:10s]"
            fill="none"
            height="56"
            viewBox="0 0 56 56"
            width="56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.563 20.8825C55.4976 24.3708 55.7361 28.009 55.2647 31.5895C54.7934 35.1699 53.6214 38.6225 51.8157 41.75C50.01 44.8775 47.606 47.6188 44.7409 49.8172C41.8759 52.0157 38.6058 53.6283 35.1175 54.563"
              stroke="var(--heat-100)"
            />
          </svg>
        </div>

        <svg
          className="absolute cs-80"
          fill="none"
          height="80"
          viewBox="0 0 80 80"
          width="80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.35898 60C8.86972 66.0808 13.9192 71.1303 20 74.641"
            stroke="black"
            strokeOpacity="0.04"
          />
          <path
            d="M74.641 20C71.1303 13.9192 66.0808 8.86971 60 5.35898"
            stroke="black"
            strokeOpacity="0.04"
          />
        </svg>
      </div>
    </>
  );
});
