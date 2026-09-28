import { groupedExperienceData } from "@/data/ExperienceData";

const Experience = () => {
  return (
    <section id="experience" className="flex flex-col gap-6 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
        Experience
      </h2>

      {groupedExperienceData.map((group) => (
        <div key={group.category} className="flex flex-col gap-1">
          {/* Category sub-heading */}
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {group.category}
          </h3>

          {/* Items in this category */}
          <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {group.items.map((item) => (
              <div key={item.id} className="py-4 flex flex-col gap-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="font-semibold text-base text-black dark:text-white">
                    {item.position} <span className="text-neutral-400 font-normal">at</span>{" "}
                    <a
                      href={item.OrgWebsiteLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-text-brand-accent transition-colors"
                    >
                      {item.OrganisationName}
                    </a>
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.location && (
                      <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                        {item.location}
                      </span>
                    )}
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      {item.duration}
                    </span>
                  </div>
                </div>
                {item.description && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-neutral-700 dark:[&_a]:text-neutral-300 [&_a]:hover:text-black dark:[&_a]:hover:text-white [&_a]:transition-colors">
                    {item.description}
                  </p>
                )}
                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;
