import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { experiences, localizeExperience } from "@/lib/data/experience";
import { formatDate } from "@/lib/utils/format";

interface ExperienceProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Experience({ locale, dict }: ExperienceProps) {
  return (
    <section id="experience" className="section scroll-mt-24" aria-labelledby="experience-heading">
      <div className="section-index">
        <span>{dict.sections.experience.index}</span>
        <span>/ {dict.sections.experience.title}</span>
      </div>
      <h2
        id="experience-heading"
        className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2"
      >
        {dict.sections.experience.title}
      </h2>
      <p className="text-[var(--muted)] mb-10 md:mb-12">{dict.sections.experience.subtitle}</p>

      <div>
        {experiences.map((raw) => {
          const exp = localizeExperience(raw, locale);
          return (
            <article key={exp.id} className="experience-item">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">{exp.position}</h3>
<p className="text-[var(--muted)] text-sm md:text-base">
                      {exp.company}
                      {exp.employmentType &&
                        exp.employmentType.toLowerCase() !== exp.company.toLowerCase() && (
                          <>
                            <span className="mx-2 text-[var(--border)]">·</span>
                            {exp.employmentType}
                          </>
                        )}
                    </p>
                </div>
                <p className="text-sm text-[var(--muted)] shrink-0">
                  <time dateTime={exp.startDate}>{formatDate(exp.startDate, locale)}</time>
                  {" — "}
                  {exp.endDate ? (
                    <time dateTime={exp.endDate}>{formatDate(exp.endDate, locale)}</time>
                  ) : (
                    <span className="text-[var(--accent)]">{dict.experience.present}</span>
                  )}
                </p>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">{exp.location}</p>
              <ul className="space-y-2 mb-4">
                {exp.description.map((item) => (
                  <li key={item} className="text-sm text-[var(--text)]/90 leading-relaxed pl-0">
                    {item}
                  </li>
                ))}
              </ul>
              {exp.technologies.length > 0 && (
                <p className="text-xs text-[var(--muted)]">
                  {exp.technologies.join(" · ")}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
