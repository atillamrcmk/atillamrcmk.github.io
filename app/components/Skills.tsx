"use client";

import { useEffect, useRef, useState, ReactElement } from "react";
import { profile } from "./data/profile";

// Icon components for skills
const SkillIcon = ({ skill }: { skill: string }) => {
  const iconMap: { [key: string]: ReactElement } = {
    Flutter: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7 21.684 0zm.014 11.072L7.857 17.53l4.242 4.244L22.572 11.1z"/>
      </svg>
    ),
    Dart: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.105 4.105S9.158 1.58 11.684 1.58c2.526 0 7.579 2.526 7.579 2.526l-2.366 2.366L12.21 11.685l-2.526 2.526-5.579-5.579zm-.026 5.605c-1.158 1.158-1.158 3.032 0 4.21l5.579 5.579c1.158 1.158 3.032 1.158 4.21 0l7.579-7.579c1.158-1.158 1.158-3.032 0-4.21l-7.579-7.579c-1.158-1.158-3.032-1.158-4.21 0l-5.579 5.579z"/>
      </svg>
    ),
    "Firebase / FCM": (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 15.673L5.892 23.5l6.684-7.084-2.683-5.803zm14.505-.64l-2.683-7.723L13.894 0l-1.473 5.344 7.97 7.369zM11.113 8.3L8.49 3.707l-1.473 1.73 4.095 2.863z"/>
      </svg>
    ),
    "C#": (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"/>
        <path d="M12 6v12c-3.31 0-6-2.69-6-6s2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4V8z"/>
      </svg>
    ),
    ".NET": (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 2v20h20V2zm18 18H4V4h16z"/>
      </svg>
    ),
    Python: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.85 0c-3.91 0-6.94.89-6.94 3.76v3.31h5.72v1.09H5.38c-3.91 0-5.36 2.01-5.36 4.89v5.71c0 2.87 1.88 4.89 5.36 4.89h1.83v-3.35c0-3.91 3.22-6.94 7.13-6.94s7.13 3.03 7.13 6.94v5.71c0 2.87 1.45 4.89 5.36 4.89h1.83v-1.09h-5.72v-1.09h8.57c3.91 0 5.36-2.02 5.36-4.89V8.65c0-2.87-1.88-4.89-5.36-4.89zm-8.28 2.18c.93 0 1.64.71 1.64 1.64 0 .93-.71 1.64-1.64 1.64-.93 0-1.64-.71-1.64-1.64 0-.93.71-1.64 1.64-1.64zm15.71 13.18c-.93 0-1.64-.71-1.64-1.64 0-.93.71-1.64 1.64-1.64.93 0 1.64.71 1.64 1.64 0 .93-.71 1.64-1.64 1.64z"/>
      </svg>
    ),
    "Node.js": (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.736-1.579c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.088,1.206c0.08,0.047,0.197,0.047,0.277,0l8.49-4.906 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.49-4.906c-0.081-0.047-0.196-0.047-0.277,0 L3.334,6.68C3.25,6.729,3.198,6.825,3.198,6.921v10.15c0,0.097,0.053,0.189,0.137,0.235l2.052,1.184 c1.307,0.654,2.105-0.116,2.105-0.89V7.042c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.49-4.906c0.557-0.315,1.296-0.315,1.848,0l8.49,4.906c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.265-0.924,1.604l-8.49,4.906C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.259-1.823-3.796-4.588-3.796c-2.471,0-4.316,1.471-4.316,3.796 c0,2.002,1.208,2.93,3.813,3.327c2.755,0.426,3.009,0.752,3.009,1.291c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.114-0.254,0.253 c0,1.482,0.806,4.001,4.655,4.001c2.538,0,4.527-1.125,4.527-3.841H19.099z"/>
      </svg>
    ),
    Git: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.644-.223 1.387-.083 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-2.004L11.217 8.96v6.544c.176.086.342.203.488.348.713.721.713 1.885 0 2.604-.719.721-1.889.721-2.609 0-.719-.719-.719-1.882 0-2.601.177-.178.383-.312.602-.402v-6.603c-.219-.089-.425-.223-.602-.401-.545-.545-1.19-.692-1.791-.576l-2.658-2.66L.453 10.932c-.6.604-.6 1.582 0 2.187l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.186"/>
      </svg>
    ),
    SQL: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M12 7v4h4v-4h-4zm0 6v4h6v-4h-6z"/>
      </svg>
    ),
    C: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.592 5.109c-0.631 0.208-1.133 0.762-1.398 1.516-0.188 0.532-0.277 1.15-0.268 1.8v0.001h-2.531c-0.005-1.951 0.636-3.653 1.696-4.946 0.396-0.483 0.876-0.92 1.424-1.298 0.275-0.188 0.558-0.351 0.849-0.488 0.121-0.057 0.246-0.109 0.372-0.156 0.209-0.077 0.421-0.143 0.636-0.197 0.435-0.108 0.88-0.179 1.329-0.211 0.223-0.016 0.446-0.024 0.669-0.024v2.805c-0.583 0-1.149 0.098-1.696 0.289-0.285 0.100-0.557 0.226-0.813 0.376-0.266 0.155-0.512 0.335-0.736 0.537-0.521 0.467-0.938 1.060-1.218 1.731-0.133 0.320-0.230 0.657-0.288 1.005-0.030 0.176-0.047 0.354-0.050 0.533h2.531c0.003-0.303 0.056-0.597 0.153-0.877 0.194-0.560 0.559-1.029 1.024-1.361 0.236-0.166 0.500-0.293 0.782-0.379 0.143-0.043 0.290-0.078 0.439-0.103 0.299-0.050 0.603-0.055 0.905-0.016v-2.805c-0.444 0.029-0.883 0.100-1.313 0.210-0.218 0.056-0.432 0.123-0.641 0.201-0.125 0.047-0.249 0.099-0.370 0.156-0.293 0.138-0.578 0.302-0.853 0.490-0.547 0.378-1.026 0.815-1.421 1.298-1.060 1.292-1.701 2.995-1.696 4.946h-2.531c-0.009-0.650 0.080-1.268 0.268-1.799 0.265-0.754 0.767-1.308 1.398-1.516-1.250-0.641-2.113-1.829-2.387-3.215-0.057-0.289-0.085-0.583-0.083-0.879v-0.528h-2.528v0.528c-0.002 2.135 0.585 4.137 1.606 5.844 1.104 1.857 2.738 3.305 4.676 4.134 0.631-0.208 1.133-0.762 1.398-1.516 0.188-0.532 0.277-1.15 0.268-1.801h2.531c0.005 1.951-0.636 3.653-1.696 4.946-0.396 0.483-0.876 0.920-1.424 1.298-0.275 0.188-0.558 0.351-0.849 0.488-0.121 0.057-0.246 0.109-0.372 0.156-0.209 0.077-0.421 0.143-0.636 0.197-0.435 0.108-0.880 0.179-1.329 0.211-0.223 0.016-0.446 0.024-0.669 0.024v-2.805c0.583 0 1.149-0.098 1.696-0.289 0.285-0.100 0.557-0.226 0.813-0.376 0.266-0.155 0.512-0.335 0.736-0.537 0.521-0.467 0.938-1.060 1.218-1.731 0.133-0.320 0.230-0.657 0.288-1.005 0.030-0.176 0.047-0.354 0.050-0.533h-2.531c-0.003 0.303-0.056 0.597-0.153 0.877-0.194 0.560-0.559 1.029-1.024 1.361-0.236 0.166-0.500 0.293-0.782 0.379-0.143 0.043-0.290 0.078-0.439 0.103-0.299 0.050-0.603 0.055-0.905 0.016v2.805c0.444-0.029 0.883-0.100 1.313-0.210 0.218-0.056 0.432-0.123 0.641-0.201 0.125-0.047 0.249-0.099 0.370-0.156 0.293-0.138 0.578-0.302 0.853-0.490 0.547-0.378 1.026-0.815 1.421-1.298 1.060-1.292 1.701-2.995 1.696-4.946h2.531c0.009 0.650-0.080 1.268-0.268 1.799-0.265 0.754-0.767 1.308-1.398 1.516 1.250 0.641 2.113 1.829 2.387 3.215 0.057 0.289 0.085 0.583 0.083 0.879v0.528h2.528v-0.528c0.002-2.135-0.585-4.137-1.606-5.844-1.104-1.857-2.738-3.305-4.676-4.134z"/>
      </svg>
    ),
    "C++": (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.293-1.34-.293-1.848 0L2.26 5.31c-.509.293-.259 1.018.452.69L12 2.226l9.287 3.774c.459.186.73-.124.518-.605l-.411-.395zm0 0M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.293-1.34-.293-1.848 0L2.26 5.31c-.509.293-.259 1.018.452.69L12 2.226l9.287 3.774c.459.186.73-.124.518-.605l-.411-.395z" opacity="0.5"/>
        <path d="M12 2.226L2.713 6l9.287 3.774L21.287 6zm0 3.548l-7.048 2.86 7.048 2.86 7.048-2.86z"/>
        <path d="M2 12h20l-10 8z"/>
      </svg>
    ),
    JavaScript: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.12c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.81 3.541.57 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.034.069zm-4.988-1.71h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    ),
  };

  return iconMap[skill] || (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            const skills = entry.target.querySelectorAll(".skill-pill");
            skills.forEach((skill, index) => {
              setTimeout(() => {
                skill.classList.add("animate-slide-up");
              }, index * 30);
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

  const handleSkillMouseMove = (e: React.MouseEvent<HTMLElement>, skillName: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePositions(prev => ({ ...prev, [skillName]: { x, y } }));
  };

  // Categorize skills
  const programmingLanguages = profile.skills.filter((s) =>
    ["C", "C++", "C#", "Dart", "Python", "JavaScript"].includes(s)
  );
  const mobileSkills = profile.skills.filter((s) =>
    ["Flutter", "Firebase / FCM", "Isar"].includes(s)
  );
  const backendSkills = profile.skills.filter((s) =>
    [".NET", "Node.js", "REST APIs", "SQL", "WinForms"].includes(s)
  );
  const otherSkills = profile.skills.filter(
    (s) => !programmingLanguages.includes(s) && !mobileSkills.includes(s) && !backendSkills.includes(s)
  );

  const SkillPill = ({ skill, color, delay }: { skill: string; color: string; delay: number }) => {
    const mousePos = mousePositions[skill] || { x: 0, y: 0 };
    const isHovered = hoveredSkill === skill;

    return (
      <span
        className="skill-pill relative overflow-hidden cursor-pointer"
        style={{
          animationDelay: `${delay}ms`,
          transform: `perspective(1000px) rotateX(${-mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg) translateZ(${isHovered ? '10px' : '0px'})`,
          transition: 'transform 0.3s ease-out',
        }}
        onMouseMove={(e) => handleSkillMouseMove(e, skill)}
        onMouseEnter={() => setHoveredSkill(skill)}
        onMouseLeave={() => {
          setHoveredSkill(null);
          setMousePositions(prev => ({ ...prev, [skill]: { x: 0, y: 0 } }));
        }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity blur-xl"
          style={{
            backgroundColor: color,
            opacity: isHovered ? 0.3 : 0,
          }}
        ></div>
        
        {/* Content */}
        <div 
          className="relative bg-[#1A1A22] border-2 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 font-semibold text-xs md:text-sm flex items-center gap-2 md:gap-2.5 transition-all duration-300 min-w-0"
          style={{
            borderColor: isHovered ? color : '#2f2a37',
            backgroundColor: isHovered ? `${color}15` : '#1A1A22',
            boxShadow: isHovered ? `0 10px 30px ${color}30, inset 0 0 20px ${color}10` : 'none',
          }}
        >
          <span className="flex-shrink-0">
            <SkillIcon skill={skill} />
          </span>
          <span className="text-[#E5E7EB] truncate max-w-[150px] sm:max-w-[200px]">{skill}</span>
          
          {/* Hover indicator */}
          {isHovered && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: color }}></div>
          )}
        </div>
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-9.5 scroll-mt-20 relative"
      aria-labelledby="skills-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#6D28D9] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#9333EA] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="skills-heading" className="m-0 mb-2 text-2xl sm:text-3xl md:text-4xl tracking-tight font-black">
              <span className="gradient-text flex items-center gap-2 sm:gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#9333EA] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m5-16v4m-2-2h4M9 9h6l-3 3-3-3zm0 0v6m0 0l3 3 3-3m-3 3v-6" />
                </svg>
                Skills
              </span>
            </h2>
            <p className="text-[#9CA3AF] mb-6 md:mb-8 text-base sm:text-lg">
              Technologies and tools I use
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#9CA3AF] bg-[#1A1A22] px-4 py-2 rounded-xl border border-[#2f2a37]">
            <svg className="w-5 h-5 animate-spin-slow text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-sm font-semibold">{profile.skills.length} Technologies</span>
          </div>
        </div>

        {/* Programming Languages */}
        {programmingLanguages.length > 0 && (
          <div className="mb-8 card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c4b5fd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-xl font-bold text-[#E5E7EB] mb-5 flex items-center gap-3 relative z-10">
              <div className="w-4 h-4 rounded-full bg-[#c4b5fd] animate-pulse shadow-lg shadow-[#c4b5fd]/50"></div>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#c4b5fd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Programming Languages
              </span>
            </h3>
            <div className="flex flex-wrap gap-3 relative z-10" role="list" aria-label="Programming languages">
              {programmingLanguages.map((skill, idx) => (
                <SkillPill key={skill} skill={skill} color="#c4b5fd" delay={idx * 30} />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Skills */}
        {mobileSkills.length > 0 && (
          <div className="mb-8 card group relative overflow-hidden">
            {/* Category background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-xl font-bold text-[#E5E7EB] mb-5 flex items-center gap-3 relative z-10">
              <div className="w-4 h-4 rounded-full bg-[#6D28D9] animate-pulse shadow-lg shadow-[#6D28D9]/50"></div>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Mobile Development
              </span>
            </h3>
            <div className="flex flex-wrap gap-3 relative z-10" role="list" aria-label="Mobile development skills">
              {mobileSkills.map((skill, idx) => (
                <SkillPill key={skill} skill={skill} color="#6D28D9" delay={idx * 30} />
              ))}
            </div>
          </div>
        )}

        {/* Backend Skills */}
        {backendSkills.length > 0 && (
          <div className="mb-8 card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-xl font-bold text-[#E5E7EB] mb-5 flex items-center gap-3 relative z-10">
              <div className="w-4 h-4 rounded-full bg-[#9333EA] animate-pulse shadow-lg shadow-[#9333EA]/50" style={{ animationDelay: '0.2s' }}></div>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Backend & Tools
              </span>
            </h3>
            <div className="flex flex-wrap gap-3 relative z-10" role="list" aria-label="Backend and tools">
              {backendSkills.map((skill, idx) => (
                <SkillPill key={skill} skill={skill} color="#9333EA" delay={(idx + programmingLanguages.length + mobileSkills.length) * 30} />
              ))}
            </div>
          </div>
        )}

        {/* Other Skills */}
        {otherSkills.length > 0 && (
          <div className="card group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c4b5fd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-xl font-bold text-[#E5E7EB] mb-5 flex items-center gap-3 relative z-10">
              <div className="w-4 h-4 rounded-full bg-[#c4b5fd] animate-pulse shadow-lg shadow-[#c4b5fd]/50" style={{ animationDelay: '0.4s' }}></div>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#c4b5fd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Other
              </span>
            </h3>
            <div className="flex flex-wrap gap-3 relative z-10" role="list" aria-label="Other skills">
              {otherSkills.map((skill, idx) => (
                <SkillPill key={skill} skill={skill} color="#c4b5fd" delay={(idx + programmingLanguages.length + mobileSkills.length + backendSkills.length) * 30} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
