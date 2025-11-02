export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer
      className="border-t border-[#2f2a37] mt-9 py-8 text-center"
      role="contentinfo"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
          <svg className="w-5 h-5 text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>© {currentYear} Atilla Mercimek — Mobile Developer</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Made with Next.js & Tailwind
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Open Source
          </span>
        </div>
      </div>
    </footer>
  );
}
