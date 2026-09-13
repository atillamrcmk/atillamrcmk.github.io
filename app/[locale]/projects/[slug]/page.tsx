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
    <section className="mb-10 md:mb-12">
      <h2 className="text-xs uppercase tracking-[0.12em] text-[var(--accent)] mb-3">{title}</h2>
      <div className="text-[var(--muted)] leading-relaxed">{children}</div>
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
      <Container>
        <Navbar locale={locale} dict={dict} />
        <main id="main-content" className="pb-16 md:pb-24">
          <Link
            href={`/${locale}/#projects`}
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← {dict.projects.back}
          </Link>

          <header className="mt-8 mb-10 md:mb-14 max-w-3xl">
            <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-3">
              {project.categories.join(" · ")}
              {project.independent ? ` · ${dict.projects.independentNote}` : ""}
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-[var(--muted)]">{description}</p>
          </header>

          <div className="mb-12 md:mb-16">
            <ProjectMedia
              src={project.image}
              alt={title}
              fallbackLabel={dict.projects.imageUnavailable}
            />
          </div>

          <div className="grid lg:grid-cols-[1fr_18rem] gap-12">
            <div>
              <Section title={dict.projects.overview}>
                <p>{description}</p>
              </Section>
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
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Section>
              )}
              {architecture.length > 0 && (
                <Section title={dict.projects.architecture}>
                  <ul className="space-y-2">
                    {architecture.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Section>
              )}
              {decisions.length > 0 && (
                <Section title={dict.projects.decisions}>
                  <ul className="space-y-2">
                    {decisions.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Section>
              )}
              {limitations.length > 0 && (
                <Section title={dict.projects.limitations}>
                  <ul className="space-y-2">
                    {limitations.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Section>
              )}
              {future.length > 0 && (
                <Section title={dict.projects.future}>
                  <ul className="space-y-2">
                    {future.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 self-start">
              <div className="border border-[var(--border)] rounded-[10px] p-5 bg-[var(--surface)]">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)] mb-3">
                  {dict.projects.stack}
                </p>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  {project.technologies.join(" · ")}
                </p>
              </div>

              {meta && (
                <div className="border border-[var(--border)] rounded-[10px] p-5 bg-[var(--surface)] space-y-3 text-sm">
                  {meta.language && (
                    <p className="text-[var(--muted)]">
                      {dict.projects.metaLanguage}:{" "}
                      <span className="text-[var(--text)]">{meta.language}</span>
                    </p>
                  )}
                  {meta.stars > 0 && (
                    <p className="text-[var(--muted)]">
                      {dict.projects.metaStars}:{" "}
                      <span className="text-[var(--text)]">{meta.stars}</span>
                    </p>
                  )}
                  {meta.forks > 0 && (
                    <p className="text-[var(--muted)]">
                      {dict.projects.metaForks}:{" "}
                      <span className="text-[var(--text)]">{meta.forks}</span>
                    </p>
                  )}
                  {meta.updatedAt && (
                    <p className="text-[var(--muted)]">
                      {dict.projects.metaUpdated}:{" "}
                      <span className="text-[var(--text)]">
                        {formatIsoDate(meta.updatedAt, locale)}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                >
                  {dict.projects.github}
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
            </aside>
          </div>
        </main>
      </Container>
      <Footer dict={dict} />
    </>
  );
}
