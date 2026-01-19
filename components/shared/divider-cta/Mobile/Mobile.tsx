import Badge from "@/components/ui/shadcn/badge";
import Button from "@/components/ui/shadcn/button";
import CurvyRect from "@/components/shared/layout/curvy-rect";
import DividerCtaFlame from "@/components/shared/divider-cta/Flame/Flame";
import FirecrawlIcon from "@/components/shared/firecrawl-icon/firecrawl-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DividerCtaMobile({
  className,
}: {
  className?: string;
  flameVariant?: number;
}) {
  return (
    <div
      className={cn(
        "container h-416 flex flex-col justify-center relative -mt-1",
        className,
      )}
    >
      <div className="h-full top-0 absolute w-full pointer-events-none left-0 border-x border-border-faint" />

      <CurvyRect className="h-full w-full absolute top-0 left-0" allSides />

      <Badge className="mb-20 mx-auto">
        <FirecrawlIcon className="size-20" />
        Get started
      </Badge>

      <div className="text-title-h3 mb-16 text-center">Ready to build?</div>

      <div className="text-body-large mb-32 text-center">
        Start getting Web Data for free and scale seamlessly as your project
        expands. <div className="text-label-large">No credit card needed.</div>
      </div>

      <div className="flex gap-12 justify-center relative z-[2] lg-max:bg-background-base">
        <Link href="/signin">
          <Button size="large" variant="primary">
            Start for free
          </Button>
        </Link>
        <Link href="/pricing">
          <Button size="large" variant="secondary">
            See our plans
          </Button>
        </Link>
      </div>

      <DividerCtaFlame variant={0} />
    </div>
  );
}
