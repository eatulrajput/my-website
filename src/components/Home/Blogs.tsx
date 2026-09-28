import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { blogPosts, isTechnicalPost } from "@/lib/posts";

const Blogs = () => {
  const latestPosts = blogPosts.filter(isTechnicalPost).slice(0, 4);

  return (
    <section id="writing" className="flex flex-col gap-4 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
          Writing
        </h2>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400 hover-text-brand-accent transition-colors"
        >
          <span>View all</span>
          <IconArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Writing Stacked List */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
        {latestPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition-colors"
          >
            <span className="font-medium text-base text-black dark:text-white group-hover:text-brand-accent transition-colors line-clamp-1">
              {post.meta.title}
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
              {post.meta.date}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
