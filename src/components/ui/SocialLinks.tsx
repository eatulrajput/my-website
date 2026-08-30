import React from 'react';
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = "" }) => {
  const links = [
    {
      href: "https://www.linkedin.com/in/atul-rajput-9b1b4a1b8/",
      label: "LinkedIn",
      icon: IconBrandLinkedin,
    },
    {
      href: "https://github.com/eatulrajput",
      label: "GitHub",
      icon: IconBrandGithub,
    },
  ];

  return (
    <div className={cn("flex items-center gap-4 mt-6", className)}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "relative overflow-hidden flex items-center justify-center p-3 rounded-full border transition-all duration-300 shadow-sm",
              "border-neutral-200/50 bg-white/40 hover:border-brand-apricot/60 text-neutral-850 hover:text-brand-midnight",
              "dark:border-neutral-850/40 dark:bg-brand-midnight/20 dark:text-neutral-300 dark:hover:text-brand-cream"
            )}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
              initial={{ left: "-150%" }}
              animate={{ left: "250%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2.5,
                ease: "linear",
              }}
            />
            <Icon className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
