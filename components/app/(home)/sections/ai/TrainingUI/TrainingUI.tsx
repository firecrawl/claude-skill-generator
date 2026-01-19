"use client";

import { useEffect, useRef, useState } from "react";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import { motion, AnimatePresence } from "motion/react";
import onVisible from "@/utils/on-visible";

const STAGES = [
  { id: "collection", label: "Web Data Collection", progress: 0 },
  { id: "cleaning", label: "Data Cleaning & Processing", progress: 0 },
  { id: "pretraining", label: "Pre-training", progress: 0 },
  { id: "finetuning", label: "Fine-tuning", progress: 0 },
  { id: "rlhf", label: "RLHF & Post-training", progress: 0 },
];

const METRICS = [
  { label: "Web pages scraped", value: 0, target: 2847193, unit: "" },
  { label: "Training tokens", value: 0, target: 15.7, unit: "B" },
  { label: "Model accuracy", value: 0, target: 94.8, unit: "%" },
  { label: "Data quality score", value: 0, target: 98.2, unit: "%" },
];

export default function AiTrainingUI() {
  const [step, setStep] = useState(-1);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = document.getElementById("ai-training");
    if (!element) return;

    if (step === -1) {
      onVisible(
        element,
        () => {
          setTimeout(() => {
            setVisible(true);
            setStep(0);
          }, 500);
        },
        0.3,
      );
    }
  }, [step]);

  useEffect(() => {
    if (!visible || step < 0) return;

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= STAGES.length * 2 + 2) {
          return 0; // Loop animation
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [visible, step]);

  const currentStageIndex = Math.min(Math.floor(step / 2), STAGES.length - 1);

  return (
    <div ref={ref} className="h-full w-full overflow-hidden">
      {/* Header */}
      <div className="px-28 lg:px-76 py-20 flex gap-16 items-center border-b border-border-faint">
        <FirecrawlIcon className="size-24" />
        <div className="text-body-medium">AI Training Pipeline</div>
      </div>

      {/* Main content */}
      <div className="lg:px-48 py-32 space-y-32">
        {/* Pipeline Stages */}
        <div className="px-28 space-y-16">
          <div className="text-label-small text-black-alpha-64 mb-20">
            Training Progress
          </div>
          {STAGES.map((stage, index) => {
            const isActive = index === currentStageIndex && step >= 0;
            const isComplete = index < currentStageIndex;
            const progress = isActive
              ? ((step % 2) / 2) * 100
              : isComplete
                ? 100
                : 0;

            return (
              <div key={stage.id} className="space-y-8">
                <div className="flex items-center justify-between text-body-small">
                  <div
                    className={`flex items-center gap-8 ${isActive || isComplete ? "text-black-alpha-90" : "text-black-alpha-48"}`}
                  >
                    <div
                      className={`size-16 rounded-full border-2 flex items-center justify-center ${
                        isComplete
                          ? "border-heat-100 bg-heat-100"
                          : isActive
                            ? "border-heat-100 bg-heat-8"
                            : "border-black-alpha-24"
                      }`}
                    >
                      {isComplete && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {isActive && !isComplete && (
                        <motion.div
                          className="size-6 rounded-full bg-heat-100"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <span className="font-medium">{stage.label}</span>
                  </div>
                  {isActive && (
                    <span className="text-label-small text-heat-100 font-medium">
                      {Math.round(progress)}%
                    </span>
                  )}
                  {isComplete && (
                    <span className="text-label-small text-black-alpha-48">
                      Complete
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="h-4 bg-black-alpha-8 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-heat-100"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Metrics Grid */}
        <div className="px-28 pt-16 border-t border-border-faint">
          <div className="text-label-small text-black-alpha-64 mb-20">
            Real-time Metrics
          </div>
          <div className="grid grid-cols-2 gap-20">
            {METRICS.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                target={metric.target}
                unit={metric.unit}
                active={step >= 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value: initialValue,
  target,
  unit,
  active,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
  active: boolean;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const increment = target / 50;
    const interval = setInterval(() => {
      setValue((v) => {
        const newValue = v + increment;
        if (newValue >= target) {
          return target;
        }
        return newValue;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [active, target]);

  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: unit === "B" ? 1 : unit === "%" ? 1 : 0,
    minimumFractionDigits: unit === "B" ? 1 : unit === "%" ? 1 : 0,
  });

  return (
    <div className="p-16 border border-border-faint rounded-8 bg-white">
      <div className="text-label-small text-black-alpha-56 mb-4">{label}</div>
      <div className="text-title-h4 font-semibold text-black-alpha-90">
        {formatter.format(value)}
        {unit && <span className="text-body-large ml-2">{unit}</span>}
      </div>
    </div>
  );
}
