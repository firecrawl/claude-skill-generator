"use client";
import {
  ConnectorToLeft,
  ConnectorToRight,
} from "@/components/shared/layout/curvy-rect";
import { NAV_ITEMS } from "@/components/shared/header/Nav/Nav";
import Link from "next/link";

export default function HeaderDropdownMobileItem({
  item,
}: {
  item: (typeof NAV_ITEMS)[number];
}) {
  return (
    <Link className="p-24 flex group relative" href={item.href}>
      <div className="h-1 bottom-0 absolute left-0 w-full bg-border-faint" />
      <ConnectorToRight className="-top-11 left-0" />
      <ConnectorToRight className="-bottom-10 left-0" />
      <ConnectorToLeft className="-top-11 right-0" />
      <ConnectorToLeft className="-bottom-10 right-0" />

      <span className="px-4 flex-1 text-label-medium text-accent-black">
        {item.label}
      </span>
    </Link>
  );
}
