import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SITE_URL, SITE_NAME, SOCIAL } from "@/lib/constants/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const path = `/${locale}/`;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        tr: `${SITE_URL}/tr/`,
        en: `${SITE_URL}/en/`,
        "x-default": `${SITE_URL}/tr/`,
      },
    },
    openGraph: {
      type: "website",
      locale: dict.meta.ogLocale,
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: locale === "tr" ? "Yazılım Mühendisi" : "Software Engineer",
    url: `${SITE_URL}/${locale}/`,
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
    email: SOCIAL.email,
    knowsAbout: [
      "Flutter",
      "React",
      "Next.js",
      "C#",
      ".NET",
      "Python",
      "OpenCV",
      "Computer Vision",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main-content" className="skip-link">
        {dict.skipToContent}
      </a>
      {/* Locale is applied via nested document structure; root html lang updated client-side */}
      <LocaleLang locale={locale} />
      {children}
    </>
  );
}

function LocaleLang({ locale }: { locale: Locale }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
      }}
    />
  );
}
