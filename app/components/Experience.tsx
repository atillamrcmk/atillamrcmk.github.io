"use client";

import { useEffect, useRef } from "react";
import { experiences } from "./data/experience";

export default function Experience() {
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

    return () => observer.disconnect();
  }, []);

  const formatDate = (date: string) => {
    // If only year exists (e.g., "2023")
    if (date.length === 4 && /^\d{4}$/.test(date)) {
      return date;
    }
    
    const months: { [key: string]: string } = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    };
    
    const parts = date.split("-");
    if (parts.length === 2) {
      const [year, month] = parts;
      return `${months[month]} ${year}`;
    }
    
    return date;
  };

  const calculateDuration = (start: string, end: string | null) => {
    // For year-only format (e.g., "2023")
    if (start.length === 4 && /^\d{4}$/.test(start)) {
      const startYear = parseInt(start);
      const endYear = end ? (end.length === 4 ? parseInt(end) : new Date(end).getFullYear()) : new Date().getFullYear();
      const years = endYear - startYear;
      if (years === 1) return "1 year";
      return `${years} years`;
    }
    
    // For full date format
    const startDate = new Date(start + (start.includes("-") && start.length === 7 ? "-01" : ""));
    const endDate = end ? new Date(end + (end.includes("-") && end.length === 7 ? "-01" : "")) : new Date();
    
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalMonths = years * 12 + months;
    if (totalMonths < 0) return "0 months";
    
    if (years > 0 && months > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-9.5 scroll-mt-20 relative"
      aria-labelledby="experience-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#6D28D9] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9333EA] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="experience-heading" className="m-0 mb-2 text-2xl sm:text-3xl md:text-4xl tracking-tight font-black">
              <span className="gradient-text flex items-center gap-2 sm:gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#6D28D9] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="whitespace-nowrap">Work Experience</span>
              </span>
            </h2>
            <p className="text-[#9CA3AF] text-base sm:text-lg">
              My career journey and professional experiences
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#9CA3AF] bg-[#1A1A22] px-4 py-2 rounded-xl border border-[#2f2a37]">
            <svg className="w-5 h-5 animate-pulse text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold">{experiences.length} Experiences</span>
          </div>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="card group relative overflow-hidden card-3d"
              itemScope
              itemType="https://schema.org/OrganizationRole"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9]/10 via-[#9333EA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Timeline line connector with glow */}
              {index < experiences.length - 1 && (
                <div className="absolute left-2 md:left-8 top-16 md:top-20 bottom-[-24px] w-0.5 bg-gradient-to-b from-[#6D28D9] via-[#9333EA] to-[#6D28D9] opacity-30 group-hover:opacity-60 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#6D28D9] to-[#9333EA] opacity-50 blur-sm"></div>
                </div>
              )}

            <div className="flex gap-3 md:gap-6">
              {/* Enhanced Timeline dot */}
              <div className="flex-shrink-0 relative z-10">
                <div
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${
                    exp.endDate === null
                      ? "border-[#6D28D9] bg-[#6D28D9] shadow-lg shadow-[#6D28D9]/50"
                      : "border-[#2f2a37] bg-[#1A1A22] group-hover:border-[#6D28D9] transition-colors"
                  } transition-all group-hover:scale-125 relative`}
                >
                  {exp.endDate === null && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-[#6D28D9] animate-ping opacity-75"></div>
                      <div className="absolute inset-0 rounded-full bg-[#6D28D9] animate-pulse"></div>
                    </>
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9333EA] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2 md:mb-3">
                  <div className="flex-grow min-w-0">
                    <h3 className="m-0 mb-1 text-lg sm:text-xl md:text-2xl font-bold group-hover:text-[#c4b5fd] transition-colors" itemProp="jobTitle">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="m-0 text-[#9333EA] font-semibold text-base sm:text-lg" itemProp="worksFor">
                        {exp.company}
                      </p>
                      <span className="text-[#9CA3AF] text-xs sm:text-sm">•</span>
                      <span className="text-[#9CA3AF] text-xs sm:text-sm">{exp.employmentType}</span>
                    </div>
                  </div>
                  
                  {/* Date and Duration */}
                  <div className="flex-shrink-0 text-left md:text-right">
                    <div className="text-[#9CA3AF] text-xs sm:text-sm font-medium mb-1">
                      <time dateTime={exp.startDate} itemProp="startDate">
                        {formatDate(exp.startDate)}
                      </time>
                      {" — "}
                      {exp.endDate ? (
                        <time dateTime={exp.endDate} itemProp="endDate">
                          {formatDate(exp.endDate)}
                        </time>
                      ) : (
                        <span className="text-[#6D28D9] font-semibold">Current</span>
                      )}
                    </div>
                    <div className="text-[#6D28D9] text-[10px] sm:text-xs font-semibold">
                      {calculateDuration(exp.startDate, exp.endDate)}
                    </div>
                  </div>
                </div>

                {/* Location and Employment Type */}
                <div className="flex items-center gap-4 mb-4 text-sm text-[#9CA3AF] flex-wrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="px-2 py-0.5 rounded bg-[#9333ea15] text-[#c4b5fd] text-xs font-medium">
                      {exp.employmentType}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <ul className="m-0 mt-2 pl-0 list-none space-y-2.5 mb-4">
                  {exp.description.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[#E5E7EB] text-sm leading-relaxed"
                      itemProp="description"
                    >
                      <span className="text-[#6D28D9] mt-1.5 flex-shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                {exp.technologies.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-[#2f2a37]">
                    <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1.5 rounded-full bg-[#6d28d933] text-[#c4b5fd] border border-[#6d28d977] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
