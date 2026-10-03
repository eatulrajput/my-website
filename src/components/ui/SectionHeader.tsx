import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p
          className="section-subtitle"
          style={{
            fontSize: "1rem",
            margin: 0,
            color: "var(--text-secondary)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
