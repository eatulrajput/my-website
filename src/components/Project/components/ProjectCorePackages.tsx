"use client";

import { IconPackage, IconArrowUpRight } from "@tabler/icons-react";
import { PackageItem } from "./types";

interface ProjectCorePackagesProps {
  packages: PackageItem[];
  title?: string;
}

export const ProjectCorePackages = ({
  packages,
  title = "Core Packages",
}: ProjectCorePackagesProps) => {
  return (
    <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
      <h2 className="text-base font-semibold text-black dark:text-white tracking-tight font-sans">
        {title}
      </h2>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800 font-mono text-xs">
        {packages.map((pkg, idx) => (
          <a
            key={idx}
            href={pkg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 flex items-center justify-between gap-4 group hover-text-brand-accent transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <IconPackage className="size-4 text-neutral-400 shrink-0" />
              <span className="font-semibold text-black dark:text-white group-hover:text-brand-accent transition-colors truncate">
                {pkg.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 shrink-0">
              <span>{pkg.purpose}</span>
              <IconArrowUpRight className="size-3.5 text-neutral-400" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectCorePackages;
