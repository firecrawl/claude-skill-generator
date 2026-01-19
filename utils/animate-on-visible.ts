import { animate } from "motion";

export function animateOnVisible({
  animation,
  element,
  threshold = 0.01,
}: {
  element?: HTMLElement;
  animation: ReturnType<typeof animate>;
  threshold?: number;
}) {
  if (!element) {
    return;
  }

  // Check if element is already visible at the beginning
  const rect = element.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (isVisible) {
    animation.play();
  } else {
    animation.pause();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animation.play();
        } else {
          animation.pause();
        }
      });
    },
    { threshold },
  );

  observer.observe(element);

  return () => {
    animation.cancel();
    observer.disconnect();
  };
}

export function setIntervalOnVisible({
  element,
  callback,
  interval,
  threshold = 0.01,
}: {
  element?: HTMLElement | null;
  callback: () => void;
  interval: number;
  threshold?: number;
}) {
  if (!element) {
    return;
  }

  let intervalId: NodeJS.Timeout | null = null;

  // Check if element is already visible at the beginning
  const rect = element.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (isVisible && !intervalId) {
    // Execute immediately for the first time
    callback();
    intervalId = setInterval(callback, interval);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is visible, start the interval
          if (!intervalId) {
            // Execute immediately for the first time
            callback();
            intervalId = setInterval(callback, interval);
          }
        } else {
          // Element is no longer visible, clear the interval
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      });
    },
    { threshold },
  );

  observer.observe(element);

  // Return a cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    observer.disconnect();
  };
}

export default animateOnVisible;
