import blogMeta from '../data/blog-meta.json';

export interface BlogMeta {
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string;
  image?: string;
  readingTime?: string;
  category?: "technical" | "non-technical" | string;
  [key: string]: unknown;
}

export interface BlogPost {
  slug: string;
  meta: BlogMeta;
}

export const blogPosts: BlogPost[] = blogMeta as BlogPost[];

export const isTechnicalPost = (post: BlogPost | { slug?: string; meta?: BlogMeta }) => {
  if (!post || !post.meta) return false;

  // 1. Explicit/Manual category metadata check
  const rawCat = (post.meta.category || post.meta.type) as string | undefined;
  if (rawCat) {
    const cat = rawCat.toLowerCase().trim();
    if (cat === "technical" || cat === "tech") return true;
    if (cat === "non-technical") return false;
  }

  // 2. Keyword fallback matching
  const title = post.meta.title?.toLowerCase() || "";
  const subtitle = post.meta.subtitle?.toLowerCase() || "";
  const slug = (post.slug || "").toLowerCase();

  const techKeywords = [
    "mdx", "npm", "yarn", "pnpm", "bun", "react", "fastapi", "ubuntu", "linux", "system design",
    "web3forms", "token", "ventoy", "jsvu", "javascript", "js", "python", "dco", "computer science",
    "fastapi", "llm", "ssh", "github", "git", "osi", "coding", "ecs", "ece", "development", "programming",
    "api", "database", "web", "ubuntu", "windows", "dual boot", "keploy", "streamlit", "chatgpt", "ai", "llms"
  ];

  return techKeywords.some(keyword => title.includes(keyword) || subtitle.includes(keyword) || slug.includes(keyword));
};