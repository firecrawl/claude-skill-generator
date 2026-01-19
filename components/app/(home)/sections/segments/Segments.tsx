import { animate } from "motion";
import { HTMLAttributes, useRef } from "react";

import Tooltip from "@/components/ui/shadcn/tooltip";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  items: {
    label: string;
    value: string;
    tooltip?: string;
  }[];
  activeItem: string;
  setActiveItem: (item: string) => void;
  disabled?: boolean;
};

export default function Segments({
  items,
  activeItem,
  setActiveItem,
  disabled,
  ...props
}: Props) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      className={cn(
        "flex rounded-8 p-2 relative transition-all",
        {
          "before:inside-border before:border-black-alpha-4": disabled,
          "bg-black-alpha-4": !disabled,
        },
        props.className,
      )}
      style={{
        boxShadow: disabled
          ? ""
          : "0px 0.75px 0.75px 0px rgba(0, 0, 0, 0.02) inset, 0px 0.25px 0.25px 0px rgba(0, 0, 0, 0.04) inset",
      }}
    >
      <div
        className="absolute left-0 transition-[opacity] z-[2] inset-y-2 bg-accent-white rounded-6"
        ref={backgroundRef}
        style={{
          width: `calc((100% - 4px) / ${items.length})`,
          transform: `translateX(2px)`,
          boxShadow:
            "0px 3px 6px -1px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 0.5px 0.5px 0px rgba(0, 0, 0, 0.06)",
          opacity: activeItem ? 1 : 0,
        }}
      />

      {items.map((item) => (
        <button
          className={cn(
            "flex-1 py-3 text-center text-label-medium relative z-[3] transition-colors",
            disabled
              ? "text-black-alpha-24"
              : activeItem === item.value
                ? "text-accent-black"
                : "text-black-alpha-40",
          )}
          key={item.value}
          onClick={async (e) => {
            if (disabled) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }

            setActiveItem(item.value);

            const t = e.target as HTMLElement;

            const target =
              t instanceof HTMLButtonElement
                ? t
                : (t.closest("button") as HTMLButtonElement);

            if (backgroundRef.current) {
              animate(backgroundRef.current, { scale: 0.95 }).then(() =>
                animate(backgroundRef.current!, { scale: 1 }),
              );

              animate(
                backgroundRef.current,
                {
                  x: target.offsetLeft,
                },
                {
                  type: "spring",
                  stiffness: 200,
                  damping: 23,
                },
              );
            }
          }}
        >
          {item.label}

          {item.tooltip && <Tooltip description={item.tooltip} offset={-8} />}
        </button>
      ))}
    </div>
  );
}
