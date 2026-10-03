"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import DownloadCVButton from "@/components/common/DownloadCVButton";

/**
 * HeroSection
 *
 * The main landing banner for the portfolio. Styled like a featured app
 * on the iOS App Store to emphasize the React Native / Cross-Platform focus.
 * Now features high-end Framer Motion scroll parallax and stagger reveals.
 */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apple-style scroll parallax: content fades and shifts down slightly as you scroll away
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const techStack = ["React Native", "iOS", "Android", "TypeScript", "Next.js"];

  return (
    <section className="hero-section container" ref={containerRef}>
      <motion.div
        className="hero-featured-card"
        style={{ y: yParallax, opacity: opacityParallax }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div>
          <motion.p variants={itemVariants} className="hero-featured-label">
            Featured Developer
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero-title">
            Atul Rajput
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Crafting seamless, high-performance cross-platform experiences.
            Bridging the gap between native fluidity and modern web
            technologies.
          </motion.p>

          <motion.div variants={itemVariants} className="tech-badges-container">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="tech-badge"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5 + i * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginTop: "32px" }}>
            <DownloadCVButton variant="primary" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
