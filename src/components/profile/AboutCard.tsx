import React, { useState, useEffect } from 'react';
import { BentoBox } from './BentoBox';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';

const titles = [
  "Software Engineer",
  "Web Developer",
  "Mobile Developer",
  "Open Source Contributor"
];

export function AboutCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoBox className="col-span-1 md:col-span-2 lg:col-span-2 p-8 justify-between bg-brand-accent/5 dark:bg-brand-accent/10 border-brand-accent/20 dark:border-brand-accent/20">
      <div className="flex flex-col h-full justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-accent shadow-sm shrink-0">
            <img
              src="https://github.com/eatulrajput.png"
              alt="Atul Rajput"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Atul Rajput</h2>
            <div className="h-6 w-48 sm:w-64 relative overflow-hidden flex items-center mt-1">
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={index}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-neutral-500 dark:text-neutral-400 font-medium absolute whitespace-nowrap"
                >
                  {titles[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
            Hi, I'm Atul. I build engaging digital experiences and scalable applications.
            I'm passionate about clean code, intuitive UI/UX, and leveraging modern web technologies
            to solve complex problems.
          </p>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">Web Development</span>
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">UI/UX Design</span>
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">Open Source</span>
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">Mobile Development</span>
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full">Full Stack Development</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <MapPin className="w-4 h-4 text-brand-accent" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold border border-brand-accent/20 shadow-sm">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span className="tracking-wide">Available to work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BentoBox>
  );
}
