"use client";

import { Logo } from "@/components/ui/shadcn/Logo";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="https://firecrawl.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-sm text-gray-400">Powered by</span>
          <Logo size={18} className="opacity-40" />
          <span className="text-sm font-semibold text-gray-400">Firecrawl</span>
        </a>
      </div>
    </footer>
  );
}
