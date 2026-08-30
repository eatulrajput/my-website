"use client";

import {
  IconWorld,
  IconActivity,
  IconLayersIntersect,
  IconUsers,
  IconDeviceDesktopAnalytics,
  IconBrandGithub,
  IconRocket,
  IconTrophy,
} from "@tabler/icons-react";
import {
  ProjectHeader,
  ProjectFeatures,
  ProjectTechStack,
  ProjectLinks,
  TeamMembersSection,
  FeatureItem,
  ProjectLinkItem,
  TeamMember,
} from "./components";

const skills = [
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
];

const teamMembers: TeamMember[] = [
  { username: "AvilashaGoswami", role: "Team Member" },
  { username: "deephabiswashi", role: "Team Member" },
  { username: "eatulrajput", role: "GIS Developer" },
  { username: "GODSHADOW2004", role: "Team Member" },
  { username: "Sahi1l-Kumar", role: "Team Member" },
  { username: "SOUMYADEEPDUTTACODER", role: "Team Member" },
].sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()));

const features: FeatureItem[] = [
  { icon: IconWorld, label: "Remote Sensing", desc: "Analysis via NASA & ISRO geospatial datasets" },
  { icon: IconActivity, label: "Public Health", desc: "Mapping sanitation & healthcare vulnerability risks" },
  { icon: IconLayersIntersect, label: "Data Visualization", desc: "Interactive multi-layered GIS maps" },
  { icon: IconUsers, label: "Community First", desc: "Empowering data-driven equitable urban development" },
];

const projectLinks: ProjectLinkItem[] = [
  { title: "Project Website", url: "https://dharavi-web-map.netlify.app/", icon: IconWorld },
  { title: "Presentation", url: "https://docs.google.com/presentation/d/1Ht128-SaqYaHZV3-CFgcKFBhyaRLs-Lo/edit#slide=id.p7", icon: IconDeviceDesktopAnalytics },
  { title: "GitHub Repository", url: "https://github.com/Sahi1l-Kumar/dharavi-web-map", icon: IconBrandGithub },
  { title: "NASA Space App Challenge", url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/challenges/community-mapping/", icon: IconRocket },
  { title: "NASA Team Page", url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/event-horizon1/", icon: IconTrophy },
];

const ProjectCommunityMapping = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-left space-y-8">
      {/* Header */}
      <ProjectHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/project" },
          { label: "Community Mapping" },
        ]}
        badgeText="NASA Space Apps Challenge 2024"
        title="Community Mapping for Resilience"
        description="A Spatial Analysis of Dharavi — Using satellite imagery and community-sourced data to create interactive visualizations that identify vulnerable areas and highlight opportunities for targeted interventions."
        liveDemoUrl="https://dharavi-web-map.netlify.app/"
      />

      {/* Project Overview */}
      <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h2 className="text-base font-semibold text-black dark:text-white tracking-tight font-sans">
          Project Overview
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            A web-based spatial analysis platform developed for the NASA Space Apps Challenge 2024 to map Dharavi’s infrastructure, public health risks, and socio-economic conditions. Using NASA and ISRO geospatial datasets, the tool visualizes sanitation, healthcare, and redevelopment zones through interactive map layers—empowering communities, planners, and NGOs with data-driven insights for equitable urban development.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <ProjectFeatures features={features} />

      {/* Technologies & Tools */}
      <ProjectTechStack skills={skills} />

      {/* Project Links */}
      <ProjectLinks links={projectLinks} />

      {/* Team Members */}
      <TeamMembersSection teamMembers={teamMembers} projectName="Community Mapping for Resilience" />
    </div>
  );
};

export default ProjectCommunityMapping;
