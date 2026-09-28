import { skillsData } from "@/data/skillsData";

export default function Skills() {
  return (
    <section id="skills" className="flex flex-col gap-5 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <div>
        <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
          Skills &amp; Technologies
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1">
          Tools, languages, frameworks &amp; platforms I build with.
        </p>
      </div>

      {/* Category-wise rows */}
      <div className="flex flex-col gap-y-8">
        {skillsData.map((group) => (
          <div key={group.category} className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-x-10 sm:items-baseline">
            {/* Category label — fixed width column */}
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {group.category}
            </span>

            {/* Skills inline */}
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-900 hover-border-brand-accent hover-text-brand-accent transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  <span className="font-semibold">{skill.name}</span>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-accent opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 ease-out" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
