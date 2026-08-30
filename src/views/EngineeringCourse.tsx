"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { EngineeringCourseData } from "@/data/EngineeringCourseData";
import { Breadcrumbs } from "@/components/ui";
import { motion, AnimatePresence, animate, type Variants } from "motion/react";
import {
  IconSearch,
  IconLayoutGrid,
  IconList,
  IconBook,
  IconFlask,
  IconAward,
  IconTrendingUp,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const AnimatedCounter = ({ value }: { value: number | string }) => {
  const [displayValue, setDisplayValue] = useState<number | string>(0);

  useEffect(() => {
    const target = parseFloat(String(value));
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const isDecimal = String(value).includes(".");

    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(isDecimal ? parseFloat(latest.toFixed(1)) : Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value]);

  return <>{displayValue}</>;
};

export const EngineeringCourse = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Drag to scroll functionality for semester tabs
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const dragDistance = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tabsRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - tabsRef.current.offsetLeft;
    scrollLeftVal.current = tabsRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    tabsRef.current.scrollLeft = scrollLeftVal.current - walk;
    dragDistance.current = Math.abs(x - startX.current);
  };

  const handleTabClick = (tab: string, e: React.MouseEvent) => {
    if (dragDistance.current > 5) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setActiveTab(tab);
  };

  // Motion animation variants for card grid layout
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 15,
      },
    },
  };

  // Dynamic statistics calculations
  const stats = useMemo(() => {
    const totalCourses = EngineeringCourseData.length;
    const totalCredits = EngineeringCourseData.reduce(
      (sum, item) => sum + item.subjectCredit,
      0
    );
    const labCourses = EngineeringCourseData.filter((item) => {
      const name = item.subjectName.toLowerCase();
      return (
        name.includes("lab") ||
        name.includes("workshop") ||
        name.includes("drawing") ||
        name.includes("graphics")
      );
    }).length;

    const uniqueSems = new Set(EngineeringCourseData.map((item) => item.semester))
      .size;
    const avgCredits = uniqueSems > 0 ? (totalCredits / uniqueSems).toFixed(1) : "0";

    return {
      totalCourses,
      totalCredits,
      labCourses,
      avgCredits,
    };
  }, []);

  // Unique semesters list for tab filtering
  const semesters = useMemo(() => {
    const sems = Array.from(
      new Set(EngineeringCourseData.map((item) => item.semester))
    );
    return sems.sort((a, b) => parseInt(a) - parseInt(b));
  }, []);

  // Visual workload calculation per semester
  const semesterWorkloads = useMemo(() => {
    const workloads: { [sem: string]: number } = {};
    semesters.forEach((sem) => {
      workloads[sem] = EngineeringCourseData.filter(
        (item) => item.semester === sem
      ).reduce((sum, item) => sum + item.subjectCredit, 0);
    });
    return workloads;
  }, [semesters]);

  const maxWorkload = useMemo(() => {
    const loads = Object.values(semesterWorkloads);
    return loads.length > 0 ? Math.max(...loads) : 1;
  }, [semesterWorkloads]);

  // Filtered courses based on active tab and search query
  const filteredCourses = useMemo(() => {
    return EngineeringCourseData.filter((item) => {
      const matchesTab = activeTab === "All" || item.semester === activeTab;
      const matchesSearch =
        item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subjectId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="mx-auto w-full max-w-5xl border-x border-neutral-200/50 dark:border-neutral-900/60 bg-transparent text-neutral-800 dark:text-neutral-200 md:min-h-screen pt-24 pb-20 px-4 md:px-8">
      <section className="mx-auto w-full">
        {/* Breadcrumbs Navigation */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Engineering" },
            ]}
          />
        </div>

        {/* Header Title Section */}
        <div className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-brand-midnight dark:from-brand-cream via-brand-slate to-brand-apricot mb-3"
          >
            Engineering Curriculum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-sm md:text-base font-body leading-relaxed"
          >
            Comprehensive overview of academic courses, credit workloads, and core subject splits across semesters.
          </motion.p>
        </div>

        {/* 1. Dashboard KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Credits",
              value: stats.totalCredits,
              icon: IconAward,
              color: "text-brand-apricot bg-brand-apricot/10 border-brand-apricot/20",
            },
            {
              label: "Subjects",
              value: stats.totalCourses,
              icon: IconBook,
              color: "text-brand-slate bg-brand-slate/10 border-brand-slate/20",
            },
            {
              label: "Practical Labs",
              value: stats.labCourses,
              icon: IconFlask,
              color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
            },
            {
              label: "Avg Credits / Sem",
              value: stats.avgCredits,
              icon: IconTrendingUp,
              color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
            },
          ].map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{
                y: -4,
                scale: 1.03,
                boxShadow: "0 10px 25px -10px rgba(250, 205, 178, 0.2)"
              }}
              transition={{
                delay: idx * 0.06,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className={cn(
                "rounded-2xl border p-4 shadow-xs backdrop-blur-md flex flex-col justify-between h-28 relative overflow-hidden bg-white/40 dark:bg-brand-midnight/15 border-neutral-200/50 dark:border-neutral-900/50 hover:border-brand-apricot/40 hover:shadow-md cursor-default select-none group transition-all duration-300"
              )}
            >
              {/* Decorative hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-apricot/0 via-brand-apricot/5 to-brand-slate/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[11px] font-bold font-mono tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                  {card.label}
                </span>
                <span className={cn("p-1.5 rounded-lg border", card.color)}>
                  <card.icon className="size-4" />
                </span>
              </div>
              <div className="text-2xl font-extrabold tracking-tight font-sans relative z-10">
                <AnimatedCounter value={card.value} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Visual Workload Breakdown Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-neutral-200/50 dark:border-neutral-900/50 bg-white/40 dark:bg-brand-midnight/15 backdrop-blur-md p-5 mb-8 shadow-xs"
        >
          <h2 className="text-xs font-bold font-mono tracking-wider text-neutral-500 dark:text-neutral-400 uppercase mb-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-apricot" />
            Semester Credit Load Visualizer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {semesters.map((sem) => {
              const workload = semesterWorkloads[sem] || 0;
              const percentage = (workload / maxWorkload) * 100;
              return (
                <div
                  key={sem}
                  onClick={() => setActiveTab(sem)}
                  className={cn(
                    "group cursor-pointer p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between h-20",
                    activeTab === sem
                      ? "border-brand-apricot bg-brand-apricot/5 shadow-inner"
                      : "border-neutral-200/40 dark:border-neutral-800/40 bg-neutral-100/10 hover:border-brand-slate/40"
                  )}
                >
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="font-mono text-neutral-500 group-hover:text-brand-slate dark:group-hover:text-brand-apricot transition-colors">
                      Semester {sem}
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-200">
                      {workload} Cr
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden mt-2 relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-slate to-brand-apricot rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 3. Control Panel Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
          {/* Semester Tabs */}
          <div
            ref={tabsRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={cn(
              "flex items-center gap-1 bg-neutral-100/50 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/60 p-1 rounded-xl overflow-x-auto hide-scrollbar max-w-full select-none cursor-grab",
              isDragging && "cursor-grabbing"
            )}
          >
            {["All", ...semesters].map((tab) => (
              <button
                key={tab}
                onClick={(e) => handleTabClick(tab, e)}
                className={cn(
                  "relative cursor-pointer px-4 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors duration-200 shrink-0",
                  activeTab === tab
                    ? "text-brand-midnight dark:text-brand-cream bg-white dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-350"
                )}
              >
                {tab === "All" ? "All Semesters" : `Sem ${tab}`}
              </button>
            ))}
          </div>

          {/* Search bar & View toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
                <IconSearch className="size-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject or code..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-brand-midnight/20 text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:border-brand-apricot/60 transition-colors"
              />
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center bg-neutral-100/50 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/60 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg transition-colors cursor-pointer",
                  viewMode === "grid"
                    ? "bg-white dark:bg-neutral-800 shadow-xs text-brand-apricot"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                )}
                aria-label="Grid View"
              >
                <IconLayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-lg transition-colors cursor-pointer",
                  viewMode === "table"
                    ? "bg-white dark:bg-neutral-800 shadow-xs text-brand-apricot"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                )}
                aria-label="Table View"
              >
                <IconList className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Display Content Area */}
        <div className="relative min-h-[300px]">
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/20 dark:bg-brand-midnight/5"
            >
              <IconBook className="size-12 text-neutral-300 dark:text-neutral-800 mb-4 animate-bounce" />
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                No subjects matched your query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("All");
                }}
                className="mt-4 text-xs font-mono font-bold text-brand-apricot hover:underline"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : viewMode === "grid" ? (
            /* Card Grid View */
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((item) => {
                  const isLab =
                    item.subjectName.toLowerCase().includes("lab") ||
                    item.subjectName.toLowerCase().includes("workshop") ||
                    item.subjectName.toLowerCase().includes("drawing") ||
                    item.subjectName.toLowerCase().includes("graphics");
                  return (
                    <motion.div
                      layout
                      variants={cardVariants}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      whileHover={{
                        y: -6,
                        scale: 1.025,
                        boxShadow: "0 12px 30px -10px rgba(118, 144, 172, 0.25)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      key={item.subjectId}
                      className={cn(
                        "group relative rounded-2xl p-5 border shadow-2xs backdrop-blur-xs flex flex-col justify-between gap-4 transition-all duration-300 bg-white/40 dark:bg-brand-midnight/15 border-neutral-200/50 dark:border-neutral-900/50 hover:border-brand-apricot/40 hover:shadow-md cursor-pointer overflow-hidden"
                      )}
                    >
                      {/* Decorative hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-apricot/0 via-brand-apricot/5 to-brand-slate/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      {/* Top metadata tags */}
                      <div className="flex justify-between items-center text-2xs font-bold font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900/80 text-neutral-500 dark:text-neutral-400 border border-neutral-200/40 dark:border-neutral-800/40">
                          {item.subjectId}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-md border",
                            isLab
                              ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/15"
                              : "text-brand-slate bg-brand-slate/10 border-brand-slate/15 dark:text-brand-apricot dark:bg-brand-apricot/10 dark:border-brand-apricot/15"
                          )}
                        >
                          {isLab ? "Practical Lab" : "Theory"}
                        </span>
                      </div>

                      {/* Subject main title */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-base font-heading font-semibold text-brand-midnight dark:text-brand-cream group-hover:text-brand-slate dark:group-hover:text-brand-apricot transition-colors duration-200 line-clamp-2">
                          {item.subjectName}
                        </h3>
                      </div>

                      {/* Bottom credits indicator */}
                      <div className="flex justify-between items-center border-t border-neutral-200/30 dark:border-neutral-800/30 pt-3 text-xs font-semibold">
                        <span className="font-mono text-neutral-550 uppercase tracking-wider text-[10px]">
                          Semester {item.semester}
                        </span>
                        <span className="text-neutral-900 dark:text-brand-cream font-mono">
                          {item.subjectCredit} Credits
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Table View */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-x-auto rounded-2xl border border-neutral-200/50 dark:border-neutral-900/50 bg-white/40 dark:bg-brand-midnight/15 backdrop-blur-md shadow-xs"
            >
              <table className="w-full table-auto border-collapse font-sans text-sm text-left">
                <thead className="bg-neutral-100/50 dark:bg-neutral-900/50 border-b border-neutral-200/50 dark:border-neutral-800/50 text-neutral-500 dark:text-neutral-400 font-mono text-xs font-bold uppercase">
                  <tr>
                    <th className="px-5 py-4">Semester</th>
                    <th className="px-5 py-4">Subject ID</th>
                    <th className="px-5 py-4">Subject Name</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4 text-right">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredCourses.map((item) => {
                      const isLab =
                        item.subjectName.toLowerCase().includes("lab") ||
                        item.subjectName.toLowerCase().includes("workshop") ||
                        item.subjectName.toLowerCase().includes("drawing") ||
                        item.subjectName.toLowerCase().includes("graphics");
                      return (
                        <motion.tr
                          layout
                          key={item.subjectId}
                          className="border-t border-neutral-200/40 dark:border-neutral-800/40 transition-colors hover:bg-brand-apricot/5 dark:hover:bg-brand-cream/5"
                        >
                          <td className="px-5 py-4 font-mono text-xs text-neutral-500 dark:text-neutral-450">
                            Sem {item.semester}
                          </td>
                          <td className="px-5 py-4 font-mono text-xs font-semibold text-brand-midnight dark:text-brand-cream">
                            {item.subjectId}
                          </td>
                          <td className="px-5 py-4 font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1 max-w-sm">
                            {item.subjectName}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={cn(
                                "text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border uppercase tracking-wider",
                                isLab
                                  ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/15"
                                  : "text-brand-slate bg-brand-slate/10 border-brand-slate/15 dark:text-brand-apricot dark:bg-brand-apricot/10 dark:border-brand-apricot/15"
                              )}
                            >
                              {isLab ? "Lab" : "Theory"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right font-mono font-semibold text-neutral-900 dark:text-brand-cream">
                            {item.subjectCredit}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
