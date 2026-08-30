[![Netlify Status](https://api.netlify.com/api/v1/badges/0683896d-b798-4a7c-a42d-0af2b565df87/deploy-status)](https://app.netlify.com/projects/atulrajput/deploys)

# Minimalist Portfolio Website

A high-performance, single-page application (SPA) portfolio designed to showcase professional skills, projects, work experience, certifications, and educational background in a clean, minimalist design with pristine typography, fluid micro-interactions, responsive layout, and robust navigation.

---

## 🚀 Key Features

- **Smooth Scroll & Navigation:** Integrated with [Lenis](https://github.com/darkroomengineering/lenis) for smooth wheel and touch scroll interpolation. Includes a sticky "GoUp" (Scroll to Top) button that dynamically adjusts positions on mobile to prevent overlapping with the navigation bar, and automatically hides when the overlay menu is open.
- **Dynamic Projects Showcase:** Instant search and category/tag/status filtering with specialized immersive subroutes for `/project/community-mapping` and `/project/astra-ai`.
- **Interactive Creative Gallery:** Responsive photo/art grid with a category filter (All, Paintings, Photography, Designs), marquee preview, and a full-screen interactive lightbox viewer.
- **MDX Blog Engine:** Dynamic routing (`/blog/:slug`) rendering articles parsed from local markdown/MDX files, featuring syntax highlighting (via Shiki/rehype-pretty-code) and markdown formatting.
- **Academic Repository:** Dedicated CS & Engineering coursework explorer (`/eng`) with links to resource templates.
- **Debug Control Panel (Feature Flags):** A hidden feature flags interface panel (`/` bottom panel trigger) to dynamically toggle the preloader, switch font pairings, and debug layout borders.
- **Security & Protection:** Route and component shielding using a passcode-authenticated client-side overlay (`ProtectionModal.tsx`).
- **Responsive Layout & Floating Dock:** Adaptive navigation bar designed as a floating, centered pill dock on mobile devices. Secondary controls like **Theme Toggle** and **Feature Flags** automatically migrate inside the **Explore More** overlay modal on mobile to preserve screen space and avoid clutter.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (React 18, App Router)
- **Language:** TypeScript 5.8+ (Strict Mode)
- **Styling:** Tailwind CSS v4.0+ (using CSS-based configurations)
- **Animations:** Motion (Framer Motion) & Lenis Scroll
- **Markdown & Syntax Highlighting:** MDX, Shiki, Rehype Pretty Code, Remark GFM, Gray Matter
- **Icons:** `@tabler/icons-react` & Lucide React

---

## 📁 Codebase Structure

```
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router layout and route pages
│   ├── blog/             # MDX blog post markdown files
│   ├── components/       # Global reusable interface blocks
│   │   ├── Blog/         # Blog components
│   │   ├── Gallery/      # Gallery components
│   │   ├── Home/         # Home page module components (Hero, Skills, Experience, etc.)
│   │   ├── Project/      # Project-specific pages/views
│   │   ├── ui/           # Custom atoms based on design tokens (Buttons, Alerts)
│   │   └── ...           # Preloader, ThemeToggle, ClientLayout
│   ├── context/          # React context engines (Feature flags, theme settings)
│   ├── data/             # Data matrices/dictionaries for timeline, skills, and certifications
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries and helpers (e.g., clsx, tailwind-merge)
│   ├── views/            # Page view components (Home, Projects, Gallery, Blog, Resources)
│   └── index.css         # Main stylesheet with Tailwind imports and theme overrides
```

---

## 💻 Getting Started

### Prerequisites

Make sure you have Node.js and npm (or Bun) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eatulrajput/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or using Bun
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or using Bun
   bun dev
   ```

### Additional Scripts

- **Production Build:** Generates optimized production build in the `.next` directory.
  ```bash
  npm run build
  ```
- **Linting:** Runs ESLint checks on the codebase.
  ```bash
  npm run lint
  ```
- **Start:** Spawns the Next.js production server.
  ```bash
  npm run start
  ```

---

## 📄 License

Created by [Atul Rajput](https://github.com/eatulrajput). All rights reserved.
