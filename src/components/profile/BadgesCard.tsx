import React from 'react';
import { BentoBox } from './BentoBox';
import { Award, ShieldCheck, Zap } from 'lucide-react';

const badges = [
  { icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, name: 'AWS Certified', desc: 'Solutions Architect' },
  { icon: <Award className="w-6 h-6 text-blue-500" />, name: 'React Native', desc: 'Expertise Badge' },
  { icon: <Zap className="w-6 h-6 text-brand-accent" />, name: 'Hackathon', desc: '1st Place Winner' },
];

export function BadgesCard() {
  return (
    <BentoBox className="p-6 flex flex-col h-full w-full">
      <h3 className="text-xl font-bold mb-4">Badges & Certs</h3>
      <div className="flex flex-col gap-3 flex-1 justify-center">
        {badges.map((badge, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden flex items-center gap-4 p-4 rounded-3xl bg-neutral-100 dark:bg-neutral-900/40 border border-transparent hover:border-brand-accent/20 hover:shadow-[0_0_20px_-10px_rgba(var(--brand-accent),0.3)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-2.5 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500 z-10">
              {badge.icon}
            </div>
            
            <div className="relative z-10">
              <div className="font-bold text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-brand-accent transition-colors duration-300">
                {badge.name}
              </div>
              <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">
                {badge.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoBox>
  );
}
