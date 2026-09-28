import React from 'react';
import Image from 'next/image';
import { BentoBox } from './BentoBox';
import { skillsData } from '@/data/skillsData';

export function SkillsCard() {
  return (
    <BentoBox className="col-span-1 md:col-span-2 lg:col-span-2 p-6 overflow-hidden flex flex-col justify-center">
      <h3 className="text-xl font-bold mb-5">Tech Stack</h3>

      <div className="flex flex-col gap-3">
        {skillsData.map((group) => (
          <div key={group.category} className="flex flex-wrap items-center gap-2">
            {/* Category label */}
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 shrink-0 mr-1">
              {group.category}:
            </span>

            {/* Skills inline */}
            {group.items.map((skill) => (
              <a
                key={skill.name}
                href={skill.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-black dark:hover:text-white transition-all"
              >
                {skill.logo && (
                  <Image
                    src={skill.logo}
                    alt={skill.name || ''}
                    width={14}
                    height={14}
                    className="size-3.5 object-contain"
                  />
                )}
                {skill.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </BentoBox>
  );
}
