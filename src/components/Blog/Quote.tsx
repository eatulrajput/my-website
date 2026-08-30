interface QuoteProps {
    children: string;
}

export default function Quote({ children }: QuoteProps) {
  return (
    <blockquote className="my-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-900 border-l-4 border-l-brand-apricot dark:border-l-brand-apricot bg-brand-apricot/10 dark:bg-brand-apricot/5 py-6 px-8 text-lg md:text-xl italic leading-relaxed text-neutral-900 dark:text-neutral-100 shadow-sm relative overflow-hidden">
      <span className="absolute -left-2 -top-2 text-6xl text-brand-apricot/25 dark:text-brand-apricot/15 font-serif select-none">"</span>
      <div className="relative z-10">{children}</div>
    </blockquote>
  );
}