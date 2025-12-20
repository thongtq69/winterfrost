'use client';

import { useState } from 'react';

type HeroMediaProps = {
  className?: string;
};

const HeroMedia = ({ className }: HeroMediaProps) => {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative aspect-[16/11] w-full overflow-hidden rounded-[32px] bg-gray-100 ${className ?? ''}`}
      aria-label="Hero media"
    >
      {!errored ? (
        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-semibold text-gray-500">
          Video hiện không tải được
        </div>
      )}
    </div>
  );
};

export default HeroMedia;
