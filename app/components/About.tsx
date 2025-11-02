"use client";

import { useEffect, useRef } from "react";
import { profile } from "./data/profile";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-9.5 scroll-mt-20"
      aria-labelledby="about-heading"
    >
      <div className="relative z-10">
        <div className="container-x max-w-4xl mx-auto">
        {/* Section Header - Centered */}
        <div className="text-center mb-8 md:mb-12">
          <h2 id="about-heading" className="m-0 mb-2 md:mb-3 text-3xl sm:text-4xl md:text-5xl tracking-tight font-black">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-[#9CA3AF] text-base sm:text-lg max-w-xl mx-auto px-4">
            My thoughts on mobile app development, user experience, and technology
          </p>
        </div>

        {/* Main Content - Centered */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {/* Primary Intro Card */}
          <div className="card">
            <div className="flex items-start gap-3 md:gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#9333EA] flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-[#E5E7EB] mb-2 md:mb-3">
                  {profile.name}
                </h3>
                <p className="text-[#9333EA] font-semibold text-sm md:text-base mb-3 md:mb-5">
                  {profile.title}
                </p>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[#E5E7EB] leading-relaxed text-sm md:text-base">
                    {profile.bio}
                  </p>
                  <p className="text-[#E5E7EB] leading-relaxed text-sm md:text-base">
                    <span className="text-[#c4b5fd] font-semibold">Atilla</span> is a mobile app developer who places design, performance, and user experience at the center of his work. He builds modern, fast, and scalable applications using Flutter, Firebase, and Isar DB technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy & Vision Card */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#9333EA]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-[#E5E7EB] mb-4">Approach & Vision</h4>
                <div className="space-y-3">
                  <p className="text-[#E5E7EB] leading-relaxed text-base">
                    A developer who thinks beyond code, with a strong product vision. Currently working in a public institution while also developing private projects as a freelancer.
                  </p>
                  <p className="text-[#E5E7EB] leading-relaxed text-base">
                    His goal is to spread digitalization and user-centric software culture in public systems. He views technology not just as a tool, but as <span className="text-[#c4b5fd] font-semibold">an impact area that simplifies people's lives</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Strengths Grid - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                title: "Design-Oriented",
                description: "Prioritizes user experience and visual aesthetics"
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Performance",
                description: "Develops fast, fluid, and optimized applications"
              },
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "Scalable",
                description: "Robust architectural approaches for growing projects"
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Product Vision",
                description: "Thinks beyond code with a strategic approach"
              }
            ].map((point, idx) => (
              <div key={idx} className="card">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#6D28D9]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={point.icon} />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-bold text-[#E5E7EB] mb-1">{point.title}</h5>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
