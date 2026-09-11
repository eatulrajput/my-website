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
  const [visible, setVisible] = useState(false);
  const ioRef = useRef<IntersectionObserver | null>(null);

  // Fade in after user starts scrolling
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      lenis.scrollTo(el, { offset: -90, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length < 2) return null;

  return (
    <aside
      aria-label="Table of contents"
      className={cn(
        // Layout: right margin only, fixed, vertically starts at nav height
        "fixed hidden xl:block z-30",
        "top-24",
        "max-h-[calc(100vh-7rem)] overflow-y-auto hide-scrollbar",
        // Fade
        "transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{
        // Position right of centered max-w-2xl content (336px half-width + px-6 ≈ 360px + 28px gap)
        left: "calc(50vw + 388px)",
        width: "180px",
      }}
    >
      {/* Header label */}
      <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-2">
        <span className="inline-block w-3 h-px bg-neutral-300 dark:bg-neutral-600" />
        On this page
      </p>

      <nav>
        <ol className="flex flex-col gap-1">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(h.id)}
                  className={cn(
                    "group text-left w-full leading-snug transition-all duration-200",
                    "flex items-start gap-2 py-0.5",
                    h.level === 3 && "pl-3",
                    isActive
                      ? "text-brand-accent"
                      : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  )}
                >
                  {/* Active indicator dot */}
                  <span
                    className={cn(
                      "mt-[6px] flex-shrink-0 rounded-full transition-all duration-200",
                      isActive
                        ? "w-1.5 h-1.5 bg-brand-accent"
                        : "w-1 h-1 bg-neutral-300 dark:bg-neutral-600 group-hover:bg-neutral-400"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[11px] font-mono leading-snug line-clamp-2",
                      isActive && "font-semibold"
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
