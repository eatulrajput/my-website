"use client";

import Link from 'next/link';
import { AnchorHTMLAttributes, useEffect, useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomLink({ href, children, className, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  let defaultTitle = children;
  let shouldFetch = false;

  // Check if the link text is essentially just the URL
  if (typeof children === 'string' && href && (children === href || children.trim() === href.trim())) {
    try {
      defaultTitle = new URL(href).hostname.replace(/^www\./, '');
      shouldFetch = true && !isInternalLink;
    } catch {
      // not a valid URL
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

  const baseStyles = cn(
    "inline font-medium break-words",
    "text-inherit underline decoration-inherit underline-offset-4",
    "opacity-90 hover:opacity-100 transition-opacity duration-200",
    className
  );

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
      {isLoading && <Loader2 className="inline-block w-3 h-3 animate-spin opacity-50 mr-1 align-baseline" />}
      <span>{title}</span>
      <ArrowUpRight className="inline-block w-3 h-3 opacity-60 ml-0.5 align-baseline" />
    </a>
  );
}
