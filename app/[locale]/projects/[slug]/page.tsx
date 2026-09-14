import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllProjectSlugs, getProjectBySlug, t, tList } from "@/lib/data/projects";
import { fetchGitHubRepoMeta } from "@/lib/github/fetch-repos";
import { SITE_URL } from "@/lib/constants/site";
import { formatIsoDate, safeHref } from "@/lib/utils/format";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProjectMedia from "@/app/components/ProjectMedia";
import LeftSidebar from "@/app/components/LeftSidebar";

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = t(project.title, locale);
  const description = t(project.shortDescription, locale);
  const path = `/${locale}/projects/${slug}/`;

  return {
    title: `${title} — Atilla Mercimek`,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        tr: `${SITE_URL}/tr/projects/${slug}/`,
        en: `${SITE_URL}/en/projects/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <section className="py-8 md:py-10">
      <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--accent)] mb-3 md:mb-4">
        {title}
      </h2>
      <div className="text-[var(--muted)] leading-[1.75] text-base">{children}</div>
    </section>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const meta = await fetchGitHubRepoMeta(project.githubRepo);
  const title = t(project.title, locale);
  const description = t(project.description, locale);
  const problem = t(project.problem, locale);
  const solution = t(project.solution, locale);
  const features = tList(project.features, locale);
  const architecture = tList(project.architecture, locale);
  const decisions = tList(project.decisions, locale);
  const limitations = tList(project.limitations, locale);
  const future = tList(project.future, locale);
  const github =
    safeHref(meta?.url) ||
    safeHref(project.githubUrl) ||
    (project.githubRepo ? `https://github.com/${project.githubRepo}` : undefined);

  return (
    <>
      <LeftSidebar />
      <Container className="!px-5 sm:!px-7 lg:!px-10">
        <Navbar locale={locale} dict={dict} />
        <main id="main-content" className="pt-2 pb-16 md:pb-24">
          <Link
            href={`/${locale}/#projects`}
            className="inline-block text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← {dict.projects.back}
          </Link>

          <header className="mt-8 md:mt-12 mb-8 md:mb-10 max-w-3xl">
            <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-3">
              {project.categories.join(" · ")}
              {project.independent ? ` · ${dict.projects.independentNote}` : ""}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15]">
              {title}
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="text-sm text-[var(--muted)]">
                <span className="text-[var(--text)]">{dict.projects.stack}:</span>{" "}
                {project.technologies.join(" · ")}
              </p>
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  {dict.projects.github} →
                </a>
              )}
              <div className="lang-switch text-sm">
                <Link href={`/tr/projects/${slug}/`} className={locale === "tr" ? "active" : ""}>
                  TR
                </Link>
                <span aria-hidden>|</span>
                <Link href={`/en/projects/${slug}/`} className={locale === "en" ? "active" : ""}>
                  EN
                </Link>
              </div>
            </div>
          </header>

          <div className="mb-12 md:mb-14">
            <ProjectMedia
              src={project.image}
              alt={title}
              fallbackLabel={dict.projects.imageUnavailable}
              fit="contain"
            />
          </div>

          <div className="max-w-2xl divide-y divide-[var(--border)]">
            {problem && (
              <Section title={dict.projects.problem}>
                <p>{problem}</p>
              </Section>
            )}
            {solution && (
              <Section title={dict.projects.solution}>
                <p>{solution}</p>
              </Section>
            )}
            {features.length > 0 && (
              <Section title={dict.projects.features}>
                <ul className="space-y-3 list-disc pl-5 marker:text-[var(--accent)]">
                  {features.map((f) => (
                    <li key={f} className="pl-1.5">
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {architecture.length > 0 && (
              <Section title={dict.projects.architecture}>
                <ul className="space-y-3 list-disc pl-5 marker:text-[var(--accent)]">
                  {architecture.map((f) => (
                    <li key={f} className="pl-1.5">
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {decisions.length > 0 && (
              <Section title={dict.projects.decisions}>
                <ul className="space-y-3 list-disc pl-5 marker:text-[var(--accent)]">
                  {decisions.map((f) => (
                    <li key={f} className="pl-1.5">
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {limitations.length > 0 && (
              <Section title={dict.projects.limitations}>
                <ul className="space-y-3 list-disc pl-5 marker:text-[var(--accent)]">
                  {limitations.map((f) => (
                    <li key={f} className="pl-1.5">
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {future.length > 0 && (
              <Section title={dict.projects.future}>
                <ul className="space-y-3 list-disc pl-5 marker:text-[var(--accent)]">
                  {future.map((f) => (
                    <li key={f} className="pl-1.5">
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {meta && (
              <section className="py-8 md:py-10">
                <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--accent)] mb-4">
                  GitHub
                </h2>
                <div className="space-y-3 text-sm text-[var(--muted)]">
                  {meta.language && (
                    <p>
                      {dict.projects.metaLanguage}:{" "}
                      <span className="text-[var(--text)]">{meta.language}</span>
                    </p>
                  )}
                  {meta.stars > 0 && (
                    <p>
                      {dict.projects.metaStars}:{" "}
                      <span className="text-[var(--text)]">{meta.stars}</span>
                    </p>
                  )}
                  {meta.forks > 0 && (
                    <p>
                      {dict.projects.metaForks}:{" "}
                      <span className="text-[var(--text)]">{meta.forks}</span>
                    </p>
                  )}
                  {meta.updatedAt && (
                    <p>
                      {dict.projects.metaUpdated}:{" "}
                      <span className="text-[var(--text)]">
                        {formatIsoDate(meta.updatedAt, locale)}
                      </span>
                    </p>
                  )}
                </div>
              </section>
            )}
          </div>
        </main>
      </Container>
      <Footer dict={dict} />
    </>
  );
}
