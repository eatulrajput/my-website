"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="not-found-wrapper">
      {/* Ambient background blur (Apple style subtle glow) */}
      <div className="not-found-glow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="not-found-content"
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="not-found-404"
        >
          404
        </motion.p>

        <h1 className="not-found-title">
          The page you're looking for can't be found.
        </h1>

        <p className="not-found-desc">
          It might have been removed, had its name changed, or is temporarily
          unavailable.
        </p>

        <div className="not-found-actions">
          <Button variant="primary" onClick={() => router.push("/")}>
            <IconHome />
            Go to Home
          </Button>

          <Button variant="secondary" onClick={() => router.back()}>
            <IconArrowLeft />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
