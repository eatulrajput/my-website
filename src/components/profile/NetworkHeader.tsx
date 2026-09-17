'use client';

import React from 'react';
import { motion, Variants } from 'motion/react';
import { Cpu } from 'lucide-react';

export function NetworkHeader() {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.5 + i * 0.5;
      return {
        pathLength: 1,
        opacity: [0, 1, 1], // Keep opacity at 1 at the end
        transition: {
          pathLength: { delay, type: "spring" as const, duration: 3, bounce: 0 },
          opacity: { delay, duration: 0.2 },
        }
      };
    }
  };

  const nodeAnim: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay, type: "spring" as const, stiffness: 200, damping: 10 }
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-32 md:h-40 relative overflow-hidden"
    >
      <svg 
        className="absolute inset-0 w-full h-full opacity-70 dark:opacity-50" 
        viewBox="0 0 1000 120" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" className="text-brand-accent" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" className="text-brand-accent" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" className="text-brand-accent" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className="text-brand-accent">
          {/* Path 1 */}
          <motion.path
            d="M -50 60 L 50 60 L 80 30 L 150 30 L 180 60 L 250 60 L 280 90 L 400 90 L 430 60 L 600 60 L 630 30 L 800 30 L 830 60 L 1050 60"
            fill="none"
            stroke="url(#circuit-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            custom={0}
            initial="hidden"
            animate="visible"
          />
          {/* Path 2 */}
          <motion.path
            d="M -50 90 L 100 90 L 130 60 L 200 60 L 230 30 L 350 30 L 380 60 L 500 60 L 530 90 L 700 90 L 730 60 L 1050 60"
            fill="none"
            stroke="url(#circuit-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            custom={1}
            initial="hidden"
            animate="visible"
          />
          {/* Path 3 */}
          <motion.path
            d="M -50 30 L 30 30 L 60 60 L 120 60 L 150 90 L 250 90 L 280 60 L 350 60 L 380 30 L 550 30 L 580 60 L 650 60 L 680 90 L 850 90 L 880 60 L 1050 60"
            fill="none"
            stroke="url(#circuit-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            custom={2}
            initial="hidden"
            animate="visible"
          />

          {/* Nodes for Path 1 */}
          <motion.circle cx="50" cy="60" r="4" fill="currentColor" filter="url(#glow)" variants={nodeAnim} custom={1.0} initial="hidden" animate="visible" />
          <motion.circle cx="150" cy="30" r="5" fill="currentColor" filter="url(#glow)" variants={nodeAnim} custom={1.4} initial="hidden" animate="visible" />
          <motion.circle cx="280" cy="90" r="4" fill="currentColor" filter="url(#glow)" variants={nodeAnim} custom={1.8} initial="hidden" animate="visible" />
          <motion.circle cx="600" cy="60" r="6" fill="currentColor" filter="url(#glow)" variants={nodeAnim} custom={2.4} initial="hidden" animate="visible" />
          <motion.circle cx="800" cy="30" r="4" fill="currentColor" filter="url(#glow)" variants={nodeAnim} custom={2.8} initial="hidden" animate="visible" />

          {/* Nodes for Path 2 */}
          <motion.circle cx="100" cy="90" r="4" fill="currentColor" variants={nodeAnim} custom={1.6} initial="hidden" animate="visible" />
          <motion.circle cx="230" cy="30" r="3" fill="currentColor" variants={nodeAnim} custom={2.0} initial="hidden" animate="visible" />
          <motion.circle cx="380" cy="60" r="5" fill="currentColor" variants={nodeAnim} custom={2.5} initial="hidden" animate="visible" />
          <motion.circle cx="700" cy="90" r="4" fill="currentColor" variants={nodeAnim} custom={3.0} initial="hidden" animate="visible" />

          {/* Nodes for Path 3 */}
          <motion.circle cx="30" cy="30" r="3" fill="currentColor" variants={nodeAnim} custom={2.2} initial="hidden" animate="visible" />
          <motion.circle cx="120" cy="60" r="5" fill="currentColor" variants={nodeAnim} custom={2.5} initial="hidden" animate="visible" />
          <motion.circle cx="550" cy="30" r="4" fill="currentColor" variants={nodeAnim} custom={3.3} initial="hidden" animate="visible" />
          <motion.circle cx="850" cy="90" r="5" fill="currentColor" variants={nodeAnim} custom={3.8} initial="hidden" animate="visible" />
        </g>
      </svg>
    </motion.div>
  );
}
