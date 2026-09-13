export function isExternalUrl(url: string | undefined | null): url is string {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#" || trimmed.toLowerCase().includes("undefined")) {
    return false;
  }
  return /^https?:\/\//i.test(trimmed) || trimmed.startsWith("mailto:");
}

export function safeHref(url: string | undefined | null): string | undefined {
  return isExternalUrl(url) ? url.trim() : undefined;
}

export function formatDate(date: string, locale: "tr" | "en"): string {
  if (/^\d{4}$/.test(date)) return date;
  const parts = date.split("-");
  if (parts.length >= 2) {
    const year = parts[0];
    const month = Number(parts[1]);
    if (!year || Number.isNaN(month)) return date;
    const formatter = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
      month: "short",
      year: "numeric",
    });
    return formatter.format(new Date(Number(year), month - 1, 1));
  }
  return date;
}

export function formatIsoDate(iso: string | null | undefined, locale: "tr" | "en"): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}
