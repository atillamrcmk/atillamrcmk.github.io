"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getTheme(): "light" | "dark" {
  try {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) return saved;
  } catch {
    /* ignore */
  }
  return "dark";
}

function getServerTheme(): "light" | "dark" {
  return "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-md border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--text)]"
      aria-label={theme === "light" ? "Dark theme" : "Light theme"}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
