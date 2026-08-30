"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "motion/react";
import {
  IconHome,
  IconStack2,
  IconCode,
  IconMail,
  IconBolt,
  IconPencil,
  IconLink,
  IconCopy,
  IconCheck,
  IconSun,
  IconMoon,
  IconArrowUp,
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandDiscord,
  IconSearch,
  IconX,
  IconNotebook,
  IconTerminal2,
} from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { blogPosts, isTechnicalPost } from "@/lib/posts";

export const toggleCommandPalette = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("toggle-command-palette"));
  }
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Sorted posts (newest first)
  const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    const parseDate = (dateStr: string | undefined) => {
      if (!dateStr) return 0;
      return new Date(dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1")).getTime();
    };
    return parseDate(b.meta.date) - parseDate(a.meta.date);
  });

  // Listen for global shortcut (Cmd+K / Ctrl+K) and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomToggle = () => setIsOpen((prev) => !prev);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleCustomToggle);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleCustomToggle);
    };
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearch("");
    }
  }, [isOpen]);

  const handleNavigate = useCallback(
    (path: string) => {
      setIsOpen(false);
      if (path.startsWith("http")) {
        window.open(path, "_blank", "noopener,noreferrer");
      } else {
        router.push(path);
      }
    },
    [router]
  );

  const handleCopyLink = useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handleScrollToTop = useCallback(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 md:pt-28 px-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-950/65 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Command Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl shadow-2xl"
          >
            <Command className="w-full flex flex-col font-sans">
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200/80 dark:border-neutral-800">
                <IconSearch className="size-5 text-brand-accent shrink-0" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search articles & pages..."
                  className="flex-1 bg-transparent text-sm md:text-base text-neutral-900 dark:text-white placeholder-neutral-400 outline-none"
                  autoFocus
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <IconX className="size-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono font-semibold text-brand-accent bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
                  ESC
                </kbd>
              </div>

              {/* Command List Items */}
              <Command.List className="max-h-[60vh] overflow-y-auto p-2 hide-scrollbar space-y-3">
                <Command.Empty className="py-12 text-center text-xs font-mono text-neutral-400">
                  No matching results found.
                </Command.Empty>

                {/* Group 1: Navigation Pages */}
                <Command.Group
                  heading="Navigation & Pages"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400"
                >
                  <CommandItem
                    icon={<IconHome className="size-4 text-brand-accent" />}
                    label="Home"
                    description="Return to the primary landing page"
                    onSelect={() => handleNavigate("/")}
                  />
                  <CommandItem
                    icon={<IconStack2 className="size-4 text-brand-accent" />}
                    label="Projects Showcase"
                    description="Explore application builds and software projects"
                    onSelect={() => handleNavigate("/project")}
                  />
                  <CommandItem
                    icon={<IconPencil className="size-4 text-brand-accent" />}
                    label="Blog & Articles"
                    description="Read technical posts, tutorials, and insights"
                    onSelect={() => handleNavigate("/blog")}
                  />
                  <CommandItem
                    icon={<IconBolt className="size-4 text-brand-accent" />}
                    label="System Status"
                    description="Check service health, uptime, and incident logs"
                    onSelect={() => handleNavigate("/status")}
                  />
                  <CommandItem
                    icon={<IconCode className="size-4 text-brand-accent" />}
                    label="Technical Skills"
                    description="Jump to skills and technology stack overview"
                    onSelect={() => handleNavigate("/#skills")}
                  />
                  <CommandItem
                    icon={<IconMail className="size-4 text-brand-accent" />}
                    label="Contact & Connect"
                    description="Send a message or reach out for work"
                    onSelect={() => handleNavigate("/#contact")}
                  />
                </Command.Group>

                {/* Group 2: Blog Articles & Posts */}
                <Command.Group
                  heading="Blog Articles & Posts"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400"
                >
                  {sortedBlogPosts.map((post) => {
                    const isTech = isTechnicalPost(post);
                    return (
                      <CommandItem
                        key={post.slug}
                        icon={
                          isTech ? (
                            <IconTerminal2 className="size-4 text-brand-accent shrink-0" />
                          ) : (
                            <IconNotebook className="size-4 text-brand-accent shrink-0" />
                          )
                        }
                        label={post.meta.title || post.slug}
                        description={
                          post.meta.date
                            ? `${post.meta.date}${post.meta.description ? ` • ${post.meta.description}` : ""}`
                            : post.meta.description
                        }
                        badge={
                          <span
                            className={cn(
                              "text-[9px] font-bold uppercase tracking-wider font-mono px-1.5 py-0.5 rounded shrink-0 border border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent"
                            )}
                          >
                            {isTech ? "Tech" : "Personal"}
                          </span>
                        }
                        value={`${post.meta.title || ""} ${post.meta.subtitle || ""} ${post.meta.description || ""} ${post.slug}`}
                        onSelect={() => handleNavigate(`/blog/${post.slug}`)}
                      />
                    );
                  })}
                </Command.Group>

                {/* Group 3: Quick Actions */}
                <Command.Group
                  heading="Quick Actions"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400"
                >
                  <CommandItem
                    icon={
                      theme === "dark" ? (
                        <IconSun className="size-4 text-brand-accent" />
                      ) : (
                        <IconMoon className="size-4 text-brand-accent" />
                      )
                    }
                    label={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
                    description="Toggle dark and light color appearance"
                    onSelect={toggleTheme}
                  />
                  <CommandItem
                    icon={
                      copied ? (
                        <IconCheck className="size-4 text-brand-accent" />
                      ) : (
                        <IconCopy className="size-4 text-brand-accent" />
                      )
                    }
                    label={copied ? "Link Copied!" : "Copy Page Link"}
                    description="Copy current page URL to clipboard"
                    onSelect={handleCopyLink}
                  />
                  <CommandItem
                    icon={<IconArrowUp className="size-4 text-brand-accent" />}
                    label="Scroll to Top"
                    description="Smooth scroll back to top of page"
                    onSelect={handleScrollToTop}
                  />
                </Command.Group>

                {/* Group 4: Social & External Links */}
                <Command.Group
                  heading="Social & Network"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-neutral-400"
                >
                  <CommandItem
                    icon={<IconBrandGithub className="size-4 text-brand-accent" />}
                    label="GitHub Profile"
                    description="github.com/eatulrajput"
                    onSelect={() => handleNavigate("https://github.com/eatulrajput")}
                  />
                  <CommandItem
                    icon={<IconBrandX className="size-4 text-brand-accent" />}
                    label="Twitter / X"
                    description="x.com/eatulrajput"
                    onSelect={() => handleNavigate("https://x.com/eatulrajput")}
                  />
                  <CommandItem
                    icon={<IconBrandLinkedin className="size-4 text-brand-accent" />}
                    label="LinkedIn Profile"
                    description="linkedin.com/in/eatulrajput"
                    onSelect={() => handleNavigate("https://linkedin.com/in/eatulrajput")}
                  />
                  <CommandItem
                    icon={<IconBrandInstagram className="size-4 text-brand-accent" />}
                    label="Instagram"
                    description="instagram.com/eatulrajput"
                    onSelect={() => handleNavigate("https://instagram.com/eatulrajput")}
                  />
                  <CommandItem
                    icon={<IconBrandDiscord className="size-4 text-brand-accent" />}
                    label="Discord Community"
                    description="Connect via Discord"
                    onSelect={() => handleNavigate("https://discord.gg")}
                  />
                </Command.Group>
              </Command.List>

              {/* Footer status bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-mono text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/50">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[9px]">
                      ↑↓
                    </kbd>
                    <span>navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[9px]">
                      ↵
                    </kbd>
                    <span>select</span>
                  </span>
                </div>
                <span className="text-[10px] text-brand-accent font-semibold">
                  Central Command Palette
                </span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CommandItem({
  icon,
  label,
  description,
  onSelect,
  value,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onSelect: () => void;
  value?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className={cn(
        "group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer select-none transition-colors duration-150 border border-transparent",
        "data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-900 data-[selected=true]:border-brand-accent/30"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center justify-center size-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shrink-0 group-data-[selected=true]:bg-neutral-200 dark:group-data-[selected=true]:bg-black group-data-[selected=true]:border-brand-accent">
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-100 group-data-[selected=true]:text-brand-accent truncate">
              {label}
            </span>
            {badge}
          </div>
          {description && (
            <span className="text-[11px] text-neutral-400 truncate">
              {description}
            </span>
          )}
        </div>
      </div>
      <IconLink className="size-3.5 text-brand-accent opacity-0 group-data-[selected=true]:opacity-100 transition-opacity shrink-0 ml-2" />
    </Command.Item>
  );
}
