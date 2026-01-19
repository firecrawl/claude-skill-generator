"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";

interface UnifiedChartProps {
  data: Array<{
    date: string | Date;
    [key: string]: any;
  }>;
  height?: number;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string) => string;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
  color?: string;
  gradientId?: string;
  showLabels?: boolean;
  labelInterval?: number;
  areas?: string[];
  alwaysShowKeyNames?: boolean;
}

export function UnifiedChart({
  data,
  height = 240,
  valueFormatter = (value) => value.toLocaleString(),
  dateFormatter = (date) => {
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
  },
  showGrid = false,
  showXAxis = true,
  showYAxis = false,
  className,
  color = "#ff4c00",
  gradientId = "chartGradient",
  areas = ["value"],
  showLabels = true,
  labelInterval = 0,
  alwaysShowKeyNames = false,
}: UnifiedChartProps) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-12 bg-white-alpha-88 backdrop-blur-sm border border-border-faint shadow-lg px-12 py-8">
          <p className="text-mono-x-small font-mono text-black-alpha-56 mb-4">
            {dateFormatter(label)}
          </p>
          {payload.map((x, idx, arr) => {
            if (arr.length === 1 && !alwaysShowKeyNames) {
              return (
                <p
                  className="text-mono-small font-mono  text-accent-black"
                  key={x.dataKey}
                >
                  {valueFormatter(x.value as number)}
                </p>
              );
            }

            const key = x.dataKey?.toString().replace("value_", "");
            if (!key) return null;
            return (
              <p
                className="text-mono-small font-mono  text-accent-black flex items-center"
                key={key}
              >
                <div
                  className="h-8 w-8 rounded-full mr-4"
                  style={{
                    backgroundColor: color,
                    filter: `hue-rotate(${Math.round((idx * 360) / arr.length)}deg)`,
                  }}
                ></div>
                {key}: {valueFormatter(x.value as number)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const shouldShowTick = (index: number, total: number) => {
    if (total <= 3) return true;
    const mid = Math.floor(total / 2);
    return index === 0 || index === mid || index === total - 1;
  };

  const xTicks = (() => {
    if (!data || data.length === 0) return [] as string[];
    const labels = data.map((d) => String(d.date));
    const n = labels.length;
    if (n <= 3) return labels;
    const first = labels[0];
    const last = labels[n - 1];
    const midIndex = Math.floor((n - 1) / 2);
    let mid = labels[midIndex];
    if (mid === first || mid === last) {
      // search for a different label near the center
      let left = midIndex - 1;
      let right = midIndex + 1;
      while (left >= 1 || right <= n - 2) {
        if (left >= 1 && labels[left] !== first && labels[left] !== last) {
          mid = labels[left];
          break;
        }
        if (
          right <= n - 2 &&
          labels[right] !== first &&
          labels[right] !== last
        ) {
          mid = labels[right];
          break;
        }
        left -= 1;
        right += 1;
      }
      // fallback if still not found
      if (mid === first || mid === last) {
        mid = labels[1] !== first ? labels[1] : labels[n - 2];
      }
    }
    return [first, mid, last];
  })();

  return (
    <div className={cn("relative", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: showLabels ? 40 : 10,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(0, 0, 0, 0.04)"
            />
          )}

          {showXAxis && (
            <XAxis
              dataKey="date"
              axisLine={{ stroke: color, strokeWidth: 1 }}
              tickLine={false}
              ticks={xTicks}
              interval={0}
              padding={{ left: 12, right: 12 }}
              allowDuplicatedCategory={true}
              tick={(props: any) => {
                const { x, y, payload } = props;
                const value = String(payload?.value ?? "");
                const idx = xTicks.indexOf(value);
                const total = xTicks.length;
                const textAnchor =
                  idx === 0 ? "start" : idx === total - 1 ? "end" : "middle";
                return (
                  <text
                    x={x}
                    y={y + 10}
                    textAnchor={textAnchor}
                    className="text-mono-x-small font-mono fill-black-alpha-48"
                  >
                    {dateFormatter(value)}
                  </text>
                );
              }}
            />
          )}

          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
                fill: "rgba(0, 0, 0, 0.4)",
              }}
              tickFormatter={valueFormatter}
            />
          )}

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
          />

          {areas.map((area, idx, arr) => (
            <Area
              key={`area_${area}`}
              type="monotone"
              dataKey={area}
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              filter={`hue-rotate(${Math.round((idx * 360) / arr.length)}deg)`}
              activeDot={{
                color,
                filter: `hue-rotate(${Math.round((idx * 360) / arr.length)}deg)`,
              }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      {/* X-axis labels in font-mono style */}
      {/* Remove extra bottom labels to reduce clutter; XAxis custom ticks handle labels */}
    </div>
  );
}
