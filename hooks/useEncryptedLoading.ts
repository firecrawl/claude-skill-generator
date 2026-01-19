import { useEffect, useState } from "react";

import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

export default function useEncryptedLoading({
  enabled,
  text: _text,
  ref,
  interval = 200,
}: {
  enabled: boolean;
  text: string;
  ref: React.RefObject<HTMLDivElement | null>;
  interval?: number;
}) {
  const [text, setText] = useState(_text + "...");

  useEffect(() => {
    if (!enabled) return;

    let i = 2;

    const stop = setIntervalOnVisible({
      element: ref.current!,
      callback: () => {
        i += 1;

        setText(_text + ".".repeat(i % 4));
      },
      interval,
    });

    return () => {
      stop?.();
    };
  }, [enabled, _text, ref]);

  return text;
}
