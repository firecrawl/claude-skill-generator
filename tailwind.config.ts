/* eslint-disable @typescript-eslint/no-require-imports */
import defaultTheme from "tailwindcss/defaultTheme";
import { Config } from "tailwindcss/types/config";

import colorsJson from "./colors.json";

const colors = Object.keys(colorsJson).reduce(
  (acc, key) => {
    acc[key] = `var(--${key})`;

    return acc;
  },
  {} as Record<string, string>,
);

const sizes = Array.from({ length: 1000 }, (_, i) => i).reduce(
  (acc, curr) => {
    acc[curr] = `${curr}px`;

    return acc;
  },
  {
    max: "max-content",
    unset: "unset",
    full: "100%",
    inherit: "inherit",
    "1/2": "50%",
    "1/3": "33.3%",
    "2/3": "66.6%",
    "1/4": "25%",
    "1/6": "16.6%",
    "2/6": "33.3%",
    "3/6": "50%",
    "4/6": "66.6%",
    "5/6": "83.3%",
  } as Record<string, string>,
);

const opacities = Array.from({ length: 100 }, (_, i) => i).reduce(
  (acc, curr) => {
    acc[curr] = curr / 100 + "";

    return acc;
  },
  {} as Record<string, string>,
);

const transitionDurations = Array.from({ length: 60 }, (_, i) => i).reduce(
  (acc, curr) => {
    acc[curr] = curr * 50 + "";

    return acc;
  },
  {} as Record<string, string>,
);

const themeConfig: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./components-new/**/*.{ts,tsx}",
    // "./styles-marketing/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "screenshot-scroll": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "selection-pulse-green": {
          "0%, 100%": {
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.05)",
          },
          "50%": {
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
          },
        },
        "button-press": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.9)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "screenshot-scroll": "screenshot-scroll 15s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "selection-pulse-green":
          "selection-pulse-green 2s ease-in-out infinite",
        "button-press": "button-press 0.3s ease-in-out",
      },
      fontFamily: {
        sans: ["var(--font-suisse)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
        ascii: ["var(--font-roboto-mono)", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "title-h1": [
          "60px",
          {
            lineHeight: "64px",
            letterSpacing: "-0.3px",
            fontWeight: "500",
          },
        ],
        "title-h2": [
          "52px",
          {
            lineHeight: "56px",
            letterSpacing: "-0.52px",
            fontWeight: "500",
          },
        ],
        "title-h3": [
          "40px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.4px",
            fontWeight: "500",
          },
        ],
        "title-h4": [
          "32px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.32px",
            fontWeight: "500",
          },
        ],
        "title-h5": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.24px",
            fontWeight: "500",
          },
        ],
        "body-x-large": [
          "20px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.1px",
            fontWeight: "400",
          },
        ],
        "body-large": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "body-medium": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.14px",
            fontWeight: "400",
          },
        ],
        "body-small": [
          "13px",
          {
            lineHeight: "20px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "body-input": [
          "15px",
          {
            lineHeight: "24px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "label-x-large": [
          "20px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.1px",
            fontWeight: "450",
          },
        ],
        "label-large": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0px",
            fontWeight: "450",
          },
        ],
        "label-medium": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0px",
            fontWeight: "450",
          },
        ],
        "label-small": [
          "13px",
          {
            lineHeight: "20px",
            letterSpacing: "0px",
            fontWeight: "450",
          },
        ],
        "label-x-small": [
          "12px",
          {
            lineHeight: "20px",
            letterSpacing: "0px",
            fontWeight: "450",
          },
        ],
        "mono-medium": [
          "14px",
          {
            lineHeight: "22px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "mono-small": [
          "13px",
          {
            lineHeight: "20px",
            letterSpacing: "0px",
            fontWeight: "500",
          },
        ],
        "mono-x-small": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        "title-blog": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.28px",
            fontWeight: "500",
          },
        ],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Theme colors for UI components
        primary: "var(--heat-100)",
        secondary: "var(--background-lighter)",
        "secondary-foreground": "var(--accent-black)",
        destructive: "#ef4444",
        ring: "var(--heat-100)",
        ...colors,
      },
      screens: {
        xs: { min: "390px" },
        "xs-max": { max: "389px" },
        sm: { min: "576px" },
        "sm-max": { max: "575px" },
        md: { min: "768px" },
        "md-max": { max: "767px" },
        lg: { min: "996px" },
        "lg-max": { max: "995px" },
        xl: { min: "1200px" },
        "xl-max": { max: "1199px" },
      },

      opacity: opacities,
      spacing: {
        ...sizes,
        root: "var(--root-padding)",
      },
      width: sizes,
      maxWidth: sizes,
      height: sizes,
      inset: sizes,
      borderWidth: sizes,
      backdropBlur: Array.from({ length: 20 }, (_, i) => i).reduce(
        (acc, curr) => {
          acc[curr] = curr + "px";

          return acc;
        },
        {} as Record<string, string>,
      ),
      transitionTimingFunction: { DEFAULT: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
      transitionDuration: {
        DEFAULT: "200ms",
        ...transitionDurations,
      },
      transitionDelay: {
        ...transitionDurations,
      },
      borderRadius: (() => {
        const radius: Record<string | number, string> = {
          full: "999px",
          inherit: "inherit",
          0: "0px",
        };

        for (let i = 1; i <= 32; i += 1) {
          radius[i] = `${i}px`;
        }

        return radius;
      })(),
    },
  },
  variants: { extend: { top: ["before"] } },
  corePlugins: {
    container: false,
  },
  plugins: [
    ({ addUtilities, matchUtilities }: any) => {
      addUtilities({
        ".inside-border": {
          "@apply pointer-events-none absolute inset-0 rounded-inherit border transition-all":
            {},
        },
        ".inside-border-x": {
          "@apply pointer-events-none absolute inset-0 rounded-inherit border-x transition-all":
            {},
        },
        ".inside-border-y": {
          "@apply pointer-events-none absolute inset-0 rounded-inherit border-y transition-all":
            {},
        },
        ".mask-border": {
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          "mask-composite": "exclude",
          "pointer-events": "none",
        },
        ".center-x": { "@apply absolute left-1/2 -translate-x-1/2": {} },
        ".center-y": { "@apply absolute top-1/2 -translate-y-1/2": {} },
        ".center": {
          "@apply absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2":
            {},
        },
        ".flex-center": { "@apply flex items-center justify-center": {} },
        ".overlay": {
          "@apply absolute top-0 left-0 w-full h-full rounded-inherit": {},
        },
        ".text-gradient": { "@apply !bg-clip-text !text-transparent": {} },
      });
      matchUtilities(
        {
          cw: (value: string) => {
            const width = parseInt(value);

            return {
              width: value,
              left: `calc(50% - ${width / 2}px)`,
            };
          },
          ch: (value: string) => {
            const height = parseInt(value);

            return {
              height: value,
              top: `calc(50% - ${height / 2}px)`,
            };
          },
          cs: (value: string) => {
            const size = parseInt(value);

            return {
              width: size,
              height: size,
              left: `calc(50% - ${size / 2}px)`,
              top: `calc(50% - ${size / 2}px)`,
            };
          },
          cmw: (value: string) => {
            const [maxWidth, paddingX] = value
              .split(",")
              .map((v) => parseInt(v));

            const width = paddingX ? `calc(100% - ${paddingX * 2}px)` : "100%";

            return {
              maxWidth: maxWidth,
              width,
              left: `calc(50% - (min(${maxWidth}px, ${width}) / 2))`,
            };
          },
          mw: (value: string) => {
            const [maxWidth, paddingX] = value
              .split(",")
              .map((v) => parseInt(v));

            const width = paddingX ? `calc(100% - ${paddingX * 2}px)` : "100%";

            return {
              maxWidth: maxWidth,
              width,
            };
          },
        },
        { values: sizes },
      );
    },
    require("tailwind-gradient-mask-image"),
    require("@tailwindcss/typography"),
  ],
};

export default themeConfig;
