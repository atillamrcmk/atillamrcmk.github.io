"use client";

import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Don't render on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsVisible(false);
      return;
    }

    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth performance
      rafId = requestAnimationFrame(() => {
        const deltaX = Math.abs(e.clientX - lastX);
        const deltaY = Math.abs(e.clientY - lastY);
        
        // Only update if movement is significant (performance optimization)
        if (deltaX > 2 || deltaY > 2) {
          setMousePosition({ x: e.clientX, y: e.clientY });
          lastX = e.clientX;
          lastY = e.clientY;
        }
      });
    };

    // Debounced hover detection
    let hoverTimeout: NodeJS.Timeout;
    const handleElementHover = (e: MouseEvent) => {
      clearTimeout(hoverTimeout);
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".project-card") ||
        target.closest(".skill-pill") ||
        target.closest(".card");

      hoverTimeout = setTimeout(() => {
        setIsHovering(isInteractive);
      }, 10);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(hoverTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Simplified - only outer ring */}
      <div
        className="fixed w-6 h-6 border-2 border-[#6D28D9]/20 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out mix-blend-difference"
        style={{
          left: `${mousePosition.x - 12}px`,
          top: `${mousePosition.y - 12}px`,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      ></div>
      {/* Inner dot - smaller and simpler */}
      <div
        className="fixed w-1.5 h-1.5 bg-[#9333EA] rounded-full pointer-events-none z-50 transition-all duration-150 ease-out mix-blend-difference"
        style={{
          left: `${mousePosition.x - 3}px`,
          top: `${mousePosition.y - 3}px`,
        }}
      ></div>
    </>
  );
}
