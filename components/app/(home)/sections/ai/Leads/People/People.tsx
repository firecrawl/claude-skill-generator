import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { encryptText } from "@/components/app/(home)/sections/hero/Title/Title";
import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";
import Image from "@/components/shared/image/Image";

export default function AiLeadsPeople({ step }: { step: number }) {
  return (
    <div
      className="lg:absolute lg-max:h-244 overflow-hidden lg:inset-y-24 lg-max:mt-16 lg:right-24 bg-white-alpha-72 backdrop-blur-4 rounded-20 w-[calc(100%-32px)] lg-max:mx-auto relative lg:w-272"
      style={{
        boxShadow:
          "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
      }}
    >
      <motion.div
        animate={{ y: Math.min(Math.max(step, 0), 2) * -158 }}
        className="h-max"
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      >
        {data.map((item, index) => {
          const active = step >= index;

          return (
            <div className="p-20 border-b border-black-alpha-5" key={item.name}>
              <div
                className={cn(
                  "size-32 rounded-full overflow-hidden bg-black-alpha-3 mb-12 transition delay-[200ms]",
                  !active && "opacity-75",
                )}
              >
                <Image
                  alt={item.name}
                  className={cn("transition-all duration-[400ms]", {
                    "opacity-0 grayscale blur-[1px] translate-y-2": !active,
                  })}
                  height={32}
                  src={item.avatar}
                  width={32}
                />
              </div>

              <div className="flex gap-6 mb-4 h-20">
                <div
                  className={cn(
                    "text-label-small transition delay-[400ms]",
                    !active && "opacity-50",
                  )}
                >
                  <Field done={active} index={0} value={item.name} />
                </div>

                <div
                  className={cn(
                    "text-body-small text-black-alpha-64 transition delay-[600ms]",
                    !active && "opacity-50",
                  )}
                >
                  <Field done={active} index={1} value={item.title} />
                </div>
              </div>

              <div
                className={cn(
                  "text-body-small h-20 text-black-alpha-64 mb-4 transition delay-[800ms]",
                  !active && "opacity-50",
                )}
              >
                <Field done={active} index={2} value={item.phone} />
              </div>

              <div
                className={cn(
                  "text-body-small h-20 text-black-alpha-64 mb-4 transition delay-[1100ms]",
                  !active && "opacity-50",
                )}
              >
                <Field done={active} index={3} value={item.email} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

const Field = ({
  index,
  done,
  value: _value,
}: {
  index: number;
  done: boolean;
  value: string;
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let i = index * -0.5;

    const stopInterval = setIntervalOnVisible({
      element: document.getElementById("ai-leads"),
      callback: () => {
        if (done) {
          i += 0.2;
        }

        setValue(
          encryptText(_value, Math.max(i, 0), {
            randomizeChance: 0.4,
          }),
        );

        if (i >= 1) {
          stopInterval?.();
        }
      },
      interval: 100,
    });

    return () => {
      stopInterval?.();
    };
  }, [_value, done, index]);

  return value;
};

const data = [
  {
    avatar: "ai/leads-1",
    name: "Emily Tran",
    title: "Product Manager",
    phone: "+1 (415) 802-4461",
    email: "emily.tran@neuralflow.ai",
  },
  {
    avatar: "ai/leads-2",
    name: "James Carter",
    title: "Head of Partnerships",
    phone: "+1 (646) 201-9345",
    email: "jcarter@zenlytics.io",
  },
  {
    avatar: "ai/leads-3",
    name: "Sophia Kim",
    title: "Senior Data Analyst",
    phone: "+1 (312) 778-2299",
    email: "s.kim@aurastat.com",
  },
  {
    avatar: "ai/leads-4",
    name: "Michael Rivera",
    title: "CTO",
    phone: "+1 (917) 463-8120",
    email: "m.rivera@bytepath.dev",
  },
];
