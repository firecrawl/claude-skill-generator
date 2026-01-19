import Image from "@/components/shared/image/Image";
import { cn } from "@/lib/utils";

import AiMcpsChat from "./Chat/Chat";

export default function AiMcps() {
  return (
    <>
      <div className="flex border-b border-border-faint">
        <div className="py-18 px-15 flex gap-10 border-r border-border-faint">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="size-12 relative before:inside-border before:border-border-muted rounded-full"
              key={index}
            />
          ))}
        </div>

        {tabs.map((tab, index) => (
          <div
            className={cn(
              "py-14 px-16 flex gap-6 items-center border-r border-border-faint",
              index !== 0 && "lg-max:flex-1 lg-max:justify-center",
            )}
            key={tab.title}
          >
            <Image alt={tab.title} height={20} src={tab.icon} width={20} />

            <div
              className={cn(
                "text-body-small",
                index === 0 ? "" : "text-black-alpha-56 lg-max:hidden",
              )}
            >
              {tab.title}
            </div>
          </div>
        ))}
      </div>

      <AiMcpsChat />
    </>
  );
}

const tabs = [
  {
    icon: "ai/mcps-claude",
    title: "Claude Code",
  },
  {
    icon: "ai/mcps-cursor",
    title: "Cursor",
  },
  {
    icon: "ai/mcps-windsurf",
    title: "Windsurf",
  },
];
