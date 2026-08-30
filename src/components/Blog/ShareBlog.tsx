"use client";

import { useState, useEffect } from "react";
import {
  IconBrandWhatsapp,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconCopy,
  IconCheck,
  IconShare,
} from "@tabler/icons-react";

interface ShareBlogProps {
  title: string;
}

export default function ShareBlog({ title }: ShareBlogProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  return (
    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 not-prose">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 backdrop-blur-xs">
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
          <IconShare className="size-4 text-brand-accent" />
          <span className="font-semibold text-black dark:text-white">Enjoyed this post?</span>
          <span className="hidden sm:inline">Share it with your network:</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover-text-brand-accent hover-border-brand-accent transition-colors cursor-pointer"
            title="Share on WhatsApp"
          >
            <IconBrandWhatsapp className="size-4" />
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover-text-brand-accent hover-border-brand-accent transition-colors cursor-pointer"
            title="Share on Twitter / X"
          >
            <IconBrandTwitter className="size-4" />
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover-text-brand-accent hover-border-brand-accent transition-colors cursor-pointer"
            title="Share on LinkedIn"
          >
            <IconBrandLinkedin className="size-4" />
          </a>
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black font-mono text-xs font-semibold text-black dark:text-white hover-text-brand-accent hover-border-brand-accent transition-colors cursor-pointer"
          >
            {copied ? <IconCheck className="size-3.5 text-emerald-500" /> : <IconCopy className="size-3.5" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
