import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-6 bg-gray-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
