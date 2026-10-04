/**
 * soloProjects.tsx
 *
 * Central data repository for all solo engineering projects, tools, and prototypes.
 * Powers the Solo Projects page and individual solo project detail pages.
 */

import {
  IconClock,
  IconBrandGithub,
  IconStethoscope,
  IconAdjustmentsCheck,
  IconTestPipe,
  IconBrandDiscord,
  IconCloud,
  IconCalculator,
  IconCpu,
  IconTerminal2,
  IconCode,
  IconWorld,
  IconDeviceDesktop,
  IconDatabase,
  IconBrandPython,
  IconAutomation,
  IconActivity,
  IconSparkles,
} from "@tabler/icons-react";
import { ProjectDetailProps } from "@/components/Project/ProjectDetailTemplate";

export interface SoloProjectItem extends ProjectDetailProps {
  codeLink?: string;
  bannerImage?: string;
  images?: string[];
  category: "desktop" | "web" | "ai" | "automation" | "challenge" | "mobile" | "tool";
  status: "Completed" | "In Progress";
  date: string;
}

export const soloProjects: Record<string, SoloProjectItem> = {
  clock: {
    slug: "clock",
    category: "desktop",
    status: "In Progress",
    date: "Jan 2026",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Clock App" },
    ],
    badgeText: "Desktop Utility • Tauri & TypeScript",
    title: "Clock Desktop Application ( Work In Progress )",
    description:
      "A minimalist, lightweight desktop clock and productivity timer engineered using Tauri and TypeScript for low memory footprint and seamless system integration.",
    liveDemoUrl: "",
    codeLink: "https://github.com/eatulrajput",
    bannerImage: "/images/clock/clock.png",
    images: [
      "",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          The Clock Desktop Application is designed to deliver a modern, distraction-free time tracking and countdown experience right on your desktop operating system.
        </p>
        <p>
          Leveraging Rust-backed Tauri for rendering native OS windows with negligible RAM consumption, it features a fluid dark theme, customizable alarm alerts, world time zones, and Pomodoro productivity session timers.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconClock,
        label: "Precision Timekeeping",
        desc: "High-precision timer rendering with microsecond accuracy.",
      },
      {
        icon: IconDeviceDesktop,
        label: "Native Performance",
        desc: "Built with Tauri and Rust frontend bindings for minimal memory usage.",
      },
      {
        icon: IconAdjustmentsCheck,
        label: "Customizable Themes",
        desc: "Supports glassmorphism styling, compact overlay mode, and custom presets.",
      },
      {
        icon: IconAutomation,
        label: "Pomodoro Sessions",
        desc: "Integrated interval timers with audio cues and session telemetry.",
      },
    ],
    skills: ["TypeScript", "Tauri", "Rust", "React", "CSS Modules", "Tailwind CSS"],
    packages: [
      { name: "Tauri CLI", purpose: "Native OS Windowing & IPC", url: "https://tauri.app" },
      { name: "Lucide React", purpose: "Clean iconography", url: "https://lucide.dev" },
      { name: "Zustand", purpose: "Lightweight state management", url: "https://github.com/pmndrs/zustand" },
    ],
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/eatulrajput/clock",
        icon: IconBrandGithub,
      },
    ],
  },

  "git-pie": {
    slug: "git-pie",
    category: "web",
    status: "Completed",
    date: "Jan 2026",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Git Pie" },
    ],
    badgeText: "Web Tool • GitHub Pages Finder",
    title: "Git Pie",
    description:
      "A GitHub utility tracking tool designed to compile, inspect, and discover live hosted GitHub Pages links for any user or organization instantly.",
    liveDemoUrl: "https://gitpie.netlify.app/",
    codeLink: "https://github.com/eatulrajput/github-page-tracker",
    bannerImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          Git Pie eliminates the manual chore of searching through public GitHub repositories to locate live deployments and GitHub Pages URLs.
        </p>
        <p>
          By querying GitHub REST APIs and analyzing CNAME records, gh-pages branches, and build configs, Git Pie generates a clean visual dashboard of all active hosted sites associated with any given profile.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconBrandGithub,
        label: "GitHub API Search",
        desc: "Instant scanning of public repositories for active GitHub Pages status.",
      },
      {
        icon: IconWorld,
        label: "Direct Link Resolution",
        desc: "Detects custom domains and default github.io endpoints automatically.",
      },
      {
        icon: IconTerminal2,
        label: "Batch Exporting",
        desc: "Allows downloading compiled link lists in JSON and Markdown formats.",
      },
    ],
    skills: ["JavaScript", "GitHub API", "HTML5", "CSS3", "Netlify"],
    packages: [
      { name: "@octokit/rest", purpose: "GitHub REST API client", url: "https://github.com/octokit/rest.js" },
    ],
    links: [
      {
        title: "Live Application",
        url: "https://gitpie.netlify.app/",
        icon: IconWorld,
      },
      {
        title: "Source Code",
        url: "https://github.com/eatulrajput/github-page-tracker",
        icon: IconBrandGithub,
      },
    ],
  },

  "test-forge": {
    slug: "test-forge",
    category: "tool",
    status: "Completed",
    date: "Apr 2025",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Test Forge" },
    ],
    badgeText: "DevTools • Automated C++ Unit Test Generator",
    title: "Test Forge",
    description:
      "An automated unit test generator developed to build Google Test (gtest) suites for complex C++ codebases using LLMs and static code analysis.",
    liveDemoUrl: "",
    codeLink: "https://github.com/eatulrajput/TestForge",
    bannerImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          Test Forge streamlines software quality assurance for C++ engineers by auto-generating complete Google Test files directly from class definitions and header files.
        </p>
        <p>
          It parses Abstract Syntax Trees (AST) and header signatures, constructs edge-case test vectors via high-speed LLM inference (Groq API), and validates test syntax through automated GitHub Actions CI/CD workflows.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconTestPipe,
        label: "Google Test Suite Generation",
        desc: "Outputs ready-to-compile gtest C++ files with mock assertions.",
      },
      {
        icon: IconCpu,
        label: "Groq LLM Acceleration",
        desc: "Sub-second inference for deep code understanding and boundary testing.",
      },
      {
        icon: IconCode,
        label: "AST & Header Parsing",
        desc: "Extracts parameter types, const qualifiers, and namespace structures.",
      },
      {
        icon: IconAutomation,
        label: "CI/CD Integration",
        desc: "Includes GitHub Actions workflows for continuous test validation.",
      },
    ],
    skills: [
      "Python (FastAPI)",
      "C++",
      "Groq API",
      "YAML",
      "Google Test",
      "GitHub Actions",
    ],
    packages: [
      { name: "FastAPI", purpose: "High-performance Python backend", url: "https://fastapi.tiangolo.com" },
      { name: "Groq SDK", purpose: "Ultra-fast LLM API client", url: "https://groq.com" },
    ],
    links: [
      {
        title: "Source Code & Docs",
        url: "https://github.com/eatulrajput/TestForge",
        icon: IconBrandGithub,
      },
    ],
  },

  workflow: {
    slug: "workflow",
    category: "automation",
    status: "In Progress",
    date: "Jun 2025",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Workflow Automation" },
    ],
    badgeText: "AI Hackathon • n8n & Agentic Orchestration",
    title: "Agentic Workflow Automation Platform",
    description:
      "An n8n and Python based autonomous agent workflow engine developed for the Product Space AI Hackathon to automate multi-step data pipelines.",
    liveDemoUrl: "",
    codeLink: "https://github.com/eatulrajput",
    bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          Developed for the Product Space AI Hackathon, this workflow engine connects n8n node orchestrations with custom Python FastAPI agents.
        </p>
        <p>
          It executes complex multi-step routines such as automated web scraping, content summarization, Slack/Discord notifications, and database syncing without human intervention.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconAutomation,
        label: "n8n Integration",
        desc: "Low-code node pipelines paired with custom Python script execution.",
      },
      {
        icon: IconSparkles,
        label: "Agentic Decision Loops",
        desc: "LLM agents self-evaluate outputs and handle pipeline exceptions.",
      },
      {
        icon: IconDatabase,
        label: "Webhooks & Sync",
        desc: "Real-time trigger endpoints and persistent data logging.",
      },
    ],
    skills: ["Python", "n8n", "FastAPI", "Docker", "REST APIs"],
    packages: [
      { name: "n8n", purpose: "Workflow automation tool", url: "https://n8n.io" },
      { name: "FastAPI", purpose: "Backend API framework", url: "https://fastapi.tiangolo.com" },
    ],
    links: [
      {
        title: "GitHub Profile",
        url: "https://github.com/eatulrajput",
        icon: IconBrandGithub,
      },
    ],
  },

  crato: {
    slug: "crato",
    category: "mobile",
    status: "In Progress",
    date: "Aug 2025",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Crato" },
    ],
    badgeText: "MIT HackNation Hackathon • Healthcare Prototype",
    title: "Crato Healthcare Platform",
    description:
      "A fast-response healthcare mobile app prototype engineered under strict 24-hour hackathon constraints during MIT HackNation.",
    liveDemoUrl: "",
    codeLink: "https://github.com/eatulrajput/crato",
    bannerImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          Crato was created to streamline emergency medical triage and patient health monitoring during the MIT HackNation hackathon.
        </p>
        <p>
          The web application connects patients with emergency services, displays nearby clinic availability, and provides AI-powered preliminary symptom analysis.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconStethoscope,
        label: "Health Triage",
        desc: "Symptom checker providing immediate severity recommendations.",
      },
      {
        icon: IconActivity,
        label: "Emergency Map",
        desc: "Geolocation mapping of open healthcare facilities.",
      },
    ],
    skills: ["React", "JavaScript", "REST APIs", "Tailwind CSS"],
    packages: [
      { name: "React", purpose: "UI component library", url: "https://react.dev" },
    ],
    links: [
      {
        title: "Source Code",
        url: "https://github.com/eatulrajput/crato",
        icon: IconBrandGithub,
      },
    ],
  },

  hapocalypse: {
    slug: "hapocalypse",
    category: "ai",
    status: "In Progress",
    date: "Dec 2024",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Hapocalypse" },
    ],
    badgeText: "MLSA Hackocalypse • AI Submission",
    title: "Hapocalypse AI",
    description:
      "An intelligent AI-powered interactive solution created for the Microsoft Learn Student Ambassadors (MLSA) Hackocalypse at KIIT University.",
    liveDemoUrl: "",
    codeLink: "https://github.com/eatulrajput",
    bannerImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          Hapocalypse combines natural language processing with interactive Streamlit interfaces to process complex text streams and deliver structured insight summaries.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconSparkles,
        label: "OpenAI Models",
        desc: "Custom prompt templates for reasoning and classification.",
      },
      {
        icon: IconBrandPython,
        label: "Streamlit UI",
        desc: "Rapid deployment of reactive data widgets.",
      },
    ],
    skills: ["Python", "OpenAI API", "Streamlit", "Pandas"],
    packages: [
      { name: "Streamlit", purpose: "Interactive data dashboard", url: "https://streamlit.io" },
    ],
    links: [
      {
        title: "GitHub Profile",
        url: "https://github.com/eatulrajput",
        icon: IconBrandGithub,
      },
    ],
  },

  "harmony-bot": {
    slug: "harmony-bot",
    category: "ai",
    status: "Completed",
    date: "Oct - Nov 2024",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Harmony Bot" },
    ],
    badgeText: "Women Techmakers Hackathon • Discord Bot",
    title: "Harmony Bot",
    description:
      "An automated Discord community management and AI assistant bot built for the Women Techmakers She Builds AI hackathon.",
    liveDemoUrl: "",
    codeLink: "https://github.com/eatulrajput",
    bannerImage: "https://images.unsplash.com/photo-1614680376593-902f749f7edc?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1614680376593-902f749f7edc?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          Harmony Bot provides automated moderation, sentiment analysis, and intelligent conversation responses for developer communities on Discord.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconBrandDiscord,
        label: "Discord API Integration",
        desc: "Slash commands, message event listeners, and automated role management.",
      },
      {
        icon: IconSparkles,
        label: "AI Conversation Engine",
        desc: "Powered by OpenAI GPT models for answering community questions.",
      },
    ],
    skills: ["Python", "Discord.py", "OpenAI API", "AsyncIO"],
    packages: [
      { name: "discord.py", purpose: "Discord API wrapper for Python", url: "https://discordpy.readthedocs.io" },
    ],
    links: [
      {
        title: "GitHub Profile",
        url: "https://github.com/eatulrajput",
        icon: IconBrandGithub,
      },
    ],
  },

  "weather-app": {
    slug: "weather-app",
    category: "web",
    status: "Completed",
    date: "Apr - Jun 2024",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Weather App" },
    ],
    badgeText: "GDSC Solution Challenge 2024",
    title: "Weather Intelligence App",
    description:
      "A fast, responsive weather dashboard fetching real-time meteorological metrics, forecasts, and air quality indices via OpenWeather APIs.",
    liveDemoUrl: "https://developers.google.com/community/gdsc-solution-challenge",
    codeLink: "https://github.com/eatulrajput",
    bannerImage: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          Developed as part of the Google Developer Student Clubs Solution Challenge, this weather platform provides clean visual representations of humidity, UV index, wind vectors, and multi-day forecasts.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconCloud,
        label: "Live OpenWeather Integration",
        desc: "Fetches hourly and daily forecasts with low latency.",
      },
      {
        icon: IconWorld,
        label: "Geolocation Detection",
        desc: "Automatically centers weather data based on browser location.",
      },
    ],
    skills: ["JavaScript", "OpenWeather API", "HTML5", "CSS3"],
    packages: [],
    links: [
      {
        title: "GDSC Challenge Info",
        url: "https://developers.google.com/community/gdsc-solution-challenge",
        icon: IconWorld,
      },
    ],
  },

  "calculator-app": {
    slug: "calculator-app",
    category: "mobile",
    status: "Completed",
    date: "Mar 2024",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solo Projects", href: "/solo-projects" },
      { label: "Calculator App" },
    ],
    badgeText: "Android Studio • Lab Project",
    title: "Android Calculator App",
    description:
      "A native Android calculator application built with Java and XML layout designs during the Application Development Laboratory.",
    liveDemoUrl: "",
    codeLink: "https://github.com/eatulrajput/android_app/tree/master/calculator_app",
    bannerImage: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1200&q=80",
    ],
    projectOverview: (
      <div className="space-y-4">
        <p>
          A clean, native Android application that handles basic and scientific mathematical evaluation with memory retention and clear history logging.
        </p>
      </div>
    ),
    features: [
      {
        icon: IconCalculator,
        label: "Native Java Engine",
        desc: "Fast mathematical parsing using native Android stack.",
      },
    ],
    skills: ["Java", "Android Studio", "XML Layouts"],
    packages: [],
    links: [
      {
        title: "Source Code",
        url: "https://github.com/eatulrajput/android_app/tree/master/calculator_app",
        icon: IconBrandGithub,
      },
    ],
  },
};
