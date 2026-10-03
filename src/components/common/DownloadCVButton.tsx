"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface DownloadCVButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * A reusable, modular component for downloading the resume.
 * Features a highly optimized, renderless magnetic hover effect.
 */
export default function DownloadCVButton({
  variant = "primary",
  className = "",
}: DownloadCVButtonProps) {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  const finalClass = `${baseClass} ${className}`.trim();

  const resumeLink = "/resume.pdf";

  const ref = useRef<HTMLAnchorElement>(null);

  // Renderless state using MotionValues
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics to the raw motion values
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: "inline-block" }}
      href={resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      className={finalClass}
    >
      Download CV
    </motion.a>
  );
}
