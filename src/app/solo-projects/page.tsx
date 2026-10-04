import { Metadata } from "next";
import SoloProjectsView from "@/views/SoloProjectsView";

export const metadata: Metadata = {
  title: "Solo Projects | Atul Rajput",
  description:
    "Independent engineering projects, desktop applications, workflows, and developer tools.",
};

export default function SoloProjectsPage() {
  return <SoloProjectsView />;
}
