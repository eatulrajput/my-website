import { cn } from "@/lib/utils";
import { IconCircleCheck, IconAlertTriangle, IconCircleX, IconLoader2 } from "@tabler/icons-react";

interface StatusHeaderProps {
  overallStatus: string;
  checkedAt: number | null;
  monitorCount: number;
}

const statusConfig: Record<
  string,
  { label: string; description: string; color: string; bgGlow: string; icon: React.ElementType; pulse: string }
> = {
  operational: {
    label: "All Systems Operational",
    description: "All monitored services are running smoothly.",
    color: "text-emerald-500",
    bgGlow: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    icon: IconCircleCheck,
    pulse: "bg-emerald-500",
  },
  degraded: {
    label: "Partial System Degradation",
    description: "Some services may be experiencing issues.",
    color: "text-amber-500",
    bgGlow: "from-amber-500/10 via-amber-500/5 to-transparent",
    icon: IconAlertTriangle,
    pulse: "bg-amber-500",
  },
  major_outage: {
    label: "Major Outage Detected",
    description: "One or more critical services are currently down.",
    color: "text-red-500",
    bgGlow: "from-red-500/10 via-red-500/5 to-transparent",
    icon: IconCircleX,
    pulse: "bg-red-500",
  },
  unknown: {
    label: "Status Unknown",
    description: "Unable to determine system status at this time.",
    color: "text-neutral-400",
    bgGlow: "from-neutral-500/10 via-neutral-500/5 to-transparent",
    icon: IconLoader2,
    pulse: "bg-neutral-400",
  },
};

export default function StatusHeader({ overallStatus, checkedAt, monitorCount }: StatusHeaderProps) {
  const config = statusConfig[overallStatus] || statusConfig.unknown;
  const StatusIcon = config.icon;

  const formattedTime = checkedAt
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        day: "numeric",
        month: "short",
      }).format(new Date(checkedAt))
    : null;

  return (
    <div className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
      {/* Ambient glow backdrop */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none", config.bgGlow)} />

      <div className="relative px-5 sm:px-6 py-6 sm:py-8">
        {/* Status indicator row */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", config.pulse)} />
            <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", config.pulse)} />
          </span>

          <StatusIcon className={cn("size-4", config.color)} />

          <span className={cn("text-[11px] font-mono font-bold uppercase tracking-wider", config.color)}>
            {overallStatus === "operational" ? "ONLINE" : overallStatus === "major_outage" ? "OUTAGE" : overallStatus.toUpperCase()}
          </span>
        </div>

        {/* Main status text */}
        <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-black dark:text-white">
          {config.label}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
          {config.description}
        </p>

        {/* Metadata row */}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          {formattedTime && (
            <span>
              Last checked: <span className="text-neutral-600 dark:text-neutral-300 font-semibold">{formattedTime} IST</span>
            </span>
          )}
          <span className="hidden sm:inline">•</span>
          <span>
            Monitors: <span className="text-neutral-600 dark:text-neutral-300 font-semibold">{monitorCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
