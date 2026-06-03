import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Award, Shield, Users, Building2 } from "lucide-react";
import { Counter } from "@/components/Counter";
import texture from "@/assets/texture.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании — Асфальт Пермь · с 2010 года в Перми" },
      { name: "description", content: "История, команда, ценности и сертификаты Асфальт Пермь. С 2010 года выполняем работы по асфальтированию и благоустройству в Перми и Пермском крае." },
      { property: "og:title", content: "О компании Асфальт Пермь в Перми" },
      { property: "og:description", content: "15 лет в Перми. 2400+ объектов. 14+ единиц техники. 120 человек в команде." },
      { property: "og:url", content: "https://asfalltperm.ru/about" },
    ],
    links: [{ rel: "canonical", href: "https://asfalltperm.ru/about" }],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { y: "2010", t: "Старт в Перми", d: "Основана в Перми. Первый контракт — асфальтирование двора школы." },
  { y: "2013", t: "Свой парк", d: "Купили первые единицы техники. Перестали зависеть от подрядчиков." },
  { y: "2017", t: "Крупные объекты", d: "Вышли на рынок коммерческих парковок и логистических комплексов Перми." },
  { y: "2020", t: "Краевые дороги", d: "Допуск к работам на дорогах Пермского края." },
  { y: "2025", t: "14+ машин · 2400 объектов", d: "Один из крупнейших независимых подрядчиков Перми и Пермского края." },
];

const VALUES = [
  { i: Shield, t: "Слово важнее подписи", d: "Мы не подписываем то, что не сможем сделать. И делаем больше, чем подписали." },
  { i: Award, t: "Качество — это не опция", d: "Гарантия 3 года на любое покрытие. Контроль качества на каждом этапе." },
  { i: Users, t: "Команда, а не текучка", d: "Средний стаж сотрудника — 7 лет. Операторов знаем по именам." },
  { i: Building2, t: "Полный цикл", d: "От первого замера до последнего бордюра — без субподрядов." },
];

function AboutPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 -z-20">
          <img src={texture} alt="" aria-hidden className="h-full w-full object-cover opacity-20 animate-float-slow" />
        </div>
        <div className="absolute inset-0 -z-10 bg-mesh opacity-60" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ о компании</div>
          <h1 className="mt-4 text-display text-[clamp(3rem,10vw,9rem)] leading-[0.85]">
            <span className="block">Асфальт Пермь</span>
            <span className="block translate-x-[6vw]"><span className="bg-gradient-to-r from-foreground to-ember bg-clip-text text-transparent">в&nbsp;Перми.</span></span>
          </h1>
          <p className="mt-10 max-w-3xl text-lg text-muted-foreground md:text-2xl">
            Асфальт Пермь — независимая инженерно-строительная компания, работающая в Перми и Пермском крае с 2010 года. За 15 лет мы построили дороги, дворы, парковки и территории для частных клиентов, девелоперов, промышленных предприятий и муниципальных заказчиков.
          </p>
        </div>
      </section>

      <section className="border-y border-white/5 bg-card/40 bg-noise">
        <div className="mx-auto grid max-w-[1500px] gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: 15, s: " лет", l: "В Перми" },
            { v: 2400, s: "+", l: "Объектов" },
            { v: 14, s: "+", l: "Машин" },
            { v: 120, s: "", l: "В команде" },
          ].map((it) => (
            <div key={it.l} className="bg-background p-8 md:p-12">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{it.l}</div>
              <div className="mt-4 font-display text-5xl font-black md:text-7xl"><Counter to={it.v} suffix={it.s} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32">
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ путь</div>
          <h2 className="mt-4 text-display text-[clamp(2.5rem,6vw,5rem)] leading-none">
            15 лет.<br /><span className="text-muted-foreground">Без громких слов.</span>
          </h2>
          <div className="mt-16 relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-ember via-white/10 to-transparent md:left-1/2" />
            <div className="space-y-16">
              {TIMELINE.map((e, i) => (
                <motion.div
                  key={e.y}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative grid gap-6 md:grid-cols-2 ${i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"}`}
                >
                  <div className="pl-12 md:pl-0 md:pr-16 md:text-right">
                    <div className="font-display text-5xl font-black text-ember md:text-7xl">{e.y}</div>
                  </div>
                  <div className="pl-12 md:pl-16">
                    <div className="absolute left-0 top-2 grid h-6 w-6 place-items-center rounded-full bg-ember md:left-1/2 md:-translate-x-1/2">
                      <div className="h-2 w-2 rounded-full bg-background" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">{e.t}</h3>
                    <p className="mt-2 text-muted-foreground">{e.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-32">
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ ценности</div>
          <h2 className="mt-4 text-display text-[clamp(2.5rem,6vw,5rem)] leading-none">Во что мы верим.</h2>
          <div className="mt-16 grid gap-px bg-white/5 md:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.t} className="group bg-background p-8 md:p-12">
                <v.i className="h-10 w-10 text-ember transition group-hover:-rotate-6" strokeWidth={1.4} />
                <h3 className="mt-6 font-display text-2xl font-bold md:text-3xl">{v.t}</h3>
                <p className="mt-3 text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-32">
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ документы</div>
          <h2 className="mt-4 text-display text-[clamp(2.5rem,6vw,5rem)]">Сертификаты и допуски.</h2>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["СРО · стр. работы", "ISO 9001:2015", "ОСАГО · ОПО", "Допуск к дорогам края"].map((c) => (
              <div key={c} className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-card p-6">
                <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-ember opacity-60">верифицировано</div>
                <Award className="mt-12 h-12 w-12 text-ember" strokeWidth={1.2} />
                <div className="absolute inset-x-6 bottom-6 font-display text-lg font-bold">{c}</div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-32">
        <div className="mx-auto max-w-[1500px] px-6 text-center">
          <h2 className="text-display text-[clamp(2.5rem,7vw,6rem)]">Поговорим о вашем объекте в Перми?</h2>
          <Link to="/contacts" className="mt-10 inline-flex items-center gap-3 rounded-sm bg-ember px-8 py-5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground">
            Связаться <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
