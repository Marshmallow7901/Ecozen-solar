import { useMemo, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { TrendingUp, Banknote, Package } from "lucide-react";

const PACKAGES = [
  { min: 0,     max: 3000,  name: "Ecozen Starter",   band: "R60k – R90k",     cost: 76000 },
  { min: 3000,  max: 6500,  name: "Ecozen Family",    band: "R100k – R160k",   cost: 130000 },
  { min: 6500,  max: 10000, name: "Ecozen Executive", band: "R200k – R350k",   cost: 260000 },
  { min: 10000, max: Infinity, name: "Ecozen Commercial", band: "R400k+",      cost: 420000 },
];

const getPackage = (bill) => PACKAGES.find((p) => bill >= p.min && bill < p.max) ?? PACKAGES[PACKAGES.length - 1];
const rand = (v) => `R${Math.round(v).toLocaleString("en-ZA")}`;

function AnimatedNumber({ value, format = (v) => v.toFixed(1) }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 0.55,
      ease: "easeOut",
      onUpdate(v) { if (node) node.textContent = format(v); },
    });
    return controls.stop;
  }, [value, format]);
  return <span ref={ref}>{format(value)}</span>;
}

export default function SavingsCalculator() {
  const [bill, setBill] = useState(3500);

  const m = useMemo(() => {
    const fit = getPackage(bill);
    const monthly = bill * 0.4;
    return { fit, annual: monthly * 12, monthly, payoff: fit.cost / (monthly * 12) };
  }, [bill]);

  const pct = ((bill - 1500) / (12000 - 1500)) * 100;

  return (
    <section id="calculator" className="section-shell py-24">
      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <span className="tag"><TrendingUp size={11} /> ROI Calculator</span>
        <h2 className="display-lg mt-4" style={{ color: "var(--text)" }}>
          How fast does solar pay{" "}
          <span className="text-gradient">itself back?</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        {/* Slider card */}
        <div className="glass-card p-7">
          <div className="mb-6 flex items-end justify-between">
            <label htmlFor="billSlider" className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Monthly Eskom Bill</label>
            <span className="text-2xl font-bold text-gradient">{rand(bill)}</span>
          </div>

          {/* Native Apple-styled slider */}
          <input
            id="billSlider"
            type="range"
            min={1500} max={12000} step={100}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            style={{ "--val": `${pct}%` }}
          />

          <div className="mt-2 flex justify-between text-xs" style={{ color: "var(--text-secondary)" }}>
            <span>R1,500</span><span>R12,000+</span>
          </div>

          {/* Package indicator */}
          <div
            className="mt-5 flex items-center gap-3 rounded-2xl p-4"
            style={{ background: "rgba(48,209,88,0.08)", border: "1px solid rgba(48,209,88,0.18)" }}
          >
            <Package size={18} style={{ color: "#30d158" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>Recommended</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{m.fit.name}</p>
            </div>
            <span className="ml-auto text-xs font-semibold" style={{ color: "#30d158" }}>{m.fit.band}</span>
          </div>
        </div>

        {/* Results card */}
        <motion.div
          key={bill}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="glass-card neon-border flex flex-col justify-between p-7"
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Estimated Annual Savings</p>
            <h3 className="text-gradient" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              <AnimatedNumber value={m.annual} format={(v) => rand(v)} />
            </h3>
          </div>

          <div className="mt-6 space-y-0 divide-y" style={{ borderColor: "var(--separator)" }}>
            {[
              { label: "Monthly saving",  val: rand(m.monthly) },
              { label: "Years to payoff", val: <><AnimatedNumber value={m.payoff} format={(v) => v.toFixed(1)} /> yrs</> },
              { label: "Investment band",  val: m.fit.band },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between py-4 text-sm">
                <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                <strong style={{ color: "var(--text)" }}>{val}</strong>
              </div>
            ))}
          </div>

          <a href="#quote" className="btn-primary mt-6 w-full justify-center">
            <Banknote size={15} /> Get My Full Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
