"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getCvUrl, hasCv } from "@/lib/constants/cv";
import { SOCIAL, mailtoUrl } from "@/lib/constants/site";
import { safeHref } from "@/lib/utils/format";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

function SocialLinks({
  github,
  linkedin,
  email,
}: {
  github?: string;
  linkedin?: string;
  email: string;
}) {
  const items = [
    github ? { href: github, label: "GitHub", external: true } : null,
    linkedin ? { href: linkedin, label: "LinkedIn", external: true } : null,
    { href: email, label: "Email", external: false },
  ].filter(Boolean) as Array<{ href: string; label: string; external: boolean }>;

  return (
    <ul className="hero-social flex flex-wrap items-center gap-2 sm:gap-3 list-none m-0 p-0">
      {items.map((item, i) => (
        <li key={item.label} className="flex items-center gap-2 sm:gap-3">
          {i > 0 && (
            <span className="text-[var(--border)] select-none" aria-hidden>
              ·
            </span>
          )}
          <a
            href={item.href}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-center min-h-11 px-1 text-[0.95rem] sm:text-base font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProfilePortrait({
  alt,
  failed,
  onFail,
}: {
  alt: string;
  failed: boolean;
  onFail: () => void;
}) {
  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] mx-auto lg:mx-0 aspect-[3/4] overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface-2)]">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/profile-photo.jpg"
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
          loading="eager"
          decoding="async"
          onError={onFail}
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center text-3xl font-bold tracking-widest text-[var(--muted)]"
          aria-hidden
        >
          AM
        </div>
      )}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg)]/85 px-2.5 py-1 text-xs text-[var(--muted)] backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        Online
      </div>
    </div>
  );
}

export default function Hero({ locale, dict }: HeroProps) {
  const cvUrl = getCvUrl(locale);
  const showCv = hasCv(locale);
  const github = safeHref(SOCIAL.github);
  const linkedin = safeHref(SOCIAL.linkedin);
  const email = mailtoUrl();
  const lines = dict.hero.heading.split("\n");
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="hero" className="hero pb-14 md:pb-20" aria-labelledby="hero-heading">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 sm:gap-10 lg:gap-16 items-start">
        {/* Copy column */}
        <div className="fade-in min-w-0 order-2 lg:order-1">
          <p className="text-xs sm:text-sm tracking-[0.14em] uppercase text-[var(--muted)] mb-3 sm:mb-4">
            {dict.hero.label}
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(1.85rem,5.2vw,3.25rem)] font-extrabold leading-[1.18] tracking-tight text-balance mb-4 sm:mb-5"
          >
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="max-w-[36rem] text-[var(--muted)] text-[0.95rem] sm:text-base md:text-[1.05rem] leading-relaxed mb-6 sm:mb-7">
            {dict.hero.body}
          </p>

          <div className="flex flex-col xs:flex-row flex-wrap gap-3 mb-6 sm:mb-8">
            <a href="#projects" className="btn btn-primary w-full sm:w-auto justify-center">
              {dict.hero.ctaProjects}
            </a>
            {showCv && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full sm:w-auto justify-center"
                aria-label={dict.hero.ctaCv}
              >
                {dict.hero.ctaCv}
              </a>
            )}
          </div>

          <div className="mb-8 sm:mb-10">
            <SocialLinks github={github} linkedin={linkedin} email={email} />
          </div>

          <div className="border-t border-[var(--border)] pt-5 max-w-md">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)] mb-3">
              {dict.hero.currently}
            </p>
            <ul className="space-y-2.5 m-0 p-0 list-none">
              {dict.hero.currentlyItems.map((item) => (
                <li key={item} className="text-sm sm:text-[0.95rem] text-[var(--text)] flex gap-2.5">
                  <span className="text-[var(--accent)] shrink-0 mt-0.5" aria-hidden>
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portrait — first on mobile for visual identity, right on desktop */}
        <div className="fade-in order-1 lg:order-2 lg:justify-self-end w-full flex justify-center lg:justify-end pt-1">
          <ProfilePortrait
            alt={dict.hero.photoAlt}
            failed={photoFailed}
            onFail={() => setPhotoFailed(true)}
          />
        </div>
      </div>
    </section>
  );
}
