import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SERVICES, type Service } from "@/lib/services-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги асфальтирования в Перми и Пермском крае | Пермь Асфальт 59" },
      { name: "description", content: "Полный спектр услуг по асфальтированию, укладке плитки, земляным работам в Перми. Работаем с 2010 года, гарантия 3 года." },
      { property: "og:title", content: "Услуги в Перми — Пермь Асфальт 59" },
      { property: "og:description", content: "10 направлений работ. Собственная техника. Гарантия 3 года." },
      { property: "og:url", content: "https://permasfalt59.ru/services" },
    ],
    links: [{ rel: "canonical", href: "https://permasfalt59.ru/services" }],
  }),
  component: ServicesPage,
});

// Service data lives in src/lib/services-data.ts

function ServicesPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ услуги</div>
          <h1 className="mt-4 text-display text-[clamp(3rem,10vw,9rem)]">
            <span className="block">Услуги</span>
            <span className="block translate-x-[6vw] bg-gradient-to-r from-foreground via-foreground to-ember bg-clip-text text-transparent">в&nbsp;Перми.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            10 направлений работ в Перми и Пермском крае. Один подход — полный цикл от первого замера до подписания акта приёмки и гарантии 3 года.
          </p>
        </div>
      </section>

      {CHAPTERS.map((c, i) => (
        <Chapter key={c.n} chapter={c} reversed={i % 2 === 1} />
      ))}

      <section className="relative overflow-hidden border-t border-white/5 py-32">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-40" />
        <div className="mx-auto max-w-[1500px] px-6 text-center">
          <h2 className="text-display text-[clamp(2.5rem,7vw,6rem)]">Готовы обсудить ваш объект в Перми?</h2>
          <p className="mt-6 text-lg text-muted-foreground">Бесплатный выезд инженера и смета в течение 24 часов.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link to="/calculator" className="inline-flex items-center gap-3 rounded-sm bg-ember px-8 py-5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:brightness-110">
              Рассчитать стоимость <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link to="/contacts" className="inline-flex items-center gap-3 px-6 py-5 font-display text-sm font-bold uppercase tracking-wider border-b border-foreground/30">
              Связаться <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Chapter({ chapter: c, reversed }: { chapter: typeof CHAPTERS[number]; reversed: boolean }) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: reversed ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`relative md:col-span-6 ${reversed ? "md:order-2" : ""}`}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
            <div className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-widest text-ember">{c.n} / 10</div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{c.sub}</div>
              <div className="font-display text-2xl font-black text-ember">{c.price}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`flex flex-col justify-center md:col-span-6 ${reversed ? "md:order-1" : ""}`}
        >
          <c.icon className="h-12 w-12 text-ember" strokeWidth={1.4} />
          <h2 className="mt-6 text-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]">{c.title}</h2>
          <p className="mt-6 text-lg text-muted-foreground">{c.body}</p>
          <ul className="mt-8 space-y-3">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-3 font-display text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/contacts" className="group inline-flex items-center gap-3 border-b border-foreground/30 pb-2 font-display text-sm font-bold uppercase tracking-wider hover:border-ember">
              Заказать услугу <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
