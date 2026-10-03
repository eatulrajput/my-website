"use client";

import React from "react";
import {
  ProjectHeader,
  ProjectFeatures,
  ProjectTechStack,
  ProjectCorePackages,
  TeamMembersSection,
  ProjectLinks,
  FeatureItem,
  PackageItem,
  TeamMember,
  ProjectLinkItem,
} from "./components";
import { teamProjects } from "@/data/teamProjects";

export interface ProjectDetailProps {
  slug: string;
  breadcrumbs: { label: string; href?: string }[];
  badgeText?: string;
  title: string;
  description: string;
  liveDemoUrl?: string;
  projectOverview: React.ReactNode;
  features?: FeatureItem[];
  skills?: string[];
  packages?: PackageItem[];
  links?: ProjectLinkItem[];
  teamMembers?: TeamMember[];
}

const ProjectDetailTemplate = ({ slug }: { slug: string }) => {
  const project = teamProjects[slug];
  if (!project) return null;

  return (
    <div className="project-detail">
      {/* Header section with Apple HIG styling - large typography, breathing room */}
      <ProjectHeader
        badgeText={project.badgeText}
        title={project.title}
        description={project.description}
        liveDemoUrl={project.liveDemoUrl}
      />

      {/* Project Overview */}
      {project.projectOverview && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">Overview</h2>
          <div className="project-detail__overview-text">
            {project.projectOverview}
          </div>
        </section>
      )}

      <div className="project-detail__divider" />

      {/* Key Features */}
      {project.features && project.features.length > 0 && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">Key Features</h2>
          <ProjectFeatures features={project.features} />
        </section>
      )}

      {/* Technologies & Tools */}
      {project.skills && project.skills.length > 0 && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">
            Technologies & Tools
          </h2>
          <ProjectTechStack skills={project.skills} />
        </section>
      )}

      {/* Core Packages List */}
      {project.packages && project.packages.length > 0 && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">Core Packages</h2>
          <ProjectCorePackages packages={project.packages} />
        </section>
      )}

      {/* Project Links */}
      {project.links && project.links.length > 0 && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">Resources & Links</h2>
          <ProjectLinks links={project.links} />
        </section>
      )}

      {/* Team Members */}
      {project.teamMembers && project.teamMembers.length > 0 && (
        <section className="project-detail__section project-detail__section--last">
          <TeamMembersSection
            teamMembers={project.teamMembers}
            projectName={project.title}
            title="Team & Contributors"
          />
        </section>
      )}
    </div>
  );
};

export default ProjectDetailTemplate;
