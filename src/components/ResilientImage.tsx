import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#F1F2F4] ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] p-6 text-center text-[#52525B]">
          <Package className="h-7 w-7 text-[#71717A]" strokeWidth={1.5} />
          <span className="max-w-[22ch] text-xs font-medium leading-snug text-[#3F3F46]">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
