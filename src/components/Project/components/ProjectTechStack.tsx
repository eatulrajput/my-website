"use client";

import { motion, Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

interface ProjectTechStackProps {
  skills: string[];
  title?: string;
}

export const ProjectTechStack = ({
  skills,
  title = "Technologies & Tools",
}: ProjectTechStackProps) => {
  return (
    <div className="project-tech">
      <h2 className="project-tech__title">{title}</h2>
      <motion.div
        className="project-tech__list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            variants={item}
            className="project-tech__badge"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectTechStack;
