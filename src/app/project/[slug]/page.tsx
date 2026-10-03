import { notFound } from "next/navigation";
import ProjectDetailTemplate from "@/components/Project/ProjectDetailTemplate";
import { teamProjects } from "@/data/teamProjects";
import { Metadata } from "next";

export function generateStaticParams() {
  return Object.keys(teamProjects).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = teamProjects[resolvedParams.slug];
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
  const project = teamProjects[resolvedParams.slug];

  if (!project) {
    notFound();
  }

  return <ProjectDetailTemplate slug={project.slug} />;
}
