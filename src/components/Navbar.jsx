import { Menu, MoonStar, SunMedium, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HOME_LINKS = [{ href: "#calculator", label: "Calculator" }, { href: "#solutions", label: "Solutions" }];
const PAGE_LINKS = [
  { page: "ecoflow", label: "EcoFlow Backup" },
  { page: "electric-cars", label: "Electric Cars" },
  { page: "contact", label: "Contact" },
  { page: "privacy", label: "Privacy" },
];

export default function Navbar({ darkMode, onToggleTheme, activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);
  return (
    <header className="eco-nav">
      <div className="eco-nav__inner">
        <button className="eco-brand" onClick={() => { onNavigate("home"); close(); }} aria-label="EcoZen Solar home">
          <img src="/logo.png" alt="EcoZen Solar" />
          <span><b>ECOZEN</b><small>SOLAR</small></span>
        </button>
        <nav className="eco-nav__links">
          <button className={activePage === "home" ? "is-active" : ""} onClick={() => onNavigate("home")}>Home</button>
          {activePage === "home" && <div className="eco-nav__solutions"><a href="#solutions">Solutions <ChevronDown size={14} /></a><div className="eco-nav__dropdown"><a href="#solutions">Rooftop Solar</a><a href="#solutions">Portable Backup</a><button onClick={() => onNavigate("ecoflow")}>EcoFlow Backup</button></div></div>}
          {PAGE_LINKS.map(({ page, label }) => <button key={page} className={activePage === page ? "is-active" : ""} onClick={() => onNavigate(page)}>{label}</button>)}
        </nav>
        <div className="eco-nav__actions">
          <button className="eco-theme" onClick={onToggleTheme} aria-label="Toggle color theme">{darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}</button>
          {activePage !== "quote" && <button className="eco-button eco-button--gold eco-nav__quote" onClick={() => onNavigate("quote")}>Get a Quote <ArrowUpRight size={16} /></button>}
          <button className="eco-menu-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && <motion.nav className="eco-mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
          <button onClick={() => { onNavigate("home"); close(); }}>Home</button>
          {HOME_LINKS.map(({ href, label }) => <a key={href} href={href} onClick={close}>{label}</a>)}
          {PAGE_LINKS.map(({ page, label }) => <button key={page} onClick={() => { onNavigate(page); close(); }}>{label}</button>)}
          <button className="eco-button eco-button--gold" onClick={() => { onNavigate("quote"); close(); }}>Get a Quote <ArrowUpRight size={16} /></button>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}
