"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Breadcrumbs, EmptyCookieState } from "@/components/ui";
import { projects, ProjectItem } from "@/data/projectData";
import {
  IconChevronDown,
  IconExternalLink,
  IconBrandGithub,
  IconUser,
  IconUsers,
  IconCategory,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ProjectFilterStatus = "all" | "progress" | "completed";

const Project = () => {
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ProjectFilterStatus>("all");

  const toggleProject = (title: string) => {
    setExpandedTitle((prev) => (prev === title ? null : title));
  };

  const filteredProjects = projects.filter((project) => {
    if (selectedStatus === "all") return true;
    const status = (project.projectStatus || "").toLowerCase();
    if (selectedStatus === "completed") return status.includes("completed");
    if (selectedStatus === "progress") return status.includes("progress");
    return true;
  });

  const statusTabs: { label: string; value: ProjectFilterStatus }[] = [
    { label: "All Projects", value: "all" },
    { label: "In Progress", value: "progress" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
      {/* Page Header */}
      <div className="space-y-3">
        <Breadcrumbs items={[{ label: "Projects", href: "/project" }]} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white font-sans">
            Projects
          </h1>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1">
            Chronological directory of engineering projects, tools, and hackathon prototypes.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 font-mono text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedStatus(tab.value)}
              type="button"
              className={cn(
                "px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer",
                selectedStatus === tab.value
                  ? "border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent font-bold"
                  : "border-transparent text-neutral-500 hover:text-black dark:hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {filteredProjects.map((project: ProjectItem) => {
            const isExpanded = expandedTitle === project.title;

          return (
            <div key={project.title} className="py-4 flex flex-col transition-colors">
              {/* Clickable Header Row */}
              <button
                onClick={() => toggleProject(project.title)}
                className="w-full text-left group cursor-pointer focus:outline-none flex flex-col gap-1.5"
                aria-expanded={isExpanded}
              >
                {/* Top Line: Name, Date, Status, Chevron */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-semibold text-base text-black dark:text-white group-hover:text-brand-accent transition-colors truncate">
                      {project.title}
                    </span>

                    {/* Status Badge */}
                    {project.projectStatus && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full capitalize shrink-0 border border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent font-semibold tracking-wider">
                        {project.projectStatus}
                      </span>
                    )}
                  </div>

                  {/* Date & Chevron Indicator */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                    {project.date && <span>{project.date}</span>}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-neutral-400 group-hover:text-black dark:group-hover:text-white"
                    >
                      <IconChevronDown className="size-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Single line description summary (visible when collapsed) */}
                {!isExpanded && (
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal line-clamp-1 pr-6">
                    {project.description}
                  </p>
                )}
              </button>

              {/* Expandable Details Drawer */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3.5 p-4 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 flex flex-col gap-3.5 text-xs font-mono">

                      {/* Complete Un-truncated Description */}
                      <div className="space-y-1">
                        <span className="text-neutral-400 dark:text-neutral-500 font-semibold block uppercase tracking-wider text-[10px]">
                          Project Overview:
                        </span>
                        <p className="text-sm font-sans text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                          {project.description}
                        </p>
                      </div>

                      {/* Action Links Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        {project.liveLink && (
                          <Link
                            href={project.liveLink}
                            target={project.liveLink.startsWith("http") ? "_blank" : "_self"}
                            rel={project.liveLink.startsWith("http") ? "noopener noreferrer" : ""}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-accent text-white dark:text-black font-bold hover:opacity-90 transition-opacity"
                          >
                            <span>Live Demo</span>
                            <IconExternalLink className="size-3.5" />
                          </Link>
                        )}

                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover-border-brand-accent hover-text-brand-accent transition-colors"
                          >
                            <IconBrandGithub className="size-3.5" />
                            <span>Source Code</span>
                          </a>
                        )}

                        {!project.liveLink && !project.codeLink && (
                          <span className="text-neutral-400 dark:text-neutral-500 italic">
                            Internal / Private Repository
                          </span>
                        )}
                      </div>

                      {/* Participation & Category Details */}
                      <div className="flex flex-wrap items-center gap-2 text-neutral-600 dark:text-neutral-400">
                        {project.participationType && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 capitalize">
                            {project.participationType.toLowerCase() === "solo" ? (
                              <IconUser className="size-3 text-brand-accent" />
                            ) : (
                              <IconUsers className="size-3 text-brand-accent" />
                            )}
                            <span>{project.participationType} Project</span>
                          </span>
                        )}

                        {project.projectCategory && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 capitalize">
                            <IconCategory className="size-3 text-brand-accent" />
                            <span>Category: {project.projectCategory}</span>
                          </span>
                        )}
                      </div>

                      {/* Skill Set Badges */}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="space-y-1.5 pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60">
                          <span className="text-neutral-400 dark:text-neutral-500 font-semibold block uppercase tracking-wider text-[10px]">
                            Skill Set & Stack:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      ) : (
        <EmptyCookieState
          title="No projects found"
          description={
            <>
              We couldn't find any projects matching the <span className="font-semibold text-brand-accent capitalize">'{selectedStatus}'</span> status, but here's a cookie for your troubles!
            </>
          }
          showAction={selectedStatus !== "all"}
          onAction={() => setSelectedStatus("all")}
          actionText="Clear Filters"
        />
      )}
    </div>
  );
};

export default Project;
