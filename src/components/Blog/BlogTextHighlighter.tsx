"use client";

import { useEffect, useState, useCallback } from "react";

export type HighlightColor = "yellow" | "green" | "sky" | "pink";

const colorClasses: Record<HighlightColor, string> = {
  yellow: "bg-yellow-200/90 dark:bg-yellow-500/35 text-neutral-900 dark:text-yellow-100 rounded px-1 py-0.5",
  green: "bg-emerald-200/90 dark:bg-emerald-500/35 text-neutral-900 dark:text-emerald-100 rounded px-1 py-0.5",
  sky: "bg-sky-200/90 dark:bg-sky-500/35 text-neutral-900 dark:text-sky-100 rounded px-1 py-0.5",
  pink: "bg-pink-200/90 dark:bg-pink-500/35 text-neutral-900 dark:text-pink-100 rounded px-1 py-0.5",
};

export const BlogTextHighlighter = () => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      setPosition(null);
      setSelectedRange(null);
      return;
    }

    const text = selection.toString().trim();
    if (!text) {
      setPosition(null);
      setSelectedRange(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Check if selection is within article
    const article = document.querySelector("article");
    if (article && article.contains(range.commonAncestorContainer)) {
      setPosition({
        top: Math.max(10, rect.top - 48 + window.scrollY),
        left: rect.left + rect.width / 2,
      });
      setSelectedRange(range.cloneRange());
    } else {
      setPosition(null);
      setSelectedRange(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    return () => document.removeEventListener("selectionchange", handleSelection);
  }, [handleSelection]);

  const applyHighlight = (color: HighlightColor) => {
    if (!selectedRange) return;

    try {
      const mark = document.createElement("mark");
      mark.className = colorClasses[color];
      selectedRange.surroundContents(mark);
      window.getSelection()?.removeAllRanges();
      setPosition(null);
      setSelectedRange(null);
    } catch {
      // Fallback if selection spans complex HTML nodes
      setPosition(null);
      setSelectedRange(null);
    }
  };

  if (!position) return null;

  return (
    <div
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)",
      }}
      className="absolute z-50 flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 px-3 py-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
    >
      <span className="text-[10px] font-mono text-neutral-400 mr-1 uppercase font-bold">Highlight</span>

      <button
        onClick={() => applyHighlight("yellow")}
        type="button"
        className="size-5 rounded-full bg-yellow-400 hover:scale-125 transition-transform shadow-xs"
        title="Yellow Highlight"
      />
      <button
        onClick={() => applyHighlight("green")}
        type="button"
        className="size-5 rounded-full bg-emerald-400 hover:scale-125 transition-transform shadow-xs"
        title="Green Highlight"
      />
      <button
        onClick={() => applyHighlight("sky")}
        type="button"
        className="size-5 rounded-full bg-sky-400 hover:scale-125 transition-transform shadow-xs"
        title="Sky Blue Highlight"
      />
      <button
        onClick={() => applyHighlight("pink")}
        type="button"
        className="size-5 rounded-full bg-pink-400 hover:scale-125 transition-transform shadow-xs"
        title="Pink Highlight"
      />
    </div>
  );
};

export default BlogTextHighlighter;
