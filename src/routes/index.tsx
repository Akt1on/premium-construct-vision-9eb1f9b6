import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Truck,
  Layers,
  Mountain,
  Wrench,
  Package,
  Shield,
  Clock,
  Award,
  CheckCircle2,
  Quote,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import textureImg from "@/assets/texture.jpg";
import p1 from "@/assets/project1.jpg";
import p2 from "@/assets/project2.jpg";
import p3 from "@/assets/project3.jpg";
import p4 from "@/assets/project4.jpg";
import { Magnetic } from "@/components/Magnetic";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Премиум Строй — Асфальтирование, благоустройство, спецтехника в Москве" },
      { name: "description", content: "Асфальтирование дворов, парковок и магистралей. Благоустройство, земляные работы, аренда спецтехники. Собственный парк, договор, гарантия до 5 лет." },
      { property: "og:title", content: "Премиум Строй — строим будущее. Профессионально. Быстро. Навсегда." },
      { property: "og:description", content: "15+ лет опыта · собственная техника · договор · гарантия 5 лет." },
      { property: "og:image", content: "/og.jpg" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Премиум Строй",
        url: "https://premiumstroe.ru",
        telephone: "+7 495 123-45-67",
        address: { "@type": "PostalAddress", addressLocality: "Москва", addressCountry: "RU" },
        priceRange: "$$",
        areaServed: "Москва и Московская область",
      }),
    }],
  }),
  component: HomePage,
});

const SERVICES = [
  { icon: Layers, title: "Асфальтирование", desc: "Дворы, парковки, дороги, магистрали. Укладка от 50 м² с гарантией.", tag: "01" },
  { icon: Mountain, title: "Благоустройство", desc: "Комплексные работы под ключ: тротуары, бордюры, озеленение, освещение.", tag: "02" },
  { icon: Wrench, title: "Земляные работы", desc: "Котлованы, траншеи, планировка, разработка любой сложности.", tag: "03" },
  { icon: Truck, title: "Аренда спецтехники", desc: "Экскаваторы, катки, самосвалы, асфальтоукладчики. С оператором.", tag: "04" },
  { icon: Package, title: "Сыпучие материалы", desc: "Щебень, песок, торф, грунт, земля. Доставка от 5 до 50 тонн.", tag: "05" },
] as const;

function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Projects />
      <Testimonials />
      <CTA />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-20">
        <img src={heroImg} alt="Асфальтоукладчики ночью" width={1920} height={1080} fetchPriority="high" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.13_0.025_260/_70%)_85%)]" />
      </motion.div>

      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-6 pb-20 pt-40">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-ember" />
          <span>est. 2009 · Москва</span>
          <span className="text-ember">●</span>
          <span>15+ лет на рынке</span>
        </div>

        <h1 className="text-display mt-6 text-[clamp(3rem,11vw,11rem)] text-foreground">
          <span className="block">Мы&nbsp;строим</span>
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="block translate-x-[6vw]"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-ember bg-clip-text text-transparent">будущее.</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, staggerChildren: 0.1 }}
            className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[clamp(1rem,3vw,2.5rem)] font-display font-light tracking-tight text-muted-foreground"
          >
            <span className="text-foreground/90">Профессионально.</span>
            <span className="text-steel">Быстро.</span>
            <span className="text-ember">Навсегда.</span>
          </motion.span>
        </h1>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Magnetic strength={0.4}>
            <Link
              to="/calculator"
              data-magnetic
              className="group relative inline-flex items-center gap-4 rounded-sm bg-ember px-8 py-5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition animate-pulse-ring hover:brightness-110"
            >
              <span>Рассчитать стоимость</span>
              <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/portfolio"
              data-magnetic
              className="group inline-flex items-center gap-3 px-6 py-5 font-display text-sm font-bold uppercase tracking-wider text-foreground"
            >
              <span className="border-b border-foreground/30 pb-1 transition group-hover:border-ember">Смотреть работы</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>

        <div className="pointer-events-none absolute right-6 top-40 hidden text-right md:block">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">N 55°45′ E 37°37′</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ember">REC ● LIVE</div>
        </div>

        <div className="mt-16 flex items-end justify-between border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>scroll · journey</span>
          <span>01 / 07</span>
        </div>
      </motion.div>
    </section>
  );
}

function Stats() {
  const items = [
    { v: 2400, s: "+", l: "Объектов сдано" },
    { v: 15, s: " лет", l: "На рынке" },
    { v: 87, s: "", l: "Единиц техники" },
    { v: 5, s: " лет", l: "Гарантии" },
  ];
  return (
    <section className="relative border-y border-white/5 bg-card/40 bg-noise">
      <div className="mx-auto grid max-w-[1500px] gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.l} className="group relative overflow-hidden bg-background p-8 transition hover:bg-card md:p-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{it.l}</div>
            <div className="mt-4 font-display text-5xl font-black md:text-7xl">
              <Counter to={it.v} suffix={it.s} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-700 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-60" />
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ 02 — услуги</div>
            <h2 className="mt-4 text-display text-[clamp(2.5rem,6vw,5.5rem)]">
              Полный цикл.<br />
              <span className="text-muted-foreground">От котлована</span><br />
              <span className="text-ember">до сдачи объекта.</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-muted-foreground md:text-xl">
              Собственный парк техники, штат опытных инженеров и асфальтобетонный завод-партнёр позволяют нам выполнять работы любого масштаба — от двора частного дома до участка федеральной трассы.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative min-h-[340px] overflow-hidden bg-background p-8"
            >
              <div className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s.tag}</div>
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-ember/0 blur-3xl transition-all duration-700 group-hover:bg-ember/40" />
              <s.icon className="h-10 w-10 text-steel transition-transform duration-500 group-hover:-rotate-6 group-hover:text-ember" strokeWidth={1.4} />
              <h3 className="mt-12 font-display text-2xl font-bold transition group-hover:text-ember md:text-3xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/services" className="absolute bottom-6 left-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/80 transition hover:text-ember">
                Подробнее <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
          <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-ember p-8 text-primary-foreground">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-80">/ заявка</div>
            <div>
              <div className="font-display text-3xl font-black leading-none">Свой объект?</div>
              <p className="mt-3 text-sm opacity-90">Бесплатный выезд и смета в течение 24 часов.</p>
            </div>
            <Link to="/contacts" className="inline-flex items-center justify-between border-t border-primary-foreground/30 pt-4 font-display text-sm font-bold uppercase tracking-wider">
              <span>Оставить заявку</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-primary-foreground/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Заявка и выезд", d: "Бесплатный замер на объекте в течение 24 часов." },
    { n: "02", t: "Смета и договор", d: "Прозрачный расчёт. Фиксированная цена. Без сюрпризов." },
    { n: "03", t: "Производство работ", d: "Собственная техника. Контроль качества на каждом этапе." },
    { n: "04", t: "Сдача и гарантия", d: "Акт, документы, гарантия до 5 лет на покрытие." },
  ];
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-32">
      <div className="absolute inset-0 -z-10 opacity-[0.07]">
        <img src={textureImg} alt="" aria-hidden className="h-full w-full object-cover animate-float-slow" />
      </div>
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ 03 — процесс</div>
        <h2 className="mt-4 text-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none">
          Четыре шага<br />
          <span className="text-muted-foreground">до идеального покрытия.</span>
        </h2>
        <div className="mt-20 grid gap-px bg-white/5 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="group relative overflow-hidden bg-background p-8 md:min-h-[280px]">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">шаг</div>
              <div className="mt-2 font-display text-7xl font-black text-foreground/10 transition group-hover:text-ember">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const items = [
    { img: p1, t: "Парковка ТЦ «Метрополис»", c: "12 400 м² · 2024", h: "lg:row-span-2 lg:col-span-2" },
    { img: p2, t: "Котлован под ЖК «Северный»", c: "3 200 м³ · 2024", h: "" },
    { img: p4, t: "Реконструкция М-7", c: "8.5 км · 2023", h: "" },
    { img: p3, t: "Благоустройство ЖК «Алые Паруса»", c: "под ключ · 2023", h: "lg:col-span-2" },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ 04 — портфолио</div>
            <h2 className="mt-4 text-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none">
              Реализовано.<br /><span className="text-muted-foreground">2400+ объектов.</span>
            </h2>
          </div>
          <Link to="/portfolio" className="group inline-flex items-center gap-3 border-b border-foreground/30 pb-2 font-display text-sm font-bold uppercase tracking-wider hover:border-ember">
            Все работы <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </Link>
        </div>

        <div className="mt-16 grid auto-rows-[260px] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden bg-card ${it.h}`}
            >
              <img src={it.img} alt={it.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ember">{it.c}</div>
                <h3 className="mt-2 font-display text-xl font-bold transition group-hover:text-ember md:text-2xl">{it.t}</h3>
              </div>
              <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 backdrop-blur-md opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { n: "Андрей К.", r: "Директор УК «Северная»", t: "Заасфальтировали двор площадью 4000 м² за 3 дня. Качество — европейский уровень. Через 2 года ни одной трещины." },
    { n: "Марина С.", r: "Главный инженер ЖК", t: "Делали благоустройство под ключ. Уложились в смету и сроки. Документы — идеально." },
    { n: "Сергей В.", r: "Владелец автосервиса", t: "Парковка перед автосервисом — теперь визитная карточка. Спасибо за чистую работу." },
  ];
  const trust = [
    { i: Shield, t: "Договор", d: "По всем работам" },
    { i: Award, t: "Гарантия 5 лет", d: "На покрытие" },
    { i: Clock, t: "Сроки", d: "Фиксируем в договоре" },
    { i: CheckCircle2, t: "ISO 9001", d: "Контроль качества" },
  ];
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-card/30 py-32">
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ 05 — доверие</div>
            <h2 className="mt-4 text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">
              Нам доверяют<br />застройщики,<br /><span className="text-ember">УК и города.</span>
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {trust.map((t) => (
                <div key={t.t} className="rounded-sm border border-white/10 p-4">
                  <t.i className="h-5 w-5 text-ember" />
                  <div className="mt-3 font-display text-sm font-bold">{t.t}</div>
                  <div className="text-xs text-muted-foreground">{t.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {reviews.map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-sm border border-white/10 bg-background p-8 transition hover:border-ember/50"
              >
                <Quote className="absolute right-6 top-6 h-12 w-12 text-ember/20" />
                <p className="font-display text-lg leading-snug text-foreground/90 md:text-xl">«{r.t}»</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-ember font-display text-sm font-black text-primary-foreground">{r.n[0]}</div>
                  <div>
                    <div className="font-display text-sm font-bold">{r.n}</div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{r.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" aria-hidden className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </div>
      <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-10 px-6 py-32 md:py-48">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ 06 — начнём</div>
        <h2 className="text-display text-[clamp(3rem,9vw,9rem)] leading-[0.85]">
          Готовы<br />
          <span className="text-ember">построить?</span>
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          Опишите задачу — наш инженер выедет на объект, замерит и пришлёт смету в течение суток. Бесплатно, без обязательств.
        </p>
        <Magnetic strength={0.4}>
          <Link
            to="/contacts"
            data-magnetic
            className="group inline-flex items-center gap-4 rounded-sm bg-ember px-10 py-6 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground animate-pulse-ring"
          >
            <span>Оставить заявку</span>
            <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
