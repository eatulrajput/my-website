"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Breadcrumbs } from "@/components/ui";
import { soloProjects, SoloProjectItem } from "@/data/soloProjects";
import {
  IconExternalLink,
  IconBrandGithub,
  IconArrowRight,
  IconUser,
  IconSparkles,
} from "@tabler/icons-react";
import "@/css/solo-projects.css";

type CategoryFilter =
  "all" | "desktop" | "web" | "ai" | "automation" | "tool" | "mobile";

export default function SoloProjectsView() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const projectList = Object.values(soloProjects);

  const filteredProjects = projectList.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: "All Solo Projects", value: "all" },
    { label: "Desktop", value: "desktop" },
    { label: "Web", value: "web" },
    { label: "AI & ML", value: "ai" },
    { label: "Automation", value: "automation" },
    { label: "DevTools", value: "tool" },
    { label: "Mobile", value: "mobile" },
  ];

  return (
    <div className="solo-projects-container">
      {/* Header */}
      <div className="solo-projects-header space-y-3">
        <Breadcrumbs
          items={[{ label: "Solo Projects", href: "/solo-projects" }]}
        />
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-medium mb-2">
            <IconUser className="size-3.5" />
            <span>Independent Engineering</span>
          </div>
          <h1 className="solo-projects-title">Solo Projects</h1>
          <p className="solo-projects-subtitle">
            Comprehensive directory of solo engineering builds, desktop
            utilities, automated workflows, DevTools, and hackathon prototypes
            with deep architectural breakdowns.
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="solo-projects-filter-bar">
        <div className="solo-projects-tabs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`solo-tab-btn ${activeCategory === cat.value ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Showing {filteredProjects.length} of {projectList.length} projects
        </span>
      </div>

      {/* Projects Grid */}
      <div className="solo-projects-grid">
        {filteredProjects.map((project: SoloProjectItem) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="solo-card"
          >
            {/* Image Thumbnail */}
            <div className="solo-card-image-wrapper">
              {project.bannerImage ? (
                <img
                  src={project.bannerImage}
                  alt={project.title}
                  className="solo-card-image"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600 font-mono text-xs">
                  [ No Preview Image ]
                </div>
              )}
              <span className="solo-card-badge">{project.category}</span>
              {project.status && (
                <span className="solo-card-status">{project.status}</span>
              )}
            </div>

            {/* Card Body */}
            <div className="solo-card-body">
              <div className="solo-card-header">
                <h3 className="solo-card-title">{project.title}</h3>
                <span className="solo-card-date">{project.date}</span>
              </div>

              <p className="solo-card-description">{project.description}</p>

              {/* Skills Tags */}
              {project.skills && project.skills.length > 0 && (
                <div className="solo-card-tags">
                  {project.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="solo-card-tag">
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="solo-card-tag">
                      +{project.skills.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Card Actions */}
              <div className="solo-card-actions">
                <Link
                  href={`/project/${project.slug}`}
                  className="solo-link-btn"
                >
                  <span>Deep Details</span>
                  <IconArrowRight className="size-3.5" />
                </Link>

                <div className="flex items-center gap-3">
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                      title="Source Code"
                    >
                      <IconBrandGithub className="size-4" />
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target={
                        project.liveDemoUrl.startsWith("http")
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-brand-accent transition-colors"
                      title="Live Demo"
                    >
                      <IconExternalLink className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
