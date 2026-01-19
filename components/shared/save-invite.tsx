"use client";

import { useEffect } from "react";

export default function SaveInviteDialog({ code }: { code: string }) {
  useEffect(() => {
    if (code) {
      localStorage.setItem("firecrawl-code", code);
    }
  }, [code]);
  return null;
}
