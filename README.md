# Portfolio Website

A personal portfolio and blog platform built with Next.js 16 and the App Router. The site presents professional experience, technical projects, skills, education, and a full-featured MDX-powered blog engine. It follows an Apple Human Interface Guidelines-inspired design system implemented entirely in vanilla CSS.

**Live:** [eatulrajput.netlify.app](https://eatulrajput.netlify.app)
**Repository:** [github.com/eatulrajput/portfolio-website-3](https://github.com/eatulrajput/portfolio-website-3)

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Blog System](#blog-system)
- [Design System](#design-system)
- [SEO and Performance](#seo-and-performance)
- [License](#license)

---

## Overview

This is the fourth major iteration of the portfolio. It is a server-rendered, statically optimised Next.js application that serves the following primary sections:

- **Hero** -- A prominent landing banner styled after iOS App Store featured cards, with scroll-driven parallax animations.
- **Featured Projects** -- A responsive carousel on mobile and a CSS grid on desktop, linking to detailed project pages with team member profiles, tech stacks, and feature breakdowns.
- **Skills** -- A categorised grid displaying technical proficiencies with dynamically fetched favicons from each technology's official website.
- **Experience** -- A vertical timeline of professional roles and fellowships.
- **Education** -- Academic background presented in a card layout.
- **Blog** -- Over 100 MDX articles rendered with syntax highlighting, a table of contents, reading progress bar, article reactions, and social sharing.
- **Contact** -- A direct communication section.

Additional infrastructure includes a glassmorphic navigation bar, a dark/light theme toggle with system preference detection, ambient background effects (cursor spotlight, film grain, animated mesh), and full SEO metadata with Open Graph and Twitter card support.

---

## Technology Stack

| Layer              | Technology                                                       |
| ------------------ | ---------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router, React 18)                               |
| Language           | TypeScript 5.9                                                   |
| Styling            | Vanilla CSS (Apple HIG design system)                            |
| Animations         | Motion (Framer Motion v12)                                       |
| Blog Engine        | MDX with `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`        |
| Syntax Highlighting| Shiki via `rehype-pretty-code`                                   |
| Markdown Plugins   | `remark-gfm` (GitHub Flavoured Markdown)                         |
| Icons              | `@tabler/icons-react`, `lucide-react`                            |
| Typography         | Space Grotesk (sans-serif), JetBrains Mono (monospace)           |
| Package Manager    | Bun                                                              |
| Linting            | ESLint 10 with `typescript-eslint`, `eslint-config-next`         |
| Formatting         | Prettier 3.9                                                     |

---

## Architecture

The application uses the Next.js App Router with a hybrid rendering strategy. Pages are primarily client-rendered (`"use client"`) to support interactive animations and dynamic MDX loading. Static assets are cached with custom `Cache-Control` headers defined in `next.config.mjs`. The MDX pipeline processes `.mdx` files at build time through a custom pre-build script that extracts frontmatter metadata and generates a JSON index used for blog listing, sorting, and search.

```
Browser Request
    |
    v
Next.js App Router (src/app/)
    |
    +-- layout.tsx          Root layout: fonts, theme, navigation, footer
    +-- page.tsx            Home: assembles all section components
    +-- blog/[slug]/        Dynamic blog article pages (MDX)
    +-- project/[slug]/     Dynamic project detail pages
    +-- nontech-blog/       Non-technical blog listing
    +-- api/link-preview/   Server-side link title resolution
```

---

## Project Structure

```
portfolio-website-3/
|-- public/                         Static assets served at the root
|   |-- logo/                       Brand logos and favicons
|   |-- robots.txt                  Search engine crawl directives
|   |-- sitemap.xml                 XML sitemap for indexing
|   +-- llms.txt                    LLM-readable site summary
|
|-- scripts/
|   +-- build-blog-meta.js          Pre-build script that parses all MDX files,
|                                   extracts frontmatter metadata, calculates
|                                   reading times, and outputs blog-meta.json
|
|-- src/
|   |-- app/                        Next.js App Router pages and API routes
|   |   |-- layout.tsx              Root layout with fonts, theme, and global shell
|   |   |-- page.tsx                Home page composing all section components
|   |   |-- error.tsx               Global error boundary with recovery actions
|   |   |-- not-found.tsx           Custom 404 page
|   |   |-- blog/[slug]/page.tsx    Dynamic blog article renderer
|   |   |-- project/[slug]/page.tsx Dynamic project detail renderer
|   |   |-- nontech-blog/page.tsx   Filtered blog listing for non-technical posts
|   |   +-- api/link-preview/       API route for server-side link title fetching
|   |
|   |-- blogposts_markdown/         MDX blog articles (100+ files)
|   |                               Each file exports a meta object with title,
|   |                               date, tags, and description
|   |
|   |-- components/
|   |   |-- Blog/                   Blog-specific UI components
|   |   |   |-- AnchorHeading.tsx   Heading elements with anchor links for deep linking
|   |   |   |-- ArticleReactions.tsx Article reaction system
|   |   |   |-- BlogTableOfContents.tsx Auto-generated table of contents from headings
|   |   |   |-- BlogTitle.tsx       Article header with metadata display
|   |   |   |-- CodeBlock.tsx       Syntax-highlighted code blocks with copy support
|   |   |   |-- CoverImage.tsx      Full-width article cover image
|   |   |   |-- CustomLink.tsx      Smart link component with automatic title fetching
|   |   |   |-- ReadingProgressBar.tsx Scroll-driven reading progress indicator
|   |   |   |-- ShareBlog.tsx       Social media sharing buttons
|   |   |   +-- ...                 Alert, Quote, YoutubeVideo, BlogImage, BlogContent
|   |   |
|   |   |-- Project/                Project detail page system
|   |   |   |-- ProjectDetailTemplate.tsx Master template for project pages
|   |   |   +-- components/         Modular sub-components: header, features,
|   |   |                           tech stack, links, team members, packages
|   |   |
|   |   |-- Status/                 Service status dashboard components
|   |   |   |-- StatusHeader.tsx    Overall status indicator
|   |   |   |-- ServiceCard.tsx     Individual service status cards
|   |   |   |-- UptimeBar.tsx       Visual uptime percentage display
|   |   |   |-- ResponseTimeChart.tsx Response latency graph
|   |   |   +-- IncidentLog.tsx     Historical incident timeline
|   |   |
|   |   |-- home/                   Landing page section components
|   |   |   |-- HeroSection.tsx     Parallax hero banner with stagger animations
|   |   |   |-- FeaturedProjects.tsx Project cards carousel and grid
|   |   |   |-- SkillsSection.tsx   Categorised skills with dynamic favicons
|   |   |   |-- ExperienceSection.tsx Professional timeline
|   |   |   |-- EducationSection.tsx Academic background cards
|   |   |   |-- RecentBlogsSection.tsx Latest blog post previews
|   |   |   +-- ContactSection.tsx  Contact call-to-action
|   |   |
|   |   |-- layout/                 Persistent layout components
|   |   |   |-- GlassNavigationBar.tsx Glassmorphic responsive navigation
|   |   |   +-- Footer.tsx          Site footer
|   |   |
|   |   |-- ui/                     Reusable UI primitives
|   |   |   |-- AmbientMesh.tsx     Animated background mesh gradient
|   |   |   |-- CursorSpotlight.tsx Mouse-following spotlight effect
|   |   |   |-- FilmGrain.tsx       Subtle film grain overlay
|   |   |   |-- TiltCard.tsx        3D tilt-on-hover card wrapper
|   |   |   |-- Breadcrumbs.tsx     Navigation breadcrumb trail
|   |   |   |-- ProjectIcon.tsx     Dynamic project icon with favicon fetching
|   |   |   +-- ...                 Badge, Button, SectionHeader, EmptyCookieState
|   |   |
|   |   |-- common/                 Shared utility components
|   |   |   |-- DownloadCVButton.tsx Resume download button
|   |   |   +-- ScrollReveal.tsx    Intersection Observer scroll animation wrapper
|   |   |
|   |   +-- ThemeToggle.tsx         Dark/light mode toggle with system detection
|   |
|   |-- css/                        All stylesheets (vanilla CSS)
|   |   |-- globals.css             Design system: tokens, reset, and all section styles
|   |   |-- blog-list.css           Blog listing page styles
|   |   |-- blog-post.css           Blog article page styles
|   |   |-- project-details.css     Project detail page styles
|   |   +-- error.css               Error and 404 page styles
|   |
|   |-- data/                       Static data and type definitions
|   |   |-- projectData.ts          Project card data for the home page
|   |   |-- teamProjects.tsx        Detailed project data for individual project pages
|   |   |-- skillsData.ts           Categorised skill definitions with proficiency levels
|   |   |-- ExperienceData.tsx      Professional experience entries
|   |   |-- EducationData.tsx       Education history entries
|   |   |-- blog-meta.json          Auto-generated blog metadata index (build artifact)
|   |   +-- types.ts                Shared TypeScript type definitions
|   |
|   |-- hooks/
|   |   +-- useTheme.ts             Custom hook for theme state management
|   |
|   |-- lib/                        Utility functions and shared logic
|   |   |-- posts.ts                Blog post data loading and helpers
|   |   |-- animations.ts           Shared Framer Motion animation variants
|   |   |-- theme.ts                Theme persistence and detection utilities
|   |   +-- utils.ts                General utility functions (classname merging)
|   |
|   |-- views/                      Page-level view compositions
|   |   |-- BlogList.tsx            Blog listing view with search and filtering
|   |   +-- Project.tsx             Project listing view
|   |
|   |-- mdx-components.tsx          MDX component overrides for custom rendering
|   +-- mdx.d.ts                    TypeScript declarations for MDX module imports
|
|-- package.json                    Project metadata, dependencies, and scripts
|-- tsconfig.json                   TypeScript compiler configuration
|-- eslint.config.js                ESLint flat configuration
|-- next.config.mjs                 Next.js configuration with MDX plugin
+-- .prettierrc                     Prettier formatting configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** 24 or later
- **Bun** (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eatulrajput/portfolio-website-3.git
   cd portfolio-website-3
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script           | Command                  | Description                                                                 |
| ---------------- | ------------------------ | --------------------------------------------------------------------------- |
| `dev`            | `bun run dev`            | Starts the Next.js development server with Turbopack                        |
| `build`          | `bun run build`          | Generates the blog metadata index, then creates a production build          |
| `start`          | `bun run start`          | Serves the production build locally                                         |
| `lint`           | `bun run lint`           | Runs ESLint across the entire codebase                                      |
| `lint:fix`       | `bun run lint:fix`       | Runs ESLint with automatic fix mode                                         |
| `format`         | `bun run format`         | Formats all files with Prettier                                             |

---

## Blog System

Blog posts are authored as MDX files inside `src/blogposts_markdown/`. Each file exports a `meta` object containing the article's title, date, tags, description, and optional cover image path.

During the build step, the `scripts/build-blog-meta.js` script scans all `.mdx` files, extracts their metadata, calculates reading times based on word count (225 words per minute), sorts them by date, and writes the result to `src/data/blog-meta.json`. This JSON index is consumed at runtime by the blog listing pages for fast, zero-overhead article discovery.

Individual articles are loaded dynamically using Next.js `dynamic()` imports and rendered with custom MDX component overrides that provide:

- Syntax-highlighted code blocks via Shiki with a copy-to-clipboard button
- Anchor headings for deep linking and automatic table of contents generation
- Smart external links that resolve page titles server-side through the `/api/link-preview` route
- Cover images, alerts, blockquotes, and embedded YouTube videos

### Adding a New Blog Post

1. Create a new `.mdx` file in `src/blogposts_markdown/` with the article title as the filename.
2. Export a `meta` object at the top of the file with `title`, `date`, `tags`, and `description`.
3. Write the article content using standard Markdown and any of the available MDX components.
4. Run `bun run build` or restart the dev server. The metadata index will regenerate automatically.

---

## Design System

The visual language is implemented as a vanilla CSS design system in `src/css/globals.css`, inspired by Apple's Human Interface Guidelines. Key characteristics:

- **CSS Custom Properties** for all design tokens (colours, shadows, fonts, spacing) with automatic dark mode switching via the `html.dark` class.
- **Typography** uses Space Grotesk for headings and body text, and JetBrains Mono for code and technical labels.
- **Mobile-first responsive design** with breakpoints at 480px, 768px, and 1024px.
- **Glassmorphism** on the navigation bar using `backdrop-filter: blur()`.
- **Ambient effects** including a cursor-following spotlight, a subtle film grain overlay, and an animated mesh gradient background.
- **No CSS framework dependencies.** All styles are hand-written vanilla CSS.

---

## SEO and Performance

- Open Graph and Twitter Card metadata on all pages
- XML sitemap and `robots.txt` for search engine indexing
- `llms.txt` for LLM-readable site context
- Custom `Cache-Control` headers for static assets (30-day cache with stale-while-revalidate)
- Image optimisation configured for AVIF and WebP formats
- Compression enabled in the Next.js configuration
- Skip-to-content link for keyboard accessibility

---

## License

This project is proprietary and not licensed for redistribution. All rights reserved.

---

## Author

**Atul Rajput** -- [eatulrajput.netlify.app](https://eatulrajput.netlify.app)
