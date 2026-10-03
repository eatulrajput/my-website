// https://youtu.be/VJVfWWdtJ4c?si=48WFYTfZ4TEdkGLP

type YoutubeVideoProps = {
  src: string;
};

export default function YoutubeVideo({ src }: YoutubeVideoProps) {
  return (
    <figure className="blog-youtube-figure">
      <div className="blog-youtube-container">
        {/* Inner Glass Bezel Reflection */}
        <div className="blog-youtube-bezel" />

        <div className="blog-youtube-wrapper">
          <iframe
            src={src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="blog-youtube-iframe"
          ></iframe>
        </div>
      </div>
    </figure>
  );
}
