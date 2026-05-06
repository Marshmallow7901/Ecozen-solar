import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Battery, CheckCircle2, Filter, Search, SlidersHorizontal, X, Zap } from "lucide-react";
import SectionReveal from "../components/SectionReveal";

const PRODUCTS = [
  {
    id: 1,
    name: "EcoFlow RIVER 2",
    category: "entry",
    capacity: "256 Wh",
    output: "300 W",
    price: "R4,999",
    image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?auto=format&fit=crop&w=800&q=85",
    badge: "Best Seller",
    badgeColor: "#22c55e",
    desc: "Ultra-compact and lightweight. Charge your laptop, Wi-Fi router, lights, and phone through any loadshedding slot.",
    specs: ["256 Wh LFP battery", "300W AC output", "X-Stream fast charge (60 min)", "Silent fan operation", "5-year warranty"],
    useCases: ["Home office essentials", "Study & devices", "Overnight lighting"],
  },
  {
    id: 2,
    name: "EcoFlow RIVER Pro",
    category: "entry",
    capacity: "720 Wh",
    output: "600 W",
    price: "R8,499",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=85",
    badge: "Popular",
    badgeColor: "#22c55e",
    desc: "Versatile entry-to-mid solution. Power a small fridge, TV, and all devices simultaneously.",
    specs: ["720 Wh LFP battery", "600W AC output", "Solar input ready (200W)", "App control via EcoFlow app", "3-year warranty"],
    useCases: ["Small fridge", "TV & streaming", "Multiple devices"],
  },
  {
    id: 3,
    name: "EcoFlow DELTA 2",
    category: "mid",
    capacity: "1,024 Wh",
    output: "1,800 W",
    price: "R15,999",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=85",
    badge: "Most Versatile",
    badgeColor: "#f59e0b",
    desc: "The all-rounder. Powers fridges, kettles, TVs, and kitchen appliances through full Stage 6 loadshedding.",
    specs: ["1,024 Wh expandable", "1,800W AC (2,400W surge)", "Full solar recharge in 2.7h", "Smart app control", "5-year warranty"],
    useCases: ["Full kitchen essentials", "Home entertainment", "Work-from-home setup"],
  },
  {
    id: 4,
    name: "EcoFlow DELTA 2 Max",
    category: "mid",
    capacity: "2,048 Wh",
    output: "2,400 W",
    price: "R26,999",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=800&q=85",
    badge: "Extended Backup",
    badgeColor: "#f59e0b",
    desc: "Double the capacity of DELTA 2. Extends backup through multiple loadshedding slots without recharging.",
    specs: ["2,048 Wh (expandable to 6,144 Wh)", "2,400W AC output", "Solar + EV-level fast charge", "LFP cells — 3,000+ cycles", "5-year warranty"],
    useCases: ["Overnight full household", "Geyser top-up", "Heavy appliances"],
  },
  {
    id: 5,
    name: "EcoFlow DELTA Pro",
    category: "pro",
    capacity: "3,600 Wh",
    output: "3,600 W",
    price: "R42,999",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=85",
    badge: "Professional",
    badgeColor: "#6366f1",
    desc: "Whole-home backup. Run your geyser, stove, washing machine, and aircon without compromise.",
    specs: ["3,600 Wh base (expandable to 25 kWh)", "3,600W AC (7,200W surge)", "Generator + smart home integration", "EPS switchover < 30ms", "5-year warranty"],
    useCases: ["Whole-home backup", "Geyser & stove", "Home office & security"],
  },
  {
    id: 6,
    name: "EcoFlow DELTA Pro Ultra",
    category: "pro",
    capacity: "6,144 Wh",
    output: "7,200 W",
    price: "R89,999",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=85",
    badge: "Off-Grid Ready",
    badgeColor: "#6366f1",
    desc: "The ultimate off-grid stack. Pair with rooftop solar and never rely on Eskom again.",
    specs: ["6,144 Wh base (expandable)", "7,200W three-phase AC", "Built-in smart home panel", "Full solar integration", "10-year warranty"],
    useCases: ["Full off-grid living", "Solar-powered home", "Zero Eskom dependency"],
  },
];

const SOLAR_PANELS = [
  {
    id: 7,
    name: "EcoFlow 220W Portable Panel",
    category: "accessory",
    capacity: "220 W",
    output: "—",
    price: "R3,299",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=85",
    badge: "Add-on",
    badgeColor: "#22c55e",
    desc: "Foldable monocrystalline panel. Recharge any EcoFlow station outdoors or in your garden.",
    specs: ["220W monocrystalline", "IP68 waterproof", "Folds to 60×50cm", "Kickstand included", "1-year warranty"],
    useCases: ["Garden charging", "Road trips", "Camping & outdoor"],
  },
  {
    id: 8,
    name: "EcoFlow 400W Rigid Panel",
    category: "accessory",
    capacity: "400 W",
    output: "—",
    price: "R4,899",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=85",
    badge: "Best Value",
    badgeColor: "#22c55e",
    desc: "High-efficiency rigid panel for semi-permanent balcony or garage-roof mounting.",
    specs: ["400W monocrystalline PERC", "IP68 certified", "Aluminium frame", "Easy roof clip mount", "5-year warranty"],
    useCases: ["Balcony mounting", "Garage roof", "Permanent outdoor setup"],
  },
];

const ALL_PRODUCTS = [...PRODUCTS, ...SOLAR_PANELS];

const CATEGORIES = [
  { id: "all",       label: "All Products" },
  { id: "entry",     label: "Entry Backup" },
  { id: "mid",       label: "Mid Range" },
  { id: "pro",       label: "Pro / Whole-Home" },
  { id: "accessory", label: "Solar Panels" },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "capacity-desc", label: "Capacity: Highest" },
];

const parseRand = (value) => Number(value.replace(/[^\d]/g, "")) || 0;
const parseWh = (value) => Number(value.replace(/[^\d]/g, "")) || 0;

function ProductCard({ product, onQuote }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass-card flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,8,0.6) 0%, transparent 55%)" }} />
        {product.badge && (
          <span
            className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ background: product.badgeColor, backdropFilter: "blur(8px)" }}
          >
            {product.badge}
          </span>
        )}
        <div className="absolute bottom-3 right-3 rounded-2xl px-3 py-1 text-xs font-bold text-white"
          style={{ background: "rgba(6,13,8,0.7)", backdropFilter: "blur(8px)" }}>
          {product.capacity}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-slatezen dark:text-white leading-snug">{product.name}</h3>
          <span className="text-gradient font-display text-lg font-semibold whitespace-nowrap">{product.price}</span>
        </div>

        {/* Stats row */}
        <div className="mt-3 flex gap-3">
          {product.capacity !== "—" && (
            <div className="flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-bold"
              style={{ background: "rgba(34,197,94,0.09)", color: "#16a34a" }}>
              <Battery size={11} /> {product.capacity}
            </div>
          )}
          {product.output !== "—" && (
            <div className="flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-bold"
              style={{ background: "rgba(245,158,11,0.09)", color: "#d97706" }}>
              <Zap size={11} /> {product.output}
            </div>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "rgba(26,58,42,0.7)" }}>{product.desc}</p>

        {/* Expandable specs */}
        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-1.5 overflow-hidden"
            >
              {product.specs.map((s) => (
                <li key={s} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={12} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span style={{ color: "rgba(26,58,42,0.75)" }}>{s}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setExpanded(v => !v)}
            className="btn-ghost flex-1 justify-center text-slatezen dark:text-white text-xs py-2.5"
          >
            {expanded ? "Less" : "Specs"}
          </button>
          <button onClick={() => onQuote(product)} className="btn-primary flex-1 justify-center text-xs py-2.5">
            Get Quote <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function EcoFlowPage({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const byCategory =
      activeCategory === "all"
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

    const bySearch = query
      ? byCategory.filter((p) => {
          const blob = `${p.name} ${p.desc} ${p.useCases.join(" ")} ${p.specs.join(" ")}`.toLowerCase();
          return blob.includes(query);
        })
      : byCategory;

    const sorted = [...bySearch];
    if (sortBy === "price-asc") sorted.sort((a, b) => parseRand(a.price) - parseRand(b.price));
    if (sortBy === "price-desc") sorted.sort((a, b) => parseRand(b.price) - parseRand(a.price));
    if (sortBy === "capacity-desc") sorted.sort((a, b) => parseWh(b.capacity) - parseWh(a.capacity));

    return sorted;
  }, [activeCategory, searchTerm, sortBy]);

  const handleQuote = (product) => {
    setSelectedProduct(product);
    onNavigate("quote");
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    setSortBy("featured");
  };

  return (
    <div>
      {/* Page Hero */}
      <section
        className="relative overflow-hidden border-b"
        style={{ borderColor: "rgba(34,197,94,0.14)" }}
      >
        <div className="orb" style={{ width:500, height:500, background:"rgba(34,197,94,0.12)", top:"-20%", right:"-5%", animationDelay:"0s" }} />
        <div className="orb" style={{ width:350, height:350, background:"rgba(245,158,11,0.08)", bottom:"-20%", left:"-5%", animationDelay:"3s" }} />

        <div className="section-shell relative z-10 py-20">
          <button onClick={() => onNavigate("home")} className="btn-ghost mb-8 text-slatezen dark:text-white">
            <ArrowLeft size={15} /> Back to Home
          </button>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <SectionReveal>
              <span className="tag mb-5 inline-flex"><Battery size={11} /> EcoFlow Portable Backup</span>
              <h1 className="font-display text-5xl font-semibold leading-[1.06] tracking-tight text-slatezen dark:text-white">
                Power through{" "}
                <span className="shimmer-text">every outage.</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(26,58,42,0.72)" }}>
                EcoFlow's portable power stations paired with solar panels give you silent, clean, instant backup — no generator, no fumes, no noise.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#catalog" className="btn-primary">
                  Browse Catalog <ArrowRight size={15} />
                </a>
                <button onClick={() => onNavigate("quote")} className="btn-ghost text-slatezen dark:text-white">
                  Get a Quote
                </button>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="neon-border relative overflow-hidden rounded-4xl shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=85"
                  alt="EcoFlow portable power station setup"
                  className="h-72 w-full object-cover lg:h-96"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,8,0.5) 0%, transparent 60%)" }} />
                <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                  {[["8", "Products Available"], ["2hr", "Solar Recharge"], ["0dB", "Silent Operation"]].map(([v, l]) => (
                    <div key={l} className="flex-1 rounded-2xl p-3 text-center"
                      style={{ background: "rgba(6,13,8,0.65)", backdropFilter: "blur(10px)" }}>
                      <p className="text-gradient-amber font-display text-lg font-bold">{v}</p>
                      <p className="text-[10px] font-semibold text-white/70">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Why EcoFlow strip */}
          <SectionReveal className="mt-16 grid gap-4 md:grid-cols-4">
            {[
              { icon: Battery, title: "LFP Chemistry",     desc: "3,000+ cycles — outlasts lead-acid 10x." },
              { icon: Zap,     title: "X-Stream Charge",   desc: "0–80% in under an hour via wall outlet." },
              { icon: Filter,  title: "Silent & Clean",    desc: "No fumes, no noise. Indoor-safe always." },
              { icon: CheckCircle2, title: "SA Warranty",  desc: "Local support and warranty registration." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card flex gap-4 p-5">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}>
                  <Icon size={16} color="white" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slatezen dark:text-white">{title}</p>
                  <p className="text-xs leading-snug mt-0.5" style={{ color: "rgba(26,58,42,0.65)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ── Product Catalog ── */}
      <section id="catalog" className="section-shell py-20">
        <SectionReveal className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-slatezen dark:text-white md:text-4xl">
            Choose your <span className="text-gradient">backup level.</span>
          </h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(26,58,42,0.65)" }}>
            From compact everyday units to whole-home stacks — all powered by LFP chemistry.
          </p>
        </SectionReveal>

        <SectionReveal className="mb-6">
          <div className="glass-card grid gap-3 p-4 md:grid-cols-[1fr_220px_auto] md:items-center">
            <label className="flex items-center gap-2 rounded-2xl px-3 py-2.5"
              style={{ border: "1px solid var(--separator)", background: "var(--card-bg)" }}>
              <Search size={14} style={{ color: "var(--text-secondary)" }} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search EcoFlow model, use case, or spec"
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </label>

            <label className="flex items-center gap-2 rounded-2xl px-3 py-2.5"
              style={{ border: "1px solid var(--separator)", background: "var(--card-bg)" }}>
              <SlidersHorizontal size={14} style={{ color: "var(--text-secondary)" }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </label>

            <div className="flex items-center justify-between gap-2 md:justify-end">
              <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                {filtered.length} result{filtered.length === 1 ? "" : "s"}
              </span>
              <button onClick={clearFilters} className="btn-ghost px-3 py-2 text-xs">
                <X size={12} /> Reset
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeCategory === id ? "btn-primary" : "btn-ghost text-slatezen dark:text-white"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onQuote={handleQuote} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <SectionReveal className="mt-8">
            <div className="glass-card p-8 text-center">
              <p className="text-base font-semibold" style={{ color: "var(--text)" }}>No products match your filters.</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                Try a broader term or reset filters to view the full EcoFlow range.
              </p>
              <button onClick={clearFilters} className="btn-primary mx-auto mt-4">Show All Products</button>
            </div>
          </SectionReveal>
        )}

        {/* CTA */}
        <SectionReveal className="mt-16">
          <div className="neon-border relative overflow-hidden rounded-5xl p-10 text-center"
            style={{ background: "linear-gradient(135deg,rgba(34,197,94,0.08),rgba(245,158,11,0.05))" }}>
            <div className="orb" style={{ width:300, height:300, background:"rgba(34,197,94,0.12)", top:"-30%", right:"-5%", animationDelay:"0s" }} />
            <div className="relative z-10">
              <span className="tag mb-4 inline-flex">Not sure which to choose?</span>
              <h3 className="font-display text-3xl font-semibold text-slatezen dark:text-white">
                Let us build the <span className="text-gradient">right package.</span>
              </h3>
              <p className="mt-2 mb-6 text-sm" style={{ color: "rgba(26,58,42,0.7)" }}>
                Our specialists compare your bill, load requirements, and budget to recommend the perfect combination.
              </p>
              <button onClick={() => onNavigate("quote")} className="btn-primary mx-auto">
                Request Free Consultation <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
