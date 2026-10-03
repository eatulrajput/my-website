"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { motion, Variants } from "motion/react";
import { ProjectLinkItem } from "./types";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
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

interface ProjectLinksProps {
  links: ProjectLinkItem[];
  title?: string;
}

export const ProjectLinks = ({
  links,
  title = "Project Links",
}: ProjectLinksProps) => {
  return (
    <div className="project-links">
      <h2 className="project-links__title">{title}</h2>
      <motion.div
        className="project-links__list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {links.map((link, idx) => {
          const IconComp = link.icon;
          return (
            <motion.a
              key={idx}
              variants={item}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-links__item group"
            >
              <div className="project-links__item-left">
                {IconComp && <IconComp className="project-links__icon" />}
                <span className="project-links__item-title">{link.title}</span>
              </div>
              <div className="project-links__item-right">
                <span className="project-links__item-url">
                  {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
                <IconArrowUpRight className="project-links__arrow" />
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProjectLinks;
