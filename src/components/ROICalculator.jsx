import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";
import SectionReveal from "./SectionReveal";

const PRESETS = [
  { label: "Starter 5kW",    cost: 75_000,  yearlyGen: 7_300  },
  { label: "Family 8kW",     cost: 130_000, yearlyGen: 11_700 },
  { label: "Executive 10kW", cost: 275_000, yearlyGen: 14_600 },
  { label: "Commercial",     cost: 450_000, yearlyGen: 24_000 },
];

const ESCALATION  = 0.15;
const BASE_TARIFF = 3.65;
const YEARS       = 25;
const fmt = (n) => "R\u00a0" + Math.round(n).toLocaleString("en-ZA");

/* ── Animated line chart ─────────────────────────── */
function LineChart({ data }) {
  const [tooltip,  setTooltip]  = useState(null);
  const [animated, setAnimated] = useState(false);
  const svgRef   = useRef(null);
  const gridRef  = useRef(null);
  const solarRef = useRef(null);

  const SVG_W = 600, SVG_H = 220;
  const padL = 58, padR = 18, padT = 20, padB = 34;
  const IW = SVG_W - padL - padR, IH = SVG_H - padT - padB;

  const maxVal  = useMemo(() => Math.max(...data.map((d) => Math.max(d.grid, d.solar))), [data]);
  const px = useCallback((i) => padL + (i / (YEARS - 1)) * IW, [IW]);
  const py = useCallback((v) => padT + IH - (v / maxVal) * IH, [IH, maxVal]);

  const gridPath  = data.map((d, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(d.grid).toFixed(1)}`).join(" ");
  const solarPath = data.map((d, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(d.solar).toFixed(1)}`).join(" ");

  useEffect(() => {
    setAnimated(false);
    const id = requestAnimationFrame(() => {
      [gridRef, solarRef].forEach((r) => {
        if (!r.current) return;
        const len = r.current.getTotalLength();
        r.current.style.setProperty("--dash-len", len);
        r.current.style.strokeDasharray  = len;
        r.current.style.strokeDashoffset = len;
      });
      setAnimated(true);
    });
    return () => cancelAnimationFrame(id);
  }, [data]);

  const handleMouseMove = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mx   = ((e.clientX - rect.left) / rect.width) * SVG_W;
    const idx  = Math.round(((mx - padL) / IW) * (YEARS - 1));
    if (idx < 0 || idx >= YEARS) { setTooltip(null); return; }
    const d = data[idx];
    setTooltip({ x: px(idx), y: Math.min(py(d.grid), py(d.solar)) - 8, yr: idx + 1, grid: d.grid, solar: d.solar });
  }, [data, px, py, IW]);

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(t * maxVal));

  return (
    <div className="relative w-full" onMouseLeave={() => setTooltip(null)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full select-none"
        onMouseMove={handleMouseMove}
        style={{ fontFamily: "inherit", cursor: "crosshair" }}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={padL} x2={padL + IW} y1={py(v)} y2={py(v)}
              stroke="rgba(48,209,88,0.08)" strokeWidth={1} strokeDasharray="4 4" />
            <text x={padL - 6} y={py(v) + 4} textAnchor="end" fontSize={9.5} fill="var(--text-secondary)">
              {v >= 1_000_000 ? `R${(v/1_000_000).toFixed(1)}m` : v >= 1000 ? `R${(v/1000).toFixed(0)}k` : `R${v}`}
            </text>
          </g>
        ))}
        {[1, 5, 10, 15, 20, 25].map((yr) => (
          <text key={yr} x={px(yr - 1)} y={SVG_H - 6} textAnchor="middle" fontSize={9.5} fill="var(--text-secondary)">
            Yr {yr}
          </text>
        ))}
        {/* Area fills */}
        <path d={`${gridPath} L${px(YEARS-1)},${padT+IH} L${padL},${padT+IH} Z`} fill="rgba(255,159,10,0.06)" />
        <path d={`${solarPath} L${px(YEARS-1)},${padT+IH} L${padL},${padT+IH} Z`} fill="rgba(48,209,88,0.06)" />
        {/* Animated lines */}
        <path ref={gridRef}  d={gridPath}  fill="none" stroke="#ff9f0a" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round"
          className={animated ? "chart-line" : ""} style={{ animationDuration: "1.4s", animationDelay: "0.1s" }} />
        <path ref={solarRef} d={solarPath} fill="none" stroke="#30d158" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round"
          className={animated ? "chart-line" : ""} style={{ animationDuration: "1.4s", animationDelay: "0.3s" }} />
        {/* Crosshair */}
        {tooltip && (
          <line x1={tooltip.x} x2={tooltip.x} y1={padT} y2={padT + IH}
            stroke="rgba(120,120,128,0.30)" strokeWidth={1} strokeDasharray="3 3" />
        )}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-4 text-xs" style={{ color: "var(--text-secondary)" }}>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#ff9f0a" }} />
          Cumulative Eskom cost
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#30d158" }} />
          Cumulative solar cost
        </span>
      </div>

      {/* Tooltip popup */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key={tooltip.yr}
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="glass-card pointer-events-none absolute px-3 py-2"
            style={{
              left: `${(tooltip.x / SVG_W) * 100}%`,
              top:  `${(tooltip.y / SVG_H) * 100}%`,
              transform: "translate(-50%, -100%)",
              borderRadius: "0.625rem",
              minWidth: 140,
              zIndex: 10,
              fontSize: 12,
            }}
          >
            <p className="mb-1 font-semibold" style={{ color: "var(--text)" }}>Year {tooltip.yr}</p>
            <p style={{ color: "#ff9f0a" }}>Eskom: {fmt(tooltip.grid)}</p>
            <p style={{ color: "#30d158" }}>Solar:  {fmt(tooltip.solar)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Stat card ───────────────────────────────────── */
function StatCard({ label, value, sub, accent, highlight }) {
  return (
    <div className={`glass-card p-5 ${highlight ? "neon-border" : ""}`}>
      <p className="mb-1 text-xs font-semibold" style={{ color: accent, letterSpacing: "0.01em" }}>{label}</p>
      <p className="display-md" style={{ color: "var(--text)" }}>{value}</p>
      {sub && <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>{sub}</p>}
    </div>
  );
}

/* ── Main ────────────────────────────────────────── */
export default function ROICalculator() {
  const [preset,     setPreset]     = useState(1);
  const [monthlyBill, setMonthlyBill] = useState(2500);

  const { cost: systemCost, yearlyGen } = PRESETS[preset];

  const data = useMemo(() => {
    const rows = [];
    let cumGrid  = 0, cumSolar = systemCost, tariff = BASE_TARIFF, bill = monthlyBill * 12;
    for (let yr = 1; yr <= YEARS; yr++) {
      cumGrid  += bill;
      cumSolar -= yearlyGen * tariff;
      rows.push({ yr, grid: cumGrid, solar: Math.max(cumSolar, 0) });
      tariff *= 1 + ESCALATION;
      bill   *= 1 + ESCALATION;
    }
    return rows;
  }, [preset, monthlyBill, systemCost, yearlyGen]);

  const paybackYear  = data.find((d) => d.solar <= 0)?.yr;
  const totalGrid    = data[YEARS - 1].grid;
  const totalSavings = totalGrid - (systemCost + YEARS * 1500);
  const pct          = Math.round(((monthlyBill - 500) / (15000 - 500)) * 100);

  return (
    <section className="section-shell py-20">
      <SectionReveal className="mb-10 max-w-2xl">
        <span className="tag mb-4 inline-flex"><TrendingUp size={11} /> ROI Comparison</span>
        <h2 className="display-lg" style={{ color: "var(--text)" }}>
          Solar vs Eskom{" "}
          <span className="text-gradient">over 25 years.</span>
        </h2>
        <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Based on 15% annual tariff escalation (SA historical average) and R3.65/kWh base rate.
        </p>
      </SectionReveal>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Chart card */}
        <SectionReveal className="glass-card p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {PRESETS.map(({ label }, i) => (
              <button
                key={label}
                onClick={() => setPreset(i)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold transition"
                style={{
                  border: `1px solid ${preset === i ? "#30d158" : "rgba(48,209,88,0.18)"}`,
                  background: preset === i ? "rgba(48,209,88,0.12)" : "transparent",
                  color: preset === i ? "#30d158" : "var(--text-secondary)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span style={{ color: "var(--text-secondary)" }}>Monthly Eskom Bill</span>
              <motion.span key={monthlyBill} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#ff9f0a" }}>
                R {monthlyBill.toLocaleString("en-ZA")}/mo
              </motion.span>
            </div>
            <input
              type="range" min={500} max={15000} step={100}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              style={{ "--val": `${pct}%` }}
            />
            <div className="mt-1.5 flex justify-between text-xs" style={{ color: "var(--text-secondary)" }}>
              <span>R500</span><span>R15,000</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`chart-${preset}-${monthlyBill}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <LineChart data={data} />
            </motion.div>
          </AnimatePresence>
        </SectionReveal>

        {/* Stats panel */}
        <SectionReveal className="flex flex-col gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`stats-${preset}-${monthlyBill}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col gap-3"
            >
              <StatCard label="System Investment" value={fmt(systemCost)}   sub="once-off installation" accent="#30d158" />
              <StatCard label="Payback Period"    value={paybackYear ? `~${paybackYear} yrs` : "< 25 yrs"} sub="at 15% tariff escalation" accent="#ff9f0a" />
              <StatCard label="25-Year Eskom Cost" value={fmt(totalGrid)}   sub="without solar"          accent="#ff453a" />
              <StatCard label="Estimated 25yr Savings" value={totalSavings > 0 ? fmt(totalSavings) : "—"} sub="vs staying on Eskom" accent="#30d158" highlight />
            </motion.div>
          </AnimatePresence>
          <button onClick={() => window._ecozNavigate?.("quote")} className="btn-primary mt-1 justify-center">
            Get a Free Quote <TrendingUp size={14} />
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
