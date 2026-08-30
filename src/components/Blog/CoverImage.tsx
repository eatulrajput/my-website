type Props = {
  src?: string;
  alt?: string;
};

export default function CoverImage({ alt }: Props) {
  if (!alt) return null;
  return (
    <div className="my-8 w-full rounded-2xl p-6 bg-neutral-900 border border-neutral-800 text-frozen-water font-mono text-sm shadow-sm">
      <span className="text-amber-glow font-bold block mb-1">ARTICLE TAKEAWAY</span>
      <p className="text-neutral-300 italic">{alt}</p>
    </div>
  );
}
