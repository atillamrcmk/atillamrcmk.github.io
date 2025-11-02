"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "./data/profile";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            const buttons = entry.target.querySelectorAll(".social-btn");
            buttons.forEach((btn, index) => {
              setTimeout(() => {
                btn.classList.add("animate-slide-up");
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

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    sectionRef.current?.addEventListener("mousemove", handleMouseMove);

    return () => {
      observer.disconnect();
      sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-9.5 scroll-mt-20 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(109, 40, 217, 0.3) 0%, transparent 50%)`,
        }}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="contact-heading" className="m-0 mb-2 text-3xl md:text-4xl tracking-tight font-black">
              <span className="gradient-text flex items-center gap-3">
                <svg className="w-8 h-8 text-[#6D28D9] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </span>
            </h2>
            <p className="text-[#9CA3AF] mb-8 text-lg">
              Get in touch with me for new projects, ideas, or opportunities
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Enhanced Social Media Card */}
          <div className="card group relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/10 via-[#9333EA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#6D28D9] rounded-full opacity-40 animate-float"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 text-[#E5E7EB] flex items-center gap-2">
                <svg className="w-6 h-6 text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Social Media
              </h3>
              <p className="text-[#9CA3AF] mb-6 text-sm">
                You can reach me through the following platforms.
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    href: `https://${profile.github}`,
                    label: "GitHub profile",
                    icon: (
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    ),
                    text: "GitHub",
                    color: "#6D28D9",
                  },
                  {
                    href: `https://${profile.linkedin}`,
                    label: "LinkedIn profile",
                    icon: (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    ),
                    text: "LinkedIn",
                    color: "#9333EA",
                  },
                  {
                    href: `mailto:${profile.email}`,
                    label: "Send email",
                    icon: "email",
                    text: "Email",
                    color: "#c4b5fd",
                  },
                ].map((social, idx) => (
                  <a
                    key={social.text}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="social-btn btn flex-1 min-w-[140px] group/btn relative overflow-hidden"
                    aria-label={social.label}
                    style={{
                      background: `linear-gradient(135deg, ${social.color}15, ${social.color}05)`,
                      borderColor: `${social.color}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = social.color;
                      e.currentTarget.style.background = `${social.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${social.color}40`;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${social.color}15, ${social.color}05)`;
                    }}
                  >
                    <svg
                      className="w-6 h-6 mr-2 transition-all duration-300"
                      fill={social.icon === "email" ? "none" : "currentColor"}
                      stroke={social.icon === "email" ? "currentColor" : undefined}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {social.icon === "email" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      ) : (
                        social.icon
                      )}
                    </svg>
                    {social.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="card"
            aria-labelledby="contact-form-heading"
          >
            <h3 id="contact-form-heading" className="text-xl font-bold mb-6 text-[#E5E7EB]">
              Send Message
            </h3>
              
            {["name", "email", "message"].map((field) => (
              <div key={field} className="mb-4">
                {field === "message" ? (
                  <textarea
                    id={field}
                    rows={5}
                    className={`w-full p-4 rounded-lg border bg-[#13131a] text-[#E5E7EB] resize-none focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] transition-all ${
                      focused === field ? "border-[#6D28D9]" : "border-[#2f2a37]"
                    }`}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                  />
                ) : (
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    className={`w-full p-4 rounded-lg border bg-[#13131a] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] transition-all ${
                      focused === field ? "border-[#6D28D9]" : "border-[#2f2a37]"
                    }`}
                    placeholder={field === "name" ? "Full Name" : "Email"}
                    required={field !== "message"}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                  />
                )}
              </div>
            ))}
              
            <button
              type="submit"
              className="btn btn-primary w-full h-12 font-semibold"
              disabled={submitted}
            >
              {submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
              
              {submitted && (
                <div className="mt-4 p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 animate-fade-in flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-green-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-green-400 font-medium">
                    Message received! I'll get back to you as soon as possible.
                  </p>
                </div>
              )}
          </form>
        </div>
      </div>
    </section>
  );
}
