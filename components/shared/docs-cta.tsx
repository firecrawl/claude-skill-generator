"use client";

import Link from "next/link";

export default function DocsCTAComponent() {
  return (
    <div className="mb-4 flex flex-col items-start justify-start gap-2">
      <h1 className="text-lg font-semibold">Documentation</h1>
      <p className="text-gray-500">
        Get started with Firecrawl API and start crawling.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm  rounded-md shadow-sm text-white bg-black hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
}
