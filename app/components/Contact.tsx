"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SOCIAL, mailtoUrl } from "@/lib/constants/site";
import { safeHref } from "@/lib/utils/format";

interface ContactProps {
  dict: Dictionary;
}

export default function Contact({ dict }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const github = safeHref(SOCIAL.github);
  const linkedin = safeHref(SOCIAL.linkedin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${formData.name || "Visitor"}`);
    const body = encodeURIComponent(
      `${formData.message}\n\n—\n${formData.name}\n${formData.email}`
    );
    window.location.href = `mailto:${SOCIAL.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2500);
  };

  return (
    <section id="contact" className="section scroll-mt-24" aria-labelledby="contact-heading">
      <div className="section-index">
        <span>{dict.sections.contact.index}</span>
        <span>/ {dict.sections.contact.title}</span>
      </div>
      <h2
        id="contact-heading"
        className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2"
      >
        {dict.sections.contact.title}
      </h2>
      <p className="text-[var(--muted)] mb-10 max-w-xl">{dict.contact.intro}</p>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)] mb-4">
            {dict.contact.social}
          </p>
          <ul className="space-y-3">
            {github && (
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  GitHub
                </a>
              </li>
            )}
            {linkedin && (
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            )}
            <li>
              <a
                href={mailtoUrl()}
                className="text-[var(--text)] hover:text-[var(--accent)] transition-colors"
              >
                {dict.contact.emailCta}
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="contact-form-heading">
          <h3 id="contact-form-heading" className="sr-only">
            {dict.contact.formTitle}
          </h3>
          <div>
            <label htmlFor="name" className="block text-xs text-[var(--muted)] mb-1.5">
              {dict.contact.name}
            </label>
            <input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs text-[var(--muted)] mb-1.5">
              {dict.contact.email}
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs text-[var(--muted)] mb-1.5">
              {dict.contact.message}
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] resize-y"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitted}>
            {submitted ? dict.contact.sending : dict.contact.send}
          </button>
          {submitted && (
            <p className="text-sm text-[var(--muted)]" role="status">
              {dict.contact.success}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
