import { useCallback, useRef, useEffect, useState } from "react";
import { animate, cubicBezier } from "framer-motion";

interface UseSidebarNavigationProps {
  activeIndex: number;
  pathname?: string;
}

export const useSidebarNavigation = ({
  activeIndex,
  pathname,
}: UseSidebarNavigationProps) => {
  const hoverBackgroundRef = useRef<HTMLDivElement>(null);
  const activeBackgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Update active background position with smooth animation
  const updateActiveBackground = useCallback(() => {
    if (
      activeIndex === -1 ||
      !activeBackgroundRef.current ||
      !itemRefs.current[activeIndex]
    ) {
      return;
    }

    const activeItem = itemRefs.current[activeIndex];
    if (!activeItem) return;

    // Use offsetTop like dropdown hook
    const offsetTop = activeItem.offsetTop;

    // Animate to new position
    animate(
      activeBackgroundRef.current,
      {
        y: offsetTop,
      },
      {
        ease: cubicBezier(0.4, 0, 0.2, 1),
        duration: 0.3,
      },
    );
  }, [activeIndex]);

  // Handle hover animations
  const onItemMouseEnter = useCallback(
    (index: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setHoveredIndex(index);

      if (!hoverBackgroundRef.current || !itemRefs.current[index]) {
        return;
      }

      const item = itemRefs.current[index];

      // Hide hover background if hovering over active item
      if (index === activeIndex) {
        animate(hoverBackgroundRef.current, { opacity: 0 }, { duration: 0.15 });
        return;
      }

      // Show hover background for non-active items
      // Scale animation sequence like dropdown
      animate(
        hoverBackgroundRef.current,
        { scale: 0.95, opacity: 1 },
        { duration: 0.1 },
      ).then(() => {
        if (hoverBackgroundRef.current) {
          animate(hoverBackgroundRef.current, { scale: 1 }, { duration: 0.1 });
        }
      });

      // Y position animation using offsetTop like dropdown
      animate(
        hoverBackgroundRef.current,
        {
          y: item?.offsetTop,
        },
        {
          ease: cubicBezier(0.1, 0.1, 0.25, 1),
          duration: 0.2,
        },
      );
    },
    [activeIndex],
  );

  const onItemMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setHoveredIndex(null);
      if (hoverBackgroundRef.current) {
        animate(
          hoverBackgroundRef.current,
          { scale: 1, opacity: 0 },
          { duration: 0.15 },
        );
      }
    }, 100);
  }, []);

  // Set ref for a specific index
  const setItemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  // Update active background when activeIndex or pathname changes
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      updateActiveBackground();
    }, 0);

    return () => clearTimeout(timer);
  }, [activeIndex, pathname, updateActiveBackground]);

  // Use MutationObserver to detect DOM changes (dropdown expanding/collapsing) and update positions
  useEffect(() => {
    if (!containerRef.current) return;

    let updateTimer: NodeJS.Timeout;

    const updatePositions = () => {
      // Clear any pending updates
      clearTimeout(updateTimer);

      // Debounce updates to avoid excessive recalculations
      updateTimer = setTimeout(() => {
        // Update active background position
        updateActiveBackground();

        // Update hover background position if hovering
        if (
          hoveredIndex !== null &&
          hoverBackgroundRef.current &&
          itemRefs.current[hoveredIndex]
        ) {
          const item = itemRefs.current[hoveredIndex];
          if (hoverBackgroundRef.current && item) {
            animate(
              hoverBackgroundRef.current,
              {
                y: item.offsetTop,
              },
              {
                ease: cubicBezier(0.1, 0.1, 0.25, 1),
                duration: 0.15,
              },
            );
          }
        }
      }, 10); // Small debounce to batch multiple mutations
    };

    const mutationObserver = new MutationObserver(() => {
      updatePositions();
    });

    // Only observe direct children changes to reduce observer overhead
    mutationObserver.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(updateTimer);
      mutationObserver.disconnect();
    };
  }, [hoveredIndex, updateActiveBackground]);

  // Handle click animation on items
  const onItemClick = useCallback(
    (index: number) => {
      if (!hoverBackgroundRef.current || index === activeIndex) return;

      // Click animation
      animate(
        hoverBackgroundRef.current,
        { scale: 0.98 },
        { duration: 0.05 },
      ).then(() => {
        if (hoverBackgroundRef.current) {
          animate(hoverBackgroundRef.current, { scale: 1 }, { duration: 0.1 });
        }
      });
    },
    [activeIndex],
  );

  return {
    containerRef,
    hoverBackgroundRef,
    activeBackgroundRef,
    hoveredIndex,
    setItemRef,
    onItemMouseEnter,
    onItemMouseLeave,
    onItemClick,
  };
};
