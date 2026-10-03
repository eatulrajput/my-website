import { cn } from "@/lib/utils";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

interface IncidentLogEntry {
  type: "down" | "up";
  timestamp: number;
  duration: number;
  reason: string;
}

interface IncidentLogProps {
  logs: IncidentLogEntry[];
  monitorName: string;
}

export default function IncidentLog({ logs, monitorName }: IncidentLogProps) {
  // Filter to only show "down" events (incidents)
  const incidents = logs.filter((log) => log.type === "down");

  if (incidents.length === 0) {
    return (
      <div className="px-5 py-4 border-b border-neutral-200/50 dark:border-neutral-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            No incidents recorded for{" "}
            <span className="font-bold text-neutral-700 dark:text-neutral-300">
              {monitorName}
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-neutral-200/50 dark:border-neutral-900/60">
      {/* Section header */}
      <div className="px-5 py-3 border-b border-neutral-200/30 dark:border-neutral-900/40">
        <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Recent Incidents — {monitorName}
        </span>
      </div>

      {/* Incident list */}
      <div className="divide-y divide-neutral-200/30 dark:divide-neutral-900/30">
        {incidents.map((incident, i) => {
          const date = new Date(incident.timestamp * 1000);
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(date);

          const durationStr = formatDuration(incident.duration);

          return (
            <div
              key={`${incident.timestamp}-${i}`}
              className="flex items-start gap-3 px-5 py-3 hover:bg-red-50/30 dark:hover:bg-red-950/10 transition-colors"
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center pt-1 shrink-0">
                <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <IconArrowDown className="w-3 h-3 text-red-500" />
                </div>
                {i < incidents.length - 1 && (
                  <div className="w-px h-full bg-neutral-200/50 dark:bg-neutral-800/50 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                    Downtime Detected
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/15">
                    {durationStr}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {formattedDate} IST
                </p>
                {incident.reason && (
                  <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-1 truncate">
                    {incident.reason}
                  </p>
                )}
              </div>

              {/* Recovery indicator */}
              <div className="shrink-0 flex items-center gap-1 text-emerald-500">
                <IconArrowUp className="w-3 h-3" />
                <span className="text-[9px] font-mono font-bold">Resolved</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}
