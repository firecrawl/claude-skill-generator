"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

const EditButton = (props: { href: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={props.href}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm  ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-7 w-7 rounded-[6px] bg-opacity-20 hover:bg-opacity-40 border-0 [&_svg]:size-3.5"
          >
            <span className="sr-only">Edit</span>
            <PencilIcon className="text-zinc-500 size-3.5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="text-sm bg-white border border-zinc-200 rounded-md py-1 px-3 shadow-md">
          Edit
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditButton;
