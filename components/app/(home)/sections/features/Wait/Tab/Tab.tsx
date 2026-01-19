import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
} from "motion/react";
import { memo, useEffect, useRef, useState } from "react";

import useSwitchingCode from "@/hooks/useSwitchingCode";
import { setTimeoutOnVisible } from "@/utils/set-timeout-on-visible";

import FeaturesWaitTabFlame from "./Flame/Flame";

export default function FeaturesWaitTab({
  active,
  onDone,
  setLoading,
}: {
  active: boolean;
  onDone: () => void;
  setLoading: (loading: boolean) => void;
}) {
  const [step, setStep] = useState(0);

  const motionValue = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      motionValue.set(motionValue.get() + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [step, motionValue]);

  return (
    <div
      className="h-full w-full overflow-hidden rounded-16 relative before:inside-border before:border-[--border] transition-all"
      style={
        active
          ? ({
              background: "var(--white-alpha-72)",
              "--border": "transparent",
              boxShadow:
                "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
            } as React.CSSProperties)
          : ({
              "--border": "var(--black-alpha-5)",
            } as React.CSSProperties)
      }
    >
      <FeaturesWaitTabFlame active={active && step < 4} />

      <AnimatePresence>
        {active && (
          <div className="absolute bottom-24 flex-center w-full">
            <Badge
              key={active ? "active" : "inactive"}
              setStep={(v) => {
                if (v === 4) {
                  setLoading(false);
                  setTimeout(() => {
                    onDone();
                  }, 2000);
                }

                setStep(v);
              }}
              step={step}
            />
          </div>
        )}
      </AnimatePresence>

      {step >= 4 && (
        <div className="pt-14 features-wait-tab-content">
          <svg
            fill="none"
            height="110"
            viewBox="0 0 352 110"
            width="352"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M156 60C156 57.7909 157.791 56 160 56H192C194.209 56 196 57.7909 196 60C196 62.2091 194.209 64 192 64H160C157.791 64 156 62.2091 156 60Z"
              fill="black"
              fillOpacity="0.04"
            />
            <path
              d="M102 80C102 75.5817 105.582 72 110 72H242C246.418 72 250 75.5817 250 80C250 84.4183 246.418 88 242 88H110C105.582 88 102 84.4183 102 80Z"
              fill="black"
              fillOpacity="0.04"
            />
            <path
              d="M124 102C124 97.5817 127.582 94 132 94H220C224.418 94 228 97.5817 228 102C228 106.418 224.418 110 220 110H132C127.582 110 124 106.418 124 102Z"
              fill="black"
              fillOpacity="0.04"
            />
            <path
              d="M286 10C286 5.58172 289.582 2 294 2H328C332.418 2 336 5.58172 336 10C336 14.4183 332.418 18 328 18H294C289.582 18 286 14.4183 286 10Z"
              fill="black"
              fillOpacity="0.05"
            />
            <path
              d="M44 10C44 7.79086 45.7909 6 48 6H70C72.2091 6 74 7.79086 74 10C74 12.2091 72.2091 14 70 14H48C45.7909 14 44 12.2091 44 10Z"
              fill="black"
              fillOpacity="0.03"
            />
            <path
              d="M166 10C166 7.79086 167.791 6 170 6H182C184.209 6 186 7.79086 186 10C186 12.2091 184.209 14 182 14H170C167.791 14 166 12.2091 166 10Z"
              fill="black"
              fillOpacity="0.03"
            />
            <path
              d="M138 10C138 7.79086 139.791 6 142 6H154C156.209 6 158 7.79086 158 10C158 12.2091 156.209 14 154 14H142C139.791 14 138 12.2091 138 10Z"
              fill="black"
              fillOpacity="0.03"
            />
            <path
              d="M194 10C194 7.79086 195.791 6 198 6H210C212.209 6 214 7.79086 214 10C214 12.2091 212.209 14 210 14H198C195.791 14 194 12.2091 194 10Z"
              fill="black"
              fillOpacity="0.03"
            />
            <path
              d="M36 10C36 15.5228 31.5228 20 26 20C20.4772 20 16 15.5228 16 10C16 4.47715 20.4772 0 26 0C31.5228 0 36 4.47715 36 10Z"
              fill="black"
              fillOpacity="0.04"
            />
            <path d="M0 33H352V34H0V33Z" fill="black" fillOpacity="0.05" />
          </svg>
        </div>
      )}
    </div>
  );
}

const steps = [
  "Request Sent",
  "Page is loading...",
  "Waits for key elements...",
  "All content is present",
  "Clean & complete data",
];

const Badge = ({
  setStep,
  step,
}: {
  setStep: (step: number) => void;
  step: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const text = useSwitchingCode(steps[step]);

  useEffect(() => {
    if (step === steps.length - 1) {
      return;
    }

    const stopTimeout = setTimeoutOnVisible({
      callback: () => {
        setStep(step + 1);
      },
      element: document.querySelector(".features-wait") as HTMLElement,
      timeout: 2500,
    });

    return () => stopTimeout?.();
  }, [step, setStep]);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      className="rounded-full bg-[#fdfdfd] w-max relative flex gap-6 items-center before:inside-border before:border-black-alpha-4 p-6 pr-12"
      exit={{ y: 16, opacity: 0 }}
      initial={{ y: -16, opacity: 0 }}
      ref={ref}
      style={{
        boxShadow: "0px 0px 0px 8px #fdfdfd",
      }}
    >
      <SpinningDiv active={step < 4}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.svg
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.2 } }}
            className="size-full absolute top-0 left-0"
            exit={{ opacity: 0 }}
            fill="none"
            height="20"
            initial={{ opacity: 0 }}
            key={step === 4 ? "success" : "loading"}
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {step === 4 ? (
              <path
                clipRule="evenodd"
                d="M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5ZM12.8305 8.59995C13.0928 8.27937 13.0455 7.80685 12.7249 7.54455C12.4043 7.28226 11.9318 7.32951 11.6695 7.65009L8.81932 11.1337L7.90533 10.2197C7.61244 9.9268 7.13756 9.9268 6.84467 10.2197C6.55178 10.5126 6.55178 10.9875 6.84467 11.2804L8.34467 12.7804C8.4945 12.9302 8.70073 13.0096 8.91236 12.9991C9.12399 12.9885 9.32129 12.8889 9.45547 12.725L12.8305 8.59995Z"
                fill="var(--heat-100)"
                fillRule="evenodd"
              />
            ) : (
              <>
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="var(--heat-100)"
                  strokeOpacity="0.16"
                  strokeWidth="1.25"
                />
                <g
                  clipPath="url(#paint0_angular_966_15235_clip_path)"
                  data-figma-skip-parse="true"
                >
                  <g transform="matrix(0.006 0.0034641 -0.0034641 0.006 10 10)">
                    <foreignObject
                      height="3253.28"
                      width="3253.28"
                      x="-1626.64"
                      y="-1626.64"
                    >
                      <div
                        style={{
                          background:
                            "conic-gradient(from 90deg,rgba(2254, 229, 218, 0) 0deg,rgba(254, 229, 218, 1) 180deg, var(--heat-100) 360deg)",
                          height: "100%",
                          width: "100%",
                          opacity: 1,
                        }}
                      />
                    </foreignObject>
                  </g>
                </g>
                <defs>
                  <clipPath id="paint0_angular_966_15235_clip_path">
                    <path d="M16.375 10C16.375 10.3452 16.6548 10.625 17 10.625C17.3452 10.625 17.625 10.3452 17.625 10H16.375ZM15.8203 6.11101L16.34 5.76378L15.8203 6.11101ZM12.6788 3.53284L12.4396 4.11027L12.6788 3.53284ZM8.63437 3.1345L8.7563 3.74749L8.63437 3.1345ZM5.05025 5.05025L5.49219 5.49219L5.05025 5.05025ZM6.11101 15.8203L6.45824 15.3006L6.11101 15.8203ZM10 17.625C10.3452 17.625 10.625 17.3452 10.625 17C10.625 16.6548 10.3452 16.375 10 16.375V17.625ZM17 10H17.625C17.625 8.49192 17.1778 7.0177 16.34 5.76378L15.8203 6.11101L15.3006 6.45824C16.0011 7.5066 16.375 8.73914 16.375 10H17ZM15.8203 6.11101L16.34 5.76378C15.5021 4.50985 14.3112 3.53254 12.918 2.95542L12.6788 3.53284L12.4396 4.11027C13.6045 4.59278 14.6001 5.40988 15.3006 6.45824L15.8203 6.11101ZM12.6788 3.53284L12.918 2.95542C11.5247 2.3783 9.99154 2.2273 8.51244 2.52151L8.63437 3.1345L8.7563 3.74749C9.99293 3.50151 11.2747 3.62776 12.4396 4.11027L12.6788 3.53284ZM8.63437 3.1345L8.51244 2.52151C7.03333 2.81572 5.67469 3.54194 4.60831 4.60831L5.05025 5.05025L5.49219 5.49219C6.38375 4.60063 7.51967 3.99347 8.7563 3.74749L8.63437 3.1345ZM5.05025 5.05025L4.60831 4.60831C3.54194 5.67469 2.81572 7.03333 2.52151 8.51244L3.1345 8.63437L3.74749 8.7563C3.99347 7.51967 4.60063 6.38375 5.49219 5.49219L5.05025 5.05025ZM3.1345 8.63437L2.52151 8.51244C2.2273 9.99154 2.3783 11.5247 2.95542 12.918L3.53284 12.6788L4.11027 12.4396C3.62776 11.2747 3.50151 9.99293 3.74749 8.7563L3.1345 8.63437ZM3.53284 12.6788L2.95542 12.918C3.53254 14.3112 4.50985 15.5021 5.76378 16.34L6.11101 15.8203L6.45824 15.3006C5.40988 14.6001 4.59278 13.6045 4.11027 12.4396L3.53284 12.6788ZM6.11101 15.8203L5.76378 16.34C7.0177 17.1778 8.49192 17.625 10 17.625V17V16.375C8.73914 16.375 7.5066 16.0011 6.45824 15.3006L6.11101 15.8203Z" />
                  </clipPath>
                </defs>
              </>
            )}
          </motion.svg>
        </AnimatePresence>
      </SpinningDiv>
      <span className="font-mono text-mono-small flex-1 min-w-0 block">
        {text}
      </span>
    </motion.div>
  );
};

export const SpinningDiv = memo(function SpinningDiv({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (active) {
      controls.start({
        rotate: 360,
        transition: {
          duration: 0.7,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });

      return () => {
        controls.stop();
      };
    } else {
      controls.start({
        rotate: 360,
        transition: {
          duration: 0.4,
        },
      });

      return () => {
        controls.stop();
      };
    }
  }, [active, controls]);

  return (
    <motion.div animate={controls} className="size-20 relative">
      {children}
    </motion.div>
  );
});
