"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

type LenisWindow = Window & {
  __lenis?: {
    scrollTo: (
      target: HTMLElement,
      options?: Record<string, unknown>
    ) => void;
  };
};

/**
 * BlogTableOfContents
 * Fixed right-margin panel that:
 *  - Auto-discovers h2/h3 headings from the article after MDX loads (MutationObserver)
 *  - Highlights the current section via IntersectionObserver
 *  - Smooth-scrolls to a heading on click (Lenis-aware)
 *  - Only visible at xl+ (≥ 1280px), fades in after 200px scroll
 */
export default function BlogTableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const ioRef = useRef<IntersectionObserver | null>(null);
  
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const activeIndex = headings.findIndex(h => h.id === activeId);
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const el = itemRefs.current[activeIndex];
      if (el) {
        setIndicatorStyle({
          top: el.offsetTop,
          height: el.offsetHeight,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeId, headings]);

  const observe = useCallback((els: HTMLElement[]) => {
    ioRef.current?.disconnect();
    if (els.length === 0) return;

    ioRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the one with highest intersection ratio that is intersecting
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActiveId(best.target.id);
      },
      {
        rootMargin: "-15% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    els.forEach((el) => ioRef.current!.observe(el));
  }, []);

  useEffect(() => {
    const scanAndObserve = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const els = Array.from(
        article.querySelectorAll("h2[id], h3[id]")
      ) as HTMLElement[];

      if (els.length < 2) return; // Don't show ToC for very short posts

      setHeadings(
        els.map((el) => ({
          id: el.id,
          text: el.textContent?.trim() ?? "",
          level: (parseInt(el.tagName[1]) as 2 | 3),
        }))
      );

      observe(els);
    };

    scanAndObserve();

    // Watch for dynamic MDX content loading
    const article = document.querySelector("article");
    if (!article) return;
    const mo = new MutationObserver(scanAndObserve);
    mo.observe(article, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      ioRef.current?.disconnect();
    };
  }, [observe]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as LenisWindow).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { 
        offset: -90, 
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length < 2) return null;

  return (
    <aside
      aria-label="Table of contents"
      className={cn(
        "fixed hidden xl:block z-30",
        "top-24",
        "max-h-[calc(100vh-7rem)] overflow-y-auto hide-scrollbar",
      )}
      style={{
        left: "calc(50vw + 350px)",
        width: "250px",
      }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-4 font-sans">
        On this page
      </h3>

      <nav className="relative">
        {/* Animated sliding indicator line */}
        <div 
          className="absolute left-[-1px] w-[2px] bg-brand-accent transition-all duration-300 ease-out z-10"
          style={{
            top: `${indicatorStyle.top}px`,
            height: `${indicatorStyle.height}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
        <ol className="relative flex flex-col border-l border-neutral-200 dark:border-neutral-700">
          {headings.map((h, i) => {
            const isActive = activeId === h.id;
            return (
              <li 
                key={h.id}
                ref={(el) => { itemRefs.current[i] = el; }}
              >
                <button
                  type="button"
                  onClick={() => scrollTo(h.id)}
                  className={cn(
                    "group text-left w-full transition-all duration-200",
                    "flex items-start py-1.5 px-4",
                    "-ml-[1px] border-l-2 border-transparent",
                    h.level === 3 && "pl-8",
                    isActive
                      ? "text-brand-accent font-medium"
                      : "text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-sans leading-relaxed line-clamp-2",
                    )}
                  >
                    {h.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
