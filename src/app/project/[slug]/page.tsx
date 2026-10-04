import { notFound } from "next/navigation";
import ProjectDetailTemplate from "@/components/Project/ProjectDetailTemplate";
import SoloProjectDetailTemplate from "@/components/Project/SoloProjectDetailTemplate";
import { teamProjects } from "@/data/teamProjects";
import { soloProjects } from "@/data/soloProjects";
import { Metadata } from "next";

export function generateStaticParams() {
  const teamSlugs = Object.keys(teamProjects);
  const soloSlugs = Object.keys(soloProjects);
  return [...teamSlugs, ...soloSlugs].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project =
    teamProjects[resolvedParams.slug] || soloProjects[resolvedParams.slug];
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (teamProjects[slug]) {
    return <ProjectDetailTemplate slug={slug} />;
  }

  if (soloProjects[slug]) {
    return <SoloProjectDetailTemplate slug={slug} />;
  }

  notFound();
}
