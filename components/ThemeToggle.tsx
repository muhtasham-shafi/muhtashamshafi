"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="rounded-full p-2 text-muted transition-colors hover:text-text"
    >
      <Moon size={18} className="icon-moon" />
      <Sun size={18} className="icon-sun" />
    </button>
  );
}
