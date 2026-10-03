"use client";
import React, { ComponentProps, useEffect } from "react";
import type { MDXProps } from "mdx/types";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { blogPosts } from "@/lib/posts";
import Alert from "@/components/Blog/Alert";
import BlogImage from "@/components/Blog/BlogImage";
import BlogTitle from "@/components/Blog/BlogTitle";
import BlogContent from "@/components/Blog/BlogContent";
import YoutubeVideo from "@/components/Blog/YoutubeVideo";
import Quote from "@/components/Blog/Quote";
import CoverImage from "@/components/Blog/CoverImage";

import { motion } from "motion/react";
// ── New UX Components ────────────────────────────────────────────
import ReadingProgressBar from "@/components/Blog/ReadingProgressBar";
import CodeBlock from "@/components/Blog/CodeBlock";
import { H2, H3, H4 } from "@/components/Blog/AnchorHeading";
import CustomLink from "@/components/Blog/CustomLink";

export default function BlogPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : "";

  const post = blogPosts.find((p) => p.slug === slug);

  // Scroll back to the top of the viewport when loading/switching articles
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="not-found-container">
        <div className="not-found-text">
          <h2 className="not-found-title">Post not found</h2>
          <p className="not-found-desc">
            The article you are looking for does not exist.
          </p>
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
  const prevPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  // Dynamically load the MDX component for this post
  const PostComponent = dynamic(
    () => import(`@/blogposts_markdown/${slug}.mdx`),
    {
      loading: () => (
        <div className="py-20 text-center text-neutral-500 font-mono text-sm">
          Loading article...
        </div>
      ),
    },
  ) as React.ComponentType<MDXProps>;

  return (
    <main aria-label="Blog Article" className="blog-post">
      {/* ── Fixed overlays ──────────────────────────────────────── */}
      {/* Thin accent bar showing scroll progress through this article */}
      <ReadingProgressBar />

      <div>
        {/* Animated Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="blog-article"
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
              // ── UX Overrides ──────────────────────────────────
              // h2/h3/h4 get anchor links + auto-generated IDs for the ToC
              h2: H2,
              h3: H3,
              h4: H4,
              // pre gets a hover copy button + language badge
              pre: CodeBlock,
              a: CustomLink,
            }}
          />
        </motion.article>

        {/* ── Back to Top ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="blog-back-top"
        >
          <button
            type="button"
            onClick={() => {
              const lenis = (
                window as Window & {
                  __lenis?: {
                    scrollTo: (t: number, o?: Record<string, unknown>) => void;
                  };
                }
              ).__lenis;
              if (lenis) lenis.scrollTo(0, { duration: 1.2 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="blog-back-top__btn"
          >
            <span>↑</span>
            <span>Back to top</span>
          </button>
        </motion.div>

        {/* Animated Keep Reading Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="blog-read-next"
        >
          <h3 className="blog-read-next__title">Read Next</h3>
          <div className="blog-read-next__grid">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="blog-read-next__card"
              >
                <div>
                  <span className="blog-read-next__label">
                    <span style={{ transition: "transform 0.2s ease" }}>←</span>{" "}
                    Previous Article
                  </span>
                  <h4 className="blog-read-next__card-title">
                    {prevPost.meta.title as string}
                  </h4>
                  <p className="blog-read-next__desc">
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
                className="blog-read-next__card"
                style={{ textAlign: "right" }}
              >
                <div>
                  <span
                    className="blog-read-next__label"
                    style={{ justifyContent: "flex-end" }}
                  >
                    Next Article{" "}
                    <span style={{ transition: "transform 0.2s ease" }}>→</span>
                  </span>
                  <h4 className="blog-read-next__card-title">
                    {nextPost.meta.title as string}
                  </h4>
                  <p className="blog-read-next__desc">
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
