"use client";

import React from "react";
import { motion } from "motion/react";
import { educationData } from "@/data/EducationData";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";

import { staggerContainer, fadeUpItem } from "@/lib/animations";
/**
 * EducationSection Component
 *
 * Displays the user's academic history in a grid of clean, Apple HIG-styled cards.
 */
export default function EducationSection() {
  return (
    <section className="education-section container" id="education">
      <SectionHeader title="Education" />

      <motion.div
        className="education-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {educationData.map((edu) => (
          <motion.div
            key={edu.id}
            variants={fadeUpItem}
            className="education-card"
          >
            <div className="education-header-row">
              {/* Institution Logo or Fallback Icon */}
              <div className="education-logo-container">
                {edu.institutionLogo ? (
                  <img
                    src={edu.institutionLogo}
                    alt={edu.institutionName}
                    className="education-logo"
                  />
                ) : (
                  edu.icon
                )}
              </div>

              <div className="education-title-col">
                <h3 className="education-degree">{edu.degree}</h3>
                <div className="education-inst">
                  {edu.institutionLink ? (
                    <a
                      href={edu.institutionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="education-inst-link"
                    >
                      {edu.institutionName}
                    </a>
                  ) : (
                    edu.institutionName
                  )}
                  <span className="education-separator"> &bull; </span>
                  <span className="education-location">{edu.location}</span>
                </div>
              </div>
            </div>

            <div className="education-meta-row">
              <Badge variant="secondary" className="duration">
                {edu.duration}
              </Badge>
              {edu.grade && (
                <Badge variant="secondary" className="grade">
                  {edu.grade}
                </Badge>
              )}
            </div>

            {edu.details && (
              <div className="education-details">{edu.details}</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
