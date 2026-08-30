interface QuoteProps {
  children: string;
}

export default function Quote({ children }: QuoteProps) {
  return (
    <blockquote className="my-8 rounded-2xl border-l-4 border-l-brand-accent bg-neutral-100/60 dark:bg-neutral-900/40 py-6 px-8 text-lg md:text-xl italic leading-relaxed text-neutral-900 dark:text-neutral-100 shadow-xs relative overflow-hidden">
      <span className="absolute -left-2 -top-2 text-6xl text-brand-accent opacity-20 font-serif select-none">&quot;</span>
      <div className="relative z-10">{children}</div>
    </blockquote>
  );
}