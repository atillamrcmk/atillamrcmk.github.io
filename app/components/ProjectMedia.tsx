"use client";

import { useState } from "react";

interface ProjectMediaProps {
  src?: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
}

export default function ProjectMedia({
  src,
  alt,
  fallbackLabel,
  className = "",
}: ProjectMediaProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`project-cover relative aspect-[16/10] overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)] ${className}`}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-6 text-center bg-[var(--surface-2)]">
          <p className="text-sm text-[var(--muted)]">{fallbackLabel}</p>
        </div>
      )}
    </div>
  );
}
