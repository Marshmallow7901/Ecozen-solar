import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Home, Building2,
  Zap, Phone, Mail, User, MapPin, MessageSquare, ShieldCheck,
} from "lucide-react";
import SectionReveal from "../components/SectionReveal";

const PROVINCES = [
  "Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape",
  "Limpopo","Mpumalanga","North West","Free State","Northern Cape",
];

const SYSTEM_TYPES = [
  { id: "rooftop",  label: "Rooftop Solar",     icon: Zap,       desc: "Hybrid inverter + panels + battery installed on your roof." },
  { id: "portable", label: "Portable Backup",    icon: Zap,       desc: "Portable power station for essential load coverage." },
  { id: "both",     label: "Full Solution",      icon: ShieldCheck,desc: "Rooftop solar plus portable backup — total peace of mind." },
];

const LOAD_TYPES = [
  { id: "essential",  label: "Essential Loads",    desc: "Lights, Wi-Fi, devices, phone charging." },
  { id: "comfort",    label: "Comfort Loads",      desc: "+ fridge, TV, fans, small appliances." },
  { id: "whole",      label: "Whole-Home",         desc: "+ stove, geysers, pool pump." },
  { id: "offgrid",    label: "Full Off-Grid",      desc: "Zero grid dependency, maximum storage." },
];

const STEPS = ["Your Details", "Property", "System Needs", "Confirm"];

function rand(v) { return `R${Math.round(v).toLocaleString("en-ZA")}`; }

export default function QuotePage({ onNavigate }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", province: "",
    propertyType: "home",
    monthlyBill: 3500,
    systemType: "rooftop",
    loadType: "comfort",
    notes: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const stepValid = [
    form.name.trim() && form.email.trim() && form.phone.trim(),
    form.city.trim() && form.province,
    form.systemType && form.loadType,
    true,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[80dvh] flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="glass-card neon-border max-w-md p-10"
        >
          <span className="mb-5 grid h-16 w-16 place-items-center rounded-full mx-auto"
            style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}>
            <CheckCircle2 size={32} color="white" />
          </span>
          <h2 className="font-display text-3xl font-semibold text-slatezen dark:text-white">Quote Request Received!</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(26,58,42,0.7)" }}>
            Thanks, <strong>{form.name}</strong>. Our team will contact you at{" "}
            <strong>{form.email}</strong> within one business day with a personalised quote.
          </p>
          <div className="mt-6 rounded-3xl p-4 text-left text-sm"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)" }}>
            <p className="font-bold text-slatezen dark:text-white mb-2">Your summary</p>
            <div className="space-y-1" style={{ color: "rgba(26,58,42,0.75)" }}>
              <div className="flex justify-between"><span>System</span><strong className="capitalize">{form.systemType}</strong></div>
              <div className="flex justify-between"><span>Monthly bill</span><strong>{rand(form.monthlyBill)}</strong></div>
              <div className="flex justify-between"><span>Province</span><strong>{form.province}</strong></div>
            </div>
          </div>
          <button
            onClick={() => onNavigate("home")}
            className="btn-primary mt-6 w-full justify-center"
          >
            Back to Home <ArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="section-shell py-20">
      {/* Back button */}
      <button onClick={() => onNavigate("home")} className="btn-ghost mb-8 text-slatezen dark:text-white">
        <ArrowLeft size={15} /> Back to Home
      </button>

      <SectionReveal>
        <span className="tag mb-5 inline-flex"><ShieldCheck size={11} /> Zero-Pressure Quote</span>
        <h1 className="font-display text-4xl font-semibold text-slatezen dark:text-white md:text-5xl">
          Design your{" "}
          <span className="text-gradient">perfect system.</span>
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: "rgba(26,58,42,0.7)" }}>
          Complete the form below and one of our energy specialists will build a customised proposal for you — no commitment required.
        </p>
      </SectionReveal>

      {/* Step indicator */}
      <div className="mt-10 mb-8 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all"
                style={{
                  background: i < step ? "linear-gradient(135deg,#22c55e,#15803d)" : i === step ? "linear-gradient(135deg,#22c55e,#15803d)" : "rgba(34,197,94,0.12)",
                  color: i <= step ? "white" : "#16a34a",
                  boxShadow: i === step ? "0 0 0 3px rgba(34,197,94,0.25)" : "none",
                }}
              >
                {i < step ? <CheckCircle2 size={13} /> : i + 1}
              </span>
              <span className="hidden text-xs font-semibold sm:inline"
                style={{ color: i === step ? "#16a34a" : "rgba(26,58,42,0.45)" }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="h-px w-8 flex-1 rounded"
                style={{ background: i < step ? "rgba(34,197,94,0.5)" : "rgba(34,197,94,0.15)" }} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form panel */}
          <div className="glass-card p-8">
            <AnimatePresence mode="wait">
              {/* ── Step 0: Your Details ── */}
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-5">
                  <h3 className="font-display text-xl font-semibold text-slatezen dark:text-white">Your Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}><User size={11} /> Full Name</span>
                      <input type="text" placeholder="John Smith" value={form.name} onChange={(e) => set("name", e.target.value)} required />
                    </label>
                    <label className="space-y-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}><Phone size={11} /> Phone</span>
                      <input type="text" placeholder="071 234 5678" value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
                    </label>
                  </div>
                  <label className="space-y-1.5 block">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}><Mail size={11} /> Email Address</span>
                    <input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} required />
                  </label>
                </motion.div>
              )}

              {/* ── Step 1: Property ── */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-5">
                  <h3 className="font-display text-xl font-semibold text-slatezen dark:text-white">Property</h3>

                  {/* Property type toggle */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}>Property Type</span>
                    <div className="mt-2 flex gap-3">
                      {[{ id: "home", label: "Home", Icon: Home }, { id: "business", label: "Business", Icon: Building2 }].map(({ id, label, Icon }) => (
                        <button type="button" key={id}
                          onClick={() => set("propertyType", id)}
                          className={`flex flex-1 items-center justify-center gap-2 rounded-3xl border p-4 font-semibold text-sm transition ${form.propertyType === id ? "border-sage-500 bg-sage-500/10 text-sage-600" : "border-sage-500/20 text-slatezen/60 dark:text-slate-300"}`}
                          style={{ borderColor: form.propertyType === id ? "#22c55e" : "rgba(34,197,94,0.18)" }}
                        >
                          <Icon size={16} /> {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}><MapPin size={11} /> City / Town</span>
                      <input type="text" placeholder="Johannesburg" value={form.city} onChange={(e) => set("city", e.target.value)} required />
                    </label>
                    <label className="space-y-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}>Province</span>
                      <select value={form.province} onChange={(e) => set("province", e.target.value)} required>
                        <option value="">Select province…</option>
                        {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="space-y-1.5 block">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}>Street Address <span className="normal-case font-normal opacity-60">(optional)</span></span>
                    <input type="text" placeholder="12 Sunlight Avenue, Sandton" value={form.address} onChange={(e) => set("address", e.target.value)} />
                  </label>
                </motion.div>
              )}

              {/* ── Step 2: System Needs ── */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                  <h3 className="font-display text-xl font-semibold text-slatezen dark:text-white">System Needs</h3>

                  {/* System type */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}>System Type</span>
                    <div className="mt-2 grid gap-3 sm:grid-cols-3">
                      {SYSTEM_TYPES.map(({ id, label, desc }) => (
                        <button type="button" key={id}
                          onClick={() => set("systemType", id)}
                          className="rounded-3xl border p-4 text-left text-sm transition"
                          style={{
                            borderColor: form.systemType === id ? "#22c55e" : "rgba(34,197,94,0.15)",
                            background: form.systemType === id ? "rgba(34,197,94,0.08)" : "transparent",
                          }}
                        >
                          <p className="font-bold text-slatezen dark:text-white">{label}</p>
                          <p className="mt-0.5 text-xs leading-snug" style={{ color: "rgba(26,58,42,0.6)" }}>{desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Load type */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}>Load Coverage</span>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {LOAD_TYPES.map(({ id, label, desc }) => (
                        <button type="button" key={id}
                          onClick={() => set("loadType", id)}
                          className="rounded-3xl border p-3 text-left text-sm transition"
                          style={{
                            borderColor: form.loadType === id ? "#22c55e" : "rgba(34,197,94,0.15)",
                            background: form.loadType === id ? "rgba(34,197,94,0.08)" : "transparent",
                          }}
                        >
                          <p className="font-bold text-slatezen dark:text-white">{label}</p>
                          <p className="mt-0.5 text-xs" style={{ color: "rgba(26,58,42,0.6)" }}>{desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bill slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span style={{ color: "#16a34a" }}>Monthly Eskom Bill</span>
                      <span className="text-gradient">{rand(form.monthlyBill)}</span>
                    </div>
                    <div className="relative mt-3">
                      <div className="h-2 overflow-hidden rounded-full" style={{ background: "rgba(34,197,94,0.12)" }}>
                        <div className="h-full rounded-full" style={{ width: `${((form.monthlyBill - 500) / 14500) * 100}%`, background: "linear-gradient(90deg,#22c55e,#f59e0b)" }} />
                      </div>
                      <input type="range" min={500} max={15000} step={100} value={form.monthlyBill}
                        onChange={(e) => set("monthlyBill", Number(e.target.value))}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                    </div>
                    <div className="mt-1 flex justify-between text-xs" style={{ color: "rgba(26,58,42,0.45)" }}>
                      <span>R500</span><span>R15,000+</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Confirm ── */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-5">
                  <h3 className="font-display text-xl font-semibold text-slatezen dark:text-white">Confirm & Submit</h3>

                  <div className="rounded-3xl divide-y text-sm" style={{ borderColor: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.18)" }}>
                    {[
                      ["Name", form.name], ["Email", form.email], ["Phone", form.phone],
                      ["Location", `${form.city}, ${form.province}`],
                      ["Property", form.propertyType === "home" ? "Residential" : "Commercial"],
                      ["System", SYSTEM_TYPES.find(s => s.id === form.systemType)?.label],
                      ["Coverage", LOAD_TYPES.find(l => l.id === form.loadType)?.label],
                      ["Monthly bill", rand(form.monthlyBill)],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between px-5 py-3">
                        <span style={{ color: "rgba(26,58,42,0.6)" }}>{label}</span>
                        <strong className="text-slatezen dark:text-white">{val}</strong>
                      </div>
                    ))}
                  </div>

                  <label className="space-y-1.5 block">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#16a34a" }}><MessageSquare size={11} /> Additional Notes <span className="normal-case font-normal opacity-60">(optional)</span></span>
                    <textarea
                      rows={3}
                      placeholder="Any special requirements, existing inverter, etc."
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition resize-none"
                      style={{ borderColor: "rgba(34,197,94,0.3)", background: "rgba(255,255,255,0.7)" }}
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between gap-4">
              <button type="button" onClick={() => setStep(s => s - 1)} disabled={step === 0}
                className="btn-ghost text-slatezen dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft size={15} /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button"
                  onClick={() => setStep(s => s + 1)}
                  disabled={!stepValid[step]}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step <ArrowRight size={15} />
                </button>
              ) : (
                <button type="submit" className="btn-primary">
                  Submit Quote Request <CheckCircle2 size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Right sidebar: why Ecozen */}
          <div className="space-y-4">
            <div className="glass-card p-6">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=80"
                alt="Solar panels installed on a South African home"
                className="h-40 w-full rounded-3xl object-cover mb-4"
              />
              <h4 className="font-bold text-slatezen dark:text-white">What happens next?</h4>
              <ol className="mt-3 space-y-3 text-sm" style={{ color: "rgba(26,58,42,0.72)" }}>
                {["Our team reviews your request within 4 hours.", "We book a free remote consultation (30 min).", "You receive a detailed, itemised proposal.", "We schedule installation at your convenience."].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass-card p-6 space-y-3">
              {[
                { val: "500+", label: "Installations completed" },
                { val: "4.8★", label: "Average customer rating" },
                { val: "25yr", label: "Panel warranty backed" },
                { val: "R0",   label: "Upfront consultation fee" },
              ].map(({ val, label }) => (
                <div key={label} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  style={{ borderColor: "rgba(34,197,94,0.12)" }}>
                  <span className="text-sm" style={{ color: "rgba(26,58,42,0.65)" }}>{label}</span>
                  <span className="text-gradient font-display text-lg font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
