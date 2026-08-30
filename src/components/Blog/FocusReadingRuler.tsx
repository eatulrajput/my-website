"use client";

import { useEffect, useState } from "react";

interface FocusReadingRulerProps {
  active: boolean;
}

export const FocusReadingRuler = ({ active }: FocusReadingRulerProps) => {
  const [mouseY, setMouseY] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMouseY(e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [active]);

  if (!active || mouseY === null) return null;

  return (
    <div
      aria-hidden="true"
      style={{ top: `${mouseY}px` }}
      className="pointer-events-none fixed inset-x-0 z-40 h-8 -mt-4 bg-amber-500/10 dark:bg-amber-400/10 border-y border-amber-500/30 dark:border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-75"
    />
  );
};

export default FocusReadingRuler;
