"use client";

import { useTheme } from "../hooks/useTheme";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="nav-theme-toggle-placeholder" />;
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  };

  const getThemeDetails = () => {
    switch (theme) {
      case "light":
        return {
          icon: <Sun className="theme-icon" size={20} strokeWidth={1} />,
          label: "Light mode",
        };
      case "dark":
        return {
          icon: <Moon className="theme-icon" size={20} strokeWidth={1} />,
          label: "Dark mode",
        };
      default:
        return {
          icon: <Monitor className="theme-icon" size={20} strokeWidth={1} />,
          label: "System default",
        };
    }
  };

  const { icon, label } = getThemeDetails();

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="nav-theme-toggle"
      aria-label={`Toggle theme (currently ${label})`}
      title={`Theme: ${label}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
