"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import Tooltip from "@/components/ui/shadcn/tooltip";
import Button from "@/components/ui/shadcn/button";

export function CopyButton({
  code,
  invertColors = false,
  iconSize = 16,
  copyText,
  ...props
}: {
  code: string;
  invertColors?: boolean;
  copyText?: string;
  iconSize?: number;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Tooltip description={copyText || "Copy code"} delay={0.02}>
      <Button
        variant="tertiary"
        className="h-7 w-7 rounded-[6px] bg-opacity-20 hover:bg-opacity-40 border-0 [&_svg]:size-3.5 p-0"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(code);
          setHasCopied(true);
        }}
        {...props}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? (
          <CheckIcon
            size={iconSize}
            className={
              invertColors
                ? "text-zinc-800 dark:text-zinc-300"
                : "text-zinc-200"
            }
          />
        ) : (
          <ClipboardIcon
            size={iconSize}
            className={invertColors ? "text-zinc-500" : "text-zinc-200"}
          />
        )}
      </Button>
    </Tooltip>
  );
}
