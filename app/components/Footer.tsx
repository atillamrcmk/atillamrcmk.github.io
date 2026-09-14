import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { profile } from "@/lib/data/profile";

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-10 mt-4" role="contentinfo">
      <div className="container-x text-sm text-[var(--muted)]">
        <p>
          © {year} {profile.name} — {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
