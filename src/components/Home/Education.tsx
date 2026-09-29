import { educationData } from "@/data/EducationData";

const Education = () => {
  return (
    <section id="education" className="flex flex-col gap-4 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
        Education
      </h2>

      {/* Education Stacked List */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
        {educationData.map((item) => (
          <div key={item.id || item.degree} className="py-4 flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4">
              <h3 className="font-medium text-base text-black dark:text-white leading-tight">
                {item.degree}
              </h3>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                {item.duration}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              <span className="text-neutral-800 dark:text-neutral-200">
                {item.institutionName}
              </span>
              <span className="hidden sm:inline-block text-neutral-300 dark:text-neutral-700">
                •
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>{item.location}</span>
                {item.grade && (
                  <>
                    <span className="text-neutral-300 dark:text-neutral-700">
                      •
                    </span>
                    <span className="text-brand-accent font-medium">
                      {item.grade}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
