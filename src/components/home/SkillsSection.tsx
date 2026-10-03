"use client";

import { motion } from "motion/react";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeUpItem } from "@/lib/animations";
import { skillsData } from "@/data/skillsData";

/**
 * Safely parses a URL and returns the Google Favicon API link for the domain.
 * Returns an empty string if the URL is invalid or missing.
 */
const getFaviconUrl = (url?: string): string => {
  if (!url) return "";
  try {
    const parsedUrl = new URL(url);
    // Use the parsed hostname for a cleaner, more reliable domain match
    return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(parsedUrl.hostname)}`;
  } catch (error) {
    console.warn(`Failed to parse URL for favicon: ${url}`);
    return "";
  }
};

/**
 * SkillsSection Component
 *
 * Displays core technologies grouped by category.
 * Styled like iOS settings grouped lists for a premium native feel.
 */
export default function SkillsSection() {
  return (
    <section className="skills-section container" id="skills">
      <SectionHeader title="Core Technologies" />

      <motion.div
        className="skills-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skillsData.map((category, index) => {
          const CategoryIcon = category.icon;
          return (
            <motion.div
              key={index}
              variants={fadeUpItem}
              className="skill-category"
            >
              <h3
                className="skill-category-title"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {CategoryIcon && (
                  <CategoryIcon size={20} color="var(--accent-color)" />
                )}
                {category.category}
              </h3>
              <div className="skill-list">
                {category.items.map((skill, sIndex) => {
                  const faviconUrl = getFaviconUrl(skill.link);

                  return (
                    <a
                      key={sIndex}
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skill-item"
                      style={{
                        textDecoration: "none",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(0,0,0,0.02)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {faviconUrl ? (
                          <img
                            src={faviconUrl}
                            alt={skill.name}
                            width={24}
                            height={24}
                            style={{
                              objectFit: "contain",
                              borderRadius: "4px",
                            }}
                            onError={(e) => {
                              // Hide broken images gracefully if logo doesn't exist
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          // Fallback icon if URL is invalid or missing
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 0.5,
                            }}
                          >
                            {CategoryIcon && <CategoryIcon size={16} />}
                          </div>
                        )}
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      {skill.level && (
                        <span className="skill-level">{skill.level}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
