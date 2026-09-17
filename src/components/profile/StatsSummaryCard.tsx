import React from 'react';
import { BentoBox } from './BentoBox';
import { rawProjects } from '@/data/projectData';
import { blogPosts, isTechnicalPost } from '@/lib/posts';

export function StatsSummaryCard() {
  // Calculate stats dynamically
  const numProjects = rawProjects.filter(p => p.showInProjects !== false).length;
  const numTechArticles = blogPosts.filter(isTechnicalPost).length;
  const numHackathons = rawProjects.filter(p => p.projectCategory === 'hackathon' || p.title.toLowerCase().includes('hackathon')).length;

  return (
    <BentoBox className="p-6 flex flex-col justify-center h-full gap-4 bg-brand-accent/5 dark:bg-brand-accent/10 border-brand-accent/20 dark:border-brand-accent/20">
      <div className="grid grid-cols-3 gap-2 text-center divide-x divide-neutral-200 dark:divide-neutral-800">
        <div className="flex flex-col items-center justify-center px-2">
          <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">{numProjects}</span>
          <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Projects Built</span>
        </div>
        <div className="flex flex-col items-center justify-center px-2">
          <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">{numTechArticles}</span>
          <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Tech Articles</span>
        </div>
        <div className="flex flex-col items-center justify-center px-2">
          <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">{numHackathons}</span>
          <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Hackathons</span>
        </div>
      </div>
    </BentoBox>
  );
}
