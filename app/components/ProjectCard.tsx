import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { t } from "@/lib/data/projects";
import { safeHref } from "@/lib/utils/format";

interface ProjectCardProps {
  project: Project;
  locale?: "tr" | "en";
}

export default function ProjectCard({ project, locale = "tr" }: ProjectCardProps) {
  const title = t(project.title, locale);
  const description = t(project.shortDescription, locale);
  const github =
    safeHref(project.githubUrl) ||
    (project.githubRepo ? `https://github.com/${project.githubRepo}` : undefined);

  return (
    <article className="border-b border-[var(--border)] py-8">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--muted)] mb-4">{description}</p>
      <p className="text-sm text-[var(--muted)] mb-4">{project.technologies.join(" · ")}</p>
      <div className="flex gap-4 text-sm">
        <Link href={`/${locale}/projects/${project.slug}/`} className="hover:text-[var(--accent)]">
          Details →
        </Link>
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)]">
            GitHub →
          </a>
        )}
      </div>
    </article>
  );
}
