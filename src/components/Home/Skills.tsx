"use client";

import { useState } from "react";
import { skillsData } from "@/data/skillsData";
import { cn } from "@/lib/utils";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skillsData.map((c) => c.category)];

  const allSkills = skillsData.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const uniqueSkills = Array.from(
    new Map(allSkills.map((s) => [s.name, s])).values()
  );

  const filteredSkills =
    selectedCategory === "All"
      ? uniqueSkills
      : uniqueSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="flex flex-col gap-5 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
            Skills & Technologies
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1">
            Tools, languages, frameworks & platforms I build with.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                selectedCategory === cat
                  ? "border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent font-bold"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Chip Badges Container */}
      <div className="flex flex-wrap gap-2 pt-1">
        {filteredSkills.map((skill) => (
          <a
            key={skill.name}
            href={skill.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-900 hover-border-brand-accent hover-text-brand-accent transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <span className="font-semibold">{skill.name}</span>

            {/* Flashing Bottom Border Beam Light */}
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-accent opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 ease-out" />
          </a>
        ))}
      </div>
    </section>
  );
}
