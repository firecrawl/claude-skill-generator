"use client";

import { motion } from "motion/react";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef, useState } from "react";

import { setIntervalOnVisible } from "@/utils/set-timeout-on-visible";

const generateRow = () => {
  return {
    id: nanoid(),
    instant: false,
  };
};

const duration = 800;

export default function CoreFastRows() {
  const [rows, setRows] = useState(
    Array.from({ length: 6 }, () => ({
      ...generateRow(),
      instant: true,
    })),
  );

  useEffect(() => {
    const stopInterval = setIntervalOnVisible({
      callback: () => {
        setRows((prev) => {
          return [generateRow(), ...prev].slice(0, 7);
        });
      },
      interval: duration,
      element: document.querySelector(".core-fast") as HTMLElement,
    });

    return () => {
      stopInterval?.();
    };
  }, []);

  return (
    <div className="relative overflow-hidden -mt-1 lg-max:h-244">
      <div className="relative -top-40">
        {rows.map((row) => (
          <Row instant={row.instant} key={row.id} />
        ))}
      </div>
    </div>
  );
}

const Miliseconds = ({ instant }: { instant: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const milisecondsRef = useRef<HTMLSpanElement>(null);

  const [_target, setTarget] = useState(0);

  useEffect(() => {
    if (instant) {
      setTarget(49 + Math.floor(Math.random() * 4));

      return;
    }
  }, [instant]);

  useEffect(() => {
    if (instant) return;

    const target = 700 + Math.floor(Math.random() * 101);

    let i = 0;
    const timeout = setTimeout(
      () => {
        const interval = setInterval(() => {
          i += 50;
          i = Math.min(i, target);

          if (milisecondsRef.current) {
            milisecondsRef.current.textContent = i.toString();
          }

          if (i === target) {
            clearInterval(interval);

            if (ref.current) {
              ref.current.animate(
                {
                  color: "var(--heat-100)",
                },
                {
                  duration: 300,
                  fill: "forwards",
                  easing: "ease-in-out",
                },
              );

              setTimeout(() => {
                if (ref.current) {
                  ref.current.animate(
                    {
                      color: "var(--accent-black)",
                    },
                    {
                      duration: 300,
                      fill: "forwards",
                      easing: "ease-in-out",
                    },
                  );
                }
              }, 800);
            }
          }
        }, 50);
      },
      duration * 0.9 + Math.random() * duration * 0.1,
    );

    return () => clearTimeout(timeout);
  }, [instant]);

  return (
    <span ref={ref}>
      <span className="w-16 inline-block" ref={milisecondsRef}>
        {instant ? _target : 0}
      </span>{" "}
      <span className="text-black-alpha-32 ml-6">ms</span>
    </span>
  );
};

const Row = memo(function Row({ instant }: { instant: boolean }) {
  return (
    <motion.div
      animate={{ height: 40 }}
      className="px-20 lg:px-64 h-40 items-center border-b border-border-faint flex lg:gap-48 text-body-small text-black-alpha-48"
      initial={{ height: instant ? 40 : 0 }}
      transition={{ duration: duration / 1000, ease: "linear" }}
    >
      <div className="flex-1">
        <Label />
      </div>

      <div className="w-72">
        <Miliseconds instant={instant} />
      </div>
      <div className="w-72">
        <Miliseconds instant={instant} />
      </div>
    </motion.div>
  );
});

const getRandomPath = () => {
  const paths = [
    "extract",
    "blog",
    "templates",
    "playground",
    "contact",
    "docs",
    "about",
    "pricing",
    "login",
    "signup",
    "features",
    "changelog",
    "faq",
    "support",
    "partners",
    "careers",
  ];

  return "/" + paths[Math.floor(Math.random() * paths.length)];
};

const Label = dynamic(() => Promise.resolve(LabelClient), { ssr: false });

const LabelClient = memo(function Label() {
  const path = useRef(getRandomPath());

  return (
    <div>
      <span className="text-black-alpha-32">firecrawl.dev</span>
      <span className="text-accent-black">{path.current}</span>
    </div>
  );
});
