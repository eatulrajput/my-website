import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Flame,
  Calendar,
  GitCommit,
  TrendingUp,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { ContributionDay, ContributionDataResponse } from "@/app/api/github/contributions/route";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GithubHeatmap() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [data, setData] = useState<ContributionDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const fetchContributions = async (year: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github/contributions?username=eatulrajput&year=${year}`);
      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || "Failed to load live GitHub activity");
      }
      setData(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load live GitHub data";
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions(selectedYear);
  }, [selectedYear]);

  // Process days starting from Jan 1st into weeks for 52-week 7-day matrix grid
  const { weeks, monthLabels } = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    const days = data.contributions;
    const firstDate = new Date(days[0].date);
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sun, 6 is Sat

    const weekGroups: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Pad initial days of the first week before Jan 1st if Jan 1st isn't Sunday
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    days.forEach((day) => {
      const dateObj = new Date(day.date);
      const dayOfWeek = dateObj.getDay();
      const month = dateObj.getMonth();

      // If Sunday and week is full, start a new week
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weekGroups.push(currentWeek);
        currentWeek = [];
      }

      // Track month labels alignment
      if (month !== lastMonth) {
        months.push({
          label: MONTH_NAMES[month],
          weekIndex: weekGroups.length,
        });
        lastMonth = month;
      }

      currentWeek.push(day);
    });

    // Pad final week if incomplete
    while (currentWeek.length < 7 && currentWeek.length > 0) {
      currentWeek.push(null);
    }
    if (currentWeek.length > 0) {
      weekGroups.push(currentWeek);
    }

    return { weeks: weekGroups, monthLabels: months };
  }, [data]);

  // Primary brand-apricot level color mapping
  const getLevelColor = (level: number | undefined) => {
    if (level === undefined) return "opacity-0 pointer-events-none"; // Padding days
    switch (level) {
      case 1:
        return "bg-brand-apricot/30 border border-brand-apricot/40 shadow-xs";
      case 2:
        return "bg-brand-apricot/60 border border-brand-apricot/70 shadow-xs";
      case 3:
        return "bg-brand-apricot/85 border border-brand-apricot/90 shadow-sm";
      case 4:
        return "bg-brand-apricot border border-white/60 dark:border-brand-cream/80 shadow-md shadow-brand-apricot/40";
      default:
        return "bg-neutral-200/60 dark:bg-neutral-800/60 border border-neutral-300/30 dark:border-neutral-800/30";
    }
  };

  const activeRate = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) return 0;
    return Math.round((data.activeDaysCount / data.contributions.length) * 100);
  }, [data]);

  return (
    <section
      id="github-activity"
      aria-labelledby="github-activity-heading"
      className={cn(
        "relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center border-r border-l px-4 py-12 md:px-12",
        "border-neutral-200/40 dark:border-neutral-900/40 bg-transparent"
      )}
    >
      <div className="container mx-auto w-full">
        {/* Section Heading & Year Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 id="github-activity-heading" className="m-0 p-0">
            <Link
              href="https://github.com/eatulrajput"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group text-2xl md:text-3xl font-display font-bold text-brand-midnight dark:text-brand-cream",
                "transition duration-300 ease-in-out flex items-center gap-2"
              )}
            >
              <Github className="size-6 text-brand-midnight dark:text-brand-cream group-hover:text-brand-apricot transition-colors" />
              <span className="relative">
                GitHub Activity ({selectedYear})
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-apricot transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </h2>

          <div className="flex items-center gap-3">
            {/* Year Selector Tabs */}
            <div className="flex items-center rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1 text-xs font-mono">
              {[currentYear, currentYear - 1].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={cn(
                    "px-3 py-1 rounded-full transition-all cursor-pointer font-bold",
                    selectedYear === yr
                      ? "bg-brand-apricot text-brand-midnight shadow-xs"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  )}
                >
                  {yr}
                </button>
              ))}
            </div>

            <a
              href="https://github.com/eatulrajput"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-brand-apricot/60 hover:text-brand-apricot transition-all shadow-xs"
            >
              <span>@eatulrajput</span>
              <ExternalLink className="size-3 text-brand-apricot" />
            </a>

            <button
              onClick={() => fetchContributions(selectedYear)}
              disabled={loading}
              title="Refresh Live Data"
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-brand-apricot transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn("size-3.5", loading && "animate-spin text-brand-apricot")} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-mono font-medium">Total Commits</span>
              <GitCommit className="size-4 text-brand-apricot" />
            </div>
            <div className="text-2xl md:text-3xl font-display font-extrabold text-brand-midnight dark:text-brand-cream">
              {loading ? "..." : error ? "—" : data?.totalContributions?.toLocaleString() || "0"}
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-1">Jan 1 – Dec 31, {selectedYear}</span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-mono font-medium">Current Streak</span>
              <Flame className="size-4 text-brand-apricot" />
            </div>
            <div className="text-2xl md:text-3xl font-display font-extrabold text-brand-midnight dark:text-brand-cream flex items-baseline gap-1">
              {loading ? "..." : error ? "—" : data?.currentStreak || "0"}
              <span className="text-xs font-mono font-normal text-neutral-400">days</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-1">Active Streak</span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-mono font-medium">Best Streak</span>
              <TrendingUp className="size-4 text-brand-apricot" />
            </div>
            <div className="text-2xl md:text-3xl font-display font-extrabold text-brand-midnight dark:text-brand-cream flex items-baseline gap-1">
              {loading ? "..." : error ? "—" : data?.longestStreak || "0"}
              <span className="text-xs font-mono font-normal text-neutral-400">days</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-1">Record Streak ({selectedYear})</span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-mono font-medium">Active Days</span>
              <Calendar className="size-4 text-brand-apricot" />
            </div>
            <div className="text-2xl md:text-3xl font-display font-extrabold text-brand-midnight dark:text-brand-cream flex items-baseline gap-1">
              {loading ? "..." : error ? "—" : `${activeRate}%`}
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-1">Consistency Rate</span>
          </div>
        </div>

        {/* Heatmap Card Container */}
        <div className="relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md p-5 sm:p-6 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex h-44 w-full items-center justify-center">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                <RefreshCw className="size-4 animate-spin text-brand-apricot" />
                <span>Fetching live GitHub data for @eatulrajput...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-44 w-full text-center gap-3">
              <AlertTriangle className="size-6 text-amber-500" />
              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 max-w-sm">
                {error}
              </p>
              <button
                onClick={() => fetchContributions(selectedYear)}
                className="mt-1 px-4 py-1.5 rounded-full bg-brand-apricot text-brand-midnight text-xs font-mono font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Retry Fetching GitHub API
              </button>
            </div>
          ) : (
            <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
              <div className="min-w-[720px]">
                {/* Month Labels starting at Jan */}
                <div className="flex mb-2 text-[10px] font-mono text-neutral-400 pl-8">
                  {monthLabels.map((m, idx) => (
                    <div
                      key={`${m.label}-${idx}`}
                      className="truncate"
                      style={{
                        width: idx < monthLabels.length - 1
                          ? `${(monthLabels[idx + 1].weekIndex - m.weekIndex) * 13}px`
                          : "auto",
                      }}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>

                {/* Grid Matrix with Day Labels */}
                <div className="flex gap-1.5 items-start">
                  {/* Day of Week Labels */}
                  <div className="grid grid-rows-7 gap-1 text-[9px] font-mono text-neutral-400 pr-2 pt-0.5 select-none">
                    <span className="h-2.5">Sun</span>
                    <span className="h-2.5">Mon</span>
                    <span className="h-2.5">Tue</span>
                    <span className="h-2.5">Wed</span>
                    <span className="h-2.5">Thu</span>
                    <span className="h-2.5">Fri</span>
                    <span className="h-2.5">Sat</span>
                  </div>

                  {/* 52+ Weeks Grid Columns starting from Jan 1 */}
                  <div className="flex gap-1">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="grid grid-rows-7 gap-1">
                        {week.map((day, dIdx) => (
                          <motion.div
                            key={`${wIdx}-${dIdx}`}
                            whileHover={day ? { scale: 1.3, zIndex: 20 } : undefined}
                            onMouseEnter={(e) => {
                              if (!day) return;
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                day,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={cn(
                              "h-2.5 w-2.5 rounded-[2px] transition-colors duration-200",
                              day ? "cursor-pointer" : "pointer-events-none",
                              getLevelColor(day?.level)
                            )}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heatmap Legend */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200/40 dark:border-neutral-800/40 text-[11px] font-mono text-neutral-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-apricot animate-pulse" />
                    <span>Live GitHub Data ({selectedYear})</span>
                  </div>

                  <div className="flex items-center gap-1.5 select-none">
                    <span>Less</span>
                    <div className="flex gap-1 items-center">
                      <div className="h-2.5 w-2.5 rounded-[2px] bg-neutral-200/60 dark:bg-neutral-800/60 border border-neutral-300/30 dark:border-neutral-800/30" />
                      <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-apricot/30 border border-brand-apricot/40" />
                      <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-apricot/60 border border-brand-apricot/70" />
                      <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-apricot/85 border border-brand-apricot/90" />
                      <div className="h-2.5 w-2.5 rounded-[2px] bg-brand-apricot border border-white/60 dark:border-brand-cream/80" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Tooltip Popover */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              left: hoveredDay.x,
              top: hoveredDay.y - 44,
              transform: "translateX(-50%)",
              zIndex: 50,
              pointerEvents: "none",
            }}
            className="rounded-lg bg-neutral-900 text-white dark:bg-neutral-800 dark:text-neutral-900 px-3 py-1.5 text-xs font-mono shadow-xl whitespace-nowrap"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-brand-apricot">
                {hoveredDay.day.count > 0 ? `${hoveredDay.day.count} contributions` : "No contributions"}
              </span>
              <span>on</span>
              <span className="text-neutral-300 dark:text-neutral-500">
                {new Date(hoveredDay.day.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
