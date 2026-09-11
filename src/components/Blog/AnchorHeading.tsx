"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * slugify — converts heading text to a URL-safe id
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")  // remove special chars
    .replace(/\s+/g, "-")       // spaces → hyphens
    .replace(/-+/g, "-")        // collapse multiple hyphens
    .trim();
}

/**
 * extractText — recursively extracts text content from React children
 */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    return extractText((children.props as { children?: React.ReactNode }).children);
  }
  return "";
}

type LenisWindow = Window & {
  __lenis?: {
    scrollTo: (target: HTMLElement, options?: Record<string, unknown>) => void;
  };
};

interface AnchorHeadingProps {
  level: 2 | 3 | 4;
  children?: React.ReactNode;
  className?: string;
}

/**
 * AnchorHeading — h2/h3/h4 with:
 *  - Auto-generated id from text content (for ToC and deep-linking)
 *  - Hash (#) anchor link that appears on hover
 *  - scroll-mt-24 so fixed navbar doesn't cover the heading
 *  - Lenis-aware smooth scroll on anchor click
 */
export function AnchorHeading({ level, children, className }: AnchorHeadingProps) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  const text = extractText(children);
  const id = slugify(text);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as LenisWindow).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -88, duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Update URL hash without triggering a scroll jump
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <Tag
      id={id}
      className={cn(
        "group relative scroll-mt-24",
        className
      )}
    >
      {children}
      {/* Anchor link — visible on heading hover */}
      <a
        href={`#${id}`}
        onClick={handleAnchorClick}
        aria-label={`Permalink to: ${text}`}
        className={cn(
          "ml-2 inline-block",
          "text-brand-accent opacity-0 group-hover:opacity-60 hover:!opacity-100",
          "transition-opacity duration-150",
          "no-underline hover:no-underline",
          "text-[0.7em] font-mono font-normal align-middle",
          "select-none"
        )}
      >
        #
      </a>
    </Tag>
  );
}

// Named exports for the MDX components map
export const H2 = (props: Omit<AnchorHeadingProps, "level">) => (
  <AnchorHeading level={2} {...props} />
);

export const H3 = (props: Omit<AnchorHeadingProps, "level">) => (
  <AnchorHeading level={3} {...props} />
);

export const H4 = (props: Omit<AnchorHeadingProps, "level">) => (
  <AnchorHeading level={4} {...props} />
);
