import { motion } from "framer-motion";
import { ArrowRight, BatteryCharging, CarFront, Headset, House, Leaf, Sun } from "lucide-react";

const services = [
  { icon: Sun, label: "Solar panel", sub: "installation" },
  { icon: BatteryCharging, label: "Battery storage", sub: "& backup" },
  { icon: CarFront, label: "Electric vehicle", sub: "charging" },
  { icon: House, label: "Energy-efficient", sub: "solutions" },
  { icon: Headset, label: "Expert", sub: "support" },
];

export default function Hero() {
  return (
    <>
      <section id="top" className="eco-hero">
        <div className="eco-hero__image" aria-hidden="true" />
        <div className="eco-hero__shade" aria-hidden="true" />
        <div className="eco-hero__content">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="eco-hero__copy">
            <span className="eco-eyebrow"><Leaf size={15} /> South African Solar Experts</span>
            <h1>Powering a Brighter,<br />More Sustainable<br /><em>Future.</em></h1>
            <p>EcoZen Solar installs premium hybrid solar systems and portable backup power for South African homes and businesses.</p>
            <div className="eco-hero__actions">
              <a className="eco-button eco-button--gold" href="#quote">Get a Quote <ArrowRight size={18} /></a>
              <a className="eco-button eco-button--outline" href="#solutions">Explore Solutions <ArrowRight size={18} /></a>
            </div>
          </motion.div>
          <motion.div className="eco-hero__note" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .35, duration: .8 }}>
            <span>Clean energy.</span><span>Greater tomorrow.</span><i />
          </motion.div>
        </div>
        <div className="eco-servicebar">
          {services.map(({ icon: Icon, label, sub }) => <div className="eco-servicebar__item" key={label}><Icon size={30} strokeWidth={1.6} /><span>{label}<small>{sub}</small></span></div>)}
        </div>
      </section>
      <section className="eco-benefits section-shell">
        <div className="eco-benefits__intro"><span className="eco-kicker">WHY CHOOSE ECOZEN?</span><h2>Smart solar solutions<br />for a greener tomorrow.</h2><p>Take control of your energy with systems designed around the way you live and work.</p></div>
        <div className="eco-benefits__grid">
          {[{ icon: Leaf, title: "Reduce electricity bills", text: "Use more of the energy you generate." }, { icon: Sun, title: "Lower your carbon footprint", text: "Make cleaner energy part of everyday life." }, { icon: House, title: "Energy independence", text: "Build resilience with solar and battery backup." }, { icon: ArrowRight, title: "A smarter investment", text: "Explore an energy solution suited to your property." }].map(({ icon: Icon, title, text }) => <article className="eco-benefit" key={title}><Icon size={27} /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
    </>
  );
}
