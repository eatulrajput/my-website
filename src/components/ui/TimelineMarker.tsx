export function TimelineMarker() {
  return (
    <span
      aria-hidden="true"
      className="absolute -left-[9px] mt-7 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 transition duration-300 group-hover:border-brand-apricot"
    >
      <span className="h-2 w-2 rounded-full bg-brand-apricot animate-ping absolute" />
      <span className="h-2.5 w-2.5 rounded-full bg-brand-apricot" />
    </span>
  );
}