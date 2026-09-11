"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ── Custom Geometric SVGs matching portfolio UI theme ─────────────

function HelpfulIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Corner bracket frame */}
      <path d="M4 8V4H8 M16 4H20V8 M20 16V20H16 M8 20H4V16" />
      {/* Check mark */}
      <path d="M8.5 12.5L11 15L15.5 9" />
    </svg>
  );
}

function FireIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Geometric 4-point plasma spark */}
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function InsightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Geometric bulb & filament */}
      <path d="M9 18H15 M10 21H14" />
      <path d="M12 3A6 6 0 0 0 6 9C6 11.5 7.5 13.8 9 15V18H15V15C16.5 13.8 18 11.5 18 9A6 6 0 0 0 12 3Z" />
      <path d="M12 7V10 M10 9H14" />
    </svg>
  );
}

function DeepDiveIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Code bracket matrix */}
      <path d="M7 8L3 12L7 16" />
      <path d="M17 8L21 12L17 16" />
      <path d="M14 4L10 20" />
    </svg>
  );
}

const REACTIONS = [
  { icon: HelpfulIcon,  label: "Helpful",   key: "helpful"   },
  { icon: FireIcon,     label: "Awesome",   key: "awesome"   },
  { icon: InsightIcon,  label: "Insightful",key: "insightful"},
  { icon: DeepDiveIcon, label: "Deep Dive", key: "deepdive"  },
] as const;

type ReactionKey = (typeof REACTIONS)[number]["key"];

interface StoredReactions {
  selected: ReactionKey | null;
  counts: Partial<Record<ReactionKey, number>>;
}

interface ArticleReactionsProps {
  slug: string;
}

/**
 * ArticleReactions
 * Custom geometric SVG reaction bar with zero layout shift / height bursting.
 * Pre-allocated badge slots and fixed card dimensions prevent text jumping.
 */
export default function ArticleReactions({ slug }: ArticleReactionsProps) {
  const storageKey = `blog-reactions-${slug}`;

  const [selected, setSelected] = useState<ReactionKey | null>(null);
  const [counts, setCounts] = useState<Partial<Record<ReactionKey, number>>>({});
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data: StoredReactions = JSON.parse(raw);
        setSelected(data.selected ?? null);
        setCounts(data.counts ?? {});
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, [storageKey]);

  const handleReact = (key: ReactionKey) => {
    const newSelected: ReactionKey | null = selected === key ? null : key;
    const newCounts = { ...counts };

    // Remove old selection count
    if (selected) {
      newCounts[selected] = Math.max(0, (newCounts[selected] ?? 1) - 1);
    }
    // Add new selection count
    if (newSelected) {
      newCounts[newSelected] = (newCounts[newSelected] ?? 0) + 1;
    }

    setSelected(newSelected);
    setCounts(newCounts);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ selected: newSelected, counts: newCounts })
      );
    } catch {
      /* ignore storage errors */
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="mt-10 pt-6 not-prose">
        <div className="h-32 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-10 pt-6 not-prose">
      <div className="p-6 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-6">
          Was this post valuable?
        </p>

        <div className="flex items-center justify-center gap-3.5 flex-wrap">
          {REACTIONS.map((r) => {
            const count = counts[r.key] ?? 0;
            const isSelected = selected === r.key;
            const IconComponent = r.icon;

            return (
              <motion.button
                key={r.key}
                type="button"
                onClick={() => handleReact(r.key)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                aria-label={`React with ${r.label}`}
                aria-pressed={isSelected}
                className={cn(
                  "flex flex-col items-center justify-between w-[92px] h-[100px] p-3 rounded-xl border",
                  "cursor-pointer select-none font-mono text-xs shrink-0",
                  "transition-colors duration-200",
                  isSelected
                    ? "border-brand-accent bg-white dark:bg-black text-brand-accent shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/60 text-neutral-600 dark:text-neutral-400 hover:border-brand-accent/50 hover:text-black dark:hover:text-white"
                )}
              >
                {/* SVG Icon centered in top slot */}
                <div className="h-8 flex items-center justify-center">
                  <motion.div
                    animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <IconComponent
                      className={cn(
                        "w-7 h-7 stroke-[1.65]",
                        isSelected
                          ? "text-brand-accent"
                          : "text-neutral-500 dark:text-neutral-400"
                      )}
                    />
                  </motion.div>
                </div>

                {/* Label in fixed middle slot */}
                <span className="font-medium text-[11px] truncate w-full text-center leading-tight">
                  {r.label}
                </span>

                {/* Count badge slot - always pre-allocated to prevent height shift */}
                <div className="h-4 flex items-center justify-center">
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: count > 0 ? 1 : 0,
                      scale: count > 0 ? 1 : 0.75,
                    }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none",
                      isSelected
                        ? "bg-brand-accent/10 text-brand-accent"
                        : "bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    )}
                  >
                    {count > 0 ? count : 0}
                  </motion.span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {selected && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-mono text-[11px] text-brand-accent mt-5"
          >
            Thank you for the feedback! ✨
          </motion.p>
        )}
      </div>
    </div>
  );
}
