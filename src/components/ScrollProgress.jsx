import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg,#30d158,#ff9f0a)",
      }}
      aria-hidden="true"
    />
  );
}
