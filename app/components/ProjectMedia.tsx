"use client";

import { useState } from "react";

interface ProjectMediaProps {
  src?: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  /** cover = cropped preview (lists); contain = full screenshot (detail) */
  fit?: "cover" | "contain";
}

export default function ProjectMedia({
  src,
  alt,
  fallbackLabel,
  className = "",
  fit = "cover",
}: ProjectMediaProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  if (fit === "contain") {
    return (
      <div
        className={`rounded-[12px] border border-[var(--border)] bg-[var(--surface-2)] p-3 sm:p-4 md:p-5 ${className}`}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="mx-auto block h-auto w-full max-h-[min(64vh,640px)] rounded-[8px] object-contain object-top"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="grid min-h-[16rem] place-items-center px-6 text-center">
            <p className="text-sm text-[var(--muted)]">{fallbackLabel}</p>
          </div>
        )}
      </div>
    );
  }

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
