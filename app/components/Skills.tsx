import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { skillGroups } from "@/lib/data/skills";

interface SkillsProps {
  dict: Dictionary;
}

export default function Skills({ dict }: SkillsProps) {
  return (
    <section id="skills" className="section scroll-mt-24" aria-labelledby="skills-heading">
      <div className="section-index">
        <span>{dict.sections.skills.index}</span>
        <span>/ {dict.sections.skills.title}</span>
      </div>
      <h2
        id="skills-heading"
        className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2"
      >
        {dict.sections.skills.title}
      </h2>
      <p className="text-[var(--muted)] mb-8">{dict.sections.skills.subtitle}</p>

      <div className="max-w-2xl">
        {skillGroups.map((group) => (
          <div
            key={group.id}
            className="skill-group grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-6 items-baseline"
          >
            <h3 className="text-sm font-semibold text-[var(--text)]">
              {dict.skills.groups[group.id]}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {group.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
