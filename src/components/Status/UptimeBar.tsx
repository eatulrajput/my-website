import { useState } from "react";
import { cn } from "@/lib/utils";

interface UptimeBarProps {
  /** Uptime ratios: day, week, month, quarter */
  uptime: {
    day: number;
    week: number;
    month: number;
    quarter: number;
  };
  /** Monitor name for accessibility */
  name: string;
}

/**
 * Visual uptime bar showing 90-day uptime representation.
 * Since UptimeRobot free tier provides aggregate ratios (not daily breakdowns),
 * we render a segmented bar using available period data.
 */
export default function UptimeBar({ uptime, name }: UptimeBarProps) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  // Build segments from available uptime data
  const segments = [
    { label: "Last 24h", value: uptime.day, days: 1 },
    { label: "Last 7 Days", value: uptime.week, days: 7 },
    { label: "Last 30 Days", value: uptime.month, days: 30 },
    { label: "Last 90 Days", value: uptime.quarter, days: 90 },
  ];

  return (
    <div className="px-5 py-4 border-b border-neutral-200/50 dark:border-neutral-900/60">
      {/* Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Uptime Overview — {name}
        </span>
        <span className={cn("text-xs font-mono font-bold", getUptimeColor(uptime.quarter))}>
          {uptime.quarter.toFixed(3)}%
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-1 h-8 rounded-lg overflow-hidden" role="img" aria-label={`Uptime bar for ${name}`}>
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            className="relative flex-1 cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredSegment(i)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            {/* Bar fill */}
            <div
              className={cn(
                "h-full rounded-sm transition-all duration-300",
                getBarColor(seg.value),
                hoveredSegment === i && "ring-2 ring-brand-apricot/50 scale-y-110"
              )}
            />

            {/* Tooltip */}
            {hoveredSegment === i && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-lg bg-brand-midnight dark:bg-neutral-800 text-white text-[10px] font-mono whitespace-nowrap shadow-lg border border-neutral-700/50">
                <div className="font-bold">{seg.label}</div>
                <div className={getUptimeColor(seg.value)}>{seg.value.toFixed(3)}%</div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brand-midnight dark:border-t-neutral-800" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Period labels */}
      <div className="flex gap-1 mt-1.5">
        {segments.map((seg) => (
          <span key={seg.label} className="flex-1 text-center text-[8px] font-mono text-neutral-400 dark:text-neutral-600">
            {seg.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function getBarColor(uptime: number): string {
  if (uptime >= 99.9) return "bg-emerald-500/80 dark:bg-emerald-500/60";
  if (uptime >= 99.0) return "bg-emerald-400/70 dark:bg-emerald-400/50";
  if (uptime >= 95.0) return "bg-amber-500/70 dark:bg-amber-500/50";
  if (uptime >= 90.0) return "bg-orange-500/70 dark:bg-orange-500/50";
  return "bg-red-500/70 dark:bg-red-500/50";
}

function getUptimeColor(uptime: number): string {
  if (uptime >= 99.9) return "text-emerald-500";
  if (uptime >= 99.0) return "text-emerald-400";
  if (uptime >= 95.0) return "text-amber-500";
  return "text-red-500";
}
