"use client";

import { useEffect, useState } from "react";
import { projects } from "./data/projects";
import { experiences } from "./data/experience";
import { profile } from "./data/profile";

export default function RightSidebar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScroll = documentHeight - windowHeight;
      const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: projects.length, label: "Projects", shortLabel: "PROJ", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { value: experiences.length, label: "Experience", shortLabel: "EXPE", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { value: profile.skills.length, label: "Skills", shortLabel: "TECH", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  ];

  return (
    <aside
      className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:block"
      aria-label="Stats and scroll indicator"
    >
      <div className="flex flex-col gap-4 md:gap-6 items-center">
        {/* Stats Cards */}
        <div className="flex flex-col gap-2 md:gap-3">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#1A1A22] border-2 border-[#2f2a37] flex flex-col items-center justify-center hover:border-[#6D28D9] hover:bg-[#6d28d915] hover:scale-110 transition-all group relative overflow-visible"
            >
              {/* Tooltip */}
              <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <div className="bg-[#1A1A22] border border-[#2f2a37] px-3 py-1.5 rounded-lg shadow-xl">
                  <span className="text-sm font-semibold text-[#E5E7EB]">{stat.label}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-center">
                <div className="text-lg md:text-2xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] text-[#9CA3AF] uppercase tracking-wider">
                  {stat.shortLabel || stat.label.slice(0, 4)}
                </div>
              </div>
              <svg
                className="absolute top-1 right-1 w-3 h-3 text-[#6D28D9] opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
              </svg>
            </div>
          ))}
        </div>

        {/* Vertical Line */}
        <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-[#9333EA] to-[#6D28D9] opacity-50"></div>

        {/* Scroll Progress Circle */}
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
          <svg className="transform -rotate-90 w-12 h-12 md:w-16 md:h-16">
            <circle
              cx="24"
              cy="24"
              r="20"
              className="md:hidden"
              stroke="#2f2a37"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              className="md:hidden"
              stroke="url(#gradient-mobile)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              className="hidden md:block"
              stroke="#2f2a37"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              className="hidden md:block"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
            />
            <defs>
              <linearGradient id="gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6D28D9" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6D28D9" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-[10px] md:text-xs font-bold text-[#9CA3AF]">
            {Math.round(scrollProgress)}%
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1A1A22] border border-[#2f2a37] flex items-center justify-center hover:border-[#6D28D9] hover:bg-[#6d28d915] hover:scale-110 transition-all group relative overflow-visible"
          aria-label="Back to top"
        >
          {/* Tooltip */}
          <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            <div className="bg-[#1A1A22] border border-[#2f2a37] px-3 py-1.5 rounded-lg shadow-xl">
              <span className="text-sm font-semibold text-[#E5E7EB]">Back to Top</span>
            </div>
          </div>
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-[#9CA3AF] group-hover:text-[#6D28D9] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

