import React from 'react';
import Image from 'next/image';
import { BentoBox } from './BentoBox';
import { skillsData } from '@/data/skillsData';

export function SkillsCard() {
  return (
    <BentoBox className="p-6 flex flex-col h-full bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-950 dark:to-neutral-900/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
          Tech Stack
        </h3>
      </div>

      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        {skillsData.map((group) => {
          const Icon = group.icon;

          return (
            <div
              key={group.category}
              className="break-inside-avoid relative overflow-hidden p-5 rounded-2xl bg-white/60 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.05] flex flex-col gap-4 group hover:border-neutral-300 dark:hover:border-white/[0.1] hover:bg-neutral-50/50 dark:hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-200">
                <div className="p-2 rounded-xl bg-white dark:bg-white/[0.05] shadow-sm border border-neutral-100 dark:border-white/[0.05] group-hover:scale-105 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                  {Icon && <Icon className="w-4 h-4" />}
                </div>
                <span className="text-sm font-bold tracking-wide">{group.category}</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/skill flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-black dark:hover:text-white hover:shadow-md dark:hover:shadow-neutral-900/50 transition-all duration-300"
                  >
                    {skill.logo && (
                      <Image
                         src={skill.logo}
                         alt={skill.name || ''}
                         width={16}
                         height={16}
                         className="size-4 object-contain group-hover/skill:scale-110 transition-transform duration-300"
                      />
                    )}
                    <span>{skill.name}</span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </BentoBox>
  );
}
