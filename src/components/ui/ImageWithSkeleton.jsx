import { useState } from 'react';

export default function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  skeletonClassName = '',
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Dark Shimmer Skeleton */}
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 z-0 bg-dark-surface/90 overflow-hidden ${skeletonClassName}`}
          aria-hidden="true"
        >
          {/* Subtle pulse base */}
          <div className="w-full h-full bg-white/[0.03] animate-pulse" />
          {/* Smooth diagonal shimmer wave */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-[-18deg]" />
        </div>
      )}

      {/* Target Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
}
