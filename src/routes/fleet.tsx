import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { useFleet } from "@/lib/content";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Аренда спецтехники в Перми и Пермском крае | Асфальт Пермь" },
      { name: "description", content: "Аренда спецтехники в Перми: самосвалы, катки, погрузчики, кран-борты, экскаваторы, экскаваторы-погрузчики, тракторы-экскаваторы. 14+ единиц собственной техники, с оператором, 24/7." },
      { property: "og:title", content: "Парк техники Асфальт Пермь в Перми" },
      { property: "og:description", content: "14+ единиц техники в Перми. Все с операторами. Доставка на объект." },
      { property: "og:url", content: "https://asfalltperm.ru/fleet" },
    ],
    links: [{ rel: "canonical", href: "https://asfalltperm.ru/fleet" }],
  }),
  component: FleetPage,
});

type FleetItem = { id: string; cat: string; name: string; spec: string; price: string; img: string };

const FALLBACK: FleetItem[] = [
  { id: "1", cat: "Самосвалы", name: "Самосвалы", spec: "Перевозка сыпучих материалов, грунта, строительного мусора", price: "от 1 800 ₽/час", img: "/content/truck.jpg" },
  { id: "2", cat: "Катки", name: "Катки", spec: "Уплотнение грунта и асфальта при дорожных работах", price: "от 2 200 ₽/час", img: "/content/roller.jpg" },
  { id: "3", cat: "Погрузчики", name: "Погрузчики", spec: "Погрузочно-разгрузочные работы любой сложности", price: "от 2 000 ₽/час", img: "/content/excavator.jpg" },
  { id: "4", cat: "Кран-борты", name: "Кран-борты", spec: "Перевозка крупногабаритных грузов с самостоятельной погрузкой", price: "от 2 400 ₽/час", img: "/content/truck.jpg" },
  { id: "5", cat: "Экскаваторы", name: "Экскаваторы", spec: "Рытьё котлованов, траншей и земляные работы", price: "от 2 600 ₽/час", img: "/content/excavator.jpg" },
  { id: "6", cat: "Экскаваторы-погрузчики", name: "Экскаваторы-погрузчики", spec: "Универсальная техника: копка, погрузка, транспортировка", price: "от 2 200 ₽/час", img: "/content/excavator.jpg" },
  { id: "7", cat: "Тракторы-экскаваторы", name: "Тракторы-экскаваторы", spec: "Многофункциональная техника для строительных и с/х задач", price: "от 2 000 ₽/час", img: "/content/paver.jpg" },
];

function FleetPage() {
  const { data: db } = useFleet();
  const [cat, setCat] = useState<string>("all");

  const fleet: FleetItem[] = useMemo(() => {
    if (db && db.length) {
      return db.map((m) => ({
        id: m.id,
        cat: m.category || "Прочее",
        name: m.name,
        spec: m.specs || "",
        price: m.price_text || "по запросу",
        img: m.image_url || "/content/truck.jpg",
      }));
    }
    return FALLBACK;
  }, [db]);

  const cats = useMemo(() => {
    const map = new Map<string, number>();
    for (const f of fleet) map.set(f.cat, (map.get(f.cat) ?? 0) + 1);
    return [{ id: "all", label: "Вся техника", count: fleet.length }, ...[...map.entries()].map(([id, count]) => ({ id, label: id, count }))];
  }, [fleet]);

  const items = useMemo(() => (cat === "all" ? fleet : fleet.filter((f) => f.cat === cat)), [cat, fleet]);

  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-40 pb-16">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ парк техники</div>
          <h1 className="mt-4 text-display text-[clamp(3rem,10vw,9rem)]">
            <span className="block">Аренда спецтехники</span>
            <span className="block translate-x-[6vw]"><span className="bg-gradient-to-r from-foreground to-ember bg-clip-text text-transparent">в&nbsp;Перми и крае.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            14+ единиц собственной техники в Перми: самосвалы, катки, погрузчики, кран-борты, экскаваторы, экскаваторы-погрузчики и тракторы-экскаваторы. Все машины проходят ежедневный осмотр. Операторы — в штате с опытом от 7 лет. Работаем по всему Пермскому краю.
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-y border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center gap-2 overflow-x-auto px-6 py-4">
          <Filter className="h-4 w-4 shrink-0 text-ember" />
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition ${
                cat === c.id
                  ? "border-ember bg-ember text-primary-foreground"
                  : "border-white/10 text-muted-foreground hover:border-ember hover:text-foreground"
              }`}
            >
              {c.label} <span className="opacity-60">[{c.count}]</span>
            </button>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-px bg-white/5 px-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative overflow-hidden bg-background"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-ember">№ {String(i + 1).padStart(2, "0")}</div>
                <div className="absolute right-4 top-4 rounded-sm glass px-2 py-1 font-mono text-[10px] uppercase tracking-widest">в наличии</div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m.spec}</div>
                <h3 className="mt-2 font-display text-xl font-bold transition group-hover:text-ember">{m.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg font-black text-ember">{m.price}</span>
                  <Link to="/contacts" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest hover:text-ember">
                    Арендовать <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-700 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
