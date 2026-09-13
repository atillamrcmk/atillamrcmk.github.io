"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getCvUrl, hasCv } from "@/lib/constants/cv";
import { profile } from "@/lib/data/profile";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${nextLocale}/`;
  if (parts[0] === "tr" || parts[0] === "en") {
    parts[0] = nextLocale;
    return `/${parts.join("/")}/`.replace(/\/+/g, "/");
  }
  return `/${nextLocale}/`;
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname() || `/${locale}/`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const navItems = [
    { label: dict.nav.projects, href: isHome ? "#projects" : `/${locale}/#projects`, id: "projects" },
    { label: dict.nav.about, href: isHome ? "#about" : `/${locale}/#about`, id: "about" },
    { label: dict.nav.experience, href: isHome ? "#experience" : `/${locale}/#experience`, id: "experience" },
    { label: dict.nav.contact, href: isHome ? "#contact" : `/${locale}/#contact`, id: "contact" },
  ];

  const cvUrl = getCvUrl(locale);
  const showCv = hasCv(locale);
  const trHref = swapLocaleInPath(pathname, "tr");
  const enHref = swapLocaleInPath(pathname, "en");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
      if (!isHome) return;
      const sections = ["projects", "about", "experience", "skills", "contact"];
      const scrollPos = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    try {
      localStorage.setItem("preferred-locale", locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const element = document.querySelector(href);
    if (!element) return;
    const headerOffset = 96;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div
          className={`site-header__bar transition-colors duration-300 ${
            scrolled ? "site-header__bar--scrolled" : ""
          }`}
        >
          <div className="container-x">
            <nav
              className="flex items-center justify-between gap-3 sm:gap-4 min-h-14 py-3"
              role="navigation"
              aria-label={dict.nav.home}
            >
              <Link
                href={`/${locale}/`}
                className="flex items-center gap-3 no-underline shrink-0"
                aria-label={dict.nav.home}
              >
                <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-sm font-bold tracking-wide text-[var(--text)]">
                  {profile.initials}
                </span>
                <span className="hidden sm:block text-[0.95rem] font-semibold tracking-tight text-[var(--text)]">
                  {profile.name}
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => {
                  const isActive = isHome && activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative py-1 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[var(--text)]"
                          : "text-[var(--muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)]" />
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="lang-switch" aria-label="Language">
                  <Link href={trHref} className={locale === "tr" ? "active" : ""} hrefLang="tr">
                    TR
                  </Link>
                  <span aria-hidden>|</span>
                  <Link href={enHref} className={locale === "en" ? "active" : ""} hrefLang="en">
                    EN
                  </Link>
                </div>
                <ThemeToggle />
                {showCv && (
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary !min-h-9 !px-3 text-sm"
                    aria-label={dict.nav.cv}
                  >
                    {dict.nav.cv}
                  </a>
                )}
              </div>

              <button
                type="button"
                className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)]"
                aria-label={mobileMenuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                <span className="sr-only">
                  {mobileMenuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
                </span>
                <div className="relative h-3.5 w-5">
                  <span
                    className={`absolute left-0 top-0 h-0.5 w-full bg-[var(--text)] transition ${
                      mobileMenuOpen ? "top-1.5 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-full bg-[var(--text)] transition ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-3 h-0.5 w-full bg-[var(--text)] transition ${
                      mobileMenuOpen ? "top-1.5 -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </nav>

            {mobileMenuOpen && (
              <div className="md:hidden pb-4 fade-in">
                <div className="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-3 space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setMobileMenuOpen(false);
                      }}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="flex items-center justify-between gap-3 px-3 pt-2">
                    <div className="lang-switch">
                      <Link href={trHref} className={locale === "tr" ? "active" : ""} hrefLang="tr">
                        TR
                      </Link>
                      <span aria-hidden>|</span>
                      <Link href={enHref} className={locale === "en" ? "active" : ""} hrefLang="en">
                        EN
                      </Link>
                    </div>
                    {showCv && (
                      <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary !min-h-9 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {dict.nav.cv}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Reserves vertical space so fixed bar never covers page content */}
      <div className="site-header-spacer" aria-hidden />
    </>
  );
}
