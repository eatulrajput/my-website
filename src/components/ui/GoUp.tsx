"use client";

import { IconArrowUp } from "@tabler/icons-react";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export default function GoUp() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if Lenis smooth scroll engine is active
    const globalWindow = window as unknown as {
      __lenis?: { scrollTo: (target: number | string | HTMLElement, options?: Record<string, unknown>) => void };
    };

    if (globalWindow.__lenis) {
      globalWindow.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 p-2.5 sm:p-3 rounded-full sm:rounded-xl cursor-pointer",
        "bg-white dark:bg-black text-neutral-700 dark:text-neutral-300",
        "border border-neutral-200 dark:border-neutral-800",
        "shadow-md backdrop-blur-md transition-all duration-200 ease-out",
        "hover:border-[#f34213] dark:hover:border-[#FF8800]",
        "hover:text-[#f34213] dark:hover:text-[#FF8800]",
        "hover:-translate-y-1 active:translate-y-0"
      )}
    >
      <IconArrowUp className="size-4 sm:size-5 pointer-events-none" />
    </button>
  );
}