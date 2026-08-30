import { ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({
  content,
  children,
  position = "top",
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      <div
        className={`
          absolute z-50
          rounded-lg
          bg-brand-midnight dark:bg-neutral-900
          border border-neutral-800/20 dark:border-neutral-700/40
          px-3 py-2
          text-sm font-medium
          text-brand-cream dark:text-brand-apricot
          whitespace-nowrap
          shadow-lg
          transition-all duration-200
          ${positions[position]}
          ${
            visible
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;