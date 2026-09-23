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

  const rawCat = (post.meta.category || post.meta.type) as string | undefined;
  if (rawCat) {
    const cat = rawCat.toLowerCase().trim();
    if (cat === "technical" || cat === "tech") return true;
    if (cat === "non-technical") return false;
  }

  return false;
};