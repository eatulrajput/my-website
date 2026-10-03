import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ResponseTimeChartProps {
  history: { timestamp: number; value: number }[];
  name: string;
}

/**
 * Lightweight SVG-based response time chart.
 * Pure SVG — no external charting library needed.
 */
export default function ResponseTimeChart({
  history,
  name,
}: ResponseTimeChartProps) {
  const chartData = useMemo(() => {
    if (!history || history.length === 0) return null;

    const values = history.map((h) => h.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    const range = max - min || 1;

    // SVG dimensions
    const width = 600;
    const height = 120;
    const padding = { top: 10, bottom: 10, left: 0, right: 0 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    // Generate points
    const points = history.map((h, i) => {
      const x = padding.left + (i / (history.length - 1)) * plotWidth;
      const y =
        padding.top + plotHeight - ((h.value - min) / range) * plotHeight;
      return { x, y, value: h.value, timestamp: h.timestamp };
    });

    // SVG polyline path
    const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

    // Gradient fill area path
    const areaPath =
      `M ${points[0].x},${height - padding.bottom} ` +
      points.map((p) => `L ${p.x},${p.y}`).join(" ") +
      ` L ${points[points.length - 1].x},${height - padding.bottom} Z`;

    return { points, linePath, areaPath, min, max, avg, width, height };
  }, [history]);

  if (!chartData) {
    return (
      <div className="px-5 py-6 border-b border-neutral-200/50 dark:border-neutral-900/60">
        <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
          No response time data available for {name}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 border-b border-neutral-200/50 dark:border-neutral-900/60">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Response Time — {name}
        </span>
        <div className="flex items-center gap-4">
          <StatBadge
            label="Avg"
            value={`${chartData.avg}ms`}
            color="text-brand-slate"
          />
          <StatBadge
            label="Min"
            value={`${chartData.min}ms`}
            color="text-emerald-500"
          />
          <StatBadge
            label="Max"
            value={`${chartData.max}ms`}
            color="text-brand-apricot"
          />
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative rounded-lg overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/30 border border-neutral-200/30 dark:border-neutral-800/30">
        <svg
          viewBox={`0 0 ${chartData.width} ${chartData.height}`}
          className="w-full h-auto"
          preserveAspectRatio="none"
          aria-label={`Response time chart for ${name}. Average: ${chartData.avg}ms`}
        >
          <defs>
            {/* Gradient fill */}
            <linearGradient
              id={`gradient-${name.replace(/\s/g, "")}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#7690ac" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7690ac" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={10 + (chartData.height - 20) * ratio}
              x2={chartData.width}
              y2={10 + (chartData.height - 20) * ratio}
              stroke="currentColor"
              className="text-neutral-200/50 dark:text-neutral-800/50"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <path
            d={chartData.areaPath}
            fill={`url(#gradient-${name.replace(/\s/g, "")})`}
          />

          {/* Line */}
          <polyline
            points={chartData.linePath}
            fill="none"
            stroke="#7690ac"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />

          {/* Data points (show every 6th to avoid crowding) */}
          {chartData.points
            .filter((_, i) => i % 6 === 0 || i === chartData.points.length - 1)
            .map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="3"
                fill="#7690ac"
                stroke="white"
                strokeWidth="1.5"
                className="dark:stroke-neutral-900"
              />
            ))}
        </svg>
      </div>

      {/* Time axis labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-600">
          24h ago
        </span>
        <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-600">
          Now
        </span>
      </div>
    </div>
  );
}

function StatBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">
        {label}
      </span>
      <span className={cn("text-[11px] font-mono font-bold", color)}>
        {value}
      </span>
    </div>
  );
}
