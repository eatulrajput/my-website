import Link from "next/link";
import { IconTerminal2, IconFolder } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mt-10 mb-6 flex justify-start select-none"
    >
      <div
        className={cn(
          "flex items-center gap-2.5 font-mono text-xs md:text-sm px-4 py-2 rounded-xl border backdrop-blur-sm transition-colors duration-300",
          "bg-neutral-50/50 border-neutral-300/40 text-neutral-600",
          "dark:bg-[#121318]/50 dark:border-neutral-800/40 dark:text-neutral-400",
        )}
      >
        {/* Terminal Icon Prefix */}
        <IconTerminal2 className="size-4 shrink-0 text-brand-accent" />

        <ol className="flex items-center flex-wrap gap-1.5 leading-none">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isHome = index === 0;

            const labelText =
              isHome &&
              (item.label.toLowerCase() === "home" || item.label === "~")
                ? "~"
                : item.label.toLowerCase();

            return (
              <li key={index} className="flex items-center gap-1.5">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 hover:underline transition-colors font-bold",
                      isHome
                        ? "text-brand-accent"
                        : "text-neutral-800 dark:text-neutral-200 hover-text-brand-accent",
                    )}
                  >
                    {!isHome && (
                      <IconFolder className="size-3.5 opacity-60 text-brand-accent" />
                    )}
                    <span>{labelText}</span>
                  </Link>
                ) : (
                  <span
                    className="flex items-center gap-1 text-neutral-900 dark:text-neutral-100 font-semibold truncate max-w-[150px] sm:max-w-xs"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {!isHome && (
                      <IconFolder className="size-3.5 opacity-80 text-brand-accent" />
                    )}
                    <span>{labelText}</span>
                  </span>
                )}

                {!isLast && (
                  <span className="text-neutral-400 dark:text-neutral-600 font-normal">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
