"use client";

import { Breadcrumbs } from "@/components/ui";
import { IconInfoCircle, IconGlobe, IconArrowUpRight } from "@tabler/icons-react";
import { BreadcrumbItem } from "./types";

interface ProjectHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  badgeText?: string;
  title: string;
  description: string;
  liveDemoUrl?: string;
}

export const ProjectHeader = ({
  breadcrumbs,
  badgeText,
  title,
  description,
  liveDemoUrl,
}: ProjectHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Breadcrumbs items={breadcrumbs} />

        <div className="space-y-2">
          {badgeText && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                <IconInfoCircle className="size-3.5" />
                <span>{badgeText}</span>
              </span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white font-sans">
            {title}
          </h1>

          <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {liveDemoUrl && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white font-mono text-xs hover-border-brand-accent hover-text-brand-accent transition-colors"
          >
            <IconGlobe className="size-4" />
            <span>Live Demo</span>
            <IconArrowUpRight className="size-3.5 text-neutral-400" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
