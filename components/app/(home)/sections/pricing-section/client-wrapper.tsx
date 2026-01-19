"use client";

import HomePricing from "./Pricing";

export default function HomePricingClientWrapper() {
  // Static rendering - no auth/backend required
  const user: any = null;
  const subscription: any = null;
  const teamName: string | null = null;

  return (
    <HomePricing user={user} subscription={subscription} teamName={teamName} />
  );
}
