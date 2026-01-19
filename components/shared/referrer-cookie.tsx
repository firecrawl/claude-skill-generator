"use client";

import { useEffect } from "react";

/**
 * Sets a cookie with the user's first referrer URL (or current URL if campaign params exist).
 * Runs once on initial client load if the cookie is not already present.
 */
export default function ReferrerCookie() {
  useEffect(() => {
    try {
      // Only set once
      const cookieName = "fc_ref_url";
      const existing = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${cookieName}=`));
      if (existing) return;

      const referrer = document.referrer || "";
      const url = new URL(window.location.href);
      const searchKeys = Array.from(url.searchParams.keys());
      const hasCampaignParams = searchKeys.some(
        (k) =>
          k.startsWith("utm_") ||
          k === "ref" ||
          k === "referrer" ||
          k === "source",
      );

      // Prefer external referrer; if none, capture full URL when campaign params present
      let value = referrer;
      if (!value && hasCampaignParams) {
        value = window.location.href;
      }

      if (!value) return;

      const encoded = encodeURIComponent(value);
      // 180 days
      const maxAgeSeconds = 60 * 60 * 24 * 180;
      document.cookie = `${cookieName}=${encoded}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
    } catch {
      // noop
    }
  }, []);

  return null;
}
