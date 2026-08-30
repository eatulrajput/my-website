import { useEffect, useState } from "react";
import Link from "next/link";
import { IconTerminal2, IconNotebook } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { isTechnicalPost } from "@/lib/posts";

interface BlogTitleProps {
  children: string;
  meta?: {
    title?: string;
    subtitle?: string;
    date?: string;
    description?: string;
    [key: string]: unknown;
  };
  slug?: string;
}

export default function BlogTitle({
  children,
  meta,
  slug,
}: BlogTitleProps) {
  const [readingTime, setReadingTime] = useState(5);

  const isTech = isTechnicalPost({ slug: slug || "", meta: meta || { title: children } });

  useEffect(() => {
    const article = document.querySelector('article');
    if (article) {
      const text = article.innerText || "";
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      setReadingTime(Math.max(1, Math.ceil(words / wpm)));
    }
  }, []);

  return (
    <div className="mb-12 mt-8 border-b border-neutral-200 dark:border-neutral-800 pb-8 font-sans">
      {/* Category Tag Badge */}
      <div className="mb-4 flex items-center">
        <Link
          href={`/blog?category=${isTech ? "tech" : "non-tech"}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent font-mono text-xs font-semibold uppercase tracking-wider transition-transform duration-200 hover:scale-105 no-underline shadow-xs"
        >
          {isTech ? (
            <>
              <IconTerminal2 className="size-3.5 text-brand-accent" />
              <span>Technical</span>
            </>
          ) : (
            <>
              <IconNotebook className="size-3.5 text-brand-accent" />
              <span>Non-Technical</span>
            </>
          )}
        </Link>
      </div>

      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl text-balance font-sans leading-tight md:leading-snug">
        {children}
      </h1>

      <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400 not-prose">
        <span>{meta?.date || "Recently"}</span>
        <span className="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        <span>{readingTime} min read</span>
      </div>
    </div>
  );
}