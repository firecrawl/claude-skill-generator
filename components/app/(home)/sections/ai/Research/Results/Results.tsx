import { motion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { encryptText } from "@/components/app/(home)/sections/hero/Title/Title";
import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

import Ibm from "./_svg/Ibm";
import Search from "./_svg/Search";
import Wikipedia from "./_svg/Wikipedia";

export default function AiLeadsResults({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) {
  const itemCount = Math.max(step, 0);

  return (
    <div
      className="lg:absolute lg-max:h-244 overflow-hidden lg:inset-y-24 lg-max:mt-16 lg:right-24 bg-white-alpha-72 backdrop-blur-4 rounded-20 w-[calc(100%-32px)] lg-max:mx-auto relative lg:w-272"
      style={{
        boxShadow:
          "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Input setStep={setStep} step={step} />

      <div className="h-300 overflow-hidden">
        <motion.div
          animate={{ y: step >= 1 ? data.length * -129 : 0 }}
          className="h-max -mt-1"
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {Array.from({ length: 2 }, (_, groupIndex) => {
            const itemCountLocal =
              groupIndex === 0 ? itemCount : itemCount === data.length ? 3 : 0;

            return (
              <Fragment key={groupIndex}>
                {data.slice(0, itemCountLocal).map((item) => {
                  return (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="px-20 py-16 border-t border-black-alpha-5"
                      initial={{ opacity: 0 }}
                      key={item.title}
                      transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                      }}
                    >
                      <div className="text-label-small h-20 mb-4 truncate">
                        <Field index={0} value={item.title} />
                      </div>

                      <div className="text-body-small h-40 text-black-alpha-64 mb-12 line-clamp-2">
                        <Field index={1} value={item.description} />
                      </div>

                      <div className="flex gap-8 items-center">
                        {item.icon}

                        <div className="text-body-small text-black-alpha-40">
                          {item.url}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </Fragment>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

const QUERY = "Quantum computing";

const Input = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) => {
  const [inputText, setInputText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (step === -1) return;

    if (step >= data.length) return;

    if (step >= 4) {
      const timeout = setTimeout(() => {
        setStep(step + 1);
      }, 500);

      return () => clearTimeout(timeout);
    }

    let timeout = 0;

    const tick = () => {
      timeout = window.setTimeout(
        () => {
          setInputText(QUERY.slice(0, indexRef.current + 1));
          indexRef.current++;

          const nextStep = Math.floor(
            Math.min(indexRef.current / QUERY.length, 1) * 4,
          );

          setStep(nextStep);

          if (indexRef.current >= QUERY.length) {
            return;
          }

          tick();
        },
        100 + Math.random() * 100,
      );
    };

    if (step === 0) {
      timeout = window.setTimeout(tick, 500);
    } else {
      tick();
    }

    return () => clearTimeout(timeout);
  }, [step, setStep]);

  return (
    <div className="p-16 flex relative gap-12 items-center text-body-medium">
      <Search />

      {(() => {
        if (step === -1)
          return <div className="text-black-alpha-48">Ask anything...</div>;

        return (
          <div>
            {inputText}
            {step < 1 && <span className="cursor">|</span>}
          </div>
        );
      })()}

      <div className="h-1 w-full bg-border-faint absolute bottom-0 left-0" />
    </div>
  );
};

const Field = ({ index, value: _value }: { index: number; value: string }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let i = index * -0.5;

    const stopInterval = setIntervalOnVisible({
      element: document.getElementById("ai-research"),
      callback: () => {
        i += 0.2;

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
  }, [_value, index]);

  return value;
};

export const data = [
  {
    icon: <Wikipedia />,
    title: "Quantum computing - Wikipedia",
    description:
      "A computer that exploits quantum mechanical phenomena to perform calculations.",
    url: "en.wikipedia.org",
  },
  {
    icon: <Ibm />,
    title: "What Is Quantum Computing? - IBM",
    description:
      "Emerging technology using quantum mechanics to solve complex computational problems.",
    url: "www.ibm.com",
  },
  {
    icon: <Wikipedia />,
    title: "Qubit - Wikipedia",
    description:
      "A qubit is the basic unit of quantum information, analogous to a bit in classical computing.",
    url: "en.wikipedia.org",
  },
  {
    icon: <Ibm />,
    title: "IBM Qiskit: Open-Source Quantum SDK",
    description:
      "Qiskit is an open-source SDK for working with quantum computers at the level of circuits, pulses, and algorithms.",
    url: "www.ibm.com",
  },
  {
    icon: <Wikipedia />,
    title: "Shor’s Algorithm - Wikipedia",
    description:
      "A quantum algorithm for integer factorization, with implications for cryptography.",
    url: "en.wikipedia.org",
  },
  {
    icon: <Ibm />,
    title: "Quantum Computing vs Classical Computing",
    description:
      "A comparison of quantum and classical computing paradigms and their respective strengths.",
    url: "www.ibm.com",
  },
  {
    icon: <Wikipedia />,
    title: "Superconducting Quantum Computing - Wikipedia",
    description:
      "An overview of superconducting circuits as a leading technology for building quantum computers.",
    url: "en.wikipedia.org",
  },
  {
    icon: <Ibm />,
    title: "Careers in Quantum Computing - IBM",
    description:
      "Explore job opportunities and career paths in the field of quantum computing.",
    url: "www.ibm.com",
  },
  {
    icon: <Wikipedia />,
    title: "Quantum Key Distribution - Wikipedia",
    description:
      "A secure communication method using quantum mechanics to encrypt and transmit data.",
    url: "en.wikipedia.org",
  },
  {
    icon: <Ibm />,
    title: "Quantum Computing Newsroom - IBM",
    description:
      "Latest news, press releases, and updates on IBM’s quantum computing initiatives.",
    url: "www.ibm.com",
  },
];
