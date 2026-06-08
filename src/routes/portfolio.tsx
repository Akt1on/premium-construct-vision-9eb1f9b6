import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { useProjects } from "@/lib/content";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Портфолио — Асфальт Пермь · 2400+ объектов в Перми и крае" },
      { name: "description", content: "Реализованные проекты в Перми и Пермском крае: парковки, дворы, дороги, котлованы, благоустройство. Результаты до и после." },
      { property: "og:title", content: "Портфолио Асфальт Пермь в Перми" },
      { property: "og:description", content: "Более 2400 объектов в Перми и крае. Реальные кейсы, реальные цифры." },
      { property: "og:url", content: "https://asfalltperm.ru/portfolio" },
    ],
    links: [{ rel: "canonical", href: "https://asfalltperm.ru/portfolio" }],
  }),
  component: PortfolioPage,
});

type Project = {
  id: string;
  img: string;
  t: string;
  c: string;
  y: string;
  cat: string;
  h: string;
  desc: string;
  before: string | null;
  after: string | null;
};

const FALLBACK: Project[] = [
  { id: "1", img: "/content/project1.jpg", t: "Парковка ТЦ в Перми", c: "12 400 м²", y: "2024", cat: "Асфальтирование", h: "lg:row-span-2 lg:col-span-2", desc: "Полная замена покрытия двухуровневой парковки торгового центра в Перми. Работы выполнены за 18 ночей без остановки работы ТЦ.", before: "/content/before.jpg", after: "/content/after.jpg" },
  { id: "2", img: "/content/project2.jpg", t: "Котлован под ЖК в Перми", c: "3 200 м³", y: "2024", cat: "Земляные работы", h: "", desc: "Разработка котлована под фундаментную плиту жилого комплекса в Перми. Геодезическое сопровождение, вывоз грунта.", before: null, after: null },
  { id: "3", img: "/content/project4.jpg", t: "Реконструкция дороги в Пермском крае", c: "8.5 км", y: "2023", cat: "Асфальтирование", h: "", desc: "Капитальный ремонт участка краевой дороги. Фрезерование, укладка трёх слоёв асфальта, разметка.", before: null, after: null },
  { id: "4", img: "/content/project3.jpg", t: "Благоустройство ЖК в Перми", c: "под ключ", y: "2023", cat: "Благоустройство", h: "lg:col-span-2", desc: "Комплексное благоустройство дворовой территории жилого комплекса в Перми: тротуары, детская площадка, озеленение, освещение.", before: null, after: null },
  { id: "5", img: "/content/project1.jpg", t: "Логистический комплекс в Перми", c: "25 000 м²", y: "2023", cat: "Асфальтирование", h: "", desc: "Асфальтирование территории логистического комплекса. Усиленное основание под большегрузный транспорт.", before: null, after: null },
  { id: "6", img: "/content/project2.jpg", t: "Парковая зона в Перми", c: "1.2 га", y: "2022", cat: "Тротуарная плитка", h: "", desc: "Тротуарная плитка, дорожки из брусчатки, велодорожка. Малые архитектурные формы.", before: null, after: null },
];

const SPANS = ["lg:row-span-2 lg:col-span-2", "", "", "lg:col-span-2", "", ""];

function PortfolioPage() {
  const { data: db } = useProjects();
  const [open, setOpen] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("Все работы");

  const projects: Project[] = useMemo(() => {
    if (db && db.length) {
      return db.map((p, i) => ({
        id: p.id,
        img: p.image_url || "/content/project1.jpg",
        t: p.title,
        c: p.metric || "",
        y: p.year || "",
        cat: p.category || "Прочее",
        h: SPANS[i % SPANS.length],
        desc: p.description || "",
        before: p.before_url,
        after: p.after_url,
      }));
    }
    return FALLBACK;
  }, [db]);

  const filters = useMemo(() => ["Все работы", ...Array.from(new Set(projects.map((p) => p.cat)))], [projects]);
  const visible = filter === "Все работы" ? projects : projects.filter((p) => p.cat === filter);
  const beforeAfter = projects.find((p) => p.before && p.after);

  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ портфолио</div>
          <h1 className="mt-4 text-display text-[clamp(3rem,10vw,9rem)]">
            <span className="block">2400+ объектов</span>
            <span className="block translate-x-[6vw]"><span className="bg-gradient-to-r from-foreground to-ember bg-clip-text text-transparent">в&nbsp;Перми и крае.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            От частного двора в Пермском крае до краевой дороги. Каждый объект — наш почерк.
          </p>
        </div>
      </section>

      {beforeAfter?.before && beforeAfter?.after && (
        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-[1500px] px-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ до · после</div>
            <h2 className="mt-4 text-display text-[clamp(2rem,5vw,4rem)]">Разница, которую видно.</h2>
            <div className="mt-10">
              <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} alt={beforeAfter.t} />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{[beforeAfter.t, beforeAfter.c, beforeAfter.y].filter(Boolean).join(" · ")}</p>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="mb-10 flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-sm border px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest transition ${
                  filter === f
                    ? "border-ember bg-ember text-primary-foreground"
                    : "border-white/10 text-muted-foreground hover:border-ember hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {visible.map((it, i) => (
              <motion.button
                key={it.id}
                onClick={() => setOpen(it)}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`group relative overflow-hidden bg-card text-left ${it.h}`}
              >
                <img src={it.img} alt={it.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ember">{[it.c, it.y].filter(Boolean).join(" · ")}</div>
                  <h3 className="mt-2 font-display text-xl font-bold transition group-hover:text-ember md:text-2xl">{it.t}</h3>
                </div>
                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 backdrop-blur-md opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-sm border border-white/10 bg-card"
            >
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-ember hover:text-primary-foreground">
                <X className="h-5 w-5" />
              </button>
              <img src={open.img} alt={open.t} className="aspect-[16/9] w-full object-cover" />
              <div className="p-8 md:p-12">
                <div className="font-mono text-[11px] uppercase tracking-widest text-ember">{[open.c, open.y].filter(Boolean).join(" · ")}</div>
                <h3 className="mt-3 text-display text-3xl md:text-5xl">{open.t}</h3>
                <p className="mt-6 text-lg text-muted-foreground">{open.desc}</p>
                <Link to="/contacts" className="mt-8 inline-flex items-center gap-3 rounded-sm bg-ember px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground">
                  Хочу так же <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
