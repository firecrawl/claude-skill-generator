"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

import AiMcpsProcess from "@/components/app/(home)/sections/ai/Mcps/Process/Process";
import { cn } from "@/lib/utils";
import onVisible from "@/utils/on-visible";

import AiMcpsChatText from "./Text/Text";
import Code from "@/components/ui/code";

/*
0: initial
1: prompt typing
2: prompt sent
3: started working
4: type the tasks to be done
5: call mcp
6: done
*/

export default function AiMcpsChat() {
  const [step, setStep] = useState(0);

  return (
    <div className="font-mono text-mono-medium overflow-hidden relative h-352">
      <div className="h-72 absolute -top-48 inset-x-1 bg-gradient-to-b from-background-base from-[72%] z-[5] to-transparent" />
      <div
        className="h-max p-24 absolute bottom-128 pb-0 left-0 w-full flex flex-col gap-16 min-h-[calc(100%-128px)]"
        style={
          step === 2 || step === 6
            ? {
                transform: "translateY(38px)",
                minHeight: "calc(100% - 90px)",
              }
            : {}
        }
      >
        <div className="flex-1">
          <div className="rounded-6 before:inside-border before:border-black-alpha-4 relative py-12 flex gap-12 px-16">
            <div className="text-[13px]/[20px] text-[#D97757]">✻</div>

            <div className="text-black-alpha-56">
              <div className="text-accent-black">
                Welcome to <span className="font-bold">Claude Code!</span>
              </div>
              <br />
              /help for help, /status for your current setup
            </div>
          </div>
        </div>

        {step >= 2 && (
          <div className="text-black-alpha-64">
            {">"} Extract pricing from stripe.com/pricing
          </div>
        )}

        {step >= 4 && <UpdateTodosBefore />}
        {step >= 5 && <CallingMcp />}
        {step >= 6 && <Finalized />}
      </div>

      {step >= 3 && step !== 6 && <AiMcpsProcess step={step} />}

      <InputPart setStep={setStep} step={step} />
    </div>
  );
}

const CallingMcp = () => {
  const texts = [
    "Calling",
    "firecrawl.scrapeUrl",
    "       {",
    '         "url": "stripe.com/pricing",',
    '         "formats": ["markdown"],',
    '         "onlyMainContent": true',
    "       }",
  ].map((text, index, arr) => {
    const delay =
      300 +
      index * 50 +
      arr.slice(0, index).reduce((acc, curr) => acc + curr.length * 30, 0);

    return {
      text: AiMcpsChatText({
        value: text,
        delay,
      }),
      delay,
      end: delay + text.length * 30,
    };
  });

  return (
    <div>
      <div>
        {texts[0].text} <span className="text-heat-100">{texts[1].text}</span>
      </div>

      {texts[2].text.length > 0 && (
        <div className="before:inside-border before:border-black-alpha-4 relative rounded-6 mt-8 [&_.prismjs]:pt-0 px-16 py-12">
          <Code
            code={texts
              .slice(2)
              .map((t) => t.text)
              .filter((t) => t.length > 0)
              .join("\n")}
            language="json"
            showLineNumbers={false}
          />
        </div>
      )}
    </div>
  );
};

const Finalized = () => {
  const texts = useMemo(() => {
    return [
      "=== STRIPE PRICING EXTRACTED ===",
      "… +1192 lines (ctrl+r to expand)",
      "Update Todos",
      "⎿ Extract pricing from stripe.com/pricing using Firecrawl",
      "Stripe pricing extracted",
      "successfully!",
    ].map((text, index, arr) => {
      const delay =
        index * 50 +
        arr.slice(0, index).reduce((acc, curr) => acc + curr.length * 30, 0);

      return <AiMcpsChatText delay={delay} key={index} value={text} />;
    });
  }, []);

  return (
    <>
      <div className="pl-40 min-h-22">
        <div>{texts[0]}</div>
        <div className="text-black-alpha-48 ">{texts[1]}</div>
      </div>

      <div>
        <div>{texts[2]}</div>
        <div className="line-through text-[#40773B]">{texts[3]}</div>
      </div>

      <div>
        {texts[4]} <span className="text-heat-100">{texts[5]}</span>
      </div>
    </>
  );
};

const UpdateTodosBefore = () => {
  const texts = useMemo(() => {
    return [
      "Update Todos",
      "⎿ Extract",
      "pricing from",
      "stripe.com/pricing",
      "using",
      "Firecrawl",
    ].map((text, index, arr) => {
      const delay =
        index * 50 +
        arr.slice(0, index).reduce((acc, curr) => acc + curr.length * 30, 0);

      return {
        component: (
          <AiMcpsChatText
            delay={delay}
            key={index}
            startInstantly={index === 0}
            value={text}
          />
        ),
        delay,
        end: delay + text.length * 30,
      };
    });
  }, []);

  return (
    <div>
      <div className="font-bold">{texts[0].component}</div>
      <div>
        <span className="text-accent-amethyst">{texts[1].component}</span>{" "}
        {texts[2].component}{" "}
        <span className="text-accent-amethyst">{texts[3].component}</span>{" "}
        {texts[4].component}{" "}
        <span className="text-heat-100 font-bold">{texts[5].component}</span>
      </div>
    </div>
  );
};

const PROMPT = "Extract pricing from stripe.com/pricing";

const InputPart = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    onVisible(
      document.getElementById("ai-mcps"),
      () => {
        setStep(0);

        setTimeout(() => {
          setStep(1);

          let index = 0;

          const tick = () => {
            setTimeout(
              () => {
                index += Math.random() > 0.5 ? 2 : 1;

                if (window.innerWidth < 996) {
                  setInputText(
                    PROMPT.slice(
                      Math.max(0, index + 1 - (PROMPT.length - 10)),
                      index + 1,
                    ),
                  );
                } else {
                  setInputText(PROMPT.slice(0, index + 1));
                }

                if (index >= PROMPT.length) {
                  setTimeout(() => {
                    setStep(2);

                    setTimeout(() => {
                      setStep(3);

                      setTimeout(() => {
                        setStep(4);

                        setTimeout(() => {
                          setStep(5);

                          setTimeout(() => {
                            setStep(6);
                          }, 6000);
                        }, 3000);
                      }, 2000);
                    }, 500);
                  }, 500);

                  return;
                }

                tick();
              },
              50 + Math.random() * 30,
            );
          };

          setTimeout(tick, 500);
        }, 500);
      },
      1,
    );
  }, [setStep]);

  return (
    <div
      className={cn(
        "absolute bottom-24 gap-8 flex rounded-6 py-10 px-16 inset-x-20 lg:inset-x-24 before:inside-border before:border-border-muted",
        step === 0 && "text-black-alpha-48",
      )}
    >
      {">"}{" "}
      {(() => {
        if (step === 0) return 'Try "how do I log an error?"';

        return (
          <div className="flex items-center h-22">
            {step === 1 ? inputText : ""}
            <span className="ml-4 w-7 inline-block h-16 bg-accent-black animate-pulse [animation-duration:500ms]" />
          </div>
        );
      })()}
    </div>
  );
};
