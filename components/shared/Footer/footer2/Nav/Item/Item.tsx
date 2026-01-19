import { cn } from "@/lib/utils";
import Link from "next/link";

export default function FooterNavItem({
  href,
  className,
  label,
  target,
}: {
  href: string;
  className?: string;
  label: React.ReactNode;
  target?: string;
}) {
  return (
    <Link
      className={cn(
        "text-body-medium group flex gap-16 items-center text-black-alpha-72 relative hover:text-heat-100 transition-colors duration-[200ms] py-16 px-20 lg:px-28 before:inside-border before:border-border-faint",
        className,
      )}
      href={href}
      target={target}
    >
      {label}
    </Link>
  );
}
