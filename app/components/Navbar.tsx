"use client";

import { profile } from "./data/profile";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Active section tracking
      const sections = ["about", "projects", "experience", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-[#1A1A22]/95 backdrop-blur-2xl border-b border-[#2f2a37]/60 shadow-2xl shadow-black/20" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container-x">
        <nav 
          className="flex items-center justify-between gap-6" 
          role="navigation" 
          aria-label="Ana navigasyon"
        >
          {/* Logo/Brand - Clean & Professional */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 font-extrabold"
            aria-label="Ana sayfaya dön"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#9333EA] flex items-center justify-center shadow-lg shadow-[#6D28D9]/30">
              <span className="text-white font-black text-base md:text-lg">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-lg md:text-xl font-black text-white tracking-tight">
              {profile.name.split(' ')[0]}
            </span>
          </a>

          {/* Desktop Navigation - Professional & Spaced */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative font-bold text-base tracking-wide transition-colors duration-200 py-2 ${
                    isActive
                      ? "text-white"
                      : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#6D28D9] to-[#9333EA] rounded-full"></span>
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="/Atilla-Mercimek-CV.pdf"
              download
              className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base bg-gradient-to-r from-[#6D28D9] to-[#9333EA] text-white hover:shadow-lg hover:shadow-[#6D28D9]/50 transition-all"
              aria-label="CV indir"
            >
              <span className="flex items-center gap-2.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-11 h-11 rounded-xl bg-[#1A1A22] border-2 border-[#2f2a37] flex items-center justify-center hover:border-[#6D28D9] hover:bg-[#6d28d915] transition-all"
            aria-label="Menüyü aç"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute top-0 left-0 w-full h-0.5 bg-[#E5E7EB] rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 top-2" : ""}`}></span>
              <span className={`absolute top-2 left-0 w-full h-0.5 bg-[#E5E7EB] rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`absolute top-4 left-0 w-full h-0.5 bg-[#E5E7EB] rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 top-2" : ""}`}></span>
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-[#1A1A22]/98 backdrop-blur-xl rounded-2xl border border-[#2f2a37] p-4 space-y-2 shadow-2xl">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                    }}
                    className={`block px-4 py-3 rounded-xl font-bold transition-all ${
                      isActive
                        ? "text-white bg-gradient-to-r from-[#6D28D9] to-[#9333EA] shadow-lg"
                        : "text-[#9CA3AF] hover:text-white hover:bg-[#1A1A22]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="/Atilla-Mercimek-CV.pdf"
                download
                className="block px-4 py-3 rounded-xl font-bold text-center bg-gradient-to-r from-[#6D28D9] to-[#9333EA] text-white mt-3 hover:shadow-lg hover:shadow-[#6D28D9]/50 transition-all"
                aria-label="CV indir"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
