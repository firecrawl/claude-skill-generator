import { cubicBezier, motion, TargetAndTransition } from "motion/react";
import { ReactNode, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface ModalProps {
  children?: ReactNode;
  contentClassName?: string;
  wrapperClassName?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initial: TargetAndTransition;
  exit: TargetAndTransition;
}

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  wrapperClassName,
  contentClassName,
  initial = { y: 64 },
  exit = { y: -64 },
}: ModalProps) {
  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className={cn(
            "!fixed px-12 overlay z-[400] flex items-center justify-center",
            wrapperClassName,
          )}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: cubicBezier(0.4, 0, 0.2, 1),
              delay: 0.1,
            },
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: cubicBezier(0.4, 0, 0.2, 1) }}
        >
          <div
            className="overlay bg-black-alpha-40"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            animate={{ x: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
            className={cn(
              "max-w-640 w-full h-max overflow-y-auto max-h-[calc(100vh-24px)] lg:max-h-[calc(100vh-64px)] bg-accent-white relative rounded-16",
              contentClassName,
            )}
            exit={{
              opacity: 0,
              filter: "blur(4px)",
              transition: {
                duration: 0.3,
                ease: cubicBezier(0.4, 0, 0.2, 1),
              },
              ...exit,
            }}
            initial={{ opacity: 0, filter: "blur(4px)", ...initial }}
            style={{
              boxShadow:
                "0px 32px 40px 6px rgba(0, 0, 0, 0.02), 0px 12px 32px 0px rgba(0, 0, 0, 0.02), 0px 24px 32px -8px rgba(0, 0, 0, 0.02), 0px 8px 16px -2px rgba(0, 0, 0, 0.02), 0px 0px 0px 1px rgba(0, 0, 0, 0.04)",
            }}
            transition={{
              duration: 0.3,
              ease: cubicBezier(0.4, 0, 0.2, 1),
              delay: 0.1,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
