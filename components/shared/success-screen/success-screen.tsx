"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CapsuleButton } from "@/components/shared/buttons/capsule-button";
import { Check, ArrowRight, Rocket, Zap, Code } from "lucide-react";
import DividerCtaFlame from "../divider-cta/Flame/Flame";

interface SuccessScreenProps {
  productType?: "normal" | "extract";
  redirectPath?: string;
  redirectDelay?: number; // in milliseconds
  className?: string;
  isUpgrade?: boolean;
}

export default function SuccessScreen({
  productType = "normal",
  redirectPath = "/app",
  redirectDelay = 10000, // 10 seconds default
  className,
  isUpgrade = false,
}: SuccessScreenProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(Math.floor(redirectDelay / 1000));

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push(redirectPath);
    }, redirectDelay);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [redirectDelay, redirectPath, router]);

  return (
    <div className={cn("flex flex-col items-center justify-start", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[380px] lg:max-w-[500px] bg-background-base lg:border lg:border-border-faint overflow-hidden px-24 pt-128 h-screen"
      >
        <div className="absolute -bottom-8 left-0 right-0 opacity-25">
          <DividerCtaFlame />
        </div>

        <div className="relative z-10 flex justify-center mb-36">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="w-[64px] h-[64px] bg-heat-100 rounded-full flex items-center justify-center shadow-lg shadow-heat-100/25"
          >
            <Check className="text-white w-[24px] h-[24px]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-title-h4 text-accent-black mb-6">
            {isUpgrade ? "Upgrade Successful!" : "Purchase Successful!"}
          </h1>
          <p className="text-body-x-large text-black-alpha-72 mb-8">
            {isUpgrade ? (
              <>Your subscription has been upgraded successfully!</>
            ) : (
              <>
                Welcome to the Firecrawl family!
                <br />
                Your subscription is now active.
              </>
            )}
          </p>

          <div className="space-y-36 mt-48">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="p-16 bg-accent-white border border-border-muted rounded-12"
            >
              <div className="space-y-18">
                <div className="flex items-center gap-12">
                  <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full bg-heat-4 text-heat-100 flex items-center justify-center">
                    <Rocket className="w-[16px] h-[16px]" />
                  </div>
                  <p className="text-body-medium lg:text-body-large text-black-alpha-72">
                    Access your new credits
                  </p>
                </div>
                <div className="flex items-center gap-12">
                  <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full bg-heat-4 text-heat-100 flex items-center justify-center">
                    <Zap className="w-[16px] h-[16px]" />
                  </div>
                  <p className="text-body-medium lg:text-body-large text-black-alpha-72">
                    Enjoy faster scraping speeds
                  </p>
                </div>

                <div className="flex items-center gap-12">
                  <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full bg-heat-4 text-heat-100 flex items-center justify-center">
                    <Code className="w-[16px] h-[16px]" />
                  </div>
                  <p className="text-body-medium lg:text-body-large text-black-alpha-72">
                    Integrate with your favorite tools
                  </p>
                </div>
                {/* <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="text-[#605A57] text-sm">Explore the dashboard</p>
                </div> */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <CapsuleButton
                onClick={() => router.push(redirectPath)}
                icon={ArrowRight}
                iconPosition="right"
                size="lg"
                fullWidth
                variant="primary"
              >
                Go to Dashboard
              </CapsuleButton>
              <p className="text-body-medium text-black-alpha-56 text-center mt-8">
                Redirecting in {countdown} seconds...
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
