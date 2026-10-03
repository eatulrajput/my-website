"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { blogPosts, isTechnicalPost } from "../lib/posts";
import { cn } from "@/lib/utils";
import { motion, Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

interface BlogListProps {
  categoryFilter?: "tech" | "non-tech";
  title?: string;
  subtitle?: string;
  breadcrumbLabel?: string;
}

export default function BlogList({
  categoryFilter,
  title,
  subtitle,
  breadcrumbLabel = "Blog",
}: BlogListProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "tech" | "non-tech"
  >(categoryFilter || "tech");

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
      return;
    }
    if (categoryParam === "tech") {
      setSelectedCategory("tech");
    } else if (categoryParam === "non-tech") {
      setSelectedCategory("non-tech");
    } else if (categoryParam === "all") {
      setSelectedCategory("all");
    }
  }, [categoryParam, categoryFilter]);

  const handleCategorySelect = (category: "all" | "tech" | "non-tech") => {
    setSelectedCategory(category);
    const newUrl = category === "all" ? "/blog" : `/blog?category=${category}`;
    router.replace(newUrl, { scroll: false });
  };

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

  const categoryTabs = [
    { label: "All Posts", value: "all" as const },
    { label: "Technical", value: "tech" as const },
    { label: "Non-Technical", value: "non-tech" as const },
  ];

  // Default text logic if no props provided
  const displayTitle =
    title ||
    (categoryFilter === "non-tech" ? "Personal Journal" : "Engineering Blog");
  const displaySubtitle =
    subtitle ||
    (categoryFilter === "non-tech"
      ? "College experiences, leadership, and personal philosophies."
      : "A journal of software development insights and engineering discussions.");

  return (
    <main className="blog-page">
      <div className="blog-container">
        {/* Page Header */}
        <div className="blog-header">
          <div className="blog-header-inner">
            <h1 className="blog-title">{displayTitle}</h1>
            <p className="blog-subtitle">{displaySubtitle}</p>
          </div>
        </div>

        {/* Category Filter Tabs (Hidden if forced category is passed) */}
        {!categoryFilter && (
          <div className="blog-filters">
            <div className="blog-tabs">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleCategorySelect(tab.value)}
                  type="button"
                  className={cn(
                    "blog-tab",
                    selectedCategory === tab.value ? "blog-tab--active" : "",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="blog-count">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
            </span>
          </div>
        )}

        {/* If category filter IS provided, just show the count right above the list */}
        {categoryFilter && (
          <div style={{ textAlign: "right", marginTop: "-1rem" }}>
            <span className="blog-count">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
            </span>
          </div>
        )}

        {/* Text List of Blog Posts */}
        {filteredPosts.length > 0 ? (
          <motion.div
            className="blog-list"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredPosts.map((post) => {
              return (
                <motion.div key={post.slug} variants={item}>
                  <Link href={`/blog/${post.slug}`} className="blog-item">
                    <div className="blog-item__inner">
                      {/* Top Row: Title & Arrow */}
                      <div className="blog-item__top">
                        <h2 className="blog-item__title">{post.meta.title}</h2>
                        <span className="blog-item__arrow">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </span>
                      </div>

                      {/* Metadata Row: Date & Reading Time */}
                      <div className="blog-item__meta">
                        {post.meta.date && <span>{post.meta.date}</span>}
                        {post.meta.date &&
                          (post.meta.readingTime || "5 min read") && (
                            <span>•</span>
                          )}
                        <span>{post.meta.readingTime || "5 min read"}</span>
                      </div>

                      {/* Short Description */}
                      {post.meta.description && (
                        <p className="blog-item__desc">
                          {post.meta.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="blog-empty">
            <p>No articles found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
