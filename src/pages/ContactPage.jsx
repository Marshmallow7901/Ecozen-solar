import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight,
  CheckCircle2, Send
} from "lucide-react";
import SectionReveal from "../components/SectionReveal";

const PROVINCES = [
  "Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Limpopo",
  "Mpumalanga","North West","Free State","Northern Cape",
];

const SERVICE_AREAS = [
  { city: "Johannesburg", province: "Gauteng" },
  { city: "Pretoria", province: "Gauteng" },
  { city: "Cape Town", province: "Western Cape" },
  { city: "Stellenbosch", province: "Western Cape" },
  { city: "Durban", province: "KwaZulu-Natal" },
  { city: "Midrand", province: "Gauteng" },
  { city: "Sandton", province: "Gauteng" },
  { city: "Centurion", province: "Gauteng" },
  { city: "George", province: "Western Cape" },
  { city: "Umhlanga", province: "KwaZulu-Natal" },
  { city: "Port Elizabeth", province: "Eastern Cape" },
  { city: "Polokwane", province: "Limpopo" },
];

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+27 11 000 0000",
    sub: "Mon–Fri 8am–5pm",
    href: "tel:+27110000000",
    color: "#22c55e",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+27 82 000 0000",
    sub: "Fastest response",
    href: "https://wa.me/27820000000",
    color: "#25D366",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@ecozensolar.co.za",
    sub: "We reply within 24 hrs",
    href: "mailto:info@ecozensolar.co.za",
    color: "#f59e0b",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 08:00 – 17:00",
    sub: "Saturday by appointment",
    color: "#16a34a",
  },
];

export default function ContactPage({ onNavigate }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", province: "", message: "", subject: "General Enquiry",
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls =
    "w-full rounded-2xl border bg-white/60 px-4 py-3 text-sm text-slatezen placeholder-slatezen/40 outline-none backdrop-blur-sm transition focus:border-sage-500 focus:ring-2 focus:ring-sage-400/30 dark:bg-white/5 dark:text-white dark:placeholder-white/30";
  const borderCls = "border-sage-400/25";

  return (
    <main className="min-h-screen bg-mist dark:bg-obsidian-900">
      {/* Hero */}
      <SectionReveal className="section-shell pt-20 pb-10">
        <span className="tag mb-4 inline-flex"><MapPin size={11} /> Contact Us</span>
        <h1 className="font-display text-5xl font-semibold text-slatezen dark:text-white md:text-6xl">
          Talk to a{" "}
          <span className="text-gradient">solar expert.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "rgba(47,79,79,0.72)" }}>
          Whether you're ready to go solar or just exploring options, our team is here to help — zero pressure, no obligation.
        </p>
      </SectionReveal>

      <div className="section-shell grid gap-10 pb-24 lg:grid-cols-[1fr_420px]">
        {/* ── Contact Form ── */}
        <SectionReveal>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card flex flex-col items-center gap-6 p-12 text-center"
            >
              <span
                className="grid h-16 w-16 place-items-center rounded-3xl"
                style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}
              >
                <CheckCircle2 size={30} color="white" />
              </span>
              <div>
                <h2 className="font-display text-3xl font-semibold text-slatezen dark:text-white">
                  Message received!
                </h2>
                <p className="mt-2 text-sm" style={{ color: "rgba(47,79,79,0.7)" }}>
                  Hi {form.name.split(" ")[0]}, we'll be in touch within 24 hours.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSent(false)} className="btn-ghost text-slatezen dark:text-white">
                  Send another
                </button>
                <button onClick={() => onNavigate("quote")} className="btn-primary">
                  Get a Quote <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 p-8">
              <h2 className="font-display text-2xl font-semibold text-slatezen dark:text-white">
                Send us a message
              </h2>

              {/* Subject */}
              <div className="flex flex-wrap gap-2">
                {["General Enquiry", "Technical Support", "Partnership", "Get a Quote"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, subject: s }))}
                    className="rounded-full border px-4 py-1.5 text-xs font-semibold transition"
                    style={{
                      borderColor: form.subject === s ? "#22c55e" : "rgba(34,197,94,0.2)",
                      background: form.subject === s ? "rgba(34,197,94,0.12)" : "transparent",
                      color: form.subject === s ? "#16a34a" : "rgba(47,79,79,0.65)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slatezen/70 dark:text-white/60">Full Name *</label>
                  <input required className={`${inputCls} ${borderCls}`} placeholder="Sipho Nkosi" value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slatezen/70 dark:text-white/60">Email *</label>
                  <input required type="email" className={`${inputCls} ${borderCls}`} placeholder="sipho@example.com" value={form.email} onChange={set("email")} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slatezen/70 dark:text-white/60">Phone</label>
                  <input type="tel" className={`${inputCls} ${borderCls}`} placeholder="+27 82 000 0000" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slatezen/70 dark:text-white/60">Province</label>
                  <select className={`${inputCls} ${borderCls}`} value={form.province} onChange={set("province")}>
                    <option value="">Select province…</option>
                    {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slatezen/70 dark:text-white/60">Message *</label>
                <textarea
                  required
                  rows={5}
                  className={`${inputCls} ${borderCls} resize-none`}
                  placeholder="Tell us about your energy needs or ask any question…"
                  value={form.message}
                  onChange={set("message")}
                />
              </div>

              <button type="submit" className="btn-primary justify-center">
                Send Message <Send size={14} />
              </button>
            </form>
          )}
        </SectionReveal>

        {/* ── Right sidebar ── */}
        <div className="flex flex-col gap-6">
          {/* Contact cards */}
          <SectionReveal className="flex flex-col gap-3">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, sub, href, color }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass-card flex items-start gap-4 p-5"
              >
                <span
                  className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl"
                  style={{ background: `${color}22` }}
                >
                  <Icon size={18} style={{ color }} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="mt-0.5 block text-sm font-semibold text-slatezen hover:underline dark:text-white">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-semibold text-slatezen dark:text-white">{value}</p>
                  )}
                  <p className="text-xs" style={{ color: "rgba(47,79,79,0.55)" }}>{sub}</p>
                </div>
              </motion.div>
            ))}
          </SectionReveal>

          {/* Service Areas */}
          <SectionReveal className="glass-card p-6">
            <h3 className="mb-4 font-display text-lg font-semibold text-slatezen dark:text-white">
              Service Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map(({ city }) => (
                <span
                  key={city}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{ borderColor: "rgba(34,197,94,0.25)", color: "#16a34a", background: "rgba(34,197,94,0.07)" }}
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(47,79,79,0.55)" }}>
              Not on the list? Contact us — we may still be able to assist.
            </p>
          </SectionReveal>

          {/* WhatsApp CTA */}
          <SectionReveal>
            <a
              href="https://wa.me/27820000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex w-full items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
