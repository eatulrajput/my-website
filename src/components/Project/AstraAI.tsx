"use client";

import {
  IconGlobe,
  IconStack,
  IconActivity,
  IconUsers,
} from "@tabler/icons-react";
import {
  ProjectHeader,
  ProjectFeatures,
  ProjectTechStack,
  ProjectCorePackages,
  TeamMembersSection,
  FeatureItem,
  PackageItem,
  TeamMember,
} from "./components";

const skills: string[] = [
  "Aceternity UI",
  "Lenis",
  "Motion",
  "Clerk",
  "React Markdown",
  "RAG Architecture",
  "Groq API",
  "Local LLMs",
];

const packages: PackageItem[] = [
  { name: "Aceternity UI", purpose: "Reusable React Components", url: "https://ui.aceternity.com/" },
  { name: "Lenis", purpose: "Smooth Scrolling", url: "https://www.lenis.dev/" },
  { name: "Motion", purpose: "Animation", url: "https://motion.dev/" },
  { name: "Clerk", purpose: "Authentication", url: "https://clerk.com/" },
  { name: "React Markdown", purpose: "Render Markdown", url: "https://www.npmjs.com/package/react-markdown" },
];

const teamMembers: TeamMember[] = [
  { username: "AritraBanerjee-09", role: "Frontend, Backend" },
  { username: "aryavats2", role: "Model Development" },
  { username: "eatulrajput", role: "Frontend, Backend" },
  { username: "itsjustharshhuu", role: "Testing, Documentation" },
].sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()));

const features: FeatureItem[] = [
  { icon: IconStack, label: "RAG Architecture", desc: "Combines vector retrieval with generation for context-aware responses." },
  { icon: IconGlobe, label: "Online & Local LLMs", desc: "High-throughput inference via Groq API alongside offline local LLMs." },
  { icon: IconActivity, label: "Web Scraping", desc: "Automated real-time extraction of course and university info." },
  { icon: IconUsers, label: "Academic Focus", desc: "Tailored prompt structures and UX for students & faculty." },
];

const AstraAI = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-left space-y-8">
      {/* Header */}
      <ProjectHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/project" },
          { label: "Astra AI" },
        ]}
        badgeText="Beta Mode • Academic Major Project (8th Semester)"
        title="Astra AI"
        description="A chatbot based upon RAG architecture, combining information retrieval with text generation for college students and professors."
        liveDemoUrl="https://astraui.netlify.app/"
      />

      {/* Project Overview */}
      <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h2 className="text-base font-semibold text-black dark:text-white tracking-tight font-sans">
          Project Overview
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            Astra AI is an intelligent assistant designed specifically for academic environments. Built on Retrieval-Augmented Generation (RAG) architecture, it combines custom vector knowledge retrieval with large language models to deliver precise contextual answers.
          </p>
          <p>
            The system supports both cloud LLM APIs (powered by Groq) and local LLM execution. Web scraping capabilities enable real-time factual lookups tailored to student coursework and institutional queries.
          </p>
        </div>
      </div>

      {/* Core Features */}
      <ProjectFeatures features={features} />

      {/* Technologies & Tools */}
      <ProjectTechStack skills={skills} />

      {/* Core Packages List */}
      <ProjectCorePackages packages={packages} />

      {/* Team Members */}
      <TeamMembersSection teamMembers={teamMembers} projectName="Astra AI (RAG Chatbot)" />
    </div>
  );
};

export default AstraAI;
