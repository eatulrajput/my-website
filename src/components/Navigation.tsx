"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import FeatureFlagsPanel from "./FeatureFlagsPanel";
import { toggleCommandPalette } from "./CommandPalette";
import { IconSearch, IconMenu2, IconX, IconSettings } from "@tabler/icons-react";

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
          
          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-5 sm:gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
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

            {/* Feature Flags Panel Settings Button */}
            <button
              onClick={() => setFlagsOpen(true)}
              aria-label="Open Lab Feature Flags Settings"
              title="Lab Settings"
              className="p-2 rounded-lg text-neutral-500 hover:text-[#f34213] dark:text-neutral-400 dark:hover:text-[#FF8800] hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <IconSettings className="size-4" />
            </button>

            <ThemeToggle />

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-4 space-y-3 font-medium text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-neutral-700 dark:text-neutral-300 hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Feature Flags Modal Panel */}
      <FeatureFlagsPanel isOpen={flagsOpen} onClose={() => setFlagsOpen(false)} />
    </>
  );
}
