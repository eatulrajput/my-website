import { experienceData } from "@/data/ExperienceData";

const Experience = () => {
  return (
    <section id="experience" className="flex flex-col gap-4 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
        Experience
      </h2>

      {/* Experience Stacked List */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
        {experienceData.map((item) => (
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
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                {item.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
