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

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
  };

  const stats = useMemo(() => {
    const totalCourses = EngineeringCourseData.length;
    const totalCredits = EngineeringCourseData.reduce((sum, item) => sum + item.subjectCredit, 0);
    const labCourses = EngineeringCourseData.filter((item) => {
      const name = item.subjectName.toLowerCase();
      return name.includes("lab") || name.includes("workshop") || name.includes("drawing") || name.includes("graphics");
    }).length;

    const uniqueSems = new Set(EngineeringCourseData.map((item) => item.semester)).size;
    const avgCredits = uniqueSems > 0 ? (totalCredits / uniqueSems).toFixed(1) : "0";

    return { totalCourses, totalCredits, labCourses, avgCredits };
  }, []);

  const semesters = useMemo(() => {
    const sems = Array.from(new Set(EngineeringCourseData.map((item) => item.semester)));
    return sems.sort((a, b) => parseInt(a) - parseInt(b));
  }, []);

  const semesterWorkloads = useMemo(() => {
    const workloads: { [sem: string]: number } = {};
    semesters.forEach((sem) => {
      workloads[sem] = EngineeringCourseData.filter((item) => item.semester === sem)
        .reduce((sum, item) => sum + item.subjectCredit, 0);
    });
    return workloads;
  }, [semesters]);

  const maxWorkload = useMemo(() => {
    const loads = Object.values(semesterWorkloads);
    return loads.length > 0 ? Math.max(...loads) : 1;
  }, [semesterWorkloads]);

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
    <div className="mx-auto w-full max-w-5xl text-neutral-900 dark:text-neutral-100 min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-sans selection:bg-neutral-200 selection:text-black dark:selection:bg-neutral-800 dark:selection:text-white">
      <div className="mb-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Engineering Curriculum" }]} />
      </div>

      {/* Hero Section */}
      <div className="mb-16 text-center max-w-2xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Curriculum.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 font-medium tracking-tight"
        >
          A comprehensive overview of academic courses, credit workloads, and subjects across semesters.
        </motion.p>
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {[
          { label: "Total Credits", value: stats.totalCredits, icon: IconAward },
          { label: "Total Subjects", value: stats.totalCourses, icon: IconBook },
          { label: "Practical Labs", value: stats.labCourses, icon: IconFlask },
          { label: "Avg Credits / Sem", value: stats.avgCredits, icon: IconTrendingUp },
        ].map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col p-6 rounded-[2rem] bg-neutral-50/80 dark:bg-neutral-900/50 backdrop-blur-xl border border-black/5 dark:border-white/5 transition-all hover:scale-[1.02] duration-300"
          >
            <div className="text-neutral-400 dark:text-neutral-500 mb-4">
              <card.icon stroke={1.5} className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-1">
              <AnimatedCounter value={card.value} />
            </div>
            <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {card.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Workload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-8 rounded-[2rem] bg-neutral-50/80 dark:bg-neutral-900/50 backdrop-blur-xl border border-black/5 dark:border-white/5 mb-12"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Semester Workload
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {semesters.map((sem) => {
            const workload = semesterWorkloads[sem] || 0;
            const percentage = (workload / maxWorkload) * 100;
            const isActive = activeTab === sem;
            return (
              <div
                key={sem}
                onClick={() => setActiveTab(sem)}
                className={cn(
                  "cursor-pointer group flex flex-col justify-end h-32 p-3 rounded-2xl transition-all duration-300 border",
                  isActive
                    ? "bg-white dark:bg-neutral-800 border-black/10 dark:border-white/10 shadow-sm scale-[1.02]"
                    : "bg-black/[0.02] dark:bg-white/[0.02] border-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                )}
              >
                <div className="flex-1 flex items-end justify-center w-full mb-3">
                  <div className="w-full bg-neutral-200/50 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden flex items-end justify-start">
                    <motion.div
                      className={cn(
                        "rounded-full h-full",
                        isActive ? "bg-black dark:bg-white" : "bg-neutral-400 dark:bg-neutral-600 group-hover:bg-neutral-500"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className={cn("text-sm font-semibold tracking-tight", isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500")}>
                    Sem {sem}
                  </div>
                  <div className="text-xs font-medium text-neutral-400">{workload} Cr</div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Control Bar (iOS segmented control style) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div
          ref={tabsRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={cn(
            "flex items-center p-1 bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-x-auto hide-scrollbar max-w-full select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          {["All", ...semesters].map((tab) => (
            <button
              key={tab}
              onClick={(e) => handleTabClick(tab, e)}
              className={cn(
                "relative cursor-pointer px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap",
                activeTab === tab
                  ? "text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              {tab === "All" ? "All Semesters" : `Semester ${tab}`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
              <IconSearch stroke={1.5} className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl bg-neutral-100 dark:bg-neutral-900 border-none text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 transition-all"
            />
          </div>
          <div className="flex items-center bg-[#e3e3e8] dark:bg-[#1c1c1e] p-0.5 rounded-[9px]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-[7px] transition-all duration-200",
                viewMode === "grid"
                  ? "bg-white dark:bg-[#636366] shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-black dark:text-white"
                  : "text-[#8e8e93] hover:text-black dark:hover:text-white"
              )}
            >
              <IconLayoutGrid stroke={1.5} className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1.5 rounded-[7px] transition-all duration-200",
                viewMode === "table"
                  ? "bg-white dark:bg-[#636366] shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-black dark:text-white"
                  : "text-[#8e8e93] hover:text-black dark:hover:text-white"
              )}
            >
              <IconList stroke={1.5} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      <div className="min-h-[400px]">
        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center rounded-[2rem] bg-neutral-50/50 dark:bg-neutral-900/30 border border-dashed border-black/10 dark:border-white/10"
          >
            <IconSearch stroke={1} className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4" />
            <p className="text-lg font-medium tracking-tight text-neutral-900 dark:text-white mb-2">
              No results found
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
              We couldn't find anything matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("All");
              }}
              className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
              Clear filters
            </button>
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.subjectId}
                    className="group relative flex flex-col justify-between p-6 rounded-[2rem] bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.05)] transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-50/50 dark:to-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full gap-8">
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-semibold tracking-tight">
                          {item.subjectId}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-8 h-8 rounded-full",
                            isLab ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          )}
                        >
                          {isLab ? <IconFlask stroke={1.5} className="w-4 h-4" /> : <IconBook stroke={1.5} className="w-4 h-4" />}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white leading-snug group-hover:text-black dark:group-hover:text-white transition-colors">
                          {item.subjectName}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400">Semester</span>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.semester}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400">Credits</span>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.subjectCredit}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col rounded-[10px] bg-white dark:bg-[#1c1c1e] border border-[#c6c6c8]/50 dark:border-[#38383a]/50 shadow-sm w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((item, index) => {
                const isLab =
                  item.subjectName.toLowerCase().includes("lab") ||
                  item.subjectName.toLowerCase().includes("workshop") ||
                  item.subjectName.toLowerCase().includes("drawing") ||
                  item.subjectName.toLowerCase().includes("graphics");
                const isLast = index === filteredCourses.length - 1;

                return (
                  <motion.div
                    layout
                    key={item.subjectId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center px-4 py-2.5 bg-transparent relative"
                  >
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-[7px] flex items-center justify-center mr-3.5",
                      isLab ? "bg-[#34c759]" : "bg-[#007aff]"
                    )}>
                      {isLab ? <IconFlask className="w-4 h-4 text-white" /> : <IconBook className="w-4 h-4 text-white" />}
                    </div>

                    <div className="flex flex-col flex-1 min-w-0 justify-center">
                      <div className="text-[17px] font-normal text-black dark:text-white truncate leading-tight mb-0.5">
                        {item.subjectName}
                      </div>
                      <div className="text-[13px] text-[#8e8e93] truncate leading-tight">
                        {item.subjectId} • Semester {item.semester}
                      </div>
                    </div>

                    <div className="flex items-center ml-4">
                      <span className="text-[17px] text-[#8e8e93] font-normal">
                        {item.subjectCredit} {item.subjectCredit === 1 ? 'cr' : 'cr'}
                      </span>
                    </div>

                    {!isLast && (
                      <div className="absolute bottom-0 left-[54px] right-0 h-[0.5px] bg-[#c6c6c8] dark:bg-[#38383a]" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
