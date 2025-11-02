"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-[#2f2a37] z-50"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#c4b5fd] transition-all duration-150 ease-out shadow-lg shadow-[#6D28D9]/50"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
}

