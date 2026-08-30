import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../src/blog');
const outputFile = path.join(__dirname, '../src/data/blog-meta.json');

// Ensure data folder exists
const dataDir = path.dirname(outputFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));

const posts = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  // Match the meta object
  const metaMatch = content.match(/export\s+const\s+meta\s*=\s*\{([\s\S]*?)\}/);
  if (metaMatch) {
    const metaBody = metaMatch[1];
    try {
      // Safely evaluate the object literal
      const meta = new Function(`return { ${metaBody} }`)();
      
      // Calculate reading time based on word count of the actual body text
      const bodyText = content.replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\}/, '');
      const cleanText = bodyText
        .replace(/<[^>]+>/g, ' ') // remove HTML/JSX tags
        .replace(/import\s+[\s\S]*?;/g, ' '); // remove imports
      const wordsCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
      const wpm = 225;
      const calculatedReadingTime = Math.max(1, Math.ceil(wordsCount / wpm));
      
      meta.readingTime = `${calculatedReadingTime} min read`;
      
      posts.push({
        slug: file.replace('.mdx', ''),
        meta
      });
    } catch (e) {
      console.error(`Error parsing meta in ${file}:`, e);
    }
  } else {
    console.warn(`No meta found in ${file}`);
  }
}

// Sort by date (descending)
posts.sort((a, b) => {
  const parseDate = (dateStr) => {
    if (!dateStr) return 0;
    // Replace ordinal suffixes (st, nd, rd, th) if any
    const normalized = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
    return new Date(normalized).getTime();
  };
  return parseDate(b.meta.date) - parseDate(a.meta.date);
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), 'utf8');
console.log(`Successfully generated metadata for ${posts.length} blogs.`);
