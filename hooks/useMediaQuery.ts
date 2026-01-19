import { useEffect, useState } from "react";

type MediaQueryState = {
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
};

export default function useMediaQuery(): MediaQueryState {
  const [state, setState] = useState<MediaQueryState>({
    isSmallMobile: false,
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  });

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;

      setState({
        isSmallMobile: width < 390,
        isMobile: width >= 390 && width < 576,
        isTablet: width >= 576 && width < 768,
        isLaptop: width >= 768 && width < 996,
        isDesktop: width >= 996,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return state;
}
