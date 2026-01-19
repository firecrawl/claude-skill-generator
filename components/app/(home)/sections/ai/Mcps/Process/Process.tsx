import { useEffect, useMemo, useRef, useState } from "react";

import useSwitchingCode from "@/hooks/useSwitchingCode";
import useEncryptedLoading from "@/hooks/useEncryptedLoading";

export default function AiMcpsProcess({ step }: { step: number }) {
  return (
    <div className="flex absolute bottom-90 inset-x-20 lg:inset-x-24">
      <Loader />

      <Title step={step} />

      <Timeline />
    </div>
  );
}

function Timeline() {
  const [seconds, setSeconds] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTokens((v) => v + Math.floor(1 + Math.random() * 2));

      i += 1;

      setSeconds(Math.floor(i / (1000 / 25)));
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-black-alpha-64 whitespace-nowrap">
      ({seconds}s · {tokens} tokens
      <span className="hidden lg:contents"> · esc to interrupt</span>)
    </div>
  );
}

function Title({ step }: { step: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const encryptedText = useSwitchingCode(
    useMemo(() => {
      if (step >= 5) return "Accomplishing";
      if (step >= 4) return "Cooking";

      return "Working";
    }, [step]),
  );

  const text = useEncryptedLoading({
    enabled: true,
    text: "",
    ref,
  });

  return (
    <div className="text-[#D97757] flex" ref={ref}>
      {encryptedText.replaceAll("\n", "")}
      <div className="w-32 inline-block">{text}</div>
    </div>
  );
}

function Loader() {
  const [char, setChar] = useState("·");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setChar(() => {
        index += 1;

        return "·✢✽✶✻❋"[index % 5];
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return <div className="mr-4 size-20 flex-center text-[#D97757]">{char}</div>;
}
