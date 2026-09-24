"use client";

import React, { useRef, useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

/**
 * CodeBlock — MDX <pre> override with hover Copy button and language badge.
 *
 * Usage: passed as the `pre` key in the MDX components map.
 * MDX renders code blocks as <pre><code class="language-ts">...</code></pre>
 * so we wrap pre in a relative group div and add the copy button on top.
 */
export default function CodeBlock({
  children,
  className,
  ...props
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  // Extract language from code element's className (e.g. "language-typescript")
  const getLang = (): string => {
    const codeEl = preRef.current?.querySelector("code");
    const cls = codeEl?.className ?? className ?? "";
    const match = cls.match(/language-(\w+)/);
    return match?.[1] ?? "";
  };

  const handleCopy = async () => {
    const code =
      preRef.current?.querySelector("code")?.textContent ??
      preRef.current?.textContent ??
      "";
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (non-HTTPS or blocked)
    }
  };

  return (
    <div className="relative group/code my-6 w-full max-w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 not-prose bg-neutral-50 dark:bg-[#0d1117]">
      {/* Copy button — appears on hover */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied to clipboard" : "Copy code"}
        className={cn(
          "absolute top-3 right-3 z-10",
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg",
          "text-xs font-mono font-medium",
          "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm",
          "border border-neutral-200 dark:border-neutral-700",
          "transition-all duration-200",
          "opacity-0 group-hover/code:opacity-100",
          copied
            ? "text-emerald-500 border-emerald-500/50"
            : "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
        )}
      >
        {copied ? (
          <IconCheck size={12} strokeWidth={2.5} />
        ) : (
          <IconCopy size={12} strokeWidth={2} />
        )}
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>

      {/* Language badge — shown when lang is detected, positioned top-left */}
      <LangBadge preRef={preRef} className={className} />

      {/* The actual <pre> element */}
      <pre ref={preRef} className={cn(className, "whitespace-pre-wrap break-words overflow-hidden w-full max-w-full p-4 pt-10 text-sm")} {...props}>
        {children}
      </pre>
    </div>
  );
}

/** Reads language from the pre ref after it mounts */
function LangBadge({
  preRef,
  className,
}: {
  preRef: React.RefObject<HTMLPreElement | null>;
  className?: string;
}) {
  // Derive language from the pre's own className prop (available at render time)
  const match = (className ?? "").match(/language-(\w+)/);
  const lang = match?.[1] ?? "";

  if (!lang) return null;

  const DISPLAY: Record<string, string> = {
    ts: "TypeScript",
    tsx: "TSX",
    js: "JavaScript",
    jsx: "JSX",
    py: "Python",
    python: "Python",
    bash: "Bash",
    sh: "Shell",
    css: "CSS",
    html: "HTML",
    json: "JSON",
    md: "Markdown",
    mdx: "MDX",
    sql: "SQL",
    yaml: "YAML",
    yml: "YAML",
    rust: "Rust",
    go: "Go",
    java: "Java",
    cpp: "C++",
    c: "C",
    typescript: "TypeScript",
    javascript: "JavaScript",
  };

  return (
    <span className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500 select-none pointer-events-none">
      {DISPLAY[lang] ?? lang}
    </span>
  );
}
