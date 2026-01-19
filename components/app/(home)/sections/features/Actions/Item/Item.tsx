"use client";

import { AnimatePresence, motion } from "motion/react";
import { nanoid } from "nanoid";
import { useState } from "react";

import { cn } from "@/lib/utils";

export default function FeaturesActionsItem(props: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="p-20 pb-12 group relative"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <div
        className={cn(
          "py-12 rounded-full mb-16 relative z-[2] before:inside-border before:border-border-faint flex-center transition-all backdrop-blur-6",
          "group-hover:bg-white-alpha-72 group-hover:[box-shadow:_0px_24px_32px_-12px_rgba(0,_0,_0,_0.03),_0px_16px_24px_-8px_rgba(0,_0,_0,_0.03),_0px_8px_16px_-4px_rgba(0,_0,_0,_0.03),_0px_0px_0px_1px_rgba(0,_0,_0,_0.03),_0px_0px_0px_12px_#F9F9F9]",
          "group-hover:before:opacity-0 group-hover:text-heat-100",
        )}
      >
        {props.icon}
      </div>

      <div className="py-4 px-12 bg-background-base w-max mx-auto rounded-full relative text-body-medium text-center">
        <span>{props.title}</span>
      </div>

      <AnimatePresence initial={false} mode="popLayout">
        {hovering && (
          <div className="overlay pointer-events-none flex-center">
            <motion.div
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="py-10 px-16 rounded-12 absolute w-max xl-max:w-full max-w-[300px] bottom-[calc(100%-8px)] text-body-medium text-accent-white bg-black-alpha-64 backdrop-blur-6 z-[10]"
              exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
              initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
              key={nanoid()}
              style={{
                boxShadow:
                  "0px 16px 24px -8px rgba(0, 0, 0, 0.06), 0px 8px 16px -4px rgba(0, 0, 0, 0.06)",
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 13,
                filter: { duration: 0.4 },
              }}
            >
              {props.description}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
