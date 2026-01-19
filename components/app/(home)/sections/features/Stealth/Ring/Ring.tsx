import { motion, Transition } from "motion/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import Checkmark from "@/components/app/(home)/sections/features/Stealth/_svg/Checkmark";
import Fingerprint from "@/components/app/(home)/sections/features/Stealth/_svg/Fingerprint";
import Globe from "@/components/app/(home)/sections/features/Stealth/_svg/Globe";
import Mouse from "@/components/app/(home)/sections/features/Stealth/_svg/Mouse";
import { cn } from "@/lib/utils";

const Icons = [
  <Globe key="globe" />,
  <Fingerprint key="fingerprint" />,
  <Mouse key="mouse" />,
  <Checkmark key="checkmark" />,
];

function FeaturesStealthRing({
  disabled,
  icon,
  index = 0,
  size: _size,
  elapsed = 0,
}: {
  disabled?: boolean;
  icon?: boolean;
  index?: number;
  size: number;
  elapsed?: number;
}) {
  const rotationTransition = useMemo(
    () =>
      ({
        duration: 15,
        repeat: Infinity,
        ease: "linear" as const,
        elapsed: elapsed * 15000,
      }) as Transition,
    [elapsed],
  );

  const size = _size + (disabled ? 20 : 0);

  return (
    <div
      className="rounded-full transition-all duration-[400ms] before:inside-border before:border-border-faint center"
      style={{
        width: size,
        height: size,
      }}
    >
      {icon && (
        <motion.div
          animate={{ rotate: 360 }}
          className="overlay"
          transition={rotationTransition}
        >
          {Array.from({ length: 4 }, (_, i) => (
            <div
              className={cn(
                "rounded-full transition-all duration-[400ms] bg-background-base flex-center before:inside-border before:border-border-faint absolute",
                disabled
                  ? "size-32 text-black-alpha-32"
                  : "text-heat-100 size-40",
                i === 0 && "top-0 -translate-y-1/2 left-1/2 -translate-x-1/2",
                i === 1 && "bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2",
                i === 2 && "top-1/2 -translate-y-1/2 left-0 -translate-x-1/2",
                i === 3 && "top-1/2 -translate-y-1/2 right-0 translate-x-1/2",
              )}
              key={i}
              style={{
                boxShadow: "0px 0px 0px 6px #F9F9F9",
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                className="size-20"
                transition={rotationTransition}
              >
                {Icons[(i + index) % 4]}
              </motion.div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(FeaturesStealthRing), {
  ssr: false,
});
