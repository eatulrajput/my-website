import { motion } from "motion/react";
import React from "react";

export interface EmptyCookieStateProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  showAction?: boolean;
}

export const EmptyCookieState: React.FC<EmptyCookieStateProps> = ({
  title = "No results found",
  description = "We couldn't find anything matching your request, but here's a cookie for your troubles!",
  actionText = "Clear Filters",
  onAction,
  showAction = false,
}) => {
  return (
    <div className="py-20 text-center flex flex-col items-center justify-center font-mono">
      <motion.div
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.2 }
        }}
        className="mb-8 cursor-pointer relative group"
      >
        <div className="relative flex items-center justify-center transition-colors">
           {/* Neon Cookie SVG */}
           <svg 
             viewBox="0 0 100 100" 
             className="w-28 h-28 sm:w-32 sm:h-32 text-brand-accent transition-all duration-300"
             style={{ filter: "drop-shadow(0 0 8px currentColor)" }}
           >
             {/* Heavily Bitten Cookie Outline */}
             <path 
               d="M 85 50 A 35 35 0 0 1 30 80 A 12 12 0 0 0 20 70 A 12 12 0 0 0 16 60 A 35 35 0 0 1 50 15 A 16 16 0 0 0 65 30 A 18 18 0 0 0 80 40 A 12 12 0 0 0 85 50" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="4" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
             />
             {/* Chocolate chips (repositioned away from bites) */}
             <circle cx="40" cy="40" r="4" fill="currentColor"/>
             <circle cx="30" cy="35" r="4" fill="currentColor"/>
             <circle cx="55" cy="65" r="4.5" fill="currentColor"/>
             <circle cx="35" cy="60" r="3" fill="currentColor"/>
             <circle cx="45" cy="75" r="3" fill="currentColor"/>
             <circle cx="35" cy="50" r="3" fill="currentColor"/>
             <circle cx="55" cy="45" r="2" fill="currentColor"/>
             
             {/* Decorative crumbs outside (more crumbs since it's heavily eaten) */}
             <circle cx="10" cy="80" r="2" fill="currentColor" stroke="none" />
             <circle cx="25" cy="85" r="1.5" fill="currentColor" stroke="none" />
             <circle cx="85" cy="85" r="2.5" fill="currentColor" stroke="none" />
             <circle cx="85" cy="20" r="1.5" fill="currentColor" stroke="none" />
             <circle cx="95" cy="40" r="2" fill="currentColor" stroke="none" />
             <circle cx="75" cy="15" r="1.5" fill="currentColor" stroke="none" />
           </svg>
        </div>
        
        {/* Interactive Tooltip / Speech Bubble */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl pointer-events-none z-10">
          Have a cookie instead! 🍪
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45" />
        </div>
      </motion.div>
      
      <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-2 font-sans tracking-tight">
        {title}
      </h3>
      <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm max-w-[280px] mx-auto leading-relaxed">
        {description}
      </div>
      
      {showAction && onAction && (
        <button
          onClick={onAction}
          className="mt-6 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
