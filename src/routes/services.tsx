import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Layers, Mountain, Wrench, Truck, Package, ArrowUpRight, CheckCircle2 } from "lucide-react";
import paver from "@/assets/paver.jpg";
import excavator from "@/assets/excavator.jpg";
import roller from "@/assets/roller.jpg";
import truck from "@/assets/truck.jpg";
import texture from "@/assets/texture.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги — Премиум Строй · Асфальтирование, благоустройство, спецтехника" },
      { name: "description", content: "Полный цикл строительных работ: асфальтирование, благоустройство, земляные работы, аренда спецтехники, поставка сыпучих материалов." },
      { property: "og:title", content: "Услуги Премиум Строй" },
      { property: "og:description", content: "От котлована до сдачи объекта. Гарантия до 5 лет." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const CHAPTERS = [
  {
    n: "01",
    icon: Layers,
    title: "Асфальтирование",
    sub: "Дворы · Парковки · Магистрали",
    img: paver,
    body: "Укладка асфальтобетона любой марки. Собственный завод-партнёр гарантирует поставку горячей смеси в любую точку Москвы и области. От 50 м² до федеральных трасс.",
    points: ["Подготовка основания", "Укладка асфальта в 1–3 слоя", "Укатка, разметка, бордюры", "Гарантия до 5 лет"],
    price: "от 690 ₽/м²",
  },
  {
    n: "02",
    icon: Mountain,
    title: "Благоустройство",
    sub: "Тротуары · Озеленение · Освещение",
    img: roller,
    body: "Комплексное благоустройство дворов и общественных пространств под ключ. Тротуарная плитка, малые архитектурные формы, газоны, освещение, детские площадки.",
    points: ["Проектирование и согласование", "Тротуарная плитка любого формата", "Озеленение и МАФ", "Парковая мебель и освещение"],
    price: "от 1 200 ₽/м²",
  },
  {
    n: "03",
    icon: Wrench,
    title: "Земляные работы",
    sub: "Котлованы · Траншеи · Планировка",
    img: excavator,
    body: "Разработка котлованов и траншей любой сложности. Вертикальная планировка участков. Вывоз грунта собственным транспортом. Геодезическое сопровождение.",
    points: ["Котлованы под фундаменты", "Траншеи под коммуникации", "Планировка и террасирование", "Вывоз и утилизация грунта"],
    price: "от 450 ₽/м³",
  },
  {
    n: "04",
    icon: Truck,
    title: "Аренда спецтехники",
    sub: "С оператором · 24/7",
    img: truck,
    body: "Парк из 87 единиц техники: экскаваторы, катки, асфальтоукладчики, самосвалы, фронтальные погрузчики. Все машины с операторами и полным обслуживанием.",
    points: ["Почасовая и сменная аренда", "Опытные операторы в штате", "Топливо и ТО включены", "Доставка на объект"],
    price: "от 2 500 ₽/час",
  },
  {
    n: "05",
    icon: Package,
    title: "Сыпучие материалы",
    sub: "Щебень · Песок · Грунт · Торф",
    img: texture,
    body: "Прямые поставки нерудных материалов с проверенных карьеров. Полные сертификаты качества. Доставка от 5 до 50 тонн любым видом самосвалов.",
    points: ["Щебень фракции 5–70 мм", "Песок строительный, мытый", "Торф, чернозём, плодородный грунт", "Доставка 24/7"],
    price: "от 850 ₽/тонна",
  },
] as const;

function ServicesPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ услуги</div>
          <h1 className="mt-4 text-display text-[clamp(3rem,10vw,9rem)]">
            <span className="block">Что мы</span>
            <span className="block translate-x-[6vw] bg-gradient-to-r from-foreground via-foreground to-ember bg-clip-text text-transparent">умеем.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Пять направлений. Один подход. Полный цикл — от первого замера до подписания акта приёмки и пятилетней гарантии.
          </p>
        </div>
      </section>

      {CHAPTERS.map((c, i) => (
        <Chapter key={c.n} chapter={c} reversed={i % 2 === 1} />
      ))}

      <section className="relative overflow-hidden border-t border-white/5 py-32">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-40" />
        <div className="mx-auto max-w-[1500px] px-6 text-center">
          <h2 className="text-display text-[clamp(2.5rem,7vw,6rem)]">Готовы обсудить ваш объект?</h2>
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
            <div className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-widest text-ember">{c.n} / 05</div>
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
