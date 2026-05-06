import { useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const PARTNERS = [
  { name: "EcoFlow",        desc: "Portable Power",      domain: "ecoflow.com",         color: "#22c55e" },
  { name: "Sunsynk",        desc: "Hybrid Inverters",    domain: "sunsynk.com",          color: "#f59e0b" },
  { name: "Growatt",        desc: "Solar Inverters",     domain: "growatt.com",          color: "#16a34a" },
  { name: "Canadian Solar", desc: "Tier-1 Panels",       domain: "canadiansolar.com",    color: "#dc2626" },
  { name: "Victron Energy", desc: "Energy Systems",      domain: "victronenergy.com",    color: "#1d4ed8" },
  { name: "SAPVIA",         desc: "Industry Member",     domain: "sapvia.co.za",         color: "#0ea5e9" },
  { name: "NERSA",          desc: "Compliant Installer", domain: "nersa.org.za",         color: "#7c3aed" },
  { name: "ABSA",           desc: "Finance Partner",     domain: "absa.co.za",           color: "#dc2626" },
  { name: "Nedbank",        desc: "Solar Finance",       domain: "nedbank.co.za",        color: "#15803d" },
  { name: "Pylontech",      desc: "Battery Storage",     domain: "pylontech.com.cn",     color: "#f59e0b" },
];

function LogoBadge({ partner }) {
  const [failed, setFailed] = useState(false);
  const src = `https://logo.clearbit.com/${partner.domain}`;

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -2 }}
      className="group flex flex-shrink-0 flex-col items-center gap-2 cursor-default select-none"
    >
      <div
        className="flex items-center justify-center rounded-2xl px-6 py-4 transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.75)",
          border: "1px solid rgba(48,209,88,0.12)",
          backdropFilter: "blur(10px)",
          minWidth: 120,
          minHeight: 56,
        }}
      >
        {!failed ? (
          <img
            src={src}
            alt={partner.name}
            className="h-7 w-auto max-w-[100px] object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            onError={() => setFailed(true)}
          />
        ) : (
          <span
            className="text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity"
            style={{ color: partner.color }}
          >
            {partner.name}
          </span>
        )}
      </div>
      <span
        className="text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: partner.color }}
      >
        {partner.desc}
      </span>
    </motion.div>
  );
}

export default function PartnerLogos() {
  return (
    <section className="border-y py-12" style={{ borderColor: "rgba(34,197,94,0.12)" }}>
      <div className="section-shell">
        <SectionReveal>
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(26,58,42,0.45)" }}>
            Trusted Partners &amp; Certifications
          </p>
        </SectionReveal>

        {/* Infinite scroll strip */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, #f0fdf4 0%, transparent 100%)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, #f0fdf4 0%, transparent 100%)" }} />

          <motion.div
            className="flex gap-5 items-start py-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <LogoBadge key={`${p.name}-${i}`} partner={p} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
