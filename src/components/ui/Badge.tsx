import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "secondary" | "skill";
  className?: string;
}

/**
 * Reusable Badge component.
 * Maps standard generic variants to specific CSS classes.
 */
export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  let baseClass = "tech-badge";

  if (variant === "accent") {
    baseClass = "exp-skill-badge";
  } else if (variant === "secondary") {
    baseClass = "edu-badge";
  } else if (variant === "skill") {
    baseClass = "skill-item";
  }

  return <span className={`${baseClass} ${className}`.trim()}>{children}</span>;
}
