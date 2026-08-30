import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { projects } from "@/data/projectData";

const Projects = () => {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="flex flex-col gap-4 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
          Latest Projects
        </h2>
        <Link
          href="/project"
          className="group inline-flex items-center gap-1 text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400 hover-text-brand-accent transition-colors"
        >
          <span>View all</span>
          <IconArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Projects Stacked List */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
        {featuredProjects.map((project) => {
          const targetUrl = project.liveLink || project.codeLink || "/project";
          const isExternal = targetUrl.startsWith("http");

          return (
            <div key={project.title} className="group py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <Link
                    href={targetUrl}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : ""}
                    className="font-semibold text-base text-black dark:text-white group-hover:text-brand-accent transition-colors flex items-center gap-1.5"
                  >
                    <span>{project.title}</span>
                    {isExternal && <IconArrowUpRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-brand-accent" />}
                  </Link>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech stack inline pills */}
              <div className="flex flex-wrap gap-1 pt-1 sm:pt-0 shrink-0">
                {project.techStack?.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
