import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionReveal from "./SectionReveal";

const FAQS = [
  {
    category: "Installation",
    items: [
      {
        q: "How long does a rooftop solar installation take?",
        a: "Most residential installations are completed in 1–2 days. Larger commercial systems or those requiring SSEG municipal approval may take 5–10 business days end-to-end, including paperwork.",
      },
      {
        q: "Do I need permission from my municipality or body corporate?",
        a: "Yes — for grid-tied systems you must apply for SSEG (Small-Scale Embedded Generation) approval from your municipality. Ecozen handles this process on your behalf. Body corporate approval is also required if you live in a complex or estate; we can assist with motivating the application.",
      },
      {
        q: "Will solar work during load-shedding?",
        a: "Yes, with battery backup. A hybrid or off-grid system with a lithium battery bank keeps your home running during outages. Grid-tied systems without batteries will shut off during load-shedding for safety reasons — that's why we always recommend including battery storage.",
      },
      {
        q: "Can I install solar myself?",
        a: "South African law requires a Registered Person (RP) to sign off all electrical installations, including solar. DIY installation is illegal and voids your CoC (Certificate of Compliance). Ecozen provides fully compliant, warrant-backed installations.",
      },
    ],
  },
  {
    category: "Finance & ROI",
    items: [
      {
        q: "How long before solar pays for itself?",
        a: "Most residential systems achieve payback in 5–8 years depending on your Eskom tariff, battery size, and system capacity. With current tariff escalation of roughly 15% per year, payback periods are shortening. After that, you effectively generate free electricity for 15–20 more years.",
      },
      {
        q: "Can I finance my solar system?",
        a: "Yes. Several South African banks — including ABSA, Nedbank, and FNB — offer dedicated solar finance products with rates around prime + 1–3%. Ecozen can connect you with preferred lending partners. Terms range from 12 to 84 months. Use our Financing Calculator on the home page to model your repayments.",
      },
      {
        q: "Is solar VAT-exempt in South Africa?",
        a: "Residential solar panels (photovoltaic) are VAT zero-rated since 1 March 2023 under the government's energy stimulus. This effectively reduces your system cost by 15%. Note: batteries and inverters still attract standard VAT.",
      },
      {
        q: "What about Section 12B tax incentives for businesses?",
        a: "Section 12B of the Income Tax Act allows businesses to deduct 125% of the cost of solar and renewable energy assets in the first year. This is a significant benefit for commercial clients — our commercial team can provide a full tax-benefit breakdown for your business.",
      },
    ],
  },
  {
    category: "System & Equipment",
    items: [
      {
        q: "What inverter brands do you use?",
        a: "We install Sunsynk and Growatt hybrid inverters — both carry full SA warranties and are among the most popular choices locally due to excellent local support networks and proven reliability in South African grid conditions.",
      },
      {
        q: "How long do the batteries last?",
        a: "Lithium iron phosphate (LiFePO4) batteries typically last 4,000–6,000 charge cycles — roughly 10–15 years at one full cycle per day. Most batteries we supply carry a 10-year warranty. Lead-acid alternatives are cheaper upfront but typically last only 2–4 years.",
      },
      {
        q: "Can I expand my system later?",
        a: "Absolutely. All Ecozen installations are designed with expansion in mind. You can add more panels, increase battery capacity, or upgrade your inverter. We map out a growth path during your initial consultation so you're never locked in.",
      },
      {
        q: "What happens to my system when Eskom power returns?",
        a: "Hybrid systems switch seamlessly between solar, battery, and Eskom grid power — usually within 20 milliseconds. You won't notice the transition. The system automatically prioritises solar during daylight, stores surplus in your battery, and only draws from the grid as a last resort.",
      },
    ],
  },
  {
    category: "Aftercare",
    items: [
      {
        q: "What warranty do you offer?",
        a: "Panels typically carry a 25-year performance warranty and a 12-year product warranty. Inverters: 5–10 years. Batteries: 10 years. Ecozen provides a 2-year workmanship warranty on all installations, and our service team is available for post-install support.",
      },
      {
        q: "Do you offer maintenance plans?",
        a: "Yes. Our annual maintenance plan includes panel cleaning, system health check, inverter firmware updates, and a written report. Many clients opt for this to maintain peak efficiency and keep warranties valid.",
      },
    ],
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border transition-colors"
      style={{ borderColor: isOpen ? "rgba(48,209,88,0.35)" : "var(--separator)" }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
        style={{ background: isOpen ? "rgba(48,209,88,0.06)" : "transparent" }}
      >
        <span className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="mt-0.5 flex-shrink-0"
          style={{ color: "#30d158" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
          >
            <p className="border-t px-5 pb-5 pt-4 text-sm leading-relaxed"
              style={{ borderColor: "var(--separator)", color: "var(--text-secondary)" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => setOpenKey((k) => (k === key ? null : key));

  return (
    <section className="section-shell py-20">
      <SectionReveal className="mb-12 max-w-2xl">
        <span className="tag mb-4 inline-flex"><HelpCircle size={11} /> Common Questions</span>
        <h2 className="display-lg" style={{ color: "var(--text)" }}>
          Everything you need{" "}
          <span className="text-gradient">to know.</span>
        </h2>
        <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          SA-specific answers on installation, finance, equipment, and aftercare.
        </p>
      </SectionReveal>

      <div className="grid gap-10 lg:grid-cols-2">
        {FAQS.map(({ category, items }) => (
          <SectionReveal key={category} className="flex flex-col gap-3">
            <h3 className="mb-2 text-xs font-semibold" style={{ color: "#30d158", letterSpacing: "0.01em" }}>
              {category}
            </h3>
            {items.map(({ q, a }) => {
              const key = category + q;
              return (
                <FAQItem key={key} q={q} a={a} isOpen={openKey === key} onToggle={() => toggle(key)} />
              );
            })}
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
