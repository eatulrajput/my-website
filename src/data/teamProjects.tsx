/**
 * teamProjects.tsx
 *
 * This file serves as the central data repository for all team-based projects.
 * It maps project slugs (e.g., "astra-ai") to their comprehensive details,
 * including descriptions, features, tech stacks, team contributions, and media links,
 * powering the dynamic project detail pages.
 */

import {
  IconGlobe,
  IconStack,
  IconActivity,
  IconUsers,
  IconWorld,
  IconLayersIntersect,
  IconDeviceDesktopAnalytics,
  IconBrandGithub,
  IconRocket,
  IconTrophy,
} from "@tabler/icons-react";
import { ProjectDetailProps } from "@/components/Project/ProjectDetailTemplate";

export const teamProjects: Record<string, ProjectDetailProps> = {
  "astra-ai": {
    slug: "astra-ai",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/project" },
      { label: "Astra AI" },
    ],
    badgeText: "Beta Mode • Academic Major Project (8th Semester)",
    title: "Astra AI",
    description:
      "A chatbot based upon RAG architecture, combining information retrieval with text generation for college students and professors.",
    liveDemoUrl: "https://astraui.netlify.app/",
    projectOverview: (
      <div className="space-y-4">
        <p>
          Astra AI is an intelligent assistant designed specifically for
          academic environments. Built on Retrieval-Augmented Generation (RAG)
          architecture, it combines custom vector knowledge retrieval with large
          language models to deliver precise contextual answers.
        </p>
        <p>
          The system supports both cloud LLM APIs (powered by Groq) and local
          LLM execution. Web scraping capabilities enable real-time factual
          lookups tailored to student coursework and institutional queries.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconStack,
        label: "RAG Architecture",
        desc: "Combines vector retrieval with generation for context-aware responses.",
      },
      {
        icon: IconGlobe,
        label: "Online & Local LLMs",
        desc: "High-throughput inference via Groq API alongside offline local LLMs.",
      },
      {
        icon: IconActivity,
        label: "Web Scraping",
        desc: "Automated real-time extraction of course and university info.",
      },
      {
        icon: IconUsers,
        label: "Academic Focus",
        desc: "Tailored prompt structures and UX for students & faculty.",
      },
    ],
    skills: [
      "Aceternity UI",
      "Lenis",
      "Motion",
      "Clerk",
      "React Markdown",
      "RAG Architecture",
      "Groq API",
      "Local LLMs",
    ],
    packages: [
      {
        name: "Aceternity UI",
        purpose: "Reusable React Components",
        url: "https://ui.aceternity.com/",
      },
      {
        name: "Lenis",
        purpose: "Smooth Scrolling",
        url: "https://www.lenis.dev/",
      },
      { name: "Motion", purpose: "Animation", url: "https://motion.dev/" },
      { name: "Clerk", purpose: "Authentication", url: "https://clerk.com/" },
      {
        name: "React Markdown",
        purpose: "Render Markdown",
        url: "https://www.npmjs.com/package/react-markdown",
      },
    ],
    teamMembers: [
      { username: "AritraBanerjee-09", role: "Frontend, Backend" },
      { username: "aryavats2", role: "Model Development" },
      { username: "eatulrajput", role: "Frontend, Backend" },
      { username: "itsjustharshhuu", role: "Testing, Documentation" },
    ].sort((a, b) =>
      a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
    ),
  },
  "community-mapping": {
    slug: "community-mapping",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/project" },
      { label: "Community Mapping" },
    ],
    badgeText: "NASA Space Apps Challenge 2024",
    title: "Community Mapping for Resilience",
    description:
      "A Spatial Analysis of Dharavi — Using satellite imagery and community-sourced data to create interactive visualizations that identify vulnerable areas and highlight opportunities for targeted interventions.",
    liveDemoUrl: "https://dharavi-web-map.netlify.app/",
    projectOverview: (
      <div className="space-y-4">
        <p>
          A web-based spatial analysis platform developed for the NASA Space
          Apps Challenge 2024 to map Dharavi’s infrastructure, public health
          risks, and socio-economic conditions.
        </p>
        <p>
          Using NASA and ISRO geospatial datasets, the tool visualizes
          sanitation, healthcare, and redevelopment zones through interactive
          map layers—empowering communities, planners, and NGOs with data-driven
          insights for equitable urban development.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconWorld,
        label: "Remote Sensing",
        desc: "Analysis via NASA & ISRO geospatial datasets",
      },
      {
        icon: IconActivity,
        label: "Public Health",
        desc: "Mapping sanitation & healthcare vulnerability risks",
      },
      {
        icon: IconLayersIntersect,
        label: "Data Visualization",
        desc: "Interactive multi-layered GIS maps",
      },
      {
        icon: IconUsers,
        label: "Community First",
        desc: "Empowering data-driven equitable urban development",
      },
    ],
    skills: [
      "GIS",
      "Remote Sensing",
      "React",
      "JavaScript",
      "Google Maps API",
      "OpenStreetMap",
      "Material-UI",
      "Vite",
      "NASA Earth Observations",
      "ISRO Bhuvan",
      "Sentinel EO Browser",
      "ArcGIS",
      "QGIS",
      "Git",
      "GitHub",
    ],
    links: [
      {
        title: "Project Website",
        url: "https://dharavi-web-map.netlify.app/",
        icon: IconWorld,
      },
      {
        title: "Presentation",
        url: "https://docs.google.com/presentation/d/1Ht128-SaqYaHZV3-CFgcKFBhyaRLs-Lo/edit#slide=id.p7",
        icon: IconDeviceDesktopAnalytics,
      },
      {
        title: "GitHub Repository",
        url: "https://github.com/Sahi1l-Kumar/dharavi-web-map",
        icon: IconBrandGithub,
      },
      {
        title: "NASA Space App Challenge",
        url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/challenges/community-mapping/",
        icon: IconRocket,
      },
      {
        title: "NASA Team Page",
        url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/event-horizon1/",
        icon: IconTrophy,
      },
    ],
    teamMembers: [
      { username: "AvilashaGoswami", role: "Team Member" },
      { username: "deephabiswashi", role: "Team Member" },
      { username: "eatulrajput", role: "GIS Developer" },
      { username: "GODSHADOW2004", role: "Team Member" },
      { username: "Sahi1l-Kumar", role: "Team Member" },
      { username: "SOUMYADEEPDUTTACODER", role: "Team Member" },
    ].sort((a, b) =>
      a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
    ),
  },
};
