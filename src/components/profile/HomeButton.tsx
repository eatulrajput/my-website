'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Home, ArrowRight } from 'lucide-react';

export function HomeButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.4
      }}
      className="shrink-0"
    >
      <Link href="/">
        <motion.button
          className="group relative flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:[box-shadow:0_0_20px_color-mix(in_srgb,var(--color-brand-accent)_40%,transparent)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Shimmer effect - glowing white light beam */}
          <motion.div
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/80 dark:via-white/60 to-transparent blur-[2px] -skew-x-[30deg] z-0"
            initial={{ left: "-50%" }}
            animate={{ left: "150%" }}
            transition={{
              repeat: Infinity,
              repeatDelay: 3,
              duration: 1,
              ease: "easeInOut",
            }}
          />
          
          <Home className="w-4 h-4 text-white/90 group-hover:text-white transition-colors duration-300 z-10" />
          <span className="relative z-10 transition-colors duration-300">
            Return to Home
          </span>
          <div className="flex overflow-hidden transition-all duration-300 ease-out max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 z-10">
            <ArrowRight className="w-4 h-4 text-white shrink-0 ml-1" />
          </div>
        </motion.button>
      </Link>
    </motion.div>
  );
}
