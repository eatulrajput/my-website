"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { StatusHeader, ServiceCard, UptimeBar, ResponseTimeChart, IncidentLog } from "@/components/Status";
import { motion } from "motion/react";
import { IconRefresh, IconActivityHeartbeat } from "@tabler/icons-react";

interface MonitorData {
  id: number;
  name: string;
  url: string;
  status: string;
  statusCode: number;
  uptime: {
    day: number;
    week: number;
    month: number;
    quarter: number;
    allTime: number;
  };
  responseTime: {
    average: number;
    history: { timestamp: number; value: number }[];
  };
  logs: {
    type: "down" | "up";
    timestamp: number;
    duration: number;
    reason: string;
  }[];
}

interface StatusResponse {
  monitors: MonitorData[];
  overall_status: string;
  checked_at: number;
  monitor_count: number;
  error?: string;
}

const Status = () => {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMonitor, setExpandedMonitor] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatus = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      const json = await res.json();

      if (json.error && json.monitors?.length === 0) {
        setError(json.error);
      } else {
        setData(json);
        setError(null);
      }
    } catch {
      setError("Failed to connect to monitoring service");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => fetchStatus(true), 60000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const avgUptime = data?.monitors?.length
    ? (data.monitors.reduce((sum, m) => sum + m.uptime.month, 0) / data.monitors.length).toFixed(3)
    : "—";

  const avgResponseTime = data?.monitors?.length
    ? Math.round(data.monitors.reduce((sum, m) => sum + m.responseTime.average, 0) / data.monitors.length)
    : 0;

  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-2xl flex-col items-stretch overflow-hidden border-x border-b px-0 pt-16 sm:pt-20",
        "border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-800 dark:text-neutral-200"
      )}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#f34213]/10 dark:bg-[#FF8800]/10 blur-[90px] pointer-events-none" />

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <IconActivityHeartbeat className="size-8 text-[#f34213] dark:text-[#FF8800] animate-pulse" />
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Fetching system status...
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 px-6 text-center">
          <h2 className="text-lg font-bold font-sans text-black dark:text-white">
            Monitoring Unavailable
          </h2>
          <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 max-w-md">
            {error}
          </p>
          <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            Ensure UPTIMEROBOT_API_KEY is configured in your environment settings.
          </p>
          <button
            onClick={() => fetchStatus()}
            type="button"
            className="mt-2 flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-black dark:text-white hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors cursor-pointer"
          >
            <IconRefresh className="size-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && data && (
        <>
          {/* Status Header */}
          <StatusHeader
            overallStatus={data.overall_status}
            checkedAt={data.checked_at}
            monitorCount={data.monitor_count}
          />

          {/* Aggregate Stats Bar */}
          <div className="grid grid-cols-3 border-b border-neutral-200 dark:border-neutral-800">
            <StatCell label="Avg Uptime (30d)" value={`${avgUptime}%`} />
            <StatCell label="Avg Response" value={avgResponseTime > 0 ? `${avgResponseTime}ms` : "—"} border />
            <StatCell label="Monitors" value={`${data.monitor_count}`} />
          </div>

          {/* Services Section Header */}
          <div className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-[11px] font-mono font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Monitored Services
            </span>
            <button
              onClick={() => fetchStatus(true)}
              disabled={refreshing}
              type="button"
              className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <IconRefresh className={cn("size-3.5", refreshing && "animate-spin")} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Service Cards */}
          {data.monitors.map((monitor, i) => (
            <motion.div
              key={monitor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <div
                className="cursor-pointer"
                onClick={() => setExpandedMonitor(expandedMonitor === monitor.id ? null : monitor.id)}
              >
                <ServiceCard
                  name={monitor.name}
                  url={monitor.url}
                  status={monitor.status}
                  uptimeMonth={monitor.uptime.month}
                  avgResponseTime={monitor.responseTime.average}
                />
              </div>

              {/* Expanded details */}
              {expandedMonitor === monitor.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden bg-neutral-50/30 dark:bg-neutral-900/20"
                >
                  <UptimeBar uptime={monitor.uptime} name={monitor.name} />
                  <ResponseTimeChart
                    history={monitor.responseTime.history}
                    name={monitor.name}
                  />
                  <IncidentLog logs={monitor.logs} monitorName={monitor.name} />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Footer */}
          <div className="px-5 py-4 flex items-center justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
            <span>
              Powered by{" "}
              <a
                href="https://uptimerobot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors"
              >
                UptimeRobot
              </a>
            </span>
            <span>Auto-refresh: 60s</span>
          </div>
        </>
      )}
    </section>
  );
};

function StatCell({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div
      className={cn(
        "px-4 py-3.5 flex flex-col items-center gap-0.5",
        border && "border-x border-neutral-200 dark:border-neutral-800"
      )}
    >
      <span className="text-sm sm:text-base font-mono font-bold text-black dark:text-white">
        {value}
      </span>
      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default Status;
