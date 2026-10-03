"use client";
import { Suspense } from "react";
import Blog from "@/views/BlogList";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-neutral-400">
          Loading articles...
        </div>
      }
    >
      <Blog categoryFilter="non-tech" breadcrumbLabel="Personal Journal" />
    </Suspense>
  );
}
