"use client";

import { Button } from "@/components/ui/shadcn-default/button";
import { Logo } from "@/components/ui/shadcn/Logo";
import { useRouter } from "next/navigation";
import { Github, Settings as SettingsIcon } from "lucide-react";

export function Navbar() {
  const router = useRouter();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Logo size={32} className="sm:w-10 sm:h-10" />
            <span className="text-base sm:text-xl font-semibold text-[#262626]">
              Firecrawl Starter
            </span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-4">
            {/* Desktop: Show Settings button with text */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex no-underline hover:no-underline"
              onClick={() => router.push("/settings")}
            >
              Settings
            </Button>
            {/* Mobile: Show Settings icon only */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden no-underline hover:no-underline"
              onClick={() => router.push("/settings")}
            >
              <SettingsIcon size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="no-underline hover:no-underline"
              onClick={() =>
                window.open(
                  "https://github.com/mendableai/firecrawl-starter",
                  "_blank"
                )
              }
            >
              <Github size={18} className="sm:w-5 sm:h-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
