"use client";

import { useEffect, useState } from "react";

/**
 * ReadingProgressBar
 * Thin accent-coloured bar fixed at the very top of the viewport.
 * Fills left-to-right as the user scrolls through the page.
 * Uses transform: scaleX for GPU-accelerated animation (no layout thrash).
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(total > 0 ? Math.min((scrollTop / total) * 100, 100) : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent"
    >
      <div
        className="h-full origin-left will-change-transform bg-brand-accent transition-none"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
