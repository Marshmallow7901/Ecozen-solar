import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Particles from "./Particles";
import { Sun } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=90";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25,0.46,0.45,0.94] } },
};

export default function Hero() {
  const [liveGen, setLiveGen] = useState(4.2);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveGen(prev => {
        const peak = 6.8 + Math.sin(Date.now() / 36000) * 1.2;
        return isGenerating ? Number((peak * (0.6 + Math.random() * 0.4)).toFixed(1)) : prev;
      });
      setIsGenerating(Date.now() % 86400000 < 64800000); // Sim daylight 6am-6pm
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
<section
      id="top"
      className="relative overflow-hidden"
      style={{ minHeight: "88dvh", display: "flex", alignItems: "center", position: "relative" }}
    >
      <Particles />
      {/* Subtle background gradient — Apple-style */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 65% -5%, rgba(48,209,88,0.10) 0%, transparent 65%)",
        }}
      />
      {/* Subtle background gradient — Apple-style */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 65% -5%, rgba(48,209,88,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="section-shell relative z-10 grid w-full items-center gap-10 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Text column */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">
          <motion.div variants={fadeUp}>
            <span className="tag">South African Solar Experts</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="display-xl"
            style={{ color: "var(--text)" }}
          >
            Energy that works{" "}
            <span className="text-gradient">24 / 7.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-lg text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--text-secondary)", letterSpacing: "-0.01em" }}
          >
            Ecozen Solar installs premium hybrid solar systems and portable backup power for South African homes and businesses.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            <a href="#calculator" className="btn-primary">
              Estimate Savings <ArrowRight size={15} />
            </a>
            <a href="#quote" className="btn-ghost">
              Get a Quote
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 pt-2">
            {[
              { val: "500+", label: "Installs" },
              { val: "4.8★", label: "Avg Rating" },
              { val: "25yr",  label: "Warranty" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="glass-card px-4 py-3 text-center"
                style={{ borderRadius: "0.875rem" }}
              >
                <p className="text-gradient text-xl font-bold" style={{ letterSpacing: "-0.02em" }}>{val}</p>
                <p className="mt-0.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.25,0.46,0.45,0.94], delay: 0.1 }}
          className="relative"
        >
          {/* Glow halo */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-3xl opacity-40"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(48,209,88,0.22) 0%, transparent 70%)", filter: "blur(24px)" }}
          />

          {/* Main image */}
          <div
            className="neon-border relative overflow-hidden"
            style={{ borderRadius: "1.5rem" }}
          >
            <img
              src={HERO_IMG}
              alt="Modern South African home with solar panels"
              className="w-full object-cover"
              style={{ height: "clamp(300px, 45vw, 560px)" }}
              loading="eager"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card absolute -bottom-4 -left-3 flex items-center gap-3 px-4 py-3 z-10"
            style={{ borderRadius: "1rem" }}
          >
            <span
              className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl relative"
              style={{ background: "#30d158" }}
            >
              <Sun className="h-5 w-5 text-white absolute" />
            </span>
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Live generation</p>
              <p className="text-gradient-amber text-sm font-bold">
                {liveGen.toFixed(1)} kW {isGenerating ? "now" : "today"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
