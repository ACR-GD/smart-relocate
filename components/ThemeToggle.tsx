"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-800/80 hover:border-slate-500/80 transition-colors"
      aria-label="Toggle light/dark mode"
    >
      {theme === "dark" ? (
        <Sun className="w-3 h-3" />
      ) : (
        <Moon className="w-3 h-3" />
      )}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
