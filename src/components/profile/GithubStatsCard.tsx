'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BentoBox } from './BentoBox';
import { GitCommit, GitPullRequest, Star, Users, Github, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const getIntensityClass = (level: number) => {
  switch(level) {
    case 1: return 'bg-brand-accent opacity-30';
    case 2: return 'bg-brand-accent opacity-60';
    case 3: return 'bg-brand-accent opacity-80';
    case 4: return 'bg-brand-accent opacity-100';
    default: return 'bg-neutral-200 dark:bg-neutral-800/80 opacity-100';
  }
};

type GithubData = {
  stats: {
    commits: number;
    prs: number;
    stars: number;
    followers: number;
  };
  contributionWeeks: { month: number; days: { intensity: number; count: number; date: string }[] }[];
  availableYears: number[];
};

export function GithubStatsCard() {
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [selectedYear, setSelectedYear] = useState<number | 'Current'>('Current');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(false);
      try {
        const url = selectedYear === 'Current' 
          ? `/api/github?bustcache=${Date.now()}`
          : `/api/github?year=${selectedYear}&bustcache=${Date.now()}`;
          
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, [selectedYear]);

  const statsList = [
    { label: selectedYear === 'Current' ? 'Commits (1y)' : `Commits (${selectedYear})`, value: data?.stats.commits.toLocaleString() || '0', icon: <GitCommit className="w-4 h-4 text-brand-accent" /> },
    { label: 'PRs Merged', value: data?.stats.prs.toLocaleString() || '0', icon: <GitPullRequest className="w-4 h-4 text-brand-accent" /> },
    { label: 'Stars Earned', value: data?.stats.stars.toLocaleString() || '0', icon: <Star className="w-4 h-4 text-brand-accent" /> },
    { label: 'Followers', value: data?.stats.followers.toLocaleString() || '0', icon: <Users className="w-4 h-4 text-brand-accent" /> },
  ];

  // If loading or error, we show a dummy structure for the contribution graph as skeleton
  const displayWeeks = data?.contributionWeeks || Array.from({ length: 52 }).map(() => ({ month: 0, days: new Array(7).fill({ intensity: 0, count: 0, date: '' }) }));

  return (
    <BentoBox className="p-6 flex flex-col justify-between h-full w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
            <Github className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
          </div>
          <h3 className="text-xl font-bold">GitHub Activity</h3>
        </div>
        
        {/* Year Filter with Steel Effect */}
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative flex items-center justify-between gap-3 px-4 py-2 min-w-[140px] rounded-xl cursor-pointer
              bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800
              border border-neutral-300 dark:border-neutral-600
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.05)]
              dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3)]
              text-neutral-800 dark:text-neutral-200 font-semibold text-xs tracking-wide
              transition-all duration-200 hover:brightness-105 active:brightness-95 select-none"
          >
            <span>{selectedYear === 'Current' ? 'Current Year' : selectedYear}</span>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-20 top-full mt-2 right-0 w-full rounded-xl overflow-hidden
                  bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md
                  border border-neutral-200 dark:border-neutral-700
                  shadow-xl shadow-black/10 dark:shadow-black/40
                  flex flex-col py-1"
              >
                <div 
                  onClick={() => { setSelectedYear('Current'); setIsDropdownOpen(false); }}
                  className={`px-4 py-2 text-xs font-semibold cursor-pointer transition-colors
                    ${selectedYear === 'Current' ? 'bg-brand-accent/10 text-brand-accent' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                >
                  Current Year
                </div>
                {data?.availableYears?.map((year) => (
                  <div 
                    key={year}
                    onClick={() => { setSelectedYear(year); setIsDropdownOpen(false); }}
                    className={`px-4 py-2 text-xs font-semibold cursor-pointer transition-colors
                      ${selectedYear === year ? 'bg-brand-accent/10 text-brand-accent' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                  >
                    {year}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Decorative Contribution Graph / Skeleton */}
      <div className="flex flex-col items-center justify-center py-6 flex-1 w-full overflow-x-auto">
        <div className="flex flex-col items-end">
          <div className={`flex gap-1.5 w-max transition-opacity ${loading ? 'opacity-40 animate-pulse' : 'opacity-80 hover:opacity-100'}`}>
            {displayWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5 shrink-0">
                {week.days.map((day, dIdx) => (
                  <div 
                    key={dIdx} 
                    title={day.date ? `${day.count} contributions on ${new Date(day.date).toDateString()}` : ''}
                    className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-default ${loading || !day.date ? 'bg-neutral-200 dark:bg-neutral-800' : getIntensityClass(day.intensity)}`} 
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            <span>Less</span>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`w-3.5 h-3.5 rounded-sm ${getIntensityClass(level)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Stats Bottom Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
        {statsList.map((stat, idx) => (
          <div key={idx} className="group flex flex-col justify-between gap-3 p-4 rounded-3xl bg-neutral-100 dark:bg-neutral-900/40 border border-transparent hover:border-brand-accent/20 transition-all duration-300">
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-medium">
              <div className="shrink-0 p-2 rounded-xl bg-white dark:bg-neutral-950 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {stat.icon}
              </div>
              <span className="leading-tight">{stat.label}</span>
            </div>
            {loading ? (
              <div className="h-7 w-16 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mt-1" />
            ) : (
              <span className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-brand-accent transition-colors duration-300">
                {error ? '-' : stat.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </BentoBox>
  );
}
