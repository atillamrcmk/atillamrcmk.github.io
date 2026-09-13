export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://atillamrcmk.github.io";

export const SITE_NAME = "Atilla Mercimek";
export const GITHUB_USERNAME = "atillamrcmk";

export const SOCIAL = {
  github: "https://github.com/atillamrcmk",
  linkedin: "https://www.linkedin.com/in/atilla-mercimek-6025b7222",
  email: "mercimekatilla53@gmail.com",
} as const;

export function mailtoUrl(): string {
  return `mailto:${SOCIAL.email}`;
}
