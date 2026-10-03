import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "small";
  className?: string;
  children: React.ReactNode;
}

/**
 * A reusable Button component that standardizes the Apple-style pill button.
 * Can render as a Next.js <Link>, a standard <a> tag, or a <button>.
 */
export default function Button({
  href,
  external,
  variant = "small",
  className = "",
  children,
  ...props
}: ButtonProps) {
  let baseClass = "project-action-btn"; // 'small'

  if (variant === "primary") {
    baseClass = "btn-primary";
  } else if (variant === "secondary") {
    baseClass = "btn-secondary";
  }

  const combinedClass = `${baseClass} ${className}`.trim();

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
