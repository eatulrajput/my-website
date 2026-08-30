"use client";

interface ProjectTechStackProps {
  skills: string[];
  title?: string;
}

export const ProjectTechStack = ({
  skills,
  title = "Technologies & Tools",
}: ProjectTechStackProps) => {
  return (
    <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
      <h2 className="text-base font-semibold text-black dark:text-white tracking-tight font-sans">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded text-xs font-mono border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectTechStack;
