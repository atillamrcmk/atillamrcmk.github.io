import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";
import { locales } from "@/lib/i18n/config";
import { getAllProjectSlugs } from "@/lib/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllProjectSlugs();
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
    entries.push({
      url: `${SITE_URL}/${locale}/projects/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const slug of slugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${slug}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
