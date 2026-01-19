import { CurvyRect } from "@/components/shared/ui";
import { cn } from "@/lib/utils";

interface FeaturesCardProps {
  title: string;
  subtitle: string;
  description: string | React.ReactNode;
  icon: React.FC;
  children?: React.ReactNode;
  titleWrapperClassName?: string;
  animationClassName?: string;
  className?: string;
}

export default function FeaturesCard(props: FeaturesCardProps) {
  return (
    <div className={cn("relative", props.className)}>
      <div className="overlay border-x z-[2] border-border-faint pointer-events-none" />

      <div className="-mt-1 p-32 lg:pt-60 lg:pb-48 lg:pl-64 lg:pr-72 w-full border-t z-[2] border-border-faint relative">
        <CurvyRect
          className="absolute -top-1 h-[calc(100%+1px)] left-0 w-full"
          allSides
        />

        <div className="flex gap-8 items-center text-label-small text-black-alpha-64 mb-16">
          <props.icon />
          {props.subtitle}
        </div>

        <div
          className={cn(
            "text-body-x-large max-w-350 text-black-alpha-64",
            props.titleWrapperClassName,
          )}
        >
          <span className="contents text-label-x-large text-accent-black">
            {props.title}
          </span>{" "}
          {props.description}
        </div>
      </div>

      <div
        className={cn("flex w-full -mt-1 relative", props.animationClassName)}
      >
        <div className="h-1 absolute top-0 bg-border-faint w-full left-0" />
        <CurvyRect className="overlay" allSides />

        {props.children}
      </div>
    </div>
  );
}
