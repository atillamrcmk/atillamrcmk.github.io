import { SOCIAL, SITE_NAME } from "@/lib/constants/site";

export const profile = {
  name: SITE_NAME,
  initials: "AM",
  location: {
    tr: "Türkiye",
    en: "Türkiye",
  },
  email: SOCIAL.email,
  github: SOCIAL.github,
  linkedin: SOCIAL.linkedin,
  languages: [
    { name: { tr: "Türkçe", en: "Turkish" }, level: { tr: "Ana dil", en: "Native" } },
    { name: { tr: "İngilizce", en: "English" }, level: { tr: "İleri", en: "Advanced" } },
  ],
} as const;
