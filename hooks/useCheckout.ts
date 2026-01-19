// Stub for useCheckout - no checkout in UI library mode

import { useState } from "react";

export function useCheckout(params?: any) {
  const [open, setOpen] = useState(false);

  return {
    handleCheckout: () => {
      console.log("Checkout disabled in UI library mode");
    },
    handleUpgrade: () => {
      console.log("Upgrade disabled in UI library mode");
    },
    loading: false,
    upgradePriceId: null as string | null,
    upgradeLoading: false,
    upgradeMeta: null as {
      planName: string;
      interval: "monthly" | "yearly";
    } | null,
    open,
    setOpen,
  };
}
