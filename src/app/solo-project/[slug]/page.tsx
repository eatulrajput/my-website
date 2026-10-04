import { redirect } from "next/navigation";

export default async function SoloProjectRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  redirect(`/project/${resolvedParams.slug}`);
}
