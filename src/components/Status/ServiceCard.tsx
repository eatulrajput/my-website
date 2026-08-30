import { cn } from "@/lib/utils";
import { IconExternalLink } from "@tabler/icons-react";

interface ServiceCardProps {
  name: string;
  url: string;
  status: string;
  uptimeMonth: number;
  avgResponseTime: number;
}

const statusStyles: Record<string, { label: string; dot: string; badge: string }> = {
  up: {
    label: "Operational",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  down: {
    label: "Down",
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  seems_down: {
    label: "Degraded",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  paused: {
    label: "Paused",
    dot: "bg-neutral-400",
    badge: "bg-neutral-400/10 text-neutral-500 dark:text-neutral-400 border-neutral-400/20",
  },
  not_checked: {
    label: "Pending",
    dot: "bg-neutral-400",
    badge: "bg-neutral-400/10 text-neutral-500 dark:text-neutral-400 border-neutral-400/20",
  },
  unknown: {
    label: "Unknown",
    dot: "bg-neutral-400",
    badge: "bg-neutral-400/10 text-neutral-500 dark:text-neutral-400 border-neutral-400/20",
  },
};

function getUptimeColor(uptime: number): string {
  if (uptime >= 99.9) return "text-emerald-500";
  if (uptime >= 99.0) return "text-emerald-400";
  if (uptime >= 95.0) return "text-amber-500";
  return "text-red-500";
}

export default function ServiceCard({ name, url, status, uptimeMonth, avgResponseTime }: ServiceCardProps) {
  const style = statusStyles[status] || statusStyles.unknown;

  const displayUrl = (() => {
    try {
      const parsed = new URL(url);
      return parsed.pathname === "/" ? parsed.hostname : parsed.pathname;
    } catch {
      return url;
    }
  })();

  return (
    <div className="group relative flex items-center justify-between gap-4 px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/80 dark:hover:bg-neutral-900/40 transition-colors duration-200">
      {/* Left: Status dot + name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className={cn("shrink-0 size-2.5 rounded-full", style.dot)} />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-black dark:text-white truncate">
              {name}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label={`Visit ${name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <IconExternalLink className="size-3.5 text-neutral-400 hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors" />
            </a>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 truncate block">
            {displayUrl}
          </span>
        </div>
      </div>

      {/* Center: Response time */}
      <div className="hidden sm:flex flex-col items-end shrink-0">
        <span className="text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-300">
          {avgResponseTime > 0 ? `${avgResponseTime}ms` : "—"}
        </span>
        <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">
          Avg Response
        </span>
      </div>

      {/* Right: Status badge + 30-day uptime */}
      <div className="flex flex-col items-end shrink-0 gap-1">
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase border",
            style.badge
          )}
        >
          {style.label}
        </span>
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          30d: <span className={cn("font-bold", getUptimeColor(uptimeMonth))}>{uptimeMonth}%</span>
        </span>
      </div>
    </div>
  );
}
