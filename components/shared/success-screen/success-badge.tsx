import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface SuccessBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
}

export const SuccessBadge = React.forwardRef<HTMLDivElement, SuccessBadgeProps>(
  ({ className, style, variant = "light", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full border-[.75px] px-2.5 w-fit h-6 flex items-center text-xs ",
          variant === "light" && "border-[#E9E3DD] text-[#36322F] bg-[#FBFAF9]",
          variant === "dark" && "border-zinc-700 text-zinc-200 bg-zinc-900/50",
          className,
        )}
        style={{
          boxShadow:
            variant === "light"
              ? "inset 0px -2.108433723449707px 0px 0px #f4f1ee, 0px 1.2048193216323853px 6.325301647186279px 0px #f4f1ee"
              : "inset 0px -2.108433723449707px 0px 0px rgba(24, 24, 27, 0.5), 0px 1.2048193216323853px 6.325301647186279px 0px rgba(24, 24, 27, 0.5)",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
SuccessBadge.displayName = "SuccessBadge";
