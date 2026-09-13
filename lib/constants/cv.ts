export type LocaleCode = "tr" | "en";

/**
 * CV paths — single source of truth for all CV links.
 * Source file: atilla_mercimekcvv (updated). Served as a clean public URL.
 */
export const CV_CONFIG = {
  tr: "/documents/Atilla-Mercimek-CV.pdf",
  en: "/documents/Atilla-Mercimek-CV-EN.pdf",
  fallback: "/documents/Atilla-Mercimek-CV.pdf",
  /** Locales that currently have a dedicated CV file in /public */
  available: {
    tr: true,
    en: false,
  },
} as const;

export function getCvUrl(locale: LocaleCode = "tr"): string {
  if (locale === "en" && CV_CONFIG.available.en) {
    return CV_CONFIG.en;
  }
  if (CV_CONFIG.available.tr) {
    return CV_CONFIG.tr;
  }
  return CV_CONFIG.fallback;
}

export function hasCv(locale: LocaleCode = "tr"): boolean {
  if (locale === "en") {
    return CV_CONFIG.available.en || CV_CONFIG.available.tr;
  }
  return CV_CONFIG.available.tr;
}
