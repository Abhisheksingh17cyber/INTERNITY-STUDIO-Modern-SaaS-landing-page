'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ImageWithLoader({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority = false,
  sizes,
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          'bg-charcoal flex items-center justify-center',
          fill ? 'absolute inset-0' : '',
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-charcoal-light flex items-center justify-center">
            <svg className="w-8 h-8 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs text-silver/30">Image</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', fill ? '' : 'inline-block')}>
      {/* Skeleton loader */}
      {!loaded && (
        <div
          className={cn(
            'absolute inset-0 bg-charcoal animate-pulse',
            fill ? '' : 'relative'
          )}
          style={!fill ? { width, height } : undefined}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn(
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        priority={priority}
        sizes={sizes || (fill ? '100vw' : undefined)}
      />
    </div>
  );
}
