import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, Zap, Fuel, Sun, Battery, TrendingDown, ChevronDown,
  Car, PlugZap, Leaf, Calculator, CheckCircle2, ArrowUpRight,
} from "lucide-react";
import SectionReveal from "../components/SectionReveal";

/* ── Data ─────────────────────────────────────────────── */
const EV_SAVINGS = [
  {
    label: "Average monthly fuel spend",
    petrol: "R 2 800",
    ev: "R 0",
    evLabel: "Grid: R 480 – R 900",
    icon: Fuel,
    accent: "#ff453a",
  },
  {
    label: "Cost per 100 km",
    petrol: "R 130 – R 160",
    ev: "R 18 – R 35",
    evLabel: "On home solar: ~R 8",
    icon: TrendingDown,
    accent: "#30d158",
  },
  {
    label: "Annual running cost",
    petrol: "R 33 600+",
    ev: "R 5 800 – R 10 800",
    evLabel: "Solar-charged: R 2 400 – R 4 500",
    icon: Calculator,
    accent: "#ff9f0a",
  },
  {
    label: "CO₂ saved per year",
    petrol: "—",
    ev: "1.8 – 2.4 tonnes",
    evLabel: "Solar EV: up to 3.1 tonnes",
    icon: Leaf,
    accent: "#30d158",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Sun,
    title: "Solar panels generate power",
    body: "Your rooftop system produces electricity throughout the day, feeding your home and charging your EV simultaneously — often before you even need it.",
  },
  {
    step: "02",
    icon: Battery,
    title: "Battery stores excess energy",
    body: "Any generation surplus charges your lithium battery bank. At night, your EV charges directly from stored solar — essentially free kilometres.",
  },
  {
    step: "03",
    icon: PlugZap,
    title: "Smart charging overnight",
    body: "A Level 2 home charger (7–22 kW) draws from your battery and Eskom off-peak tariffs during load-shedding free hours, maximising cost savings.",
  },
  {
    step: "04",
    icon: TrendingDown,
    title: "Near-zero fuel bill",
    body: "Most EV owners who also run Ecozen solar charge 80 – 95 % of their kilometres from their own roof. Petrol stations become a memory.",
  },
];

const EV_MODELS = [
  {
    name: "BYD Atto 3",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
    range: "480 km",
    battery: "60.5 kWh",
    price: "From R 759 900",
    chargeTime: "~8 h (7 kW home charger)",
    highlight: true,
  },
  {
    name: "Volvo EX30",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    range: "480 km",
    battery: "69 kWh",
    price: "From R 899 900",
    chargeTime: "~7.5 h (7 kW home charger)",
  },
  {
    name: "Mini Cooper SE",
    image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
    range: "270 km",
    battery: "40.7 kWh",
    price: "From R 680 000",
    chargeTime: "~5.5 h (7 kW home charger)",
  },
  {
    name: "BMW iX1",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    range: "440 km",
    battery: "64.7 kWh",
    price: "From R 1 049 000",
    chargeTime: "~7 h (7 kW home charger)",
  },
];

const FAQS = [
  {
    q: "Will my existing Ecozen system support EV charging?",
    a: "In most cases, yes. A 5 kW+ system with lithium storage can handle overnight EV charging. For larger EVs or faster charging speeds (11–22 kW), we may recommend a battery capacity upgrade during your site assessment.",
  },
  {
    q: "What size solar system do I need to cover an EV?",
    a: "A typical South African driver covers 1 500 – 2 000 km per month, requiring roughly 250 – 400 kWh of charging energy. Our Family 8 kW system produces 900 – 1 100 kWh/month — more than enough to cover both home and vehicle.",
  },
  {
    q: "Do I need a special charger installed?",
    a: "A standard 3-pin plug (2.3 kW) works, but we recommend a dedicated Level 2 wall-box charger (7 kW) for comfortable overnight charging. Ecozen can supply and install a certified charger as part of your solar package.",
  },
  {
    q: "What happens during load-shedding?",
    a: "Your Ecozen battery keeps your charger running. As long as your battery has sufficient reserve, load-shedding has no impact on your overnight charging routine.",
  },
  {
    q: "Is there a Section 12B tax benefit for solar + EV?",
    a: "South Africa's Section 12B allows businesses to deduct 125 % of renewable energy investment costs. Individual EV owners may also qualify for the personal solar tax rebate of up to R 15 000 under current SARS incentives — speak to your tax practitioner.",
  },
];

/* ── Sub-components ─────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

function SavingsRow({ item }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp}
      className="glass-card p-5"
    >
      <div className="flex items-start gap-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
          style={{ background: `${item.accent}20` }}
        >
          <Icon size={18} style={{ color: item.accent }} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
            {item.label}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#ff453a" }}>Petrol car</p>
              <p className="text-base font-bold" style={{ color: "var(--text)" }}>{item.petrol}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#30d158" }}>EV on grid</p>
              <p className="text-base font-bold" style={{ color: "var(--text)" }}>{item.ev}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#ff9f0a" }}>EV + Solar</p>
              <p className="text-base font-bold text-gradient">{item.evLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StepCard({ step, icon: Icon, title, body, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"
          style={{ background: "#30d158" }}
        >
          <Icon size={16} />
        </span>
        <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>Step {step}</span>
      </div>
      <h3 className="text-base font-semibold leading-snug" style={{ color: "var(--text)", letterSpacing: "-0.015em" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{body}</p>
    </motion.div>
  );
}

function EVCard({ name, image, range, battery, price, chargeTime, highlight = false }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`glass-card flex flex-col gap-4 p-5 ${highlight ? "neon-border" : ""}`}
    >
      {highlight && (
        <span className="tag w-fit text-[10px]">Popular in SA</span>
      )}
      <div
        className="flex h-28 w-full items-center justify-center rounded-xl"
        style={{ background: "var(--bg-alt)" }}
      >
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full rounded-xl object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <Car size={48} style={{ color: highlight ? "#30d158" : "var(--text-secondary)", opacity: 0.7 }} />
        )}
      </div>
      <div>
        <p className="text-base font-bold" style={{ color: "var(--text)", letterSpacing: "-0.015em" }}>{name}</p>
        <p className="mt-0.5 text-sm" style={{ color: "#30d158", fontWeight: 600 }}>{price}</p>
      </div>
      <ul className="space-y-2 text-sm">
        {[
          ["Range", range],
          ["Battery", battery],
          ["Home charge", chargeTime],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between">
            <span style={{ color: "var(--text-secondary)" }}>{k}</span>
            <span className="font-semibold" style={{ color: "var(--text)" }}>{v}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-2xl border transition-colors"
      style={{ borderColor: open ? "rgba(48,209,88,0.35)" : "var(--separator)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>{q}</span>
        <ChevronDown
          size={16}
          className="mt-0.5 shrink-0 transition-transform"
          style={{ color: "#30d158", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p
              className="border-t px-5 pb-5 pt-4 text-sm leading-relaxed"
              style={{ borderColor: "var(--separator)", color: "var(--text-secondary)" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function ElectricCarsPage({ onNavigate }) {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100dvh" }}>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(48,209,88,0.13) 0%, transparent 65%)",
          }}
        />

        <div className="section-shell relative z-10 pb-16 pt-8">
          <button
            onClick={() => onNavigate("home")}
            className="btn-ghost mb-10"
            style={{ gap: "0.5rem" }}
          >
            <ArrowLeft size={15} /> Back
          </button>

          <SectionReveal>
            <span className="tag mb-5 inline-flex gap-1.5">
              <PlugZap size={11} /> Solar + Electric Vehicles
            </span>
            <h1
              className="display-xl max-w-3xl"
              style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
            >
              Drive free.{" "}
              <span className="text-gradient">Charge from your roof.</span>
            </h1>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Pairing an electric vehicle with an Ecozen Solar system eliminates both
              your fuel bill and your Eskom bill in one move. Here's what the numbers
              look like for South African drivers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onNavigate("quote")} className="btn-primary">
                Design My System <ArrowUpRight size={14} />
              </button>
              <button onClick={() => onNavigate("contact")} className="btn-ghost">
                Talk to an Advisor
              </button>
            </div>
          </SectionReveal>

          {/* Stat pills */}
          <SectionReveal className="mt-12 flex flex-wrap gap-3">
            {[
              { val: "~R 2 800", label: "avg monthly petrol spend" },
              { val: "R 8 / 100 km", label: "solar-charged EV cost" },
              { val: "95 %", label: "of km from your roof" },
              { val: "3+ tonnes", label: "CO₂ saved per year" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="glass-card flex flex-col px-5 py-4"
                style={{ minWidth: 140 }}
              >
                <span className="text-xl font-bold text-gradient">{val}</span>
                <span className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>{label}</span>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ── Cost comparison ───────────────────── */}
      <section className="bg-section-alt py-20">
        <div className="section-shell">
          <SectionReveal className="mb-10">
            <span className="tag mb-4 inline-flex gap-1.5"><TrendingDown size={11} /> Real Numbers</span>
            <h2 className="display-lg" style={{ color: "var(--text)" }}>
              The cost of driving,{" "}
              <span className="text-gradient">side by side.</span>
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
              Based on Gauteng average petrol prices (April 2026) and Eskom TOU tariffs. Solar figures assume an Ecozen Family 8 kW system.
            </p>
          </SectionReveal>

          <motion.div
            className="grid gap-4 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
          >
            {EV_SAVINGS.map((item) => (
              <SavingsRow key={item.label} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ──────────────────────── */}
      <section className="section-shell py-20">
        <SectionReveal className="mb-12">
          <span className="tag mb-4 inline-flex gap-1.5"><Zap size={11} /> How It Works</span>
          <h2 className="display-lg" style={{ color: "var(--text)" }}>
            From sunshine to{" "}
            <span className="text-gradient">kilometres.</span>
          </h2>
          <p className="mt-3 text-base max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Ecozen solar systems are designed with future EV charging in mind. The integration is seamless.
          </p>
        </SectionReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s, i) => (
            <StepCard key={s.step} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ── What's on South African roads ─────── */}
      <section className="bg-section-alt py-20">
        <div className="section-shell">
          <SectionReveal className="mb-12">
            <span className="tag mb-4 inline-flex gap-1.5"><Car size={11} /> EVs Available in SA</span>
            <h2 className="display-lg" style={{ color: "var(--text)" }}>
              Popular EVs on{" "}
              <span className="text-gradient">South African roads.</span>
            </h2>
            <p className="mt-3 text-base max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              These models pair well with a home Ecozen solar system. Charging specs are for a 7 kW Level 2 home wall-box.
            </p>
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EV_MODELS.map((ev) => (
              <EVCard key={ev.name} {...ev} />
            ))}
          </div>

          <SectionReveal className="mt-8">
            <div
              className="glass-card p-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6"
            >
              <CheckCircle2 size={22} style={{ color: "#30d158", flexShrink: 0 }} />
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text)" }}>Don't see your vehicle?</strong>{" "}
                Any EV with a Type 2 or CCS charging port is compatible with a standard Ecozen-installed wall-box. Contact us for a custom compatibility assessment.
              </p>
              <button onClick={() => onNavigate("contact")} className="btn-ghost shrink-0">
                Ask Us <ArrowUpRight size={13} />
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Savings calculator strip ──────────── */}
      <section className="section-shell py-20">
        <SectionReveal>
          <div className="glass-card neon-border p-8 sm:p-12 text-center">
            <span className="tag mb-6 inline-flex gap-1.5 mx-auto"><Calculator size={11} /> Quick Estimate</span>
            <h2 className="display-md mb-3" style={{ color: "var(--text)" }}>
              Petrol + Eskom to{" "}
              <span className="text-gradient">zero.</span>
            </h2>
            <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
              The average South African household spends{" "}
              <strong style={{ color: "var(--text)" }}>R 6 800 / month</strong> on Eskom and petrol combined. An Ecozen Family 8 kW system paired with an EV can reduce that to under{" "}
              <strong className="text-gradient">R 600 / month</strong> — a saving of over{" "}
              <strong style={{ color: "var(--text)" }}>R 74 000 per year.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => onNavigate("quote")} className="btn-primary">
                Get My Personalised Quote <ArrowUpRight size={14} />
              </button>
              <button onClick={() => onNavigate("contact")} className="btn-ghost">
                Book a Call
              </button>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── FAQ ───────────────────────────────── */}
      <section className="bg-section-alt py-20">
        <div className="section-shell">
          <SectionReveal className="mb-10">
            <h2 className="display-lg" style={{ color: "var(--text)" }}>
              Common <span className="text-gradient">questions.</span>
            </h2>
          </SectionReveal>
          <div className="max-w-3xl space-y-3">
            {FAQS.map((f) => (
              <FAQItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────── */}
      <section className="section-shell py-16 text-center">
        <SectionReveal>
          <Leaf size={32} style={{ color: "#30d158", margin: "0 auto 1.25rem" }} />
          <h2 className="display-md mb-3" style={{ color: "var(--text)" }}>
            Ready to go electric — inside{" "}
            <span className="text-gradient">and out?</span>
          </h2>
          <p className="text-base max-w-lg mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
            Ecozen designs systems with your EV in mind from day one. Get a quote that covers both your home energy and vehicle charging needs.
          </p>
          <button onClick={() => onNavigate("quote")} className="btn-primary">
            Start My Free Quote <ArrowUpRight size={14} />
          </button>
        </SectionReveal>
      </section>
    </div>
  );
}
