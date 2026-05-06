import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const STAGE_COLOR = {
  0: "#22c55e",
  1: "#4ade80",
  2: "#f59e0b",
  3: "#d97706",
  4: "#ef4444",
};

function fmt(ms) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return [
    String(Math.floor(t / 3600)).padStart(2, "0"),
    String(Math.floor((t % 3600) / 60)).padStart(2, "0"),
    String(t % 60).padStart(2, "0"),
  ].join(":");
}

export default function LoadsheddingWidget() {
  const [stage, setStage] = useState(2);
  const [nextSlotAt, setNextSlotAt] = useState(() => Date.now() + 1000 * 60 * 95);
  const [, setTick] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch("/api/loadshedding", { cache: "no-store" });
        if (!r.ok) throw new Error();
        const d = await r.json();
        if (typeof d.stage === "number" && d.nextSlotAt) {
          setStage(d.stage);
          setNextSlotAt(new Date(d.nextSlotAt).getTime());
        }
      } catch { /* demo fallback stays */ }
    };
    load();
    const ri = setInterval(load, 600_000);
    const ti = setInterval(() => {
      setTick((v) => v + 1);
      setNextSlotAt((t) => (t - Date.now() <= 0 ? Date.now() + 7_200_000 : t));
    }, 1000);
    return () => { clearInterval(ri); clearInterval(ti); };
  }, []);

  const color = STAGE_COLOR[Math.min(stage, 4)] ?? STAGE_COLOR[4];
  const remaining = nextSlotAt - Date.now();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-24 right-4 z-40 w-56 overflow-hidden rounded-3xl"
      style={{
        background: "rgba(13,17,23,0.78)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
      }}
    >
      {/* Accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${color},transparent)` }} />

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50">Load-shedding</span>
          <Zap size={11} style={{ color }} />
        </div>
        <p className="mt-1 text-2xl font-bold text-white">
          Stage{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={stage}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              style={{ color }}
            >
              {stage}
            </motion.span>
          </AnimatePresence>
        </p>
        <p className="mt-0.5 font-mono text-xs text-white/60">
          Next in <span className="text-white/90">{fmt(remaining)}</span>
        </p>
      </div>
    </motion.aside>
  );
}
