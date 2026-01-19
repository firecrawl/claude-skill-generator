import { cubicBezier, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";

import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import setTimeoutOnVisible, {
  setIntervalOnVisible,
} from "@/utils/set-timeout-on-visible";

const DirectionsData = [
  { initial: { y: -300 }, rotate: 90 },
  { initial: { x: 300 }, rotate: 180 },
  { initial: { y: 300 }, rotate: 270 },
  { initial: { x: -300 }, rotate: 0 },
];

const transition = {
  duration: 1,
  ease: cubicBezier(1, 0, 1, 0.7),
} as const;

function FeaturesStealthBullet({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [data, setData] = useState(DirectionsData[3]);

  return (
    <motion.div
      animate={{ x: 0, y: 0 }}
      className="cw-36 ch-36 rounded-full bg-heat-100 absolute flex-center"
      initial={data.initial}
      key={data.rotate}
      style={{
        boxShadow:
          "0px -6px 12px 0px rgba(255, 0, 0, 0.20) inset, 0px 3px 6px 0px rgba(255, 77, 0, 0.16), 0px 2px 4px 0px rgba(255, 77, 0, 0.12), 0px 1px 1px 0px rgba(255, 77, 0, 0.12), 0px 0.5px 0.5px 0px rgba(255, 77, 0, 0.16), 0px 0.25px 0.25px 0px rgba(255, 77, 0, 0.20), 0px 0px 0px 4px #F9F9F9, 0px 0px 0px 5px rgba(255, 76, 0, 0.10), 0px 0px 0px 10px #F9F9F9",
        rotate: data.rotate,
      }}
      transition={transition}
      onAnimationComplete={() => {
        const currentIndex = DirectionsData.indexOf(data);
        const dataWithoutCurrent = DirectionsData.filter(
          (_, i) => i !== currentIndex,
        );

        const newData =
          dataWithoutCurrent[
            Math.floor(Math.random() * dataWithoutCurrent.length)
          ];

        setTimeoutOnVisible({
          callback: () => {
            setData(newData);
          },
          timeout: 2000,
          element: document.querySelector(".features-stealth") as HTMLElement,
        });

        let i = 8;
        const stopInterval = setIntervalOnVisible({
          callback: () => {
            i -= 1;

            setStep(i);

            if (i === 0) {
              stopInterval?.();
            }
          },
          interval: 50,
          element: document.querySelector(".features-stealth") as HTMLElement,
        });
      }}
      onUpdate={(latest) => {
        const value = Math.abs(Number(latest.y) || Number(latest.x));
        const target = Math.abs(data.initial.y! || data.initial.x!);

        if (value === target) return;

        const diff = target - value;
        const step = Math.floor(diff / 40) + 1;

        setStep(step);
      }}
    >
      <motion.div
        animate={{ width: 0 }}
        className="center-y bg-gradient-to-r from-transparent to-heat-100 right-full h-1 w-96"
        initial={{ width: 96 }}
        transition={{ delay: transition.duration - 0.2, duration: 0.5 }}
      />

      <FirecrawlIcon
        className="size-24"
        fill="#fff"
        innerFillColor="var(--heat-100)"
        style={{ rotate: -data.rotate + "deg" }}
      />
    </motion.div>
  );
}

export default dynamic(() => Promise.resolve(FeaturesStealthBullet), {
  ssr: false,
});
