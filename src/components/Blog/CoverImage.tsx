type Props = {
  src?: string;
  alt?: string;
};

export default function CoverImage({ src, alt = "Cover image" }: Props) {
  if (!src) return null;
  
  return (
    <div className="my-10 w-full relative">
      <div className="relative w-full overflow-hidden rounded-[2rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto max-h-[60vh] object-cover"
          loading="eager"
        />
      </div>
    </div>
  );
}
