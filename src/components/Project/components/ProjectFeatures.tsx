"use client";

import { motion, Variants } from "motion/react";
import { FeatureItem } from "./types";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ProjectFeaturesProps {
  features: FeatureItem[];
  title?: string;
}

export const ProjectFeatures = ({
  features,
  title = "Key Features",
}: ProjectFeaturesProps) => {
  return (
    <div className="project-features">
      <h2 className="project-features__title">{title}</h2>
      <motion.div
        className="project-features__list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((feat, idx) => {
          const IconComponent = feat.icon;
          return (
            <motion.div
              key={idx}
              variants={item}
              className="project-features__item"
            >
              <IconComponent className="project-features__icon" />
              <div className="project-features__text-wrapper">
                <span className="project-features__item-title">
                  {feat.label}
                </span>
                <p className="project-features__item-desc">{feat.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProjectFeatures;
