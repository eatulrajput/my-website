"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ReadingProgressBar
 * Thin accent-coloured bar fixed at the very top of the viewport.
 * Fills left-to-right as the user scrolls through the page.
 * Uses Framer Motion for ultra-smooth GPU-accelerated animation.
 */
export default function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();

  // Spring configuration for smooth but instant-feeling updates
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      role="progressbar"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-brand-accent origin-left will-change-transform"
      style={{ scaleX }}
    />
  );
}
