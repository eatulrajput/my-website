"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import DownloadCVButton from "@/components/common/DownloadCVButton";
import { staggerContainer, fadeUpItem } from "@/lib/animations";
/**
 * ContactSection Component
 *
 * A clean call-to-action section that sits just above the footer.
 */
export default function ContactSection() {
  return (
    <section className="contact-section container" id="contact">
      <motion.div
        className="contact-card"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeUpItem} className="contact-title">
          Let's build something amazing.
        </motion.h2>
        <motion.p variants={fadeUpItem} className="contact-desc">
          Currently open for new opportunities. Whether you have a question or
          just want to say hi, I'll try my best to get back to you!
        </motion.p>
        <motion.div
          variants={fadeUpItem}
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href="mailto:hello@atulrajput.com" className="btn-primary">
            Say Hello
          </Link>
          <DownloadCVButton variant="secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
