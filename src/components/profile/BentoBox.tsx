import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils'; // assuming standard cn utility exists, otherwise I'll use clsx+twMerge

interface BentoBoxProps extends HTMLMotionProps<"div"> {
  className?: string;
  children: React.ReactNode;
}

export const BentoBox = React.forwardRef<HTMLDivElement, BentoBoxProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-800",
          "bg-white dark:bg-black overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
BentoBox.displayName = 'BentoBox';
