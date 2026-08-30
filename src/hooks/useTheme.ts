"use client";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme;
    if (stored) {
      setTheme(stored);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    const root = document.documentElement;

    if (theme === "system") {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      const applySystem = () => {
        root.classList.toggle("dark", query.matches);
      };

      applySystem();
      query.addEventListener("change", applySystem);
      localStorage.removeItem("theme");

      return () => query.removeEventListener("change", applySystem);
    }

    // manual theme selection
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, isInitialized]);

  return { theme, setTheme };
}
