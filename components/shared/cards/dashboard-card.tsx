"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CurvyRect from "../layout/curvy-rect";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  noPadding?: boolean;
  showFlame?: boolean;
}

export function DashboardCard({
  children,
  className,
  title,
  subtitle,
  icon,
  action,
  noPadding = false,
  showFlame = false,
}: DashboardCardProps) {
  return (
    <div className={cn("relative", className)}>
      <CurvyRect
        className="absolute h-[calc(100%+1px)] left-0 w-full"
        allSides
      />

      <div className="relative bg-white border-border-faint border rounded-12 overflow-hidden">
        {/* Optional flame background */}
        {showFlame && (
          <div className="absolute inset-0 opacity-5">
            {/* Flame component would go here */}
          </div>
        )}

        {/* Header */}
        {(title || subtitle || icon || action) && (
          <div className="flex items-start justify-between p-5 lg:p-6 border-b border-border-faint">
            <div className="flex items-start gap-3">
              {icon && (
                <div className="w-5 h-5 text-black-alpha-64">{icon}</div>
              )}
              <div>
                {title && (
                  <h3 className="text-label-large text-accent-black">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-body-small text-black-alpha-72 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {action && <div>{action}</div>}
          </div>
        )}

        {/* Content */}
        <div className={cn(!noPadding && "p-5 lg:p-6", "relative")}>
          {children}
        </div>
      </div>
    </div>
  );
}
