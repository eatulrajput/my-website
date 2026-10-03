"use client";

import React from "react";
import { motion } from "motion/react";
import { experienceData } from "@/data/ExperienceData";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";

import { staggerContainer, fadeUpItem } from "@/lib/animations";

/**
 * ExperienceSection Component
 *
 * Renders the work experience timeline using clean iOS-styled cards.
 */
export default function ExperienceSection() {
  return (
    <section className="experience-section container" id="experience">
      <SectionHeader title="Fellowships & Open Source" />

      <div className="timeline-container">
        {/* The central line */}
        <div className="timeline-line"></div>

        <motion.div
          className="timeline-list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experienceData.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeUpItem}
              className="timeline-item"
            >
              {/* The glowing dot on the timeline */}
              <div className="timeline-node">
                <div className="timeline-node-inner"></div>
              </div>

              {/* The actual content card */}
              <div className="experience-card">
                <div className="experience-header">
                  <div className="experience-title-group">
                    <h3 className="experience-title">{exp.position}</h3>
                    <span className="experience-org">
                      {exp.OrganisationName}
                    </span>
                    <div className="experience-duration">{exp.duration}</div>
                  </div>
                </div>

                <div className="experience-desc">{exp.description}</div>

                {exp.skills && (
                  <div className="experience-skills">
                    {exp.skills.map((skill, index) => (
                      <Badge key={index} variant="accent">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
