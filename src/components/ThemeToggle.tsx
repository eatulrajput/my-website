"use client";

import { useTheme } from "../hooks/useTheme";
import { useEffect, useState } from "react";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-8 sm:size-9" />;
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
          icon: <IconSun className="size-4 text-brand-accent" />,
          label: "Light mode",
        };
      case "dark":
        return {
          icon: <IconMoon className="size-4 text-brand-accent" />,
          label: "Dark mode",
        };
      default:
        return {
          icon: <IconDeviceDesktop className="size-4 text-neutral-500 dark:text-neutral-400" />,
          label: "System default",
        };
    }
  };

  const { icon, label } = getThemeDetails();

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="p-2 rounded-lg text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
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
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
