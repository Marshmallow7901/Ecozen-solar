import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionReveal from "./SectionReveal";

const TESTIMONIALS = [
  {
    name: "Thembi Nkosi",
    location: "Sandton, Gauteng",
    system: "Family 8kW Rooftop",
    rating: 5,
    avatar: "TN",
    gradient: "linear-gradient(135deg,#30d158,#25a244)",
    text: "We haven't seen a load-shedding notice in 8 months. The whole family works from home and we haven't missed a beat. Ecozen's team was professional from site visit to switch-on — took just 2 days.",
  },
  {
    name: "Ruan van der Merwe",
    location: "Stellenbosch, Western Cape",
    system: "Executive 10kW+ System",
    rating: 5,
    avatar: "RV",
    gradient: "linear-gradient(135deg,#25a244,#1a7a35)",
    text: "I run a small wine export business from home. Losing power used to cost me thousands in lost stock. Since Ecozen installed our system we've had zero downtime. Best investment I've ever made.",
  },
  {
    name: "Priya Govender",
    location: "Durban North, KwaZulu-Natal",
    system: "EcoFlow DELTA 2 Backup",
    rating: 5,
    avatar: "PG",
    gradient: "linear-gradient(135deg,#ff9f0a,#ff6b00)",
    text: "The portable unit was installed same-day. My kids can study through every load-shedding slot and the fridge stays cold. The app is so easy to use. Absolutely worth every rand.",
  },
  {
    name: "André Botha",
    location: "Pretoria East, Gauteng",
    system: "Starter 5kW Rooftop",
    rating: 5,
    avatar: "AB",
    gradient: "linear-gradient(135deg,#30d158,#0d9741)",
    text: "Ecozen gave me a clear, itemised quote — no hidden costs. The installation team was neat, on time, and explained everything. My electricity bill dropped by 70% in month one.",
  },
  {
    name: "Fatima Jardim",
    location: "Cape Town, Western Cape",
    system: "EcoFlow DELTA Pro",
    rating: 5,
    avatar: "FJ",
    gradient: "linear-gradient(135deg,#ff9f0a,#d97706)",
    text: "As a nurse who sometimes works nights I needed peace of mind at home. The DELTA Pro keeps our security system, fridge, and medical equipment running through any outage. Life-changing.",
  },
  {
    name: "Sipho Dlamini",
    location: "Midrand, Gauteng",
    system: "Commercial Solar Array",
    rating: 5,
    avatar: "SD",
    gradient: "linear-gradient(135deg,#30d158,#25a244)",
    text: "We fitted our warehouse with a 30kW system through Ecozen. SSEG paperwork was handled 100% by them. We now feed back to the grid and earn credit. ROI in under 4 years — remarkable.",
  },
];

const STATS = [
  { val: "500+", label: "Installations" },
  { val: "4.9★", label: "Average Rating" },
  { val: "9",    label: "Provinces Served" },
  { val: "97%",  label: "Would Recommend" },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} fill="#ff9f0a" stroke="none" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, featured }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: featured ? 1 : 0.5, scale: featured ? 1 : 0.95, y: featured ? 0 : 10 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={`glass-card flex flex-col gap-4 p-6 ${featured ? "neon-border" : ""}`}
    >
      {/* Quote mark */}
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
        <path d="M0 18V10.8C0 4.68 3.84 1.2 11.52 0l1.44 2.52C9.12 3.48 7.2 5.52 6.72 9H11V18H0ZM13 18V10.8C13 4.68 16.84 1.2 24.52 0l1.44 2.52C22.12 3.48 20.2 5.52 19.72 9H24V18H13Z"
          fill="rgba(48,209,88,0.22)" />
      </svg>

      <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text)", opacity: 0.85 }}>
        {t.text}
      </p>

      <div
        className="flex items-center gap-3 border-t pt-4"
        style={{ borderColor: "var(--separator)" }}
      >
        {/* Gradient avatar */}
        <span
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-sm font-bold text-white"
          style={{ background: t.gradient, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          {t.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>{t.name}</p>
          <p className="truncate text-xs" style={{ color: "var(--text-secondary)" }}>{t.location}</p>
          <Stars />
        </div>
        <span className="tag ml-auto shrink-0 text-[10px]">{t.system}</span>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total   = TESTIMONIALS.length;
  const prev    = () => setCurrent((c) => (c - 1 + total) % total);
  const next    = () => setCurrent((c) => (c + 1) % total);
  const visible = [-1, 0, 1].map((o) => ({ data: TESTIMONIALS[(current + o + total) % total], offset: o }));

  return (
    <section className="bg-section-alt py-20">
      <div className="section-shell">
        <SectionReveal className="mb-12 text-center">
          <span className="tag mb-4 inline-flex"><Star size={11} fill="currentColor" /> Customer Stories</span>
          <h2 className="display-lg" style={{ color: "var(--text)" }}>
            Trusted by{" "}
            <span className="text-gradient">500+ households.</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
            Real South Africans. Real savings. Real freedom from Eskom.
          </p>
        </SectionReveal>

        {/* Desktop 3-card carousel */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map(({ data: t, offset }) => (
                <TestimonialCard key={t.name} t={t} featured={offset === 0} />
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={prev} className="btn-ghost px-3 py-2.5"><ChevronLeft size={16} /></button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: i === current ? 24 : 8, background: i === current ? "#30d158" : "rgba(48,209,88,0.22)" }}
                />
              ))}
            </div>
            <button onClick={next} className="btn-ghost px-3 py-2.5"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Mobile single card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.26 }}
            >
              <TestimonialCard t={TESTIMONIALS[current]} featured />
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} className="btn-ghost px-3 py-2.5"><ChevronLeft size={16} /></button>
            <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{current + 1} / {total}</span>
            <button onClick={next} className="btn-ghost px-3 py-2.5"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Stats strip */}
        <SectionReveal className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map(({ val, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card p-5 text-center"
            >
              <p className="text-gradient display-md">{val}</p>
              <p className="mt-1 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
            </motion.div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
