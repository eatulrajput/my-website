import React from 'react';
import { BentoBox } from './BentoBox';
import { Code2, Globe, Layout, Smartphone } from 'lucide-react';

const focusAreas = [
  {
    icon: <Layout className="w-5 h-5 text-brand-accent" />,
    title: "Frontend Engineering",
    desc: "Crafting beautiful, responsive, and accessible user interfaces."
  },
  {
    icon: <Code2 className="w-5 h-5 text-brand-accent" />,
    title: "Backend Architecture",
    desc: "Designing scalable APIs and robust database schemas."
  },
  {
    icon: <Globe className="w-5 h-5 text-brand-accent" />,
    title: "Web Performance",
    desc: "Optimizing load times, SEO, and core web vitals."
  },
];

export function WhatIDoCard() {
  return (
    <BentoBox className="col-span-1 md:col-span-2 lg:col-span-2 p-6 gap-4">
      <h3 className="text-xl font-bold mb-2">What I Do</h3>
      <div className="flex flex-col gap-4 h-full justify-center">
        {focusAreas.map((area, idx) => (
          <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <div className="p-2 bg-brand-accent/10 rounded-xl shrink-0">
              {area.icon}
            </div>
            <div>
              <h4 className="font-semibold text-sm">{area.title}</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{area.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </BentoBox>
  );
}
