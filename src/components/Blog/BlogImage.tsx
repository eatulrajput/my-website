type Props = {
  src?: string;
  alt?: string;
};

export default function BlogImage({ src, alt = "Blog image" }: Props) {
  if (!src) return null;
  return (
    <figure className="my-10 flex flex-col items-center w-full">
      <div className="relative w-full overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      {alt !== "Blog image" && (
        <figcaption className="mt-3 text-center font-mono text-xs text-neutral-500 dark:text-neutral-400">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}