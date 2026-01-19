import { useEffect, useState } from "react";

export default function AiMcpsChatText({
  value: _value,
  delay,
  onDone,
  onStart,
  startInstantly,
}: {
  value: string;
  delay?: number;
  onDone?: () => void;
  onStart?: () => void;
  startInstantly?: boolean;
}) {
  const [value, setValue] = useState(startInstantly ? _value[0] : "");

  useEffect(() => {
    setTimeout(() => {
      onStart?.();
    }, delay);

    setTimeout(() => {
      let i = startInstantly ? 2 : 1;

      const interval = setInterval(() => {
        i += 1;

        setValue(_value.slice(0, i));

        if (i >= _value.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, 30);
    }, delay);
  }, [_value, delay, onDone, onStart, startInstantly]);

  return value;
}
