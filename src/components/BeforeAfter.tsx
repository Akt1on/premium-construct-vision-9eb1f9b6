import { useRef, useState } from "react";

export function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const onMove = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10 select-none cursor-ew-resize"
      onMouseMove={(e) => onMove(e.clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
    >
      <img src={after} alt={`${alt} — после`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt={`${alt} — до`} className="absolute inset-0 h-full w-full object-cover" style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }} loading="lazy" />
      </div>
      <div className="pointer-events-none absolute top-4 left-4 rounded-sm bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur">До</div>
      <div className="pointer-events-none absolute top-4 right-4 rounded-sm bg-ember px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">После</div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-ember" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-ember bg-background/80 backdrop-blur">
          <div className="flex gap-0.5">
            <span className="h-3 w-0.5 bg-ember" />
            <span className="h-3 w-0.5 bg-ember" />
          </div>
        </div>
      </div>
    </div>
  );
}
