# Software Requirements Specification (SRS)

## Project: Minimalist Portfolio Website
**Version:** 1.1.0  
**Date:** July 7, 2026  
**Author:** Atul Rajput  

---

## 1. Introduction

### 1.1 Purpose
This document provides a comprehensive Software Requirements Specification (SRS) for the Minimalist Portfolio Website. It details the functional and non-functional requirements, architectural choices, dependencies, and layout specifications to guide development, maintenance, and deployment.

### 1.2 Scope
The portfolio website is a high-performance, single-page application (SPA) designed to showcase professional skills, projects, work experience, certifications, and educational background. The primary objective of this site is to serve as an interactive, digital curriculum vitae (CV) that impresses recruiters, collaborators, and clients through pristine typography, fluid micro-interactions, responsive design, and robust navigation.

### 1.3 Definitions, Acronyms, and Abbreviations
* **SPA:** Single Page Application
* **MDX:** Markdown with Embedded React Components
* **SRS:** Software Requirements Specification
* **PDR:** Product Design Requirements
* **DOM:** Document Object Model
* **SEO:** Search Engine Optimization
* **CVA:** Class Variance Authority

---

## 2. Overall Description

### 2.1 Product Perspective
The portfolio website is built on a modern frontend stack using Next.js (App Router), React, and TypeScript. It is designed to be hosted statically or on edge deployment platforms (e.g., via Netlify or Vercel) and consumes local data matrices and MDX blog files for dynamic page rendering. It integrates modern browser APIs (such as Lenis for scroll interpolation and MediaQuery lists for system theme detection).

### 2.2 Product Functions
The main functional capabilities include:
1. **Interactive Navigation & Layout:** Preloader screen, global header, sticky navigation menu, smooth scrolling via Lenis, and theme switching (dark/light modes).
2. **Dynamic Home Page:** Hero section, dynamic skills listing, educational and professional experience timelines, certification cards, blog highlights, and a contact interface.
3. **Projects Showcase:** Clean search/filter system matching title, skills, status, or category, and specialized project detail routes (e.g., Community Mapping and Astra AI modules).
4. **Media & Creative Gallery:** Multi-category filterable photo/art grid, sliding marquee, and interactive full-screen lightbox.
5. **MDX Blog Engine:** Dynamic routing for articles parsed from markdown files containing metadata frontmatter, code syntax styling, and Markdown layout structures.
6. **Academic Repository:** Dedicated list of computer science and engineering coursework with links to resource templates.
7. **Feature Flag System:** Hidden/administrative control panel to test layout states, disable loader effects, or debug component styling.

### 2.3 User Classes and Characteristics
* **Recruiters & Tech Leads:** Seeking quick access to projects, tech stacks, experience, and contact forms.
* **General Visitors:** Developers or peers exploring design aesthetics, code quality, and projects.
* **Administrator/Owner (Atul):** Uses the website to update details, publish blogs, and toggle feature flags to showcase new additions.

### 2.4 General Constraints
* Must run on modern desktop and mobile browsers (Chrome, Safari, Firefox, Edge).
* Zero-backend dependency: All forms, search filters, and content renders client-side.
* Must maintain fast performance score (LCP < 2.5s, CLS near 0).

---

## 3. Functional Requirements

### 3.1 Navigation & Global Layout
* **Req-1.1 (Preloader):** Display an initial loading animation showing progress or brand signature when the app loads. Must be toggleable via Feature Flags.
* **Req-1.2 (Scroll Interpolation):** Initialize Lenis smooth scroll on layout mounting. Smooth wheel and touch interpolation with a defined easing curve.
* **Req-1.3 (Scroll to Top):** On route changes, scroll the page to coordinate `(0, 0)` immediately. Display a sticky "Scroll to Up" button once the page is scrolled past the hero threshold. On mobile viewports, its position must shift to `bottom-20` to prevent clashing with the floating navigation dock, and it must hide completely (`opacity-0`) whenever the navigation overlay modal is open.
* **Req-1.4 (Header & Navigation Links):** Display links to Home (`/`), Projects (`/project`), Gallery (`/gallery`), Blog (`/blog`), Resources (`/resources`), and Engineering Course (`/eng`).
* **Req-1.5 (Responsive Navigation Dock):** Adapt the navigation menu layouts dynamically. On desktop viewports, display links horizontally alongside the Feature Flags trigger and Theme Toggle. On mobile viewports, condense the links into a centered, floating pill-dock configuration containing only primary navigation items and an "Explore More" button, redirecting secondary controls (Theme Toggle and Feature Flags trigger) to the bottom of the "Explore More" dropdown overlay modal to maintain page layout cleanliness.

### 3.2 Home Page Modules
* **Req-2.1 (Hero):** Present a high-impact intro statement with clean typography, social profiles, and resume download link.
* **Req-2.2 (Projects Summary):** Grid showing highlighted projects with tech stack badges and direct links.
* **Req-2.3 (Experience & Education):** Chronological timeline showcasing job descriptions, roles, dates, and educational history.
* **Req-2.4 (Skills Grid):** Categorized badges highlighting programming languages, libraries, frameworks, tools, and platforms.
* **Req-2.5 (Certifications):** Showcase verified accomplishments with visual indicators, credentials, and date metadata.
* **Req-2.6 (Contact):** A user contact form with validation for name, email, and message inputs.

### 3.3 Projects Page & Subroutes
* **Req-3.1 (Search & Filter):** Instant query filtering matching text against project name, description, tags, status, or category.
* **Req-3.2 (No Projects State):** If search results are zero, display a custom "Not Found" asset and prompt.
* **Req-3.3 (Subpages):** Build dedicated, immersive review templates for core projects, specifically `/project/community-mapping` and `/project/astra-ai`.

### 3.4 Interactive Media Gallery
* **Req-4.1 (Category Filter):** Filter gallery items by All, Paintings, Photography, and Designs.
* **Req-4.2 (Gallery Marquee):** A looping horizontal marquee showing sample images to simulate dynamic art presentation.
* **Req-4.3 (Grid Layout):** A responsive masonry/grid containing media thumbnails.
* **Req-4.4 (Lightbox Viewer):** Full-screen overlay on thumbnail click. Enable navigation controls (Next, Previous) and responsive image scaling.

### 3.5 MDX Blog Engine
* **Req-5.1 (Markdown Parser):** Parse frontmatter metadata (title, date, tags, description) from local `.mdx` or `.md` files.
* **Req-5.2 (Syntax Highlighting):** Apply themes (such as Shiki) to raw code blocks inside the articles.
* **Req-5.3 (Dynamic Routing):** Fetch and render the full layout of the post at `/blog/:slug`.

### 3.6 Feature Flag Interface
* **Req-6.1 (Control Panel):** Render a debugging feature flag panel to dynamically enable/disable the preloader, change font pairings, or override layout borders.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Optimization
* **P-NFR-1 (Load Times):** Assets must be optimized (WebP for images, code split routing in React).
* **P-NFR-2 (Smoothness):** Smooth scrolling frame rate must maintain 60 FPS under normal operations.

### 4.2 Security & Protection
* **S-NFR-1 (Password Modal):** Restrict access to designated private routes or pages using a client-side passcode authentication overlay (`ProtectionModal.tsx`).
* **S-NFR-2 (Code Privacy):** Never expose server-side keys or private variables in the client bundle.

### 4.3 Design & Theme System
* **D-NFR-1 (Minimalist Styling):** Rely on high contrast, strict structural borders, and clean spacing.
* **D-NFR-2 (Dark/Light Theme):** System detection as default, overridden by client-side toggle persistent state saved in `localStorage`.

### 4.4 SEO & Discoverability
* **SEO-NFR-1 (Page Metadata):** Set descriptive HTML title tags, meta tags, and open graph schemas for all pages.
* **SEO-NFR-2 (Semantic HTML):** Use standard landmark tags (`<section>`, `<main>`, `<nav>`, `<footer>`) with correct hierarchy.

---

## 5. Technical Specifications

### 5.1 Environment Constraints
* **Language:** TypeScript 5.8+ (Strict Mode)
* **Build Engine:** Next.js 16.0+ (using Turbopack/Webpack)
* **Styling:** Tailwind CSS v4.0+ (using CSS-based configuration/utilities)

### 5.2 Codebase Organization
* `src/app/`: Next.js App Router layout and route definitions mapping URL paths to views.
* `src/components/`: Reusable interface blocks (e.g., Footer, Navigation, ThemeToggle, Preloader, and feature flags).
* `src/components/ui/`: Styled atoms based on design tokens (e.g., custom buttons, inputs, alerts).
* `src/views/`: Page view components (Home, Projects, Gallery, Blog, Resources).
* `src/data/`: Data dictionaries representing list values (experience, certificates, links).
* `src/context/`: Context engines managing global state (Theme states, Feature flags).
