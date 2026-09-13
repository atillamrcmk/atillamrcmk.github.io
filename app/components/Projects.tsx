import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getFeaturedProjects, t, type Project } from "@/lib/data/projects";
import type { GitHubRepoMeta } from "@/lib/github/fetch-repos";
import { safeHref } from "@/lib/utils/format";
import ProjectMedia from "./ProjectMedia";

interface ProjectsProps {
  locale: Locale;
  dict: Dictionary;
  githubMeta?: Record<string, GitHubRepoMeta>;
}

function ProjectBlock({
  project,
  index,
  locale,
  dict,
  githubMeta,
}: {
  project: Project;
  index: number;
  locale: Locale;
  dict: Dictionary;
  githubMeta?: GitHubRepoMeta;
}) {
  const title = t(project.title, locale);
  const short = t(project.shortDescription, locale);
  const problem = t(project.problem, locale);
  const solution = t(project.solution, locale);
  const detailHref = `/${locale}/projects/${project.slug}/`;
  const github =
    safeHref(githubMeta?.url) ||
    safeHref(project.githubUrl) ||
    (project.githubRepo ? `https://github.com/${project.githubRepo}` : undefined);

  return (
    <article className="border-t border-[var(--border)] pt-10 md:pt-14 mb-12 md:mb-16 last:mb-0">
      <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 order-2 lg:order-1">
          <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-3">
            {String(index + 1).padStart(2, "0")}
            {project.independent ? (
              <span className="normal-case tracking-normal text-[var(--muted)]">
                {" "}
                · {dict.projects.independentNote}
              </span>
            ) : null}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3">
            <Link href={detailHref} className="hover:text-[var(--accent)] transition-colors">
              {title}
            </Link>
          </h3>
          <p className="text-[var(--muted)] max-w-xl mb-4 leading-relaxed">{short}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted)]"
              >
                {cat}
              </span>
            ))}
          </div>

          {(problem || solution) && (
            <div className="space-y-4 mb-5 max-w-xl">
              {problem && (
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[var(--accent)] mb-1.5">
                    {dict.projects.problem}
                  </p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{problem}</p>
                </div>
              )}
              {solution && (
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[var(--accent)] mb-1.5">
                    {dict.projects.solution}
                  </p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{solution}</p>
                </div>
              )}
            </div>
          )}

          <p className="text-sm text-[var(--muted)] mb-4">
            <span className="text-[var(--text)]">{dict.projects.stack}:</span>{" "}
            {project.technologies.join(" · ")}
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href={detailHref}
              className="text-[var(--text)] hover:text-[var(--accent)] transition-colors"
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
          href={detailHref}
          className="group block no-underline order-1 lg:order-2"
          aria-label={title}
        >
          <ProjectMedia
            src={project.image}
            alt={title}
            fallbackLabel={dict.projects.imageUnavailable}
          />
        </Link>
      </div>
    </article>
  );
}

export default function Projects({ locale, dict, githubMeta = {} }: ProjectsProps) {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="section scroll-mt-24" aria-labelledby="projects-heading">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 md:mb-10">
        <div>
          <div className="section-index">
            <span>{dict.sections.projects.index}</span>
            <span>/ {dict.sections.projects.title}</span>
          </div>
          <h2
            id="projects-heading"
            className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2"
          >
            {dict.sections.projects.title}
          </h2>
          <p className="text-[var(--muted)]">{dict.sections.projects.subtitle}</p>
        </div>
        <Link
          href={`/${locale}/projects/`}
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors shrink-0"
        >
          {dict.projects.allTitle} →
        </Link>
      </div>

      <div>
        {featured.map((project, index) => (
          <ProjectBlock
            key={project.slug}
            project={project}
            index={index}
            locale={locale}
            dict={dict}
            githubMeta={project.githubRepo ? githubMeta[project.githubRepo] : undefined}
          />
        ))}
      </div>
    </section>
  );
}
