"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { blogPosts, isTechnicalPost } from "../lib/posts";
import { Breadcrumbs } from "@/components/ui";
import { cn } from "@/lib/utils";
import GeometricLines from "@/components/GeometricLines";

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "tech" | "non-tech">("tech");
  const [visibleCount, setVisibleCount] = useState(10);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryParam === "tech") {
      setSelectedCategory("tech");
    } else if (categoryParam === "non-tech") {
      setSelectedCategory("non-tech");
    } else if (categoryParam === "all") {
      setSelectedCategory("all");
    }
  }, [categoryParam]);

  const handleCategorySelect = (category: "all" | "tech" | "non-tech") => {
    setSelectedCategory(category);
    const newUrl = category === "all" ? "/blog" : `/blog?category=${category}`;
    router.replace(newUrl, { scroll: false });
  };

  const isLoadingRef = useRef(false);

  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true;
          setTimeout(() => {
            setVisibleCount((prev) => prev + 10);
            isLoadingRef.current = false;
          }, 300);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    observerRef.current.observe(node);
  }, []);

  // Sorted posts by date
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const parseDate = (dateStr: string | undefined) => {
      if (!dateStr) return 0;
      return new Date(dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1")).getTime();
    };
    return parseDate(b.meta.date) - parseDate(a.meta.date);
  });

  // Filter posts based on selected category
  const filteredPosts = sortedPosts.filter((post) => {
    // Restrict to add category into the blog, if not added it won't be listed
    const rawCat = (post.meta.category || post.meta.type) as string | undefined;
    if (!rawCat) return false;

    const isTech = isTechnicalPost(post);
    if (selectedCategory === "tech" && !isTech) return false;
    if (selectedCategory === "non-tech" && isTech) return false;
    return true;
  });

  // Reset visible count when category transitions
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedCategory]);

  const categoryTabs = [
    { label: "All Posts", value: "all" as const },
    { label: "Technical", value: "tech" as const },
    { label: "Non-Technical", value: "non-tech" as const },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Geometric grid decoration in the left/right viewport margins */}
      <GeometricLines />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
        {/* Page Header */}
        <div className="space-y-3">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white font-sans">
              Blog
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1">
              A journal of software development insights, college experiences, and personal philosophies.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleCategorySelect(tab.value)}
                type="button"
                className={cn(
                  "px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer",
                  selectedCategory === tab.value
                    ? "border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent font-bold"
                    : "border-transparent text-neutral-500 hover:text-black dark:hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {/* Text List of Blog Posts */}
        {filteredPosts.length > 0 ? (
          <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {filteredPosts.slice(0, visibleCount).map((post) => {
              const isTech = isTechnicalPost(post);
              const articleType = post.meta.category
                ? post.meta.category
                : isTech
                  ? "Technical"
                  : "Personal";

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="py-4 group block transition-colors hover:bg-neutral-50/60 dark:hover:bg-neutral-900/30 -mx-3 px-3 rounded-lg"
                >
                  <div className="flex flex-col gap-1.5">
                    {/* Top Row: Title & Type Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-semibold text-base text-black dark:text-white group-hover:text-brand-accent transition-colors leading-snug">
                        {post.meta.title}
                      </h2>

                      {/* Article Type Badge */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase shrink-0 border border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent font-semibold tracking-wider">
                        {articleType}
                      </span>
                    </div>

                    {/* Metadata Row: Date & Reading Time */}
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500">
                      {post.meta.date && <span>{post.meta.date}</span>}
                      {post.meta.date && (post.meta.readingTime || "5 min read") && <span>•</span>}
                      <span>{post.meta.readingTime || "5 min read"}</span>
                    </div>

                    {/* Short Description */}
                    {post.meta.description && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed font-normal mt-0.5">
                        {post.meta.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center font-mono">
            <p className="text-neutral-500 dark:text-neutral-400 text-xs">
              No articles found in this category.
            </p>
          </div>
        )}

        {/* Infinite Scroll Load Trigger */}
        {visibleCount < filteredPosts.length && (
          <div ref={loadMoreRef} className="py-6 flex justify-center w-full">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 dark:border-neutral-700 border-t-black dark:border-t-white"></div>
          </div>
        )}
      </div>
    </main>
  );
}
