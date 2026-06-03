import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, setFromClientX]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      ref={ref}
      role="slider"
      aria-label={`${alt} — сравнение до и после`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
      onPointerDown={(e) => {
        setDragging(true);
        setFromClientX(e.clientX);
      }}
      className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-sm border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-ember"
      style={{ cursor: dragging ? "grabbing" : "ew-resize" }}
    >
      <img src={after} alt={`${alt} — после`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" draggable={false} />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={`${alt} — до`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }}
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute top-4 left-4 rounded-sm bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur">До</div>
      <div className="pointer-events-none absolute top-4 right-4 rounded-sm bg-ember px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">После</div>
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-sm bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur transition-opacity"
        style={{ opacity: dragging ? 0 : 1 }}
      >
        ← потяните, чтобы сравнить →
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-ember" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-ember bg-background/80 backdrop-blur">
          <div className="flex gap-0.5">
            <span className="h-3 w-0.5 bg-ember" />
            <span className="h-3 w-0.5 bg-ember" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
