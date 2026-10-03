"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { projects, ProjectItem } from "@/data/projectData";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import TiltCard from "@/components/ui/TiltCard";
import ProjectIcon from "@/components/ui/ProjectIcon";

import { staggerContainer, fadeUpItem } from "@/lib/animations";

function ProjectCard({ project }: { project: ProjectItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card-wrapper"
      variants={fadeUpItem}
      style={{
        perspective: "1000px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard
        className="project-card"
        onClick={() => {
          if (project.liveLink)
            window.open(
              project.liveLink,
              project.liveLink.startsWith("/") ? "_self" : "_blank",
            );
          else if (project.codeLink) window.open(project.codeLink, "_blank");
        }}
      >
        {/* Card Content */}
        <div
          className="project-card-content"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="project-card-top-row">
            <ProjectIcon title={project.title} />
            <div className="project-actions">
              {project.codeLink || project.liveLink ? (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = project.liveLink || project.codeLink || "#";
                    window.open(url, url.startsWith("/") ? "_self" : "_blank");
                  }}
                >
                  VIEW
                </Button>
              ) : (
                <span
                  className="project-action-btn"
                  style={{ opacity: 0.5, cursor: "not-allowed" }}
                >
                  DEV
                </span>
              )}
            </div>
          </div>

          <div className="project-info">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-subtitle">
              {project.projectCategory
                ? project.projectCategory.toUpperCase()
                : "APP"}
            </p>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="project-tags">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="project-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/**
 * FeaturedProjects Component
 */
export default function FeaturedProjects() {
  return (
    <section className="projects-section container" id="projects">
      <SectionHeader title="Featured Apps" />

      <motion.div
        className="project-carousel"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
