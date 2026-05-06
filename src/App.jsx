import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Battery, Leaf, ShieldCheck, Sun, ArrowUpRight, CheckCircle2, Zap } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SavingsCalculator from "./components/SavingsCalculator";
import ProductCard from "./components/ProductCard";
import ScrollProgress from "./components/ScrollProgress";
import SectionReveal from "./components/SectionReveal";
import QuotePage from "./pages/QuotePage";
import EcoFlowPage from "./pages/EcoFlowPage";
import Testimonials from "./components/Testimonials";
import FinancingCalculator from "./components/FinancingCalculator";
import PartnerLogos from "./components/PartnerLogos";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import FAQ from "./components/FAQ";
import ROICalculator from "./components/ROICalculator";
import ElectricCarsPage from "./pages/ElectricCarsPage";

const rooftopProducts = [
  {
    title: "Ecozen Starter 5kW",
    subtitle: "R60,000 - R90,000",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=85",
    description: "Designed for small homes and apartments with seamless essential-load coverage.",
    specs: ["5kW hybrid inverter", "Lithium battery backup", "Tier-1 monocrystalline panels"],
  },
  {
    title: "Ecozen Family 8kW",
    subtitle: "R100,000 - R160,000",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=85",
    description: "Balances comfort and resilience for medium households during daily outages.",
    specs: ["8kW inverter class", "Expandable battery bank", "Live app monitoring"],
  },
  {
    title: "Ecozen Executive 10kW+",
    subtitle: "R200,000 - R350,000",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
    description: "Whole-home independence architecture for larger properties and premium demand.",
    specs: ["10kW+ inverter platform", "High-capacity storage", "SSEG-compliant installation"],
  },
];

const portableProducts = [
  {
    title: "EcoFlow Entry",
    subtitle: "R4,500 - R6,500",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
    description: "Compact power for study, work, and entertainment essentials.",
    specs: ["245Wh class", "Silent indoor-safe", "Fast AC recharge"],
  },
  {
    title: "EcoFlow Mid-Range",
    subtitle: "R12,000 - R16,000",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=85",
    description: "Powers a fridge, desk setup, and kitchen devices in one compact unit.",
    specs: ["1kWh class", "1800W output", "Solar blanket ready"],
  },
  {
    title: "EcoFlow Pro Portable",
    subtitle: "R22,000 - R35,000",
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=85",
    description: "Extended backup for heavier appliances and longer outage windows.",
    specs: ["2kWh+ class", "Expandable ecosystem", "Local warranty support"],
  },
];

function Feature({ icon: Icon, title, text, accent = false }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.10)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="glass-card flex flex-col gap-4 p-6"
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-2xl"
        style={{ background: accent ? "#ff9f0a" : "#30d158" }}
      >
        <Icon size={18} color="white" />
      </span>
      <div>
        <h3 className="text-base font-semibold" style={{ color: "var(--text)", letterSpacing: "-0.015em" }}>{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{text}</p>
      </div>
    </motion.article>
  );
}

const PRICING = [
  { tier: "Starter",    size: "3–5 kW",  best: "Apartments & small homes",  cost: "R60k – R90k",   features: ["5kW hybrid inverter","Lithium battery","Tier-1 panels","CoC certificate"] },
  { tier: "Family",     size: "5–8 kW",  best: "Medium homes",              cost: "R100k – R160k", features: ["8kW inverter class","Expandable battery","App monitoring","2-yr workmanship"] },
  { tier: "Executive",  size: "10 kW+",  best: "Large homes & full offgrid", cost: "R200k – R350k", features: ["10kW+ platform","High-cap storage","SSEG compliant","Priority support"], highlight: true },
  { tier: "Commercial", size: "Custom",  best: "Offices & retail",           cost: "From R400k",    features: ["Scalable arrays","Grid-tie feed-in","Tax Section 12B","Dedicated PM"] },
];

const COMMERCIAL_USE_CASES = [
  {
    title: "Farming & Irrigation",
    summary: "Run boreholes, pivots, and packhouse operations without diesel dependency.",
    savings: "Typical savings: R45k - R220k/month",
    points: ["Solar-driven pump schedules", "Cold room uptime during outages", "Lower diesel and maintenance spend"],
  },
  {
    title: "Warehousing & Cold Storage",
    summary: "Protect temperature-sensitive inventory and reduce peak-demand penalties.",
    savings: "Typical savings: R80k - R350k/month",
    points: ["Peak shaving with battery dispatch", "Backup for refrigeration systems", "Power quality for automation lines"],
  },
  {
    title: "Retail, Offices & Multi-Site",
    summary: "Keep tills, lighting, security, and connectivity running across branches.",
    savings: "Typical savings: R25k - R140k/month",
    points: ["Portfolio-wide monitoring", "Branch-level load profiling", "Section 12B tax optimisation"],
  },
];

function PricingCard({ tier, size, best, cost, features, highlight = false }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`glass-card relative flex flex-col gap-5 p-6 ${highlight ? "neon-border" : ""}`}
    >
      {highlight && (
        <span className="tag absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</span>
      )}
      <div>
        <p className="mb-1 text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>Ecozen {tier}</p>
        <p className="text-2xl font-bold" style={{ color: "var(--text)", letterSpacing: "-0.025em" }}>{cost}</p>
        <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>{size} · {best}</p>
      </div>
      <ul className="flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text)" }}>
            <CheckCircle2 size={14} style={{ color: "#30d158", flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>
      <button onClick={() => window._ecozNavigate?.("quote")} className={highlight ? "btn-primary w-full justify-center" : "btn-ghost w-full justify-center"}>
        Get a Quote <ArrowUpRight size={14} />
      </button>
    </motion.div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('darkMode') === 'true' || 
           (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [activeCatalog, setActiveCatalog] = useState("rooftop");
  const [activePage, setActivePage] = useState("home");

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    // Apply dark class to html element so body/root CSS vars update correctly
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // expose navigate so PricingCard (outside App scope) can use it
  window._ecozNavigate = navigate;

  const products = useMemo(
    () => (activeCatalog === "rooftop" ? rooftopProducts : portableProducts),
    [activeCatalog]
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <ScrollProgress />
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((v) => !v)} activePage={activePage} onNavigate={navigate} />
      {activePage === "quote" && <QuotePage onNavigate={navigate} />}
      {activePage === "ecoflow" && <EcoFlowPage onNavigate={navigate} />}
      {activePage === "contact" && <ContactPage onNavigate={navigate} />}
      {activePage === "privacy" && <PrivacyPolicyPage onNavigate={navigate} />}
  {activePage === "electric-cars" && <ElectricCarsPage onNavigate={navigate} />}

      {activePage === "home" && (<>
      <Hero />
      <PartnerLogos />

      {/* ── Features bento ─────────────────────── */}
      <SectionReveal className="section-shell py-20">
        <div className="mb-8">
          <span className="tag mb-4 inline-flex"><Zap size={11} /> Why Ecozen</span>
          <h2 className="display-lg" style={{ color: "var(--text)" }}>Built for South Africa.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Feature icon={Battery} title="Battery-First Design"
            text="Advanced lithium storage keeps your home stable through every load-shedding cycle." />
          <Feature icon={Sun} title="Solar-Optimised Panels"
            text="Tier-1 monocrystalline panels selected specifically for South African sun angles." />
          <Feature icon={Leaf} title="Sustainable Returns" accent
            text="Lower grid dependency, reduced emissions, and systems designed for 25+ year yield." />
        </div>
      </SectionReveal>

      {/* ── Savings Calculator ─────────────────── */}
      <SectionReveal>
        <SavingsCalculator />
      </SectionReveal>

      {/* ── Financing Calculator ───────────────── */}
      <FinancingCalculator />

      {/* ── Pricing table ──────────────────────── */}
      <SectionReveal className="bg-section-alt py-20">
        <div className="section-shell">
        <span className="tag mb-4 inline-flex">2026 Pricing Guide</span>
        <h2 className="display-lg mb-10" style={{ color: "var(--text)" }}>
          Transparent investment,{" "}
          <span className="text-gradient">all-inclusive.</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((p) => <PricingCard key={p.tier} {...p} />)}
        </div>
        </div>
      </SectionReveal>

      {/* ── Commercial use cases (incl. farming) ─────── */}
      <SectionReveal className="section-shell py-20">
        <div className="mb-8 max-w-3xl">
          <span className="tag mb-4 inline-flex"><ShieldCheck size={11} /> Commercial Solar</span>
          <h2 className="display-lg" style={{ color: "var(--text)" }}>
            Commercial systems built for{" "}
            <span className="text-gradient">business and farming.</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            From irrigation pumping and dairy cooling to retail branches and warehouses, Ecozen designs
            commercial-scale systems that cut diesel reliance, stabilise operations, and improve monthly cash flow.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {COMMERCIAL_USE_CASES.map((useCase) => (
            <motion.article
              key={useCase.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass-card flex flex-col gap-4 p-6"
            >
              <div>
                <p className="mb-1 text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>
                  {useCase.savings}
                </p>
                <h3 className="text-base font-semibold" style={{ color: "var(--text)", letterSpacing: "-0.015em" }}>
                  {useCase.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {useCase.summary}
                </p>
              </div>

              <ul className="space-y-2.5">
                {useCase.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text)" }}>
                    <CheckCircle2 size={14} style={{ color: "#30d158", flexShrink: 0 }} />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => navigate("quote")} className="btn-primary">
            Get Commercial Quote <ArrowUpRight size={14} />
          </button>
          <button onClick={() => navigate("contact")} className="btn-ghost">
            Discuss Farm Solar
          </button>
        </div>
      </SectionReveal>

      {/* ── Product catalog ────────────────────── */}
      <section id="solutions" className="section-shell py-20">
        <SectionReveal className="mb-6 max-w-3xl">
          <span className="tag mb-4 inline-flex">Flexible Energy Catalog</span>
          <h2 className="display-lg" style={{ color: "var(--text)" }}>
            Rooftop systems{" "}
            <span className="text-gradient">or portable</span> backup?
          </h2>
        </SectionReveal>

        <SectionReveal className="mb-8 flex gap-2">
          {["rooftop", "portable"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCatalog(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                activeCatalog === cat
                  ? "btn-primary"
                  : "btn-ghost text-slatezen dark:text-white"
              }`}
            >
              {cat === "rooftop" ? "Rooftop Solar" : "Portable Backup"}
            </button>
          ))}
        </SectionReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCatalog}
            id="ecoflow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((p) => <ProductCard key={p.title} {...p} />)}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Quote CTA ──────────────────────────── */}
      <SectionReveal className="bg-section-alt py-16" id="quote">
        <div className="section-shell">
          <div
            className="neon-border relative overflow-hidden p-10 md:p-14"
            style={{ borderRadius: "1.5rem", background: darkMode ? "rgba(28,28,30,0.90)" : "rgba(255,255,255,0.95)" }}
          >
            <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <span className="tag mb-4 inline-flex"><ShieldCheck size={11} /> Zero-Pressure Onboarding</span>
                <h2 className="display-lg" style={{ color: "var(--text)" }}>
                  Let's design your{" "}
                  <span className="text-gradient">perfect system.</span>
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  We handle site assessment, SSEG compliance, and installation from start to finish.
                </p>
              </div>
              <button onClick={() => navigate("quote")} className="btn-primary whitespace-nowrap">
                Get a Free Quote <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* ── ROI Calculator ──────────────────────── */}
      <SectionReveal>
        <ROICalculator />
      </SectionReveal>

      {/* ── FAQ ────────────────────────────────── */}
      <SectionReveal>
        <FAQ />
      </SectionReveal>

      {/* ── Testimonials ───────────────────────── */}
      <Testimonials />

      {/* ── Footer ─────────────────────────────── */}
      <footer
        className="border-t py-10"
        style={{ borderColor: "var(--separator)", background: "var(--bg-alt)" }}
      >
        <div className="section-shell">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center rounded-2xl px-3 py-1.5"
                style={{ background: "rgba(0,0,0,0.06)" }}
              >
                <img src="/logo.png" alt="Ecozen Solar" className="h-10 w-auto" onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="inline"; }} />
                <span className="text-gradient font-bold" style={{ display: "none" }}>Ecozen Solar</span>
              </span>
              <p className="text-sm" style={{ color: "var(--text-secondary)", letterSpacing:"-0.01em" }}>Powering a greener tomorrow.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              {["EcoFlow Backup","Electric Cars","Get a Quote","Contact"].map((label) => (
                <button key={label} onClick={() => navigate(label === "EcoFlow Backup" ? "ecoflow" : label === "Electric Cars" ? "electric-cars" : label === "Get a Quote" ? "quote" : "contact")}
                  className="transition hover:opacity-70" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", letterSpacing: "-0.01em" }}>
                  {label}
                </button>
              ))}
              <button onClick={() => navigate("privacy")}
                className="transition hover:opacity-70" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", letterSpacing: "-0.01em" }}>
                Privacy Policy
              </button>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-xs" style={{ borderColor: "var(--separator)", color: "var(--text-secondary)" }}>
            © {new Date().getFullYear()} Ecozen Solar. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <motion.button
        onClick={() => navigate("quote")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="btn-primary fixed bottom-5 right-5 z-50"
        style={{ boxShadow: "0 4px 20px rgba(48,209,88,0.30)" }}
      >
        Get a Quote
      </motion.button>
      </>)}
    </div>
  );
}
