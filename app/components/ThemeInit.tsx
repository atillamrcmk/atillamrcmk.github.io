"use client";

import { useEffect } from "react";

/** Applies stored theme preference without a visible control in the main chrome. */
export default function ThemeInit() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved || (prefersDark ? "dark" : "dark");
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.classList.toggle("light", theme === "light");
    } catch {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return null;
}
