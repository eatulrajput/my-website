import React from 'react';
import { BentoBox } from './BentoBox';
import Marquee from 'react-fast-marquee';

const skillsRow1 = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Python"];
const skillsRow2 = ["PostgreSQL", "MongoDB", "Docker", "AWS", "GraphQL", "Framer Motion"];

export function SkillsCard() {
  return (
    <BentoBox className="col-span-1 md:col-span-2 lg:col-span-2 p-6 overflow-hidden flex flex-col justify-center">
      <h3 className="text-xl font-bold mb-6">Tech Stack</h3>
      
      <div className="flex flex-col gap-4 relative">
        {/* Gradient fades for marquee */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />
        
        <Marquee speed={30} autoFill pauseOnHover className="py-1">
          {skillsRow1.map((skill, idx) => (
            <div key={idx} className="mx-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-medium whitespace-nowrap">
              {skill}
            </div>
          ))}
        </Marquee>
        
        <Marquee speed={25} direction="right" autoFill pauseOnHover className="py-1">
          {skillsRow2.map((skill, idx) => (
            <div key={idx} className="mx-2 px-4 py-2 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent dark:text-brand-accent text-sm font-medium whitespace-nowrap">
              {skill}
            </div>
          ))}
        </Marquee>
      </div>
    </BentoBox>
  );
}
