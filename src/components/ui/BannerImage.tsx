import React from 'react';

interface BannerImageProps {
  alt?: string;
  className?: string;
}

const BannerImage: React.FC<BannerImageProps> = ({ alt = "Banner", className = "" }) => {
  return (
    <div className={`group relative h-24 sm:h-32 w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-amber-glow-500/10 via-light-sea-green-500/10 to-transparent flex items-center justify-center font-mono text-xs text-neutral-500 ${className}`}>
      <span>[BANNER // {alt.toUpperCase()}]</span>
    </div>
  );
};

export default BannerImage;
