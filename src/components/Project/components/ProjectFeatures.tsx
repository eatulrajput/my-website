"use client";

import { FeatureItem } from "./types";

interface ProjectFeaturesProps {
  features: FeatureItem[];
  title?: string;
}

export const ProjectFeatures = ({
  features,
  title = "Key Features",
}: ProjectFeaturesProps) => {
  return (
    <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
      <h2 className="text-base font-semibold text-black dark:text-white tracking-tight font-sans">
        {title}
      </h2>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
        {features.map((feat, idx) => {
          const IconComponent = feat.icon;
          return (
            <div key={idx} className="py-3.5 flex items-start gap-3">
              <IconComponent className="size-4 text-neutral-500 dark:text-neutral-400 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="font-semibold text-xs sm:text-sm text-black dark:text-white block">
                  {feat.label}
                </span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectFeatures;
