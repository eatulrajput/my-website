"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { blogPosts, isTechnicalPost } from "@/lib/posts";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

import { staggerContainer, fadeUpItem } from "@/lib/animations";

export default function RecentBlogsSection() {
  // Filter for technical posts and sort by date (newest first)
  const sortedPosts = blogPosts.filter(isTechnicalPost).sort((a, b) => {
    const dateA = new Date(a.meta.date || "").getTime();
    const dateB = new Date(b.meta.date || "").getTime();
    return dateB - dateA;
  });

  const recentPosts = sortedPosts.slice(0, 3);

  return (
    <section id="blog" className="projects-section container">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUpItem}>
          <SectionHeader
            title="Writing & Insights"
            subtitle="Thoughts on software engineering, architecture, and technology."
          />
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          className="blog-list"
          style={{ marginTop: "1rem" }}
        >
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-item"
            >
              <div className="blog-item__inner">
                <div className="blog-item__top">
                  <h3 className="blog-item__title">{post.meta.title}</h3>
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

                {post.meta.description && (
                  <p className="blog-item__desc">{post.meta.description}</p>
                )}

                <div className="blog-item__meta">
                  {post.meta.date && <span>{post.meta.date}</span>}
                  {post.meta.date &&
                    (post.meta.readingTime || post.meta.category) && (
                      <span>•</span>
                    )}
                  {post.meta.readingTime && (
                    <span>{post.meta.readingTime}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2.5rem",
          }}
        >
          <Button
            href="/blog"
            style={{ padding: "10px 24px", fontSize: "1rem" }}
          >
            View all articles
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
