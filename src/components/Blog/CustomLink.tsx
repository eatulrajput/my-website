"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, useEffect, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomLink({
  href,
  children,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  const isPlainUrl =
    typeof children === "string" && !!href && children.trim() === href.trim();

  let defaultTitle = children;
  let shouldFetch = false;

  // If the link text is just the URL, parse it to show a clean hostname
  if (isPlainUrl && !isInternalLink && href) {
    try {
      defaultTitle = new URL(href).hostname.replace(/^www\./, "");
      shouldFetch = true;
    } catch {
      // Keep defaults if URL is somehow invalid
    }
  }

  const [title, setTitle] = useState<string | React.ReactNode>(defaultTitle);
  const [isLoading, setIsLoading] = useState(shouldFetch);

  useEffect(() => {
    if (shouldFetch && href) {
      setIsLoading(true);
      fetch(`/api/link-preview?url=${encodeURIComponent(href)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.title) {
            setTitle(data.title);
          }
        })
        .catch(() => {
          // ignore errors, keep the hostname fallback
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [href, shouldFetch]);

  const baseStyles = cn("blog-custom-link", className);

  if (isInternalLink) {
    return (
      <Link href={href!} {...rest} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={baseStyles}
      {...rest}
    >
      {isLoading && <Loader2 className="blog-custom-link-loader" />}
      <span>{title}</span>
      <ArrowUpRight className="blog-custom-link-icon" />
    </a>
  );
}
