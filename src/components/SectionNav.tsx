"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

// Sections must match the `id` attributes in Home.tsx
const SECTIONS: Section[] = [
  { id: "hero",         label: "Hero"         },
  { id: "projects",     label: "Projects"     },
  { id: "blogs",        label: "Blogs"        },
  { id: "experience",   label: "Experience"   },
  { id: "skills",       label: "Skills"       },
  { id: "education",    label: "Education"    },
  { id: "certificates", label: "Certificates" },
  { id: "contact",      label: "Contact"      },
];

type LenisWindow = Window & {
  __lenis?: {
    scrollTo: (
      target: number | string | HTMLElement,
      options?: Record<string, unknown>
    ) => void;
  };
};

export default function SectionNav() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Show nav only after user scrolls a bit
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver: track which section is most visible
  useEffect(() => {
    const sectionEls: HTMLElement[] = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio that is intersecting
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionEls.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as LenisWindow).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        // Layout: fixed left panel, vertically centered, only at xl+
        "fixed left-0 top-0 bottom-0 z-30 hidden xl:flex",
        "flex-col items-start justify-center",
        "pl-5 2xl:pl-8",
        // Fade in/out on scroll
        "transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <ol className="flex flex-col gap-4">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                id={`section-nav-${section.id}`}
                type="button"
                onClick={() => scrollTo(section.id)}
                aria-label={`Navigate to ${section.label} section`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-3 cursor-pointer",
                  "transition-all duration-300"
                )}
              >
                {/* Dot indicator */}
                <span
                  className={cn(
                    "section-nav-dot block rounded-full flex-shrink-0",
                    "transition-all duration-300",
                    isActive
                      ? "w-3 h-3 bg-brand-accent shadow-[0_0_8px_2px_var(--color-accent-light)] dark:shadow-[0_0_8px_2px_var(--color-accent-dark)]"
                      : "w-2 h-2 bg-neutral-300 dark:bg-neutral-600 group-hover:bg-neutral-500 dark:group-hover:bg-neutral-400"
                  )}
                />

                {/* Label — hidden at 1280–1400px, shown at 1400px+ (3xl) */}
                <span
                  className={cn(
                    "text-xs font-mono tracking-widest uppercase",
                    "hidden 2xl:block",
                    "transition-all duration-300",
                    isActive
                      ? "text-brand-accent font-semibold"
                      : "text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
                  )}
                >
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Vertical connecting line behind dots */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-[calc(1.25rem+4px)] 2xl:left-[calc(2rem+4px)]",
          "top-[50%] -translate-y-1/2",
          "w-px",
          "h-[calc(var(--section-count,8)*36px)]",
          "bg-neutral-200 dark:bg-neutral-800",
          "-z-10"
        )}
        style={{ height: `${(SECTIONS.length - 1) * 36}px` }}
      />
    </nav>
  );
}
