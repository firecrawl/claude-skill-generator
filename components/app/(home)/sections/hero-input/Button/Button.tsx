import { AnimatePresence, motion } from "motion/react";

import AnimatedWidth from "@/components/shared/layout/animated-width";
import ArrowRight from "@/components/app/(home)/sections/hero-input/_svg/ArrowRight";
import { tabs } from "@/components/app/(home)/sections/hero-input/Tabs/Tabs";
import useSwitchingCode from "@/hooks/useSwitchingCode";
import Button from "@/components/shared/button/Button";

export default function HeroInputSubmitButton({
  tab,
  dirty,
}: {
  tab: string;
  dirty: boolean;
}) {
  const text = useSwitchingCode(
    "Start " + (tabs.find((x) => x.value === tab)?.action ?? ""),
    40,
    3,
  );

  return (
    <Button
      className="hero-input-button !p-0"
      size="large"
      variant="primary"
      aria-label="Start scraping"
    >
      <AnimatedWidth>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -10, filter: "blur(2px)" }}
            initial={{ opacity: 0, x: 10, filter: "blur(2px)" }}
            key={dirty ? "dirty" : "clean"}
          >
            {dirty ? (
              <div className="py-8 w-126 text-center">{text}</div>
            ) : (
              <div className="w-60 py-8 flex-center">
                <ArrowRight />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </AnimatedWidth>
    </Button>
  );
}
