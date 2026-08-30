import React from 'react';

interface RotatingAvatarProps {
  altText?: string;
  className?: string;
}

const RotatingAvatar: React.FC<RotatingAvatarProps> = ({ className = "" }) => {
  return (
    <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-amber-glow-500 bg-neutral-900 text-frozen-water font-mono font-bold text-xl shadow-lg ${className}`}>
      <span>AR</span>
    </div>
  );
};

export default RotatingAvatar;
