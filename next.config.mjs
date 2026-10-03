import shadowMdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  compress: true,
  images: {
    // Configures Next.js to serve images in modern AVIF and WebP formats
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Match specific static asset directories
        source: "/(images|logos)/:path*",
        headers: [
          {
            key: "Cache-Control",
            // 30-day local cache (2592000s) with 1-day background revalidation (86400s)
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

const withMDX = shadowMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-pretty-code"],
  },
});

export default withMDX(nextConfig);
