import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function makeStub(path: string, title: string, subtitle: string) {
  return function Stub() {
    return (
      <section className="relative min-h-[100svh] overflow-hidden pt-40">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="mx-auto max-w-[1500px] px-6 py-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">{path}</div>
          <h1 className="mt-4 text-display text-[clamp(3rem,10vw,9rem)] leading-[0.85]">{title}</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">{subtitle}</p>
          <div className="mt-12 inline-flex items-center gap-3 rounded-sm border border-white/10 px-5 py-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ember" />
            Раздел в разработке · скоро
          </div>
          <div className="mt-12">
            <Link to="/" className="group inline-flex items-center gap-3 border-b border-foreground/30 pb-2 font-display text-sm font-bold uppercase tracking-wider hover:border-ember">
              На главную <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>
    );
  };
}
