"use client";

import { AnimatePresence, cubicBezier, motion } from "motion/react";
import { useState } from "react";
import ChevronDown from "./_svg/ChevronDown";
import { FAQ } from "@/marketing-global/types";

type Props = {
  item: FAQ;
};

export default function FaqContentItem({ item }: Props) {
  const [visited, setVisited] = useState(false);

  return (
    <div id={item.id} className="border-b border-border-faint relative">
      <button
        className="text-label-large w-full p-20 lg:px-64 py-20 flex relative gap-16 items-center cursor-pointer"
        onClick={() => setVisited((prev) => !prev)}
      >
        <div className="flex-1 min-w-0">{item.question}</div>

        <motion.div animate={{ scaleY: visited ? -1 : 1 }}>
          {" "}
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {visited && (
          <motion.div
            animate={{ height: "auto" }}
            className="text-body-large text-black-alpha-64 overflow-hidden"
            exit={{ height: 0 }}
            initial={{ height: 0 }}
            transition={{ duration: 0.5, ease: cubicBezier(0.4, 0, 0.2, 1) }}
          >
            <div className="border-t border-border-faint mx-20 lg:mx-64" />
            <div
              className="px-20 lg:px-64 py-20 [&_code]:bg-gray-100 [&_code]:px-6 [&_code]:py-2 [&_code]:rounded-4 [&_code]:text-sm [&_code]:font-mono [&_a]:text-heat-100 [&_a]:underline hover:[&_a]:text-heat-80"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />

            <div className="h-20 absolute bottom-0 inset-x-1 bg-gradient-to-t from-background-base to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
