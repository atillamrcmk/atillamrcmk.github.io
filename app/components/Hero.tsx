"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "./data/profile";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, experience: 0, tech: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Flutter Developer";

  // Typing animation
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        setTimeout(() => {
          currentIndex = 0;
          setTypedText("");
          setIsTyping(true);
          // Restart typing after pause
          const restartInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
              setTypedText(fullText.slice(0, currentIndex + 1));
              currentIndex++;
            } else {
              clearInterval(restartInterval);
            }
          }, 100);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            setStatsVisible(true);
            
            // Counter animation with easing
            const targets = { projects: 5, experience: 3, tech: 15 };
            const duration = 2000;
            const steps = 60;
            const increment = duration / steps;
            
            let currentStep = 0;
            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              const easeOut = 1 - Math.pow(1 - progress, 3);
              
              setCounters({
                projects: Math.floor(targets.projects * easeOut),
                experience: Math.floor(targets.experience * easeOut),
                tech: Math.floor(targets.tech * easeOut),
              });
              
              if (currentStep >= steps) {
                clearInterval(interval);
                setCounters(targets);
              }
            }, increment);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section mt-7 mb-32 md:mb-40 rounded-2xl border border-[#2f2a37] pt-24 pb-8 px-8 md:pt-40 md:pb-14 md:px-14 text-center bg-[#1A1A22] relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(109, 40, 217, 0.15) 0%, transparent 50%),
          radial-gradient(circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          #1A1A22
        `,
      }}
    >
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#6D28D9] rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        ></div>
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9333EA] rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${(mousePosition.x - 0.5) * -25}px, ${(mousePosition.y - 0.5) * -25}px)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#c4b5fd] rounded-full blur-3xl animate-pulse opacity-60"
          style={{
            animationDelay: '2s',
            transform: `translate(calc(-50% + ${(mousePosition.x - 0.5) * 20}px), calc(-50% + ${(mousePosition.y - 0.5) * 20}px))`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        ></div>
      </div>

      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(109, 40, 217, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(109, 40, 217, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: `${mousePosition.x * 20}px ${mousePosition.y * 20}px`,
          transition: 'background-position 0.3s ease-out'
        }}
      ></div>

      {/* Interactive particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#6D28D9] rounded-full opacity-60 animate-float"
            style={{
              left: `${5 + (i * 4.5)}%`,
              top: `${10 + (i % 5) * 18}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 3)}s`,
              transform: `translate(${(mousePosition.x - 0.5) * (10 + i * 2)}px, ${(mousePosition.y - 0.5) * (10 + i * 2)}px)`,
            }}
          ></div>
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-[#9333EA] rounded-full opacity-40 animate-float"
            style={{
              left: `${10 + (i * 11)}%`,
              top: `${15 + (i % 4) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 3D Decorative elements */}
      <div 
        className="absolute top-10 right-10 w-24 h-24 border border-[#6D28D9]/30 rounded-full hidden md:block opacity-50"
        style={{
          transform: `rotate(${mousePosition.x * 360}deg) scale(${1 + mousePosition.y * 0.2})`,
          transition: 'transform 0.3s ease-out',
          boxShadow: `0 0 30px rgba(109, 40, 217, 0.3)`
        }}
      ></div>
      <div 
        className="absolute bottom-10 left-10 w-20 h-20 border border-[#9333EA]/30 rounded-full hidden md:block opacity-50"
        style={{
          animationDelay: '1s',
          transform: `rotate(${-mousePosition.x * 360}deg) scale(${1 + (1 - mousePosition.y) * 0.2})`,
          transition: 'transform 0.3s ease-out',
          boxShadow: `0 0 25px rgba(147, 51, 234, 0.3)`
        }}
      ></div>

      <div className="relative z-10">
        {/* 3D Profile Photo with enhanced effects */}
        <div className="flex justify-center mb-12 md:mb-16 pt-32 md:pt-48">
          <div className="relative group" style={{
            transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${-(mousePosition.y - 0.5) * 5}deg)`,
            transition: 'transform 0.3s ease-out'
          }}>
            {/* Multiple glow rings */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9] to-[#9333EA] rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-glow"></div>
            <div className="absolute -inset-3 bg-gradient-to-r from-[#9333EA] to-[#c4b5fd] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#2f2a37] shadow-[0_20px_60px_rgba(109,40,217,0.4)] group-hover:border-[#6D28D9] group-hover:shadow-[0_30px_80px_rgba(109,40,217,0.6)] transition-all duration-300">
              <img
                src="/profile-photo.jpg"
                alt={profile.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-[#6D28D9] to-[#9333EA] flex items-center justify-center text-4xl md:text-5xl font-black text-white">
                        ${profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    `;
                  }
                }}
              />
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity"></div>
            </div>
            
            {/* Enhanced status indicator */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-[#1A1A22] shadow-lg flex items-center justify-center animate-pulse">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Floating "Available" badge with animation */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#6D28D9] to-[#9333EA] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-xl animate-float flex items-center gap-1.5">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Available for Work</span>
            </div>
          </div>
        </div>

        {/* Name and Title - Centered and Professional */}
        <div className="mb-12 md:mb-16">
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6"
            style={{
              transform: `translateZ(0)`,
              textShadow: `0 0 30px rgba(109, 40, 217, 0.3)`
            }}
          >
            <span className="block animate-fade-in bg-gradient-to-r from-white via-[#E5E7EB] to-white bg-clip-text text-transparent drop-shadow-2xl">
              {profile.name}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-[#6D28D9] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#E5E7EB] text-center tracking-wide">
              {profile.title}
            </p>
          </div>
        </div>

        {/* Enhanced 3D Stats Cards */}
        <div className="flex justify-center gap-8 md:gap-16 lg:gap-20 mb-16 md:mb-20 flex-wrap">
          {[
            { icon: "projects", value: counters.projects, label: "Projects", color: "#6D28D9", delay: 0 },
            { icon: "experience", value: counters.experience, label: "Years Experience", color: "#9333EA", delay: 0.1 },
            { icon: "tech", value: counters.tech, label: "Technologies", color: "#c4b5fd", delay: 0.2 },
          ].map((stat, idx) => (
            <div
              key={stat.icon}
              className="text-center group cursor-default relative"
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 3}deg) rotateX(${-(mousePosition.y - 0.5) * 3}deg)`,
                transition: 'transform 0.3s ease-out',
                animationDelay: `${stat.delay}s`
              }}
            >
              {/* Glow halo */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"
                style={{ backgroundColor: stat.color }}
              ></div>
              
              {/* Icon container with 3D effect */}
              <div 
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                  borderColor: `${stat.color}40`,
                  boxShadow: `0 10px 30px ${stat.color}20, inset 0 0 20px ${stat.color}10`
                }}
              >
                {stat.icon === "projects" && (
                  <svg className="w-8 h-8 md:w-10 md:h-10 group-hover:animate-bounce transition-transform" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )}
                {stat.icon === "experience" && (
                  <svg className="w-8 h-8 md:w-10 md:h-10 group-hover:animate-bounce transition-transform" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {stat.icon === "tech" && (
                  <svg className="w-8 h-8 md:w-10 md:h-10 group-hover:animate-bounce transition-transform" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
              </div>
              
              <div className="relative">
                <div 
                  className="text-5xl md:text-6xl font-black mb-2 gradient-text drop-shadow-lg"
                  style={{ textShadow: `0 0 20px ${stat.color}40` }}
                >
                  {stat.value}+
                </div>
                <div className="text-sm text-[#9CA3AF] font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced 3D CTA Buttons */}
        <div className="flex justify-center gap-5 md:gap-6 flex-wrap mb-12">
          <a
            href="/Atilla-Mercimek-CV.pdf"
            download
            className="btn btn-primary group relative overflow-hidden min-w-[200px] h-[56px] text-base font-bold"
            aria-label="CV PDF dosyasını indir"
            style={{
              transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 2}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#9333EA] via-[#6D28D9] to-[#9333EA] opacity-0 group-hover:opacity-100 transition-opacity bg-[length:200%_100%] animate-shimmer"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </span>
          </a>
          <a
            href="#projects"
            className="btn group relative overflow-hidden min-w-[200px] h-[56px] text-base font-bold border-2 hover:border-[#6D28D9] backdrop-blur-sm"
              aria-label="View Projects"
            style={{
              background: 'rgba(26, 26, 34, 0.8)',
              transform: `perspective(1000px) rotateY(${-(mousePosition.x - 0.5) * 2}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <span className="absolute inset-0 bg-[#6D28D9] opacity-0 group-hover:opacity-10 transition-opacity"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View Projects
            </span>
          </a>
        </div>

        {/* Enhanced Scroll indicator with text */}
        <div className="pt-4">
          <a href="#projects" className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors group flex flex-col items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider">Explore</span>
            <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
