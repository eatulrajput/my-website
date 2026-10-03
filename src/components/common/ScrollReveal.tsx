"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * ScrollReveal Component
 *
 * A reusable wrapper that detects when its children enter the viewport
 * and triggers a smooth, Apple-tier fade-up animation.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null);
  // Trigger when 10% of the element is visible, and only animate once.
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Apple-like ease-out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
