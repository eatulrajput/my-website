import React from 'react';
import { BentoBox } from './BentoBox';
import Image from 'next/image';

export function AboutCard() {
  return (
    <BentoBox className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-8 justify-between bg-brand-accent/5 dark:bg-brand-accent/10 border-brand-accent/20 dark:border-brand-accent/20">
      <div className="flex flex-col h-full justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-accent shadow-sm">
            <img 
              src="https://github.com/eatulrajput.png" 
              alt="Atul Rajput" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Atul Rajput</h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">Software Engineer</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
            Hi, I'm Atul. I build engaging digital experiences and scalable applications. 
            I'm passionate about clean code, intuitive UI/UX, and leveraging modern web technologies 
            to solve complex problems.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">Web Development</span>
            <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">UI/UX Design</span>
            <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">Open Source</span>
          </div>
        </div>
      </div>
    </BentoBox>
  );
}
