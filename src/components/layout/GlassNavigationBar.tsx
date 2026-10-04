"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "motion/react";

/**
 * GlassNavigationBar
 *
 * A reusable, responsive navigation component adhering to Apple HIG.
 * - Mobile: Uses a hamburger menu and a fullscreen overlay.
 * - Desktop: Uses a standard horizontal link list.
 * - Employs a glassmorphism backdrop (blur) for a native feel.
 */
export default function GlassNavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open (Safe pattern)
  useEffect(() => {
    // 1. Get the body's original overflow value before we touch it
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // 2. Lock the scroll only if the menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    // 3. The cleanup function restores the body exactly how we found it
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isMobileMenuOpen]);

  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const navItems = [
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Solo Projects", href: "/solo-projects" },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header className="nav-header">
        <div className="nav-container">
          {/* Logo / Brand Name */}
          <Link href="/" className="nav-logo">
            Atul Rajput
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Desktop Navigation Links */}
            <nav
              className="nav-links-desktop"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                  style={{
                    position: "relative",
                    padding: "6px 12px",
                    zIndex: 1,
                  }}
                  onMouseEnter={() => setHoveredPath(item.href)}
                >
                  {item.label}
                  {item.href === hoveredPath && (
                    <motion.div
                      layoutId="nav-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "var(--border-color)",
                        borderRadius: "9999px",
                        zIndex: -1,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              className="nav-hamburger"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span
                style={{
                  transform: isMobileMenuOpen
                    ? "rotate(45deg) translate(5px, 5px)"
                    : "none",
                }}
              ></span>
              <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
              <span
                style={{
                  transform: isMobileMenuOpen
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                }}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`nav-mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="nav-link-mobile"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
