import { certificateData } from "@/data/CertificateData";
import { IconArrowUpRight } from "@tabler/icons-react";

const Certificate = () => {
  return (
    <section id="certificates" className="flex flex-col gap-4 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
        Certifications
      </h2>

      {/* Certifications Stacked List */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
        {certificateData.map((item) => (
          <div key={item.id || item.degree} className="py-4 flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-semibold text-base text-black dark:text-white">
                {item.degree}
              </span>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                {item.certifedOn}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300">
              <span>{item.institutionName} • {item.Platform}</span>
              {item.certificateLink && (
                <a
                  href={item.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent font-bold hover:underline flex items-center gap-0.5 shrink-0"
                >
                  <span>Verify</span>
                  <IconArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
            {item.skills && item.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1.5">
                {item.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
