"use client";

import {
  ProjectHeader,
  ProjectFeatures,
  ProjectTechStack,
  ProjectCorePackages,
  ProjectLinks,
} from "./components";
import { soloProjects } from "@/data/soloProjects";
import "@/css/solo-projects.css";

const SoloProjectDetailTemplate = ({ slug }: { slug: string }) => {
  const project = soloProjects[slug];
  if (!project) return null;

  return (
    <div className="project-detail">
      {/* Header section */}
      <ProjectHeader
        badgeText={project.badgeText}
        title={project.title}
        description={project.description}
        liveDemoUrl={project.liveDemoUrl}
      />

      {/* Banner / Screenshots Gallery */}
      {project.bannerImage && (
        <div className="solo-detail-banner">
          <img
            src={project.bannerImage}
            alt={project.title}
            className="solo-detail-banner-img"
          />
        </div>
      )}

      {/* Project Overview */}
      {project.projectOverview && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">Overview</h2>
          <div className="project-detail__overview-text">
            {project.projectOverview}
          </div>
        </section>
      )}

      {/* Additional Screenshot Gallery */}
      {project.images && project.images.length > 1 && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">Visual Previews & Screenshots</h2>
          <div className="solo-gallery-grid">
            {project.images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`${project.title} preview ${idx + 1}`}
                className="solo-gallery-img"
                loading="lazy"
              />
            ))}
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
          <h2 className="project-detail__section-title">Technologies & Tools</h2>
          <ProjectTechStack skills={project.skills} />
        </section>
      )}

      {/* Core Packages List */}
      {project.packages && project.packages.length > 0 && (
        <section className="project-detail__section">
          <h2 className="project-detail__section-title">Core Packages & Dependencies</h2>
          <ProjectCorePackages packages={project.packages} />
        </section>
      )}

      {/* Project Links */}
      {project.links && project.links.length > 0 && (
        <section className="project-detail__section project-detail__section--last">
          <h2 className="project-detail__section-title">Resources & Links</h2>
          <ProjectLinks links={project.links} />
        </section>
      )}
    </div>
  );
};

export default SoloProjectDetailTemplate;
