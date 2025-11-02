"use client";

import { useEffect, useState } from "react";
import { profile } from "./data/profile";

export default function LeftSidebar() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "experience", "skills", "contact"];
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

      // Keep visible on mobile
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "about", label: "About", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: "projects", label: "Projects", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { id: "experience", label: "Experience", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "skills", label: "Skills", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { id: "contact", label: "Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];


  return (
    <aside
      className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-40"
      aria-label="Side navigation"
    >
      <nav className="flex flex-col gap-2 md:gap-4 items-center">
        {/* Social Links */}
        <div className="flex flex-col gap-2 md:gap-3 mb-2 md:mb-4">
          <a
            href={`https://${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1A1A22] border border-[#2f2a37] flex items-center justify-center hover:border-[#6D28D9] hover:bg-[#6d28d915] hover:scale-110 transition-all group relative"
            aria-label="GitHub"
          >
            <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              <div className="bg-[#1A1A22] border border-[#2f2a37] px-3 py-1.5 rounded-lg shadow-xl">
                <span className="text-sm font-semibold text-[#E5E7EB]">GitHub</span>
              </div>
            </div>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#9CA3AF] group-hover:text-[#6D28D9] transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href={`https://${profile.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl bg-[#1A1A22] border border-[#2f2a37] flex items-center justify-center hover:border-[#9333EA] hover:bg-[#9333ea15] hover:scale-110 transition-all group relative"
            aria-label="LinkedIn"
          >
            <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              <div className="bg-[#1A1A22] border border-[#2f2a37] px-3 py-1.5 rounded-lg shadow-xl">
                <span className="text-sm font-semibold text-[#E5E7EB]">LinkedIn</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#9333EA] transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="w-12 h-12 rounded-xl bg-[#1A1A22] border border-[#2f2a37] flex items-center justify-center hover:border-[#c4b5fd] hover:bg-[#c4b5fd15] hover:scale-110 transition-all group relative"
            aria-label="Email"
          >
            <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              <div className="bg-[#1A1A22] border border-[#2f2a37] px-3 py-1.5 rounded-lg shadow-xl">
                <span className="text-sm font-semibold text-[#E5E7EB]">Email</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#c4b5fd] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Vertical Line */}
        <div className="w-0.5 h-16 bg-gradient-to-b from-[#6D28D9] via-[#9333EA] to-transparent opacity-50"></div>

        {/* Navigation Dots */}
        <div className="flex flex-col gap-2 md:gap-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all ${
                activeSection === item.id
                  ? "bg-gradient-to-br from-[#6D28D9] to-[#9333EA] scale-110 shadow-lg shadow-[#6D28D9]/50"
                  : "bg-[#1A1A22] border border-[#2f2a37] hover:border-[#6D28D9] hover:bg-[#6d28d915]"
              }`}
              aria-label={item.label}
            >
              <svg
                className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                  activeSection === item.id ? "text-white" : "text-[#9CA3AF] group-hover:text-[#6D28D9]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {/* Tooltip - always visible on hover */}
              <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <div className="bg-[#1A1A22] border border-[#2f2a37] px-3 py-1.5 rounded-lg shadow-xl">
                  <span className="text-sm font-semibold text-[#E5E7EB]">{item.label}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}

