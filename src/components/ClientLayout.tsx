"use client";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import GoUp from "@/components/ui/GoUp";
import CommandPalette from "@/components/CommandPalette";
import { useFeatureFlags } from "@/context/FeatureFlagContext";
import { usePathname } from "next/navigation";
import { themePalettes } from "@/lib/theme";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { flags } = useFeatureFlags();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Handle route change & hash scrolling (compatible with Lenis smooth scroll)
  useEffect(() => {
    const scrollToTarget = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element, { offset: -80 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
          return true;
        }
      }
      return false;
    };

    if (window.location.hash) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const scrolled = scrollToTarget();
        if (scrolled || attempts >= 10) {
          clearInterval(interval);
        }
      }, 100);

      window.addEventListener("hashchange", scrollToTarget);
      return () => {
        clearInterval(interval);
        window.removeEventListener("hashchange", scrollToTarget);
      };
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);

      window.addEventListener("hashchange", scrollToTarget);
      return () => {
        window.removeEventListener("hashchange", scrollToTarget);
      };
    }
  }, [pathname]);

  useEffect(() => {
    // Initialize Lenis for smooth slow scrolling
    const lenis = new Lenis({
      duration: 1.6, // slightly slower for cinematic feel
      smoothWheel: true, 
      lerp: 0.08, // lower lerp for smoother interpolation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Cleanup to prevent memory leaks
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Pause Lenis scrolling when menu modal is opened, resume when closed
  useEffect(() => {
    const handleNavDropdownToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      const isOpen = customEvent.detail?.isOpen;
      if (lenisRef.current) {
        if (isOpen) {
          lenisRef.current.stop();
        } else {
          lenisRef.current.start();
        }
      }
    };
    window.addEventListener("navDropdownToggle", handleNavDropdownToggle);
    return () => {
      window.removeEventListener("navDropdownToggle", handleNavDropdownToggle);
    };
  }, []);

  // Toggle global scrollbar visibility based on feature flag
  useEffect(() => {
    if (flags.showScrollbar) {
      document.documentElement.classList.remove("hide-scrollbar");
    } else {
      document.documentElement.classList.add("hide-scrollbar");
    }
  }, [flags.showScrollbar]);

  // Synchronize global font class on document element based on activeFont setting
  useEffect(() => {
    document.documentElement.classList.remove(
      "font-google-sans",
      "font-inter",
      "font-mozilla",
      "font-mono"
    );
    document.documentElement.classList.add(`font-${flags.activeFont}`);
  }, [flags.activeFont]);

  // Synchronize global theme palette colors on document element based on activePalette setting
  useEffect(() => {
    const palette = themePalettes[flags.activePalette || "ember"];
    if (palette) {
      document.documentElement.style.setProperty("--color-accent-light", palette.lightAccent);
      document.documentElement.style.setProperty("--color-accent-dark", palette.darkAccent);
    }
  }, [flags.activePalette]);

  // Security Shield implementation: disable DevTools/Inspect & hide Link URLs on hover
  useEffect(() => {
    if (!flags.enableSecurityShield) return;

    // 1. Prevent Right-Click Context Menu
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Prevent Developer Tools Key Combinations
    const preventDevToolsKeys = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
      }
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c")
      ) {
        e.preventDefault();
      }
      if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
    };

    // 3. Hide Link URL in status bar on hover
    const handleMouseOver = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (a && a.href && !a.dataset.originalHref) {
        const original = a.getAttribute("href");
        if (original && original !== "#") {
          a.dataset.originalHref = original;
          a.removeAttribute("href");
          a.style.cursor = "pointer";
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (a && a.dataset.originalHref) {
        a.setAttribute("href", a.dataset.originalHref);
        delete a.dataset.originalHref;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (a && a.dataset.originalHref) {
        const url = a.dataset.originalHref;
        a.setAttribute("href", url);
        setTimeout(() => {
          if (a.hasAttribute("href") && a.dataset.originalHref) {
            a.removeAttribute("href");
          }
        }, 0);
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventDevToolsKeys);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventDevToolsKeys);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
    };
  }, [flags.enableSecurityShield]);

  return (
    <div className="app-layout min-w-75 pt-14 sm:pt-16">
      <Navigation />
      <CommandPalette />
      <GoUp />
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
