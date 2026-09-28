"use client";

import { useEffect, useState } from "react";
import {
  IconZoomOut,
  IconZoomIn,
  IconTextSize,
  IconRuler2,
  IconRefresh,
} from "@tabler/icons-react";

export type TypographyMode = "sans" | "serif" | "dyslexic";

interface BlogReadingToolbarProps {
  fontSizeScale: number;
  onFontSizeScaleChange: (scale: number) => void;
  typographyMode: TypographyMode;
  onTypographyModeChange: (mode: TypographyMode) => void;
  focusRulerActive: boolean;
  onToggleFocusRuler: () => void;
}

export const BlogReadingToolbar = ({
  fontSizeScale,
  onFontSizeScaleChange,
  typographyMode,
  onTypographyModeChange,
  focusRulerActive,
  onToggleFocusRuler,
}: BlogReadingToolbarProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDecreaseFont = () => {
    onFontSizeScaleChange(Math.max(0.85, Number((fontSizeScale - 0.08).toFixed(2))));
  };

  const handleIncreaseFont = () => {
    onFontSizeScaleChange(Math.min(1.3, Number((fontSizeScale + 0.08).toFixed(2))));
  };

  const handleResetFont = () => {
    onFontSizeScaleChange(1.0);
  };

  return (
    <>
      {/* Floating Accessibility Control Bar */}
      <div className="sticky top-6 z-40 mt-1 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/95 dark:bg-neutral-900/95 p-2.5 sm:px-4 shadow-md backdrop-blur-md transition-all">
        {/* Font Size Controls */}
        <div className="flex items-center gap-1 font-mono text-xs">
          <span className="text-[10px] text-neutral-400 uppercase font-bold mr-1 hidden sm:inline">
            Text Size
          </span>
          <button
            onClick={handleDecreaseFont}
            disabled={fontSizeScale <= 0.85}
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 transition-colors"
            title="Decrease Font Size"
          >
            <IconZoomOut className="size-4" />
          </button>

          <button
            onClick={handleResetFont}
            type="button"
            className="px-2 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            title="Reset Font Size"
          >
            {Math.round(fontSizeScale * 100)}%
          </button>

          <button
            onClick={handleIncreaseFont}
            disabled={fontSizeScale >= 1.3}
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 transition-colors"
            title="Increase Font Size"
          >
            <IconZoomIn className="size-4" />
          </button>
        </div>

        {/* Font Style & Accessibility Features */}
        <div className="flex items-center gap-1.5">
          {/* Typography Selector */}
          <div className="flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 p-0.5 font-mono text-[11px]">
            <button
              onClick={() => onTypographyModeChange("sans")}
              type="button"
              className={`px-2 py-1 rounded-md transition-colors font-sans ${
                typographyMode === "sans"
                  ? "bg-white dark:bg-neutral-700 text-black dark:text-white font-bold shadow-xs"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              }`}
              title="Sans-Serif Modern (Zero Eye Strain)"
            >
              Sans
            </button>
            <button
              onClick={() => onTypographyModeChange("serif")}
              type="button"
              className={`px-2 py-1 rounded-md transition-colors font-serif ${
                typographyMode === "serif"
                  ? "bg-white dark:bg-neutral-700 text-black dark:text-white font-bold shadow-xs"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              }`}
              title="Serif Novel Style"
            >
              Serif
            </button>
            <button
              onClick={() => onTypographyModeChange("dyslexic")}
              type="button"
              className={`px-2 py-1 rounded-md transition-colors tracking-wide ${
                typographyMode === "dyslexic"
                  ? "bg-white dark:bg-neutral-700 text-black dark:text-white font-bold shadow-xs"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              }`}
              title="Dyslexia-Friendly High Legibility"
            >
              EasyRead
            </button>
          </div>

          {/* Line Focus Ruler Button */}
          <button
            onClick={onToggleFocusRuler}
            type="button"
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-mono text-xs font-medium transition-colors ${
              focusRulerActive
                ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            }`}
            title="Toggle Line-by-Line Focus Guide"
          >
            <IconRuler2 className="size-3.5" />
            <span className="hidden md:inline">Focus Guide</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogReadingToolbar;
