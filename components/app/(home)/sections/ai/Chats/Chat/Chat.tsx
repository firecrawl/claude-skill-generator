"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import ArrowUp from "./_svg/ArrowUp";
import Microphone from "./_svg/Microphone";
import Image from "@/components/shared/image/Image";

import "./Chat.css";
import onVisible from "@/utils/on-visible";

export default function AiChatsChat() {
  const [step, setStep] = useState(-1);

  return (
    <div>
      <InputPart setStep={setStep} step={step} />

      {step >= 2 && (
        <motion.div
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          className="absolute top-76 right-40"
          initial={{ y: 52, opacity: 0, rotate: -10 }}
          style={{ originX: 1 }}
          transition={{
            type: "spring",
            stiffness: 337,
            damping: 24.5,
            mass: 1,
          }}
        >
          <motion.div
            animate={{ x: 0 }}
            className="absolute top-33 z-[2] -right-9 size-6 rounded-full bg-[#EFEFEF]"
            initial={{ x: -23 }}
            transition={{
              type: "spring",
              stiffness: 337,
              damping: 24.5,
              mass: 1,
            }}
          />

          <div className="absolute top-19 z-[1] -right-3 size-16 rounded-full bg-[#EFEFEF]" />

          <div className="bg-black-alpha-5 text-body-medium py-8 px-16 rounded-full">
            What&apos;s new in the React docs?
          </div>
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="left-40 top-128 absolute flex gap-16"
          initial={{ x: -8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="size-36 bg-white-alpha-72 rounded-full flex-center"
            style={{
              boxShadow:
                "0px 16px 24px -6px rgba(0, 0, 0, 0.04), 0px 8px 12px -4px rgba(0, 0, 0, 0.04), 0px 4px 8px -2px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
            }}
          >
            <Image
              alt="AI Assistant"
              className="ai-chats-chat-bot"
              height={24}
              ref={(element) => {
                element?.animate([{ rotate: "0deg" }, { rotate: "-1turn" }], {
                  duration: 5000,
                  iterations: Infinity,
                });
              }}
              src="ai/bot"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(0px)",
              }}
              width={24}
            />
          </div>

          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className="pt-8 text-body-medium flex-1 min-w-0 pr-40"
              exit={{ x: 8, opacity: 0 }}
              initial={{ x: -8, opacity: 0 }}
              key={step < 4 ? "thinking" : "response"}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {step < 4 ? (
                <div className="ai-chats-chat-thinking whitespace-nowrap">
                  is thinking...
                </div>
              ) : (
                <ResponsePart setStep={setStep} step={step} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

const ResponsePart = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    let index = 0;
    const lines = [
      "Based on live data from react.dev, the latest updates to the React",
      "documentation include:",
      "A new",
      "“Thinking in React”",
      "section, rewritten with updated mental models for functional components and hooks.",
    ];

    const strSlice = (strIndex: number) => {
      const str = lines[strIndex];
      const prevLengths = lines
        .slice(0, strIndex)
        .reduce((acc, line) => acc + line.length, 0);

      const indexCalc = index - prevLengths;

      if (indexCalc < 0) return "";
      if (indexCalc >= str.length) return str;

      return str.slice(0, indexCalc);
    };

    const interval = setInterval(() => {
      setResponse(
        `
        <div class='mb-16'>
          ${strSlice(0)} <br /> ${strSlice(1)}
        </div>
      ` +
          (index > lines[0].length + lines[1].length
            ? `
        <ul class='list-disc pl-8'>
          <li class='pl-10'>${strSlice(2)} <span class="text-label-medium">${strSlice(3)}</span> ${strSlice(4)}</li>
        </ul>`
            : ""),
      );

      index++;

      if (index > lines.reduce((acc, line) => acc + line.length, 0)) {
        clearInterval(interval);
        setStep(5);
        document
          .querySelector(".ai-chats-chat-bot")!
          .getAnimations()
          .forEach((animation) => {
            const interval = setInterval(() => {
              animation.playbackRate -= 0.1;

              if (animation.playbackRate <= 0) {
                clearInterval(interval);
                animation.pause();
              }
            }, 100);
          });
      }
    }, 20);
  }, [setStep]);

  return (
    <div className="text-body-medium">
      <div dangerouslySetInnerHTML={{ __html: response }} />

      <div className="flex gap-8 mt-16">
        {step === 5 &&
          Icons.map((icon, index) => (
            <motion.svg
              animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
              fill="none"
              height="16"
              initial={{ opacity: 0, filter: "blur(1px)", y: 4, scale: 0.9 }}
              key={index}
              transition={{ delay: 0.4 + index * 0.15 }}
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              {icon}
            </motion.svg>
          ))}
      </div>
    </div>
  );
};

const PROMPT = "What's new in the React docs?";

const InputPart = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) => {
  const [inputText, setInputText] = useState("");
  const buttonRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onVisible(
      document.getElementById("ai-chats")!,
      () => {
        setStep(0);

        setTimeout(() => {
          setStep(1);

          let index = 0;

          const tick = () => {
            setTimeout(
              () => {
                if (window.innerWidth < 996) {
                  setInputText(
                    PROMPT.slice(
                      Math.max(0, index + 1 - (PROMPT.length - 2)),
                      index + 1,
                    ),
                  );
                } else {
                  setInputText(PROMPT.slice(0, index + 1));
                }
                index++;

                if (index >= PROMPT.length) {
                  buttonRef
                    .current!.animate(
                      [
                        { scale: 1 },
                        { scale: 0.95 },
                        { scale: 0.95 },
                        { scale: 1 },
                      ],
                      {
                        duration: 200,
                        delay: 300,
                      },
                    )
                    .finished.then(() => {
                      setStep(2);

                      setTimeout(() => {
                        setStep(3);

                        setTimeout(() => {
                          setStep(4);
                        }, 2000);
                      }, 200);
                    });

                  return;
                }

                tick();
              },
              40 + Math.random() * 30,
            );
          };
          tick();
        }, 500);
      },
      1,
    );
  }, [setStep]);

  if (step === -1) return null;

  return (
    <motion.div
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className="absolute inset-x-24 bottom-24 bg-white-alpha-72 rounded-full p-12 pl-20 flex gap-8 items-center"
      initial={{ y: 32, opacity: 0, scale: 0.95 }}
      ref={inputRef}
      style={{
        boxShadow:
          "0px 40px 48px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="text-body-input flex-1 flex items-center whitespace-nowrap min-w-0">
        {(() => {
          if (step === -1 || step === 0)
            return <div className="text-black-alpha-48">Ask anything...</div>;
          if (step >= 2)
            return (
              <div className="text-black-alpha-48">Ask a follow-up...</div>
            );

          return (
            <>
              {inputText}
              <span className="cursor">|</span>
            </>
          );
        })()}
      </div>

      <Microphone />

      <div
        className={cn(
          "size-32 relative rounded-full",
          step >= 0 ? "bg-accent-black" : "bg-black-alpha-16",
        )}
        ref={buttonRef}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            className="flex-center overlay"
            key={step >= 2 && step !== 5 ? "stop" : "arrow"}
          >
            {step >= 2 && step !== 5 ? (
              <div className="size-10 rounded-2 bg-accent-white" />
            ) : (
              <ArrowUp />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Icons = [
  <Fragment key={0}>
    <path
      d="M10.1666 10.1663V12.6663C10.1666 13.4948 9.49501 14.1663 8.66659 14.1663H3.33325C2.50482 14.1663 1.83325 13.4948 1.83325 12.6663V7.33301C1.83325 6.50458 2.50482 5.83301 3.33325 5.83301H5.83325M7.33325 10.1663H12.6666C13.495 10.1663 14.1666 9.49477 14.1666 8.66634V3.33301C14.1666 2.50458 13.495 1.83301 12.6666 1.83301H7.33325C6.50483 1.83301 5.83325 2.50458 5.83325 3.33301V8.66634C5.83325 9.49477 6.50483 10.1663 7.33325 10.1663Z"
      stroke="#A5A5A5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </Fragment>,
  <Fragment key={1}>
    <path
      d="M12.8412 13.5V10.8333L10.1746 10.8333M3.16667 2.5L3.16667 5.16667H5.83333M2.54255 7.3125C2.51447 7.53772 2.5 7.76717 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C9.78439 13.5 11.4074 12.6502 12.4214 11.3333M13.4574 8.6875C13.4855 8.46228 13.5 8.23283 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C6.21561 2.5 4.59258 3.34975 3.57856 4.66667"
      stroke="#A5A5A5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </Fragment>,
  <Fragment key={2}>
    <path
      d="M1.83325 6.49967H5.16658V13.4997H1.83325V6.49967Z"
      stroke="#A5A5A5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M8.27522 1.87203L7.96112 1.83301C6.99992 4.99967 5.16658 5.64195 5.16658 7.52212V11.963C5.16658 12.4979 5.47607 12.9923 5.98188 13.1754C7.69835 13.7965 9.49386 13.9294 11.309 13.7731C12.4174 13.6776 13.2861 12.8269 13.5303 11.7482L14.1151 9.16539C14.4072 7.87509 13.4198 6.64855 12.089 6.64855H9.01227L9.66919 4.52684C10.0488 3.30073 9.55612 2.03114 8.27522 1.87203Z"
      stroke="#A5A5A5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </Fragment>,
  <Fragment key={3}>
    <path
      d="M1.83337 9.16634H5.16671V2.16634H1.83337V9.16634Z"
      stroke="#A5A5A5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
    <path
      d="M8.27535 13.794L7.96125 13.833C7.00004 10.6663 5.16671 10.0241 5.16671 8.1439V3.70304C5.16671 3.16808 5.47619 2.67367 5.982 2.49062C7.69848 1.86947 9.49398 1.73659 11.3091 1.89292C12.4176 1.98838 13.2862 2.83907 13.5304 3.9178L14.1152 6.50063C14.4073 7.79093 13.42 9.01747 12.0891 9.01747H9.0124L9.66932 11.1392C10.0489 12.3653 9.55624 13.6349 8.27535 13.794Z"
      stroke="#A5A5A5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </Fragment>,
];
