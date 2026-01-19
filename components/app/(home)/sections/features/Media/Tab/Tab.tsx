import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";

import useSwitchingCode from "@/hooks/useSwitchingCode";

import MediaTabFlame from "@/components/app/(home)/sections/features/Media/Tab/Flame/Flame";
import Image from "@/components/shared/image/Image";
import Spinner from "@/components/ui/spinner";
import useEncryptedLoading from "@/hooks/useEncryptedLoading";
import setTimeoutOnVisible from "@/utils/set-timeout-on-visible";

export default function FeaturesMediaTab({
  active,
  extension: _extension,
  onDone,
}: {
  active: boolean;
  extension: string;
  onDone: () => void;
}) {
  const [done, setDone] = useState(false);
  const [extension, setExtension] = useState(_extension);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="w-full h-full">
        <MediaTabFlame active={active} />

        <motion.div
          animate={{ y: active ? -30 : 0 }}
          className="absolute ch-300 cw-180"
        >
          <svg
            className="overlay"
            fill="none"
            height="300"
            viewBox="0 0 180 300"
            width="180"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.9229 81H109.253C110.675 81 112.017 81.5509 112.99 82.498L144.507 113.173C145.476 114.116 146 115.374 146 116.66V216.262C146 217.673 144.794 219 143.077 219H36.9229C35.2061 219 34.0001 217.673 34 216.262V83.7383C34.0001 82.3272 35.2061 81.0001 36.9229 81Z"
              fill="var(--background-base)"
            />

            <path
              d="M106.687 84.5C108.941 84.5001 111.102 85.3955 112.696 86.9893L140.011 114.304C141.605 115.898 142.5 118.059 142.5 120.313V209C142.5 212.59 139.59 215.5 136 215.5H44C40.4101 215.5 37.5 212.59 37.5 209V91L37.5088 90.665C37.6831 87.2309 40.5225 84.5 44 84.5H106.687Z"
              stroke="var(--border-faint)"
            />
          </svg>

          <motion.div animate={{ opacity: active ? 1 : 0 }} className="overlay">
            <Image
              alt="Media Document"
              className="overlay"
              src="features/media-document"
            />
          </motion.div>

          <AnimatePresence>
            {active && (
              <motion.div
                animate={{
                  x: "-50%",
                  opacity: 1,
                  backgroundColor:
                    extension === "json"
                      ? "var(--heat-100)"
                      : "var(--black-alpha-40)",
                }}
                className="absolute whitespace-nowrap top-180 left-142 text-accent-white text-[12px]/[16px] font-[500] tracking-[0.24px] uppercase px-6 py-2 rounded-4 bg-black-alpha-40 backdrop-blur-4"
                exit={{ x: "calc(-50% + 24px)", opacity: 0 }}
                initial={{ x: "calc(-50% - 24px)", opacity: 0 }}
              >
                <ExtensionName extension={extension} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {active && <Badge done={done} key={active ? "active" : "inactive"} />}
        </AnimatePresence>

        <AnimatePresence>
          {active && (
            <Lines
              done={done}
              extension={extension}
              onCrawlingDone={() => {
                setExtension("json");
              }}
              onDone={() => {
                setDone(true);

                setTimeout(() => {
                  onDone();
                }, 2000);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

const Badge = ({ done }: { done: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dots = useEncryptedLoading({
    enabled: !done,
    text: "",
    ref,
  });
  const text = useSwitchingCode(done ? "Output ready" : "Parsing");

  return (
    <motion.div
      animate={{ x: done ? 63 : 74, width: done ? 138 : 116, y: 0, opacity: 1 }}
      className="absolute top-236 rounded-full bg-background-base flex gap-6 items-center before:inside-border before:border-border-faint py-6 pl-6"
      exit={{ x: done ? 63 : 74, width: done ? 138 : 116, y: 16, opacity: 0 }}
      initial={{
        x: done ? 63 : 74,
        width: done ? 138 : 116,
        y: -16,
        opacity: 0,
      }}
      ref={ref}
      style={{
        boxShadow: "0px 0px 0px 8px #F9F9F9",
      }}
    >
      <Spinner finished={done} />
      <span className="font-mono text-mono-small flex-1 min-w-0 block">
        {text}
        {done ? "" : dots}
      </span>
    </motion.div>
  );
};

const PositionMap = {
  PDF: [-2, 0, 18, 24, 30, 36, 54, 60, 66, 72, 90, 100],
  HTML: [-2, 0, 18, 24, 30, 36, 54, 60, 66, 72, 90, 100],
  DOCX: [0, 4, 14, 20, 26, 32, 50, 56, 62, 68, 86, 100],
  JSON: [-2, 0, 18, 24, 30, 36, 54, 60, 66, 72, 90, 100],
};

const Lines = memo(function Lines({
  extension,
  onCrawlingDone,
  onDone,
  done,
}: {
  extension: string;
  onCrawlingDone: () => void;
  onDone: () => void;
  done: boolean;
}) {
  const position =
    PositionMap[extension.toUpperCase() as keyof typeof PositionMap];
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (done) return;

    const stopTimeout = setTimeoutOnVisible({
      callback: () => {
        if (step >= position.length - 1) {
          if (cycle === (extension === "json" ? 1 : 2)) {
            (extension === "json" ? onDone : onCrawlingDone)();

            if (extension !== "json") {
              setCycle(0);
            }

            return;
          }

          setCycle((prev) => prev + 1);
          setStep(0);

          return;
        }

        setStep((prev) => prev + 1);
      },
      timeout: extension === "json" ? 50 : 110,
      element: document.querySelector(".features-media") as HTMLElement,
    });

    return () => stopTimeout?.();
  }, [step, position.length, cycle, onDone, onCrawlingDone, done, extension]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="w-77 bg-black-alpha-7 absolute top-75 left-90 h-92"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key={extension}
      style={{
        maskImage: `url("/assets-original/features/media-${extension === "html" ? "pdf" : extension}.png")`,
        maskSize: "cover",
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          animate={{ opacity: 1 }}
          className="h-2 absolute top-0 w-full left-0 bg-heat-100"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={step}
          style={{ top: position[step], left: extension === "json" ? 7 : 0 }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>
    </motion.div>
  );
});

const ExtensionName = ({ extension }: { extension: string }) => {
  const text = useSwitchingCode(extension);

  return text;
};
