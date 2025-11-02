"use client";

export default function SectionDivider() {
  return (
    <div className="py-12 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <div className="relative w-full max-w-2xl">
        {/* Gradient line */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6D28D9] to-transparent opacity-50"></div>
        </div>
        
        {/* Animated circle */}
        <div className="relative flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#1A1A22] border-2 border-[#6D28D9]/30 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6D28D9]/20 to-[#9333EA]/20 animate-pulse"></div>
            <svg
              className="w-8 h-8 text-[#6D28D9]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

