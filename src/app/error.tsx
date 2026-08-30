"use client";
import { useEffect } from "react";
import { IconAlertTriangle, IconRefresh, IconHome } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ErrorBoundary caught error:", error);
  }, [error]);

  const errorMessage = error?.message || "An unexpected error occurred.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfeff] px-6 text-center dark:bg-black dark:text-neutral-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl rounded-3xl border border-neutral-100 bg-neutral-50/30 p-8 shadow-sm dark:border-neutral-900/40 dark:bg-neutral-900/10 md:p-12"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/20">
          <IconAlertTriangle className="size-8" />
        </div>

        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Application Error
        </h1>
        
        <p className="mb-6 text-neutral-600 dark:text-neutral-400 font-medium">
          The application encountered an unexpected error and couldn't complete the request.
        </p>

        <div className="mb-8 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-left dark:border-neutral-900 dark:bg-neutral-950/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Error Details
          </p>
          <p className="mt-1 font-mono text-sm text-red-500 dark:text-red-400 break-words">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            <IconRefresh className="size-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <IconHome className="size-4" />
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
