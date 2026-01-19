"use client";

import { useEffect, useRef, useState } from "react";

import useSwitchingCode from "@/hooks/useSwitchingCode";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import useEncryptedLoading from "@/hooks/useEncryptedLoading";

import AiResearchResults from "./Results/Results";
import onVisible from "@/utils/on-visible";

export default function AiResearch() {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const element = document.getElementById("ai-research")!;

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
  }, [step]);

  return (
    <>
      <div className="top-0 h-full lg-max:hidden inset-x-48 border-border-faint border-x absolute" />

      <div className="px-28 lg:px-76 py-20 flex gap-16 text-body-medium items-center relative">
        <div className="h-1 bottom-0 w-full bg-border-faint left-0 absolute" />

        <FirecrawlIcon className="size-24" />
        <Title done={step === 10} />
      </div>

      <div className="lg:px-48 text-body-medium">
        {data.map((item, index) => (
          <div className="flex border-b border-border-faint" key={item.label}>
            <div className="py-20 pl-28 text-black-alpha-64 w-1/2 lg:w-172 border-r border-border-faint">
              {item.label}
            </div>
            <RowValue
              done={Math.floor((step / 10) * data.length) >= index}
              step={step}
              value={item.value}
            />
          </div>
        ))}
      </div>

      <AiResearchResults setStep={setStep} step={step} />

      <div className="h-16 lg:hidden" />
    </>
  );
}

function RowValue({
  done,
  value: _value,
  step,
}: {
  done: boolean;
  value: number;
  step: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step < 1) return;

    const interval = setInterval(() => {
      setValue((v) => {
        const val = v + Math.floor(_value / (20 + Math.random() * 40));

        if (val >= _value) {
          clearInterval(interval);

          return _value;
        }

        return val;
      });
    }, 75);

    return () => clearInterval(interval);
  }, [done, _value, step]);

  return (
    <div className="py-20 px-28 w-172" ref={ref}>
      {formatter.format(value)} found
    </div>
  );
}

function Title({ done }: { done: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const text = useEncryptedLoading({
    enabled: !done,
    text: "",
    ref,
  });

  const encryptedText = useSwitchingCode(
    done
      ? `Found ${formatter.format(data.reduce((acc, item) => acc + item.value, 0))} results`
      : "Deep research in progress",
    50,
  );

  return (
    <div ref={ref}>
      {encryptedText}
      {done ? "" : text}
    </div>
  );
}

const formatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  maximumFractionDigits: 0,
});

const data = [
  { label: "Academic papers", value: 247 },
  { label: "News articles", value: 1832 },
  { label: "Expert opinions", value: 89 },
  { label: "Research reports", value: 156 },
  { label: "Industry data", value: 423 },
];
