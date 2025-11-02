"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "./data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            const cards = entry.target.querySelectorAll(".project-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-slide-up");
              }, index * 100);
            });
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

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, projectId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePositions(prev => ({ ...prev, [projectId]: { x, y } }));
  };

  const handleCardMouseLeave = (projectId: string) => {
    setMousePositions(prev => ({ ...prev, [projectId]: { x: 0, y: 0 } }));
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-9.5 scroll-mt-20 relative"
      aria-labelledby="projects-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#6D28D9] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#9333EA] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="projects-heading" className="m-0 mb-2 text-3xl md:text-4xl tracking-tight font-black">
              <span className="gradient-text flex items-center gap-3">
                <svg className="w-8 h-8 text-[#6D28D9] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                My Projects
              </span>
            </h2>
            <p className="text-[#9CA3AF] text-lg">
              Projects I've developed and my open source contributions
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#9CA3AF] bg-[#1A1A22] px-4 py-2 rounded-xl border border-[#2f2a37]">
            <svg className="w-5 h-5 animate-pulse text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-semibold">{projects.length} Projects</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const mousePos = mousePositions[project.id] || { x: 0, y: 0 };
            return (
              <article
                key={project.id}
                className="project-card card group relative overflow-hidden card-3d"
                itemScope
                itemType="https://schema.org/SoftwareApplication"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
                onMouseMove={(e) => handleCardMouseMove(e, project.id)}
                onMouseLeave={() => handleCardMouseLeave(project.id)}
              >
                {/* Glowing corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6D28D9]/30 via-[#9333EA]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/5 to-[#9333EA]/5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"></div>
                
                {/* Project Image with enhanced effects */}
                {project.imageUrl && (
                  <div className="relative overflow-hidden rounded-xl mb-4 group/image">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#6D28D9]/20 via-transparent to-transparent z-10 opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
                    <div
                      className="w-full aspect-video bg-[#0b0b0f] border-2 border-[#2f2a37] bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:border-[#6D28D9]/50"
                      style={{
                        backgroundImage: `url(${project.imageUrl})`,
                        transform: `scale(1) translateZ(0)`,
                      }}
                      role="img"
                      aria-label={`${project.title} image`}
                    ></div>
                    
                    {/* Hover overlay with text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity flex items-end p-4 z-20">
                      <div className="text-white transform translate-y-4 group-hover/image:translate-y-0 transition-transform">
                        <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          Detayları görüntüle
                        </div>
                      </div>
                    </div>
                    
                    {/* Featured badge with glow */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[#6D28D9] to-[#9333EA] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5 z-30 animate-pulse">
                        <svg className="w-4 h-4 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Featured
                      </div>
                    )}
                  </div>
                )}
                
                {/* Title with animated icon */}
                <h3 className="m-0 mb-2 text-xl font-bold group-hover:text-[#c4b5fd] transition-colors flex items-center gap-2 relative z-10" itemProp="name">
                  <svg className="w-5 h-5 text-[#6D28D9] group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {project.title}
                </h3>
                
                {/* Description */}
                <p
                  className="text-[#9CA3AF] text-sm mb-3 line-clamp-2 relative z-10"
                  itemProp="description"
                >
                  {project.description}
                </p>
                
                {/* Technologies with enhanced styling */}
                <div className="flex flex-wrap gap-2 mt-2.5 mb-4 relative z-10" aria-label="Kullanılan teknolojiler">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#6d28d920] text-[#c4b5fd] border border-[#6d28d944] font-medium hover:bg-[#6d28d935] hover:border-[#6D28D9] hover:scale-110 transition-all cursor-default flex items-center gap-1.5 group/tag"
                    >
                      <svg className="w-3 h-3 group-hover/tag:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#6d28d920] text-[#c4b5fd] border border-[#6d28d944] font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Action Buttons with glassmorphism */}
                <div className="flex gap-2 mt-auto relative z-10">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn flex-1 text-center group/btn glass hover:bg-[#6d28d920] hover:border-[#6D28D9] transition-all"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <svg
                        className="w-5 h-5 mr-2 inline-block"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary flex-1 text-center group/btn"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <svg
                        className="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Demo
                    </a>
                  )}
                  {!project.liveUrl && project.githubUrl && (
                    <span className="text-xs text-[#9CA3AF] flex items-center self-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Code Only
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
