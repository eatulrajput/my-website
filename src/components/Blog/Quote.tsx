interface QuoteProps {
  children: string;
}

export default function Quote({ children }: QuoteProps) {
  return (
    <blockquote className="blog-quote">
      <span className="blog-quote-icon">&quot;</span>
      <div className="blog-quote-content">{children}</div>
    </blockquote>
  );
}
