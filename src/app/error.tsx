"use client";
import { useEffect } from "react";
import { IconAlertTriangle, IconRefresh, IconHome } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import "../css/error.css";

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
    <div className="error-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="error-card"
      >
        <div className="error-icon-container">
          <IconAlertTriangle size={32} />
        </div>

        <h1 className="error-title">Application Error</h1>

        <p className="error-subtitle">
          The application encountered an unexpected error and couldn't complete
          the request.
        </p>

        <div className="error-details">
          <p className="error-details-label">Error Details</p>
          <p className="error-details-text">{errorMessage}</p>
        </div>

        <div className="error-actions">
          <button onClick={() => reset()} className="error-btn-primary">
            <IconRefresh size={16} />
            Try Again
          </button>

          <Link href="/" className="error-btn-secondary">
            <IconHome size={16} />
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
