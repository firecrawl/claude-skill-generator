import { cn } from "@/lib/utils";
import { Connector } from "@/components/shared/layout/curvy-rect";

type Props = {
  variant: "primary" | "secondary" | "dark";
  children: React.ReactNode;
};

export default function Banner({ variant, children }: Props) {
  return (
    <div className="container p-12 relative z-[102]">
      <div
        className={cn(
          "p-10 rounded-10 overflow-hidden relative text-body-medium text-center",
          {
            "bg-heat-100 text-accent-white": variant === "primary",
            "bg-accent-black text-accent-white": variant === "dark",
            "bg-black-alpha-4 text-accent-black": variant === "secondary",
          },
        )}
      >
        <div
          className={cn(
            "overlay pointer-events-none select-none lg-max:hidden",
            {
              "text-heat-100": variant === "secondary" || variant === "dark",
            },
          )}
        >
          {/* <Flame className="-left-214" /> */}
          {/* <Flame className="-right-214 -scale-x-100" /> */}
        </div>

        {children}
      </div>

      <div className="bottom-0 absolute h-1 w-screen left-[calc(50%-50vw)] bg-border-faint" />
      <Connector className="absolute -bottom-10 -left-[10.5px]" />
      <Connector className="absolute -bottom-10 -right-[10.5px]" />
    </div>
  );
}
