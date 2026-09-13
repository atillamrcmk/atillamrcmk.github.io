import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface AboutProps {
  dict: Dictionary;
}

export default function About({ dict }: AboutProps) {
  return (
    <section id="about" className="section scroll-mt-24" aria-labelledby="about-heading">
      <div className="section-index">
        <span>{dict.sections.about.index}</span>
        <span>/ {dict.sections.about.title}</span>
      </div>
      <h2
        id="about-heading"
        className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6 max-w-xl"
      >
        {dict.sections.about.title}
      </h2>
      <div className="max-w-2xl space-y-4">
        {dict.about.paragraphs.map((p) => (
          <p key={p} className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
