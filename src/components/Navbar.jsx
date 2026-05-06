import { MoonStar, SunMedium, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// LogoImg — uses the uploaded PNG; falls back to icon+text if file not found
function LogoImg() {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <span
        className="flex items-center justify-center rounded-2xl px-3 py-1"
        style={{ background: "rgba(6,13,8,0.82)", boxShadow: "0 2px 12px rgba(0,0,0,0.30)" }}
      >
        <img
          src="/logo.png"
          alt="Ecozen Solar"
          className="h-24 w-auto object-contain"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="grid h-9 w-9 place-items-center rounded-xl text-white"
        style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}
      >
        <Zap size={18} fill="white" strokeWidth={0} />
      </span>
      <span className="text-gradient text-base tracking-tight">Ecozen Solar</span>
    </span>
  );
}

// anchor-only links (home page sections)
const HOME_LINKS = [
  { href: "#calculator", label: "Calculator" },
  { href: "#solutions",  label: "Solutions" },
];

// page links that trigger full-page navigation
const PAGE_LINKS = [
  { page: "ecoflow",       label: "EcoFlow Backup" },
  { page: "electric-cars", label: "Electric Cars" },
  { page: "contact",       label: "Contact" },
  { page: "privacy",       label: "Privacy" },
  { page: "quote",         label: "Get a Quote" },
];

export default function Navbar({ darkMode, onToggleTheme, activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const textColor = darkMode ? "rgba(245,245,247,0.82)" : "rgba(29,29,31,0.80)";
  const activeColor = "#30d158";

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: darkMode ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
        borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
      }}
    >
      <div className="section-shell flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <button onClick={() => { onNavigate("home"); setMobileOpen(false); }} className="flex-shrink-0">
          <LogoImg />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {activePage === "home" && HOME_LINKS.map(({ href, label }) => (
            <a key={label} href={href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/8"
              style={{ color: textColor, letterSpacing: "-0.01em" }}>
              {label}
            </a>
          ))}
          {PAGE_LINKS.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
              style={{
                color: activePage === page ? activeColor : textColor,
                background: activePage === page ? "rgba(48,209,88,0.10)" : "transparent",
                letterSpacing: "-0.01em",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={onToggleTheme}
            className="grid h-8 w-8 place-items-center rounded-full transition"
            style={{
              background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              color: darkMode ? "#f5f5f7" : "#1d1d1f",
            }}
            aria-label="Toggle color theme"
          >
            {darkMode ? <SunMedium size={15} /> : <MoonStar size={15} />}
          </motion.button>

          {/* Quote CTA */}
          {activePage !== "quote" && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate("quote")}
              className="btn-primary hidden sm:inline-flex"
              style={{ padding: "0.5rem 1.125rem", fontSize: "0.8125rem" }}
            >
              Free Quote
            </motion.button>
          )}

          {/* Mobile hamburger */}
          <button
            className="grid h-8 w-8 place-items-center rounded-full md:hidden"
            style={{ background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: darkMode ? "#f5f5f7" : "#1d1d1f" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t md:hidden"
          style={{ borderColor: darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
        >
          <nav className="section-shell flex flex-col gap-0.5 py-3">
            {activePage === "home" && HOME_LINKS.map(({ href, label }) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium"
                style={{ color: textColor }}>
                {label}
              </a>
            ))}
            {PAGE_LINKS.map(({ page, label }) => (
              <button key={page}
                onClick={() => { onNavigate(page); setMobileOpen(false); }}
                className="rounded-xl px-4 py-2.5 text-left text-sm font-medium"
                style={{ color: activePage === page ? activeColor : textColor }}>
                {label}
              </button>
            ))}
            <div className="pt-2">
              <button onClick={() => { onNavigate("quote"); setMobileOpen(false); }} className="btn-primary w-full justify-center">
                Get a Free Quote
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
