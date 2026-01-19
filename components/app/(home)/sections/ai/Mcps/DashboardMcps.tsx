"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import CurvyRect from "@/components/shared/layout/curvy-rect";
import { CopyButton } from "@/components/shared/code/copy-code";
import Image from "next/image";

const integrationOptions = [
  {
    label: "Claude",
    value: "claude",
    icon: "claude",
    snippet: `{
  "mcpServers": {
    "mcp-server-firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "$API_KEY"
      }
    }
  }
}`,
  },
  {
    label: "Cursor",
    value: "cursor",
    icon: "cursor",
    snippet: `{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "$API_KEY"
      }
    }
  }
}`,
  },
  {
    label: "Windsurf",
    value: "windsurf",
    icon: "windsurf",
    snippet: `{
  "mcpServers": {
    "mcp-server-firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "$API_KEY"
      }
    }
  }
}`,
  },
];

export default function DashboardMcps({ apiKey }: { apiKey: string }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showKey, setShowKey] = useState(false);

  const getInterpolatedSnippet = (snippet: string, apiKey: string) => {
    if (!showKey) {
      return snippet.replace("$API_KEY", "•••");
    }
    return snippet.replace("$API_KEY", apiKey);
  };

  return (
    <div className="relative">
      {/* Border overlay */}
      <div className="overlay border-x border-border-faint pointer-events-none" />

      {/* Header section */}
      <div className="p-5 lg:p-6 w-full border-t z-[2] border-border-faint relative">
        <CurvyRect
          className="absolute -top-1 h-[calc(100%+1px)] left-0 w-full pointer-events-none"
          allSides
        />

        <div className="flex items-center gap-3">
          <h2 className="text-label-x-large text-accent-black">
            MCP Integration
          </h2>
          <span className="!text-mono-x-small font-mono text-heat-100">
            [ CONNECTED ]
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="-mt-1 relative">
        <div className="h-1 absolute top-0 bg-border-faint w-full left-0" />
        <CurvyRect className="overlay pointer-events-none" allSides />

        <div className="p-5 lg:p-6">
          {/* Editor tabs - simple full width buttons */}
          <div className="flex items-stretch gap-2 mb-6">
            {integrationOptions.map((option, index) => (
              <button
                key={option.value}
                onClick={() => setSelectedTab(index)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-6 transition-all text-body-medium",
                  index === selectedTab
                    ? "bg-heat-100 text-white"
                    : "bg-black-alpha-4 hover:bg-black-alpha-6 text-black-alpha-72 hover:text-accent-black",
                )}
              >
                <Image
                  alt={option.label}
                  height={16}
                  src={`/use-cases/${option.icon}.jpg`}
                  width={16}
                  className="rounded-2"
                />
                <span className="">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Code block */}
          <div className="relative -mx-5 lg:-mx-6">
            <div className="relative bg-black-alpha-4 border-t border-b border-border-faint">
              <CurvyRect className="absolute inset-0 pointer-events-none" />
              <div className="p-4 lg:p-6 relative">
                <pre className="whitespace-pre-wrap text-mono-small text-accent-black leading-relaxed font-mono">
                  {getInterpolatedSnippet(
                    integrationOptions[selectedTab].snippet,
                    apiKey,
                  )}
                </pre>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 lg:top-6 lg:right-6 flex gap-2">
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="h-7 w-7 p-0 bg-white hover:bg-black-alpha-4 border border-black-alpha-10 hover:border-black-alpha-20 transition-all rounded-4 flex items-center justify-center"
                  >
                    {showKey ? (
                      <EyeOff className="w-3 h-3 text-accent-black" />
                    ) : (
                      <Eye className="w-3 h-3 text-accent-black" />
                    )}
                  </button>
                  <CopyButton
                    code={integrationOptions[selectedTab].snippet.replace(
                      "$API_KEY",
                      apiKey,
                    )}
                    copyText="Copy"
                    className="bg-white hover:bg-black-alpha-4 border-black-alpha-10 hover:border-black-alpha-20 text-accent-black !text-mono-x-small"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-4">
            <p className="text-body-small text-black-alpha-56">
              Add this configuration to your{" "}
              {integrationOptions[selectedTab].label.toLowerCase()} settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
