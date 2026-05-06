import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function ProductCard({ title, subtitle, image, description, specs }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="glass-card group flex h-full cursor-default flex-col overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-4xl">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,17,23,0.55) 0%, transparent 60%)" }}
          />
          {/* Price badge */}
          <span
            className="absolute bottom-3 left-4 rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ background: "rgba(34,197,94,0.82)", backdropFilter: "blur(8px)" }}
          >
            {subtitle}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="text-base font-bold text-slatezen dark:text-white">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(47,79,79,0.72)" }}>{description}</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="btn-ghost mt-4 w-full justify-center text-slatezen dark:text-white"
          >
            View Specs
          </button>
        </div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(13,17,23,0.6)", backdropFilter: "blur(12px)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="glass-card neon-border w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52">
                <img src={image} alt={title} className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,17,23,0.7), transparent 50%)" }} />
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full"
                  style={{ background: "rgba(13,17,23,0.55)", backdropFilter: "blur(8px)" }}
                  aria-label="Close modal"
                >
                  <X size={15} className="text-white" />
                </button>
              </div>

              <div className="p-6">
                <h4 className="font-display text-2xl font-semibold text-slatezen dark:text-white">{title}</h4>
                <p className="mt-1 text-sm text-sage-500">{subtitle}</p>
                <ul className="mt-5 space-y-2">
                  {specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: "#22c55e" }} />
                      <span className="text-slatezen/85 dark:text-slate-200">{spec}</span>
                    </li>
                  ))}
                </ul>
                <a href="#quote" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full justify-center">
                  Request a Quote
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
