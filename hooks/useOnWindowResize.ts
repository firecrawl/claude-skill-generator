// Window resize hook for Tremor components
import { useEffect, useState } from "react";

export function useOnWindowResize(callback: () => void) {
  useEffect(() => {
    // Call immediately on mount
    callback();

    // Set up resize listener
    window.addEventListener("resize", callback);

    // Cleanup
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]);
}
