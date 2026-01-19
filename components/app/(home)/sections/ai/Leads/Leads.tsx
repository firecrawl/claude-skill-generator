"use client";

import { useEffect, useRef, useState } from "react";

import setTimeoutOnVisible, {
  setIntervalOnVisible,
} from "@/utils/set-timeout-on-visible";

import AiLeadsPeople from "./People/People";
import onVisible from "@/utils/on-visible";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import { encryptText } from "../../hero/Title/Title";
import useEncryptedLoading from "@/hooks/useEncryptedLoading";
import useSwitchingCode from "@/hooks/useSwitchingCode";

export default function AiLeads() {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (step === 4) return;
    const element = document.getElementById("ai-leads")!;

    if (step === -1) {
      onVisible(
        element,
        () => {
          setTimeout(() => {
            setStep(0);
          }, 1000);
        },
        0.5,
      );

      return;
    }

    const stopTimeout = setTimeoutOnVisible({
      element,
      callback: () => {
        setStep(step + 1);
      },
      timeout: step === 3 ? 500 : 2500,
    });

    return () => stopTimeout?.();
  }, [step]);

  return (
    <>
      <div className="top-0 h-full inset-x-48 lg-max:hidden border-border-faint border-x absolute" />

      <div className="px-28 lg:px-76 py-20 flex gap-16 text-body-medium items-center relative">
        <div className="h-1 bottom-0 w-full bg-border-faint left-0 absolute" />

        <FirecrawlIcon className="size-24" />
        <Title done={step === 4} />
      </div>

      <div className="lg:px-48 text-body-medium">
        {data.map((item, index) => (
          <div className="flex border-b border-border-faint" key={item.label}>
            <div className="py-20 px-28 text-black-alpha-64 w-1/2 lg:w-172 border-r border-border-faint">
              {item.label}
            </div>
            <RowValue
              done={index === 4 ? step >= 3 : step >= index}
              index={index}
              value={item.value}
            />
          </div>
        ))}
      </div>

      <AiLeadsPeople step={step} />

      <div className="h-16 lg:hidden" />
    </>
  );
}

function RowValue({
  done,
  index,
  value: _value,
}: {
  done: boolean;
  index: number;
  value: string;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = index * -0.5;

    const stopInterval = setIntervalOnVisible({
      element: ref.current,
      callback: () => {
        if (done) {
          i += 0.1;
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
      interval: 75,
    });

    return () => {
      stopInterval?.();
    };
  }, [_value, done, index]);

  return (
    <div className="py-20 px-28 w-172" ref={ref}>
      {value}
    </div>
  );
}

function Title({ done }: { done: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const text = useEncryptedLoading({
    enabled: !done,
    text: "Extracting leads from directory",
    ref,
  });

  const encryptedText = useSwitchingCode(
    done ? "Found 2,847 companies" : "Extracting leads from directory...",
    50,
  );

  return <div ref={ref}>{done ? encryptedText : text}</div>;
}

const data = [
  { label: "Tech startups", value: "1,243" },
  { label: "With contact info", value: "892" },
  { label: "Decision makers", value: "3,421" },
  { label: "Funding stage", value: "Series A+" },
  { label: "Ready to engage", value: "647" },
];
