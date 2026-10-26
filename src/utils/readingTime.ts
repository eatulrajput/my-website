export function getReadingTime(content?: string, defaultMinutes = 4): string {
  if (!content) return `${defaultMinutes} min read`;
  // Strip code blocks and markdown syntax for word count
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`.*?`/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[#*_~>\-]/g, ' ')
    .trim();

  const words = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
