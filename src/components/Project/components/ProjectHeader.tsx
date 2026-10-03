"use client";

import {
  IconInfoCircle,
  IconGlobe,
  IconArrowUpRight,
} from "@tabler/icons-react";

interface ProjectHeaderProps {
  badgeText?: string;
  title: string;
  description: string;
  liveDemoUrl?: string;
}

export const ProjectHeader = ({
  badgeText,
  title,
  description,
  liveDemoUrl,
}: ProjectHeaderProps) => {
  return (
    <div className="project-header">
      <div className="project-header__content">
        <div className="project-header__titles">
          {badgeText && (
            <div className="project-header__badges">
              <span className="project-header__badge">
                <IconInfoCircle className="project-header__badge-icon" />
                <span>{badgeText}</span>
              </span>
            </div>
          )}

          <h1 className="project-header__title">{title}</h1>

          <p className="project-header__description">{description}</p>
        </div>
      </div>

      {liveDemoUrl && (
        <div className="project-header__actions">
          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-header__demo-link"
          >
            <IconGlobe className="project-header__demo-icon" />
            <span>Live Demo</span>
            <IconArrowUpRight className="project-header__demo-arrow" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
