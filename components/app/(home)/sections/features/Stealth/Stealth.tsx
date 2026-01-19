"use client";

import { cubicBezier, motion, useAnimationControls } from "motion/react";
import { useMemo, useState } from "react";

import FeaturesStealthBullet from "./Bullet/Bullet";
import FeaturesStealthFlame from "./Flame/Flame";
import FeaturesStealthRing from "./Ring/Ring";

export default function FeaturesStealth() {
  const [step, setStep] = useState(0);

  const circlesData = useMemo(
    () => [
      { size: 600 },
      { size: 520, elapsed: 0.25 / 4, icon: true, index: 0 },
      { size: 440, elapsed: (0.25 / 4) * 2, icon: true, index: 1 },
      { size: 360, elapsed: (0.25 / 4) * 3, icon: true, index: 2 },
      { size: 280, elapsed: (0.25 / 4) * 4, icon: true, index: 3 },
      { size: 200 },
      { size: 120 },
    ],
    [],
  );

  const boxControls = useAnimationControls();

  return (
    <div className="absolute inset-1 overflow-hidden contain-layout">
      <FeaturesStealthFlame active={step >= 4} />

      {circlesData.map((circle, index) => (
        <FeaturesStealthRing disabled={step > index} key={index} {...circle} />
      ))}

      <FeaturesStealthBullet
        setStep={(v) => {
          if (v === 8) {
            boxControls.start(
              {
                scale: [1, 1.01, 1],
              },
              {
                ease: cubicBezier(0.25, 0.1, 0.25, 1),
                duration: 0.5,
              },
            );
          }

          setStep(v);
        }}
      />

      <motion.div
        animate={boxControls}
        className="cw-156 z-[2] ch-96 absolute p-10 rounded-10 bg-accent-white"
        style={{
          boxShadow:
            "0px 24px 32px -12px rgba(0, 0, 0, 0.03), 0px 16px 24px -8px rgba(0, 0, 0, 0.03), 0px 8px 16px -4px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
        }}
      >
        <svg
          fill="none"
          height="53"
          viewBox="0 0 136 53"
          width="136"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4Z"
            fill="black"
            fillOpacity="0.05"
          />
          <path
            d="M120 4C120 1.79086 121.791 0 124 0H132C134.209 0 136 1.79086 136 4C136 6.20914 134.209 8 132 8H124C121.791 8 120 6.20914 120 4Z"
            fill="black"
            fillOpacity="0.04"
          />
          <path
            d="M52 4C52 2.89543 52.8954 2 54 2H64C65.1046 2 66 2.89543 66 4C66 5.10457 65.1046 6 64 6H54C52.8954 6 52 5.10457 52 4Z"
            fill="black"
            fillOpacity="0.04"
          />
          <path
            d="M70 4C70 2.89543 70.8954 2 72 2H82C83.1046 2 84 2.89543 84 4C84 5.10457 83.1046 6 82 6H72C70.8954 6 70 5.10457 70 4Z"
            fill="black"
            fillOpacity="0.04"
          />
          <path
            d="M33 36C33 33.7909 34.7909 32 37 32H99C101.209 32 103 33.7909 103 36C103 38.2091 101.209 40 99 40H37C34.7909 40 33 38.2091 33 36Z"
            fill="black"
            fillOpacity="0.04"
          />
          <path
            d="M47 49C47 46.7909 48.7909 45 51 45H85C87.2091 45 89 46.7909 89 49C89 51.2091 87.2091 53 85 53H51C48.7909 53 47 51.2091 47 49Z"
            fill="black"
            fillOpacity="0.04"
          />
        </svg>
      </motion.div>
    </div>
  );
}
