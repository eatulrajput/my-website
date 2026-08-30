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
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-semibold text-base text-black dark:text-white">
                {item.degree}
              </span>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                {item.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300">
              <span>{item.institutionName}</span>
              <span>•</span>
              <span>{item.location}</span>
              {item.grade && (
                <>
                  <span>•</span>
                  <span className="text-brand-accent font-bold">{item.grade}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
