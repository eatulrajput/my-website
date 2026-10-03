"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * AmbientMesh Component
 *
 * Renders a slow-moving, heavily blurred background layer to simulate an Apple HIG-style
 * dynamic lock screen gradient. It operates purely on the background and is non-interactive.
 */
export default function AmbientMesh() {
  return (
    // The wrapper covers the entire screen (fixed inset-0), sits behind all content (z-0),
    // and ignores all mouse events (pointer-events-none) so you can still click links underneath.
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 
        Primary ambient glow: 
        This is a massive div (200% width/height) positioned at the top left.
        We apply an intense blur (120px) so the gradient edges are completely smoothed out. 
      */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-20 dark:opacity-30 blur-[120px]"
        animate={{
          // We animate the 'background' CSS property through an array of states.
          // The radial gradient's focal point (e.g. 'circle at 50% 50%') shifts slowly
          // around the screen, giving the illusion of a floating orb of light.
          // It uses the global CSS variable --accent-color for theme consistency.
          background: [
            "radial-gradient(circle at 50% 50%, var(--accent-color) 0%, transparent 40%)",
            "radial-gradient(circle at 60% 40%, var(--accent-color) 0%, transparent 40%)",
            "radial-gradient(circle at 40% 60%, var(--accent-color) 0%, transparent 40%)",
            "radial-gradient(circle at 50% 50%, var(--accent-color) 0%, transparent 40%)",
          ],
        }}
        transition={{
          // 20 seconds for one full animation cycle makes the movement almost imperceptible.
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 
        Secondary accent glow: 
        A second orb positioned in the bottom right corner (-bottom-1/2 -right-1/2).
        By animating it on a slightly longer duration (25s), the two orbs fall out of 
        sync, creating a more organic, randomized pulsing effect when they overlap.
      */}
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] opacity-10 dark:opacity-20 blur-[120px]"
        animate={{
          // Uses a deep purple (#4a00e0) to blend with the primary blue accent
          background: [
            "radial-gradient(circle at 50% 50%, #4a00e0 0%, transparent 40%)",
            "radial-gradient(circle at 40% 60%, #4a00e0 0%, transparent 40%)",
            "radial-gradient(circle at 60% 40%, #4a00e0 0%, transparent 40%)",
            "radial-gradient(circle at 50% 50%, #4a00e0 0%, transparent 40%)",
          ],
        }}
        transition={{
          duration: 25, // 5 seconds longer than the primary glow
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
