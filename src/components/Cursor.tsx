import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.2 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-magnetic]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{ scale: hover ? 1.8 : 1, rotate: hover ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="relative h-6 w-6"
      >
        <div className="absolute inset-0 rounded-full border border-white/90" />
        <div className="absolute left-1/2 top-1/2 h-[2px] w-2 -translate-x-1/2 -translate-y-1/2 bg-white/90" />
        <div className="absolute left-1/2 top-1/2 h-2 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white/90" />
      </motion.div>
    </motion.div>
  );
}
