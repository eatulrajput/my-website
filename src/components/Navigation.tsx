"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import FeatureFlagsPanel from "./FeatureFlagsPanel";
import { toggleCommandPalette } from "./CommandPalette";
import {
  IconSearch,
  IconMenu2,
  IconX,
  IconSettings,
} from "@tabler/icons-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/#projects" },
  { name: "Writing", href: "/blog" },
  { name: "Skills", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flagsOpen, setFlagsOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Mobile Brand Title */}
          <Link href="/" className="sm:hidden font-semibold text-sm tracking-tight text-black dark:text-white flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="font-sans">Atul Rajput</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center gap-5 sm:gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {navItems.map((item) => {
              const isHash = item.href.includes("#");
              const isActive = !isHash && pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "transition-colors duration-200 hover-text-brand-accent",
                    isActive ? "text-brand-accent font-semibold" : ""
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Command Search */}
            <button
              onClick={() => toggleCommandPalette()}
              aria-label="Open Search Command Palette"
              className="p-2 rounded-lg text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs"
            >
              <IconSearch className="size-4" />
              <span className="hidden md:inline-block text-[10px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-1.5 py-0.5 rounded text-neutral-500 dark:text-neutral-400">
                ⌘K
              </span>
            </button>

            {/* Feature Flags Button */}
            <button
              onClick={() => setFlagsOpen(true)}
              aria-label="Open Lab Feature Flags Settings"
              title="Lab Settings"
              className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover-text-brand-accent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <IconSettings className="size-4" />
            </button>

            <ThemeToggle />

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <IconX className="size-5 text-brand-accent" /> : <IconMenu2 className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Minimalist Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[95] sm:hidden bg-white/98 dark:bg-black/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-5 pb-8 overflow-y-auto font-sans"
          >
            {/* Minimalist Top Header */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-sm text-black dark:text-white flex items-center gap-2"
              >
                <span className="size-2 rounded-full bg-brand-accent animate-pulse" />
                <span>Atul Rajput</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                type="button"
                className="p-2 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <IconX className="size-5 text-brand-accent" />
              </button>
            </div>

            {/* Minimalist Large Typography Links */}
            <div className="flex flex-col gap-6 my-auto py-8">
              {navItems.map((item, idx) => {
                const isHash = item.href.includes("#");
                const isActive = !isHash && pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-baseline gap-4 group transition-transform active:translate-x-1"
                  >
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600 font-normal">
                      0{idx + 1}
                    </span>
                    <span
                      className={cn(
                        "text-3xl font-light tracking-tight transition-colors duration-200",
                        isActive
                          ? "text-brand-accent font-medium"
                          : "text-neutral-800 dark:text-neutral-200 group-hover:text-brand-accent"
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Minimalist Footer */}
            <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center justify-between">
                <span>Available for Engineering Roles</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setFlagsOpen(true);
                  }}
                  type="button"
                  className="hover-text-brand-accent transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <IconSettings className="size-3.5 text-brand-accent" />
                  <span>Lab</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/eatulrajput"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-text-brand-accent transition-colors"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href="https://linkedin.com/in/eatulrajput"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-text-brand-accent transition-colors"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://x.com/eatulrajput"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-text-brand-accent transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Flags Modal Panel */}
      <FeatureFlagsPanel isOpen={flagsOpen} onClose={() => setFlagsOpen(false)} />
    </>
  );
}
