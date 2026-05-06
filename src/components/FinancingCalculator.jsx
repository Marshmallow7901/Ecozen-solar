import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Zap, Info } from "lucide-react";
import SectionReveal from "./SectionReveal";

// South African prime rate as of 2026 is ~11.25%; solar loans typically prime + 1.5–2%
const BASE_RATE = 0.1325; // 13.25% p.a.

const TERMS = [
  { months: 12,  label: "12 months" },
  { months: 24,  label: "24 months" },
  { months: 36,  label: "3 years" },
  { months: 60,  label: "5 years" },
  { months: 84,  label: "7 years" },
];

const SYSTEM_PRESETS = [
  { label: "Starter 5kW",    amount: 75000,  saving: 1200 },
  { label: "Family 8kW",     amount: 130000, saving: 2100 },
  { label: "Executive 10kW+",amount: 275000, saving: 4500 },
  { label: "Commercial",     amount: 450000, saving: 9000 },
  { label: "Custom",         amount: null,   saving: null },
];

function fmt(n) {
  return "R" + Math.round(n).toLocaleString("en-ZA");
}

function pmtCalc(principal, annualRate, months) {
  const r = annualRate / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function FinancingCalculator() {
  const [preset, setPreset] = useState(1); // Family 8kW default
  const [customAmount, setCustomAmount] = useState(130000);
  const [termIdx, setTermIdx] = useState(3); // 60 months default
  const [deposit, setDeposit] = useState(0);

  const systemCost = preset === 4 ? customAmount : SYSTEM_PRESETS[preset].amount;
  const monthlySaving = preset === 4
    ? Math.round(customAmount * 0.016) // ~1.6% of system cost as monthly saving estimate
    : SYSTEM_PRESETS[preset].saving;

  const { months } = TERMS[termIdx];
  const principal = systemCost - deposit;
  const monthly = pmtCalc(principal, BASE_RATE, months);
  const totalRepaid = monthly * months + deposit;
  const totalInterest = totalRepaid - systemCost;
  const netMonthly = monthly - monthlySaving;
  const paybackMonths = Math.ceil(systemCost / monthlySaving);

  const savingsPct = useMemo(() => Math.min(98, Math.round((monthlySaving / monthly) * 100)), [monthlySaving, monthly]);

  return (
    <section id="calculator" className="section-shell py-20">
      <SectionReveal className="mb-10">
        <span className="tag mb-4 inline-flex"><Calculator size={11} /> SA Solar Finance</span>
        <h2 className="display-lg" style={{ color: "var(--text)" }}>
          Finance your solar,{" "}
          <span className="text-gradient">own it outright.</span>
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Most customers find their monthly loan repayment is <strong>offset by electricity savings</strong> from day one.
          Use our calculator to see your real net cost.
        </p>
      </SectionReveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Controls */}
        <div className="glass-card p-8 space-y-7">
          {/* System preset */}
          <div>
            <label className="text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>
              System Size
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SYSTEM_PRESETS.map(({ label }, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setPreset(i);
                    if (i !== 4 && SYSTEM_PRESETS[i].amount) setCustomAmount(SYSTEM_PRESETS[i].amount);
                  }}
                  className="rounded-2xl border px-3 py-2.5 text-sm font-semibold text-left transition"
                  style={{
                    borderColor: preset === i ? "#30d158" : "var(--separator)",
                    background: preset === i ? "rgba(48,209,88,0.08)" : "transparent",
                    color: preset === i ? "#30d158" : "var(--text-secondary)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          {preset === 4 && (
            <div>
              <div className="flex justify-between">
                <label className="text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>System Cost</label>
                <span className="text-gradient font-bold">{fmt(customAmount)}</span>
              </div>
              <div className="relative mt-2">
                <input type="range" min={30000} max={600000} step={5000} value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  style={{ "--val": `${((customAmount - 30000) / 570000) * 100}%` }} />
              </div>
              <div className="mt-1 flex justify-between text-xs" style={{ color: "var(--text-secondary)" }}>
                <span>R30k</span><span>R600k</span>
              </div>
            </div>
          )}

          {/* Deposit */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>
                Deposit (optional)
              </label>
              <span className="text-gradient font-bold">{fmt(deposit)}</span>
            </div>
            <div className="relative mt-2">
              <input type="range" min={0} max={systemCost * 0.5} step={1000} value={Math.min(deposit, systemCost * 0.5)}
                onChange={(e) => setDeposit(Number(e.target.value))}
                style={{ "--val": `${(deposit / systemCost) * 100}%` }} />
            </div>
            <div className="mt-1 flex justify-between text-xs" style={{ color: "var(--text-secondary)" }}>
              <span>R0</span><span>{fmt(systemCost * 0.5)}</span>
            </div>
          </div>

          {/* Loan term */}
          <div>
            <label className="text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>
              Repayment Period
            </label>
            <div className="mt-3 flex gap-2 flex-wrap">
              {TERMS.map(({ label }, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setTermIdx(i)}
                  className="rounded-full px-4 py-1.5 text-sm font-bold transition"
                  style={{
                    background: termIdx === i ? "linear-gradient(135deg,#30d158,#25a244)" : "rgba(48,209,88,0.08)",
                    color: termIdx === i ? "white" : "#30d158",
                    border: termIdx === i ? "none" : "1px solid rgba(48,209,88,0.18)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Rate note */}
          <p className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
            <Info size={11} />
            Estimate based on 13.25% p.a. (prime + 2%). Actual rates subject to credit approval via ABSA / Nedbank Solar Finance.
          </p>
        </div>

        {/* Results panel */}
        <div className="space-y-4">
          {/* Main result */}
          <motion.div
            key={`${systemCost}-${months}-${deposit}`}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="neon-border glass-card p-7"
          >
            <p className="mb-1 text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>Monthly Repayment</p>
            <p className="text-gradient" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1 }}>{fmt(monthly)}</p>
            <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>over {months} months</p>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-secondary)" }}>Estimated electricity saving</span>
                <span className="font-bold" style={{ color: "#30d158" }}>−{fmt(monthlySaving)}/mo</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-3" style={{ borderColor: "var(--separator)" }}>
                <span className="font-bold" style={{ color: "var(--text)" }}>Your real net cost</span>
                <span className="font-bold text-gradient text-lg">{fmt(Math.max(0, netMonthly))}/mo</span>
              </div>
            </div>

            {/* Saving bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
                <span>Savings offset</span>
                <span className="font-bold" style={{ color: "#30d158" }}>{savingsPct}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(48,209,88,0.12)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${savingsPct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg,#30d158,#ff9f0a)" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Secondary stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "System cost",     val: fmt(systemCost),      icon: Zap },
              { label: "Loan amount",     val: fmt(principal),       icon: Calculator },
              { label: "Total repaid",    val: fmt(totalRepaid),     icon: TrendingDown },
              { label: "Payback period",  val: `${paybackMonths} mo`,icon: TrendingDown },
            ].map(({ label, val, icon: Icon }) => (
              <div key={label} className="glass-card p-4">
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
                <p className="mt-1 text-lg font-semibold" style={{ color: "var(--text)" }}>{val}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-5 text-center">
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Ready for a formal finance quote?</p>
            <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>We'll connect you with ABSA or Nedbank solar lending partners.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
