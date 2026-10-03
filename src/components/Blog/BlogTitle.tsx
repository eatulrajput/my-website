import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconTerminal2,
  IconNotebook,
  IconLink,
  IconCheck,
} from "@tabler/icons-react";
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

export default function BlogTitle({ children, meta, slug }: BlogTitleProps) {
  const [readingTime, setReadingTime] = useState(5);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isTech = isTechnicalPost({
    slug: slug || "",
    meta: meta || { title: children },
  });

  useEffect(() => {
    const article = document.querySelector("article");
    if (article) {
      const text = article.innerText || "";
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      setReadingTime(Math.max(1, Math.ceil(words / wpm)));
    }
  }, []);

  const coverImg = (meta?.image || meta?.coverImage) as string | undefined;

  return (
    <div
      className={cn(
        "blog-title-header",
        coverImg && "blog-title-header--has-image",
      )}
      style={
        coverImg
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('${coverImg}')`,
            }
          : undefined
      }
    >
      <div className="blog-title-header-inner">
        {/* Category Tag Badge */}
        <div className="blog-title-badge-container">
          <Link
            href={`/blog?category=${isTech ? "tech" : "non-tech"}`}
            className="blog-title-badge"
          >
            {isTech ? (
              <>
                <IconTerminal2 className="blog-title-badge__icon" />
                <span>Technical</span>
              </>
            ) : (
              <>
                <IconNotebook className="blog-title-badge__icon" />
                <span>Personal</span>
              </>
            )}
          </Link>
        </div>

        <h1 className="blog-title-heading">{children}</h1>

        <div className="blog-title-meta-container">
          <div className="blog-title-meta">
            <span>{meta?.date || "Recently"}</span>
            <span className="blog-title-dot" />
            <span>{readingTime} min read</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="blog-title-copy-btn"
            title="Copy Link"
          >
            {copied ? <IconCheck size={16} /> : <IconLink size={16} />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
