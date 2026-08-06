"use client";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("soga-theme", next);
  } catch {}
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 ${className}`}
      aria-label="Changer de thème (clair / sombre)"
    >
      <svg viewBox="0 0 20 20" fill="none" className="theme-icon-sun w-5 h-5" aria-hidden>
        <path
          d="M17 11.5A7.5 7.5 0 018.5 3a7.5 7.5 0 108.5 8.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <svg viewBox="0 0 20 20" fill="none" className="theme-icon-moon w-5 h-5" aria-hidden>
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.66 4.34l-1.41 1.41M5.75 14.25l-1.41 1.41M15.66 15.66l-1.41-1.41M5.75 5.75L4.34 4.34"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
