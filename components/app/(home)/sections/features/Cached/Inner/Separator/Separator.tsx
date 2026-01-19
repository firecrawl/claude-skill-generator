import { useEffect, useRef } from "react";

export type HTMLFeaturesCachedInnerSeparatorElement = HTMLDivElement & {
  sendLine: () => Promise<void>;
};

export default function FeaturesCachedInnerSeparator({
  reversed,
}: {
  reversed?: boolean;
}) {
  const ref = useRef<HTMLFeaturesCachedInnerSeparatorElement>(null);

  useEffect(() => {
    const container = ref.current;

    if (container) {
      const sendLine = async () => {
        const div = document.createElement("div");
        div.className = `from-transparent to-heat-100 absolute`;
        let transform = "";

        if (window.innerWidth < 996) {
          div.className += ` left-0 h-38 w-full ${reversed ? "-bottom-38 bg-gradient-to-t" : "-top-38 bg-gradient-to-b"}`;
          transform = reversed ? "translateY(-114px)" : "translateY(114px)";
        } else {
          div.className += ` top-0 h-full w-72 ${reversed ? "-right-72 bg-gradient-to-l" : "-left-72 bg-gradient-to-r"}`;
          transform = reversed ? "translateX(-216px)" : "translateX(216px)";
        }

        container.appendChild(div);

        await div.animate(
          {
            transform,
          },
          {
            duration: 400,
            easing: "linear",
          },
        ).finished;

        div.remove();
      };

      container.sendLine = sendLine;
    }
  }, []);

  return (
    <div
      className="w-21 lg:w-124 h-56 lg:h-21 bg-border-faint z-[2] relative features-cached-inner-separator lg-max:![mask-image:url(\/assets-original\/features\/cached-separator-mobile.png)]"
      ref={ref}
      style={{
        maskImage: "url(/assets-original/features/cached-separator.png)",
        maskSize: "cover",
      }}
    />
  );
}
