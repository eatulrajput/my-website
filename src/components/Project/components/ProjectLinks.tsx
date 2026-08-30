"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { ProjectLinkItem } from "./types";

interface ProjectLinksProps {
  links: ProjectLinkItem[];
  title?: string;
}

export const ProjectLinks = ({
  links,
  title = "Project Links",
}: ProjectLinksProps) => {
  return (
    <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
      <h2 className="text-base font-semibold text-black dark:text-white tracking-tight font-sans">
        {title}
      </h2>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800 font-mono text-xs">
        {links.map((link, idx) => {
          const IconComp = link.icon;
          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 flex items-center justify-between gap-4 group hover-text-brand-accent transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0 shrink-0">
                {IconComp && <IconComp className="size-4 text-neutral-400 shrink-0" />}
                <span className="font-semibold text-black dark:text-white group-hover:text-brand-accent transition-colors">
                  {link.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 min-w-0 shrink">
                <span className="truncate max-w-[150px] sm:max-w-[280px]">
                  {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
                <IconArrowUpRight className="size-3.5 text-neutral-400 shrink-0" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectLinks;
