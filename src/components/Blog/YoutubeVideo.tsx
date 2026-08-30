// https://youtu.be/VJVfWWdtJ4c?si=48WFYTfZ4TEdkGLP

type YoutubeVideoProps = {
  src: string;
};

export default function YoutubeVideo({ src }: YoutubeVideoProps) {
  return (
    <div className="my-10 aspect-video w-full overflow-hidden rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800">
      <iframe
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-none"
      ></iframe>
    </div>
  );
}
