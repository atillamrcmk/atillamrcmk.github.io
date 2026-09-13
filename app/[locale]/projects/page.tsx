import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { projects, t } from "@/lib/data/projects";
import { fetchGitHubMetaMap } from "@/lib/github/fetch-repos";
import { SITE_URL } from "@/lib/constants/site";
import { safeHref } from "@/lib/utils/format";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProjectMedia from "@/app/components/ProjectMedia";
import LeftSidebar from "@/app/components/LeftSidebar";

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
  return {
    title: `${dict.projects.allTitle} — Atilla Mercimek`,
    description: dict.projects.allSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects/`,
      languages: {
        tr: `${SITE_URL}/tr/projects/`,
        en: `${SITE_URL}/en/projects/`,
      },
    },
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const githubMeta = await fetchGitHubMetaMap(projects.map((p) => p.githubRepo));

  return (
    <>
      <LeftSidebar />
      <Container>
        <Navbar locale={locale} dict={dict} />
        <main id="main-content" className="pb-16 md:pb-24">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            {dict.projects.allTitle}
          </h1>
          <p className="text-[var(--muted)] mb-12">{dict.projects.allSubtitle}</p>

          <div className="space-y-14">
            {projects.map((project, index) => {
              const title = t(project.title, locale);
              const short = t(project.shortDescription, locale);
              const meta = project.githubRepo ? githubMeta[project.githubRepo] : undefined;
              const github =
                safeHref(meta?.url) ||
                safeHref(project.githubUrl) ||
                (project.githubRepo ? `https://github.com/${project.githubRepo}` : undefined);

              return (
                <article
                  key={project.slug}
                  className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start border-t border-[var(--border)] pt-10"
                >
                  <div>
                    <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-2">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight mb-3">
                      <Link
                        href={`/${locale}/projects/${project.slug}/`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="text-[var(--muted)] mb-4 max-w-xl">{short}</p>
                    <p className="text-sm text-[var(--muted)] mb-4">
                      {project.technologies.join(" · ")}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <Link
                        href={`/${locale}/projects/${project.slug}/`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {dict.projects.viewProject} →
                      </Link>
                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                        >
                          {dict.projects.github} →
                        </a>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/projects/${project.slug}/`}
                    className="block no-underline"
                    aria-label={title}
                  >
                    <ProjectMedia
                      src={project.image}
                      alt={title}
                      fallbackLabel={dict.projects.imageUnavailable}
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </main>
      </Container>
      <Footer dict={dict} />
    </>
  );
}
