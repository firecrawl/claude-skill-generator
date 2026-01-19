import Image from "@/components/shared/image/Image";

import Firecrawl from "./_svg/Firecrawl";
import AiChatsChat from "./Chat/Chat";

import "./Chats.css";

export default function AiChats() {
  return (
    <div className="h-438 lg-max:relative lg-max:h-520">
      <div className="flex border-b border-border-faint">
        <div className="py-18 px-15 flex gap-10 border-r border-border-faint">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="size-12 relative before:inside-border before:border-border-muted rounded-full"
              key={index}
            />
          ))}
        </div>

        <div className="py-12 px-16 flex-1 flex items-center border-r border-border-faint">
          <Image
            alt="AI Assistant"
            className="opacity-56 mr-8"
            height={20}
            src="ai/bot"
            width={20}
          />
          <div className="text-body-small mr-6 text-black-alpha-56">
            AI Assistant
          </div>

          <div className="py-4 px-10 rounded-full bg-black-alpha-5 flex gap-2 items-center text-[12px]/[16px] font-[450] text-black-alpha-56">
            <span>with</span>
            <Firecrawl />
            <span>Firecrawl</span>
          </div>
        </div>

        <div className="flex py-14 px-16 gap-8 text-body-small text-black-alpha-56 lg-max:hidden">
          <div className="size-20 flex-center">
            <div className="size-12 bg-heat-12 flex-center rounded-full relative">
              <div className="size-4 bg-heat-100 rounded-full" />
              <div className="cw-8 ch-8 absolute border border-heat-100 rounded-full ai-chats-realtime-indicator" />
            </div>
          </div>

          <span>Real-time</span>
          <span>·</span>
          <span>Updated 2 min ago</span>
        </div>
      </div>

      <AiChatsChat />
    </div>
  );
}
