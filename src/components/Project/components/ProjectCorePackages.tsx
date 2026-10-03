"use client";

import { IconPackage, IconArrowUpRight } from "@tabler/icons-react";
import { motion, Variants } from "motion/react";
import { PackageItem } from "./types";

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

interface ProjectCorePackagesProps {
  packages: PackageItem[];
  title?: string;
}

export const ProjectCorePackages = ({
  packages,
  title = "Core Packages",
}: ProjectCorePackagesProps) => {
  return (
    <div className="project-packages">
      <h2 className="project-packages__title">{title}</h2>
      <motion.div
        className="project-packages__list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {packages.map((pkg, idx) => (
          <motion.a
            key={idx}
            variants={item}
            href={pkg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-packages__item group"
          >
            <div className="project-packages__item-left">
              <IconPackage className="project-packages__icon" />
              <span className="project-packages__item-title">{pkg.name}</span>
            </div>
            <div className="project-packages__item-right">
              <span className="project-packages__item-purpose">
                {pkg.purpose}
              </span>
              <IconArrowUpRight className="project-packages__arrow" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectCorePackages;
