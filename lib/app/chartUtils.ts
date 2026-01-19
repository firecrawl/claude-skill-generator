// Chart utilities for Tremor components
import { AxisDomain } from "recharts/types/util/types";

export const AvailableChartColorsKeys = [
  "blue",
  "emerald",
  "violet",
  "amber",
  "gray",
  "cyan",
  "pink",
  "lime",
  "fuchsia",
] as const;

export type AvailableChartColorsKeys =
  (typeof AvailableChartColorsKeys)[number];

export const AvailableChartColors: {
  [key in AvailableChartColorsKeys]: string;
} = {
  blue: "blue",
  emerald: "emerald",
  violet: "violet",
  amber: "amber",
  gray: "gray",
  cyan: "cyan",
  pink: "pink",
  lime: "lime",
  fuchsia: "fuchsia",
};

export function constructCategoryColors(
  categories: string[],
  colors:
    | AvailableChartColorsKeys[]
    | { [key in AvailableChartColorsKeys]: string },
): Map<string, AvailableChartColorsKeys> {
  const categoryColors = new Map<string, AvailableChartColorsKeys>();

  // Handle both array and object formats
  const colorsArray = Array.isArray(colors)
    ? colors
    : (Object.keys(colors) as AvailableChartColorsKeys[]);

  categories.forEach((category, index) => {
    categoryColors.set(category, colorsArray[index % colorsArray.length]);
  });
  return categoryColors;
}

export function getColorClassName(
  color: AvailableChartColorsKeys,
  type: "bg" | "stroke" | "fill" | "text",
): string {
  const classNames = {
    bg: `bg-${color}-500`,
    stroke: `stroke-${color}-500`,
    fill: `fill-${color}-500`,
    text: `text-${color}-500`,
  };
  return classNames[type];
}

export function getYAxisDomain(
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
): AxisDomain {
  const minDomain = autoMinValue ? "auto" : (minValue ?? 0);
  const maxDomain = maxValue ?? "auto";
  return [minDomain, maxDomain];
}

export function hasOnlyOneValueForKey(data: any[], key: string): boolean {
  const values = data.map((item) => item[key]);
  const uniqueValues = new Set(values);
  return uniqueValues.size === 1;
}
