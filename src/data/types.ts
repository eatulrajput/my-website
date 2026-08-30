// types.ts
export interface SkillItem {
  name?: string;             // Skill name
  logo?: string;            // Optional logo path
  icon?: React.ElementType; // Optional icon component fallback
  link?: string;            // Optional external link
}

export interface SkillCategory {
  category: string;          // Category name (Languages, Frameworks, etc.)
  icon?: React.ElementType;  // Optional category icon
  items: SkillItem[];        // Skills under this category
}
