"use client";
import React, { ComponentProps, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { blogPosts } from "@/lib/posts";
import { Breadcrumbs } from "@/components/ui";
import Alert from "@/components/Blog/Alert";
import BlogImage from "@/components/Blog/BlogImage";
import BlogTitle from "@/components/Blog/BlogTitle";
import BlogContent from "@/components/Blog/BlogContent";
import YoutubeVideo from "@/components/Blog/YoutubeVideo";
import Quote from "@/components/Blog/Quote";
import { cn } from "@/lib/utils";
import CoverImage from "@/components/Blog/CoverImage";
import ShareBlog from "@/components/Blog/ShareBlog";
import BlogReadingToolbar, { TypographyMode } from "@/components/Blog/BlogReadingToolbar";
import BlogTextHighlighter from "@/components/Blog/BlogTextHighlighter";
import FocusReadingRuler from "@/components/Blog/FocusReadingRuler";
import { motion } from "motion/react";

export default function BlogPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : "";

  const [fontSizeScale, setFontSizeScale] = useState<number>(1.0);
  const [typographyMode, setTypographyMode] = useState<TypographyMode>("sans");
  const [focusRulerActive, setFocusRulerActive] = useState<boolean>(false);

  const post = blogPosts.find((p) => p.slug === slug);

  // Scroll back to the top of the viewport when loading/switching articles
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100">Post not found</h2>
          <p className="text-neutral-600 dark:text-neutral-400">The article you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // Sort posts by date to find chronological prev/next
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const parseDate = (dateStr: string | undefined) => {
      if (!dateStr) return 0;
      return new Date(dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1")).getTime();
    };
    return parseDate(b.meta.date) - parseDate(a.meta.date);
  });

  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  // Dynamically load the MDX component for this post
  const PostComponent = dynamic(() => import(`@/blog/${slug}.mdx`), {
    loading: () => <div className="py-20 text-center text-neutral-500 font-mono text-sm">Loading article...</div>,
  }) as React.ComponentType<any>;

  return (
    <main aria-label="Blog Article" className="mx-auto w-full max-w-2xl px-4 sm:px-6 pt-1 sm:pt-2 pb-12 md:pb-20 relative">
      {/* Line-by-line Reading Ruler Overlay */}
      <FocusReadingRuler active={focusRulerActive} />

      {/* Floating Interactive Text Highlighter Menu */}
      <BlogTextHighlighter />

      <div className="container mx-auto">
        {/* Animated Breadcrumbs Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: (post.meta.title as string) || "" },
            ]}
          />
        </motion.div>

        {/* Accessibility & Reading Toolbar */}
        <BlogReadingToolbar
          fontSizeScale={fontSizeScale}
          onFontSizeScaleChange={setFontSizeScale}
          typographyMode={typographyMode}
          onTypographyModeChange={setTypographyMode}
          focusRulerActive={focusRulerActive}
          onToggleFocusRuler={() => setFocusRulerActive((prev) => !prev)}
        />

        {/* Animated Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          style={{ fontSize: `${fontSizeScale}rem` }}
          className={cn(
            "prose prose-lg md:prose-xl dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 transition-all duration-200",
            typographyMode === "sans" && "font-sans leading-relaxed md:leading-loose tracking-normal",
            typographyMode === "serif" && "font-serif leading-relaxed md:leading-loose tracking-wide",
            typographyMode === "dyslexic" && "font-sans leading-loose tracking-wider font-normal",
            "prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neutral-900 dark:prose-headings:text-neutral-50",
            "prose-p:mb-6 prose-p:text-neutral-700 dark:prose-p:text-neutral-300",
            "prose-a:font-semibold prose-a:no-underline hover:prose-a:underline transition-colors",
            "prose-img:rounded-3xl prose-img:shadow-2xl prose-img:mx-auto prose-img:my-10 border border-neutral-200/60 dark:border-neutral-800/60",
            "prose-blockquote:border-l-4 prose-blockquote:bg-neutral-50 dark:prose-blockquote:bg-neutral-900/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:text-neutral-900 dark:prose-blockquote:text-neutral-100 shadow-xs",
            "prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:p-6 prose-pre:bg-neutral-950 prose-pre:shadow-2xl prose-pre:border prose-pre:border-neutral-800/80",
            "prose-code:break-words prose-code:font-mono prose-code:text-sm prose-code:bg-neutral-100 dark:prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
            "prose-strong:font-bold prose-strong:text-neutral-900 dark:prose-strong:text-neutral-50"
          )}
        >
          <PostComponent
            components={{
              BlogTitle: (props: ComponentProps<typeof BlogTitle>) => (
                <BlogTitle {...props} meta={post.meta} slug={post.slug} />
              ),
              BlogImage,
              CoverImage,
              BlogContent,
              Alert,
              YoutubeVideo,
              Quote,
            }}
          />
        </motion.article>

        {/* Animated Share Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <ShareBlog title={(post.meta.title as string) || "Blog Post"} />
        </motion.div>

        {/* Animated Keep Reading Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800"
        >
          <h3 className="text-xl font-bold font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-8 text-center">
            Read Next
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white dark:hover:bg-neutral-900 cursor-pointer"
              >
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-brand-accent mb-2 uppercase tracking-wider">
                    <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span> Previous Article
                  </span>
                  <h4 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-brand-accent transition-colors line-clamp-2 leading-snug">
                    {prevPost.meta.title as string}
                  </h4>
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {prevPost.meta.description as string}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white dark:hover:bg-neutral-900 cursor-pointer text-right"
              >
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-brand-accent mb-2 uppercase tracking-wider justify-end">
                    Next Article <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                  <h4 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-brand-accent transition-colors line-clamp-2 leading-snug">
                    {nextPost.meta.title as string}
                  </h4>
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {nextPost.meta.description as string}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
