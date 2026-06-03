import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Цены на асфальтирование в Перми 2025 | Асфальт Пермь" },
      { name: "description", content: "Актуальные цены на асфальтирование, укладку плитки, земляные работы в Перми. От 300 ₽/кв.м. Бесплатный замер и выезд." },
      { property: "og:title", content: "Цены на асфальтирование в Перми 2025 — Асфальт Пермь" },
      { property: "og:description", content: "Прозрачный прайс: асфальт, плитка, земляные работы, спецтехника, нерудные материалы." },
      { property: "og:url", content: "https://asfalltperm.ru/prices" },
    ],
    links: [{ rel: "canonical", href: "https://asfalltperm.ru/prices" }],
  }),
  component: PricesPage,
});

type Row = { name: string; price: string };
type Section = { id: string; title: string; rows: Row[] };

const SECTIONS: Section[] = [
  {
    id: "asphalt",
    title: "Асфальтирование",
    rows: [
      { name: "Асфальтирование дорожек с материалом", price: "от 300 ₽/кв.м" },
      { name: "Асфальтирование малых площадей с материалом", price: "от 600 ₽/кв.м" },
      { name: "Асфальтирование территории", price: "от 500 ₽/кв.м" },
      { name: "Ремонт дорог", price: "от 450 ₽/кв.м" },
      { name: "Строительство дорог", price: "от 650 ₽/кв.м" },
      { name: "Ямочный ремонт", price: "от 500 ₽/кв.м" },
      { name: "Укладка асфальта", price: "от 350 ₽/кв.м" },
      { name: "Асфальтирование дорог", price: "от 350 ₽/кв.м" },
      { name: "Асфальтовая крошка", price: "от 350 ₽/кв.м" },
      { name: "Асфальт", price: "по договору" },
    ],
  },
  {
    id: "tile",
    title: "Укладка тротуарной плитки",
    rows: [
      { name: "Мощение дорог и площадок", price: "от 450 ₽/кв.м" },
      { name: "Мощение отмостков", price: "от 450 ₽/кв.м" },
      { name: "Мощение зон отдыха", price: "от 450 ₽/кв.м" },
      { name: "Мощение ступенек", price: "от 450 ₽/кв.м" },
      { name: "Мощение крыльца", price: "от 450 ₽/кв.м" },
      { name: "Укладка камня и плитки", price: "от 450 ₽/кв.м" },
      { name: "Облицовка тротуарной плиткой", price: "от 450 ₽/кв.м" },
    ],
  },
  {
    id: "garbage",
    title: "Вывоз строительного мусора",
    rows: [{ name: "Вывоз строительного мусора", price: "от 200 ₽/кв.м" }],
  },
  {
    id: "rent",
    title: "Аренда спецтехники",
    rows: [
      { name: "Аренда самосвала", price: "по договору" },
      { name: "Аренда катка", price: "по договору" },
      { name: "Аренда погрузчика", price: "по договору" },
      { name: "Аренда кран-борта", price: "по договору" },
      { name: "Аренда экскаватора", price: "по договору" },
      { name: "Аренда экскаватора-погрузчика", price: "по договору" },
      { name: "Аренда трактора-экскаватора", price: "по договору" },
      { name: "Длительная аренда спецтехники", price: "по договору" },
    ],
  },
  {
    id: "earth",
    title: "Земляные работы",
    rows: [
      { name: "Механизированная копка", price: "от 150 ₽/кв.м" },
      { name: "Устройство плодородного слоя", price: "от 120 ₽/кв.м" },
      { name: "Устройство газона", price: "от 200 ₽/кв.м" },
      { name: "Установка бордюрных камней БР 100.30.15", price: "от 600 ₽/пог.м" },
    ],
  },
  {
    id: "delivery",
    title: "Доставка и перевозка нерудных материалов",
    rows: [
      { name: "Доставка ПГС", price: "от 200 ₽/т" },
      { name: "Доставка щебня", price: "от 1 400 ₽/т" },
      { name: "Доставка песка", price: "от 200 ₽/т" },
      { name: "Доставка гравия", price: "от 400 ₽/т" },
      { name: "Доставка бутового камня", price: "от 800 ₽/т" },
      { name: "Доставка торфа", price: "от 600 ₽/т" },
      { name: "Доставка чернозёма", price: "от 500 ₽/т" },
      { name: "Доставка щебёночно-песчаной смеси", price: "от 800 ₽/т" },
    ],
  },
  {
    id: "demolition",
    title: "Демонтаж зданий и сооружений",
    rows: [
      { name: "Снос зданий и сооружений", price: "от 50 ₽/кв.м" },
      { name: "Демонтажные работы", price: "по договору" },
    ],
  },
  {
    id: "snow",
    title: "Уборка и вывоз снега",
    rows: [
      { name: "Техника для уборки снега", price: "по договору" },
      { name: "Заказать трактор для уборки снега", price: "по договору" },
      { name: "Вывоз снега", price: "по договору" },
    ],
  },
  {
    id: "trees",
    title: "Кронирование деревьев",
    rows: [{ name: "Кронирование деревьев", price: "от 1 450 ₽/час" }],
  },
  {
    id: "materials",
    title: "Нерудные материалы",
    rows: [
      { name: "Песок", price: "по договору" },
      { name: "Щебень", price: "по договору" },
      { name: "ПГС", price: "по договору" },
      { name: "Чернозём", price: "по договору" },
      { name: "Торф", price: "по договору" },
      { name: "Камень бутовый", price: "по договору" },
    ],
  },
];

function PricesPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ цены 2025</div>
          <h1 className="mt-4 text-display text-[clamp(3rem,9vw,8rem)] leading-[0.85]">
            <span className="block">Цены на</span>
            <span className="block translate-x-[6vw]">
              <span className="bg-gradient-to-r from-foreground to-ember bg-clip-text text-transparent">асфальтирование в&nbsp;Перми.</span>
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Прозрачный прайс на 2025 год. Бесплатный замер и выезд инженера на объект в Перми и Пермском крае. Окончательная цена фиксируется в договоре.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 py-12 md:py-20">
        <div className="mx-auto max-w-[1500px] space-y-16 px-6">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                    {String(i + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
                  </div>
                  <h2 className="mt-3 text-display text-[clamp(1.75rem,4vw,3rem)] leading-tight">{s.title}</h2>
                </div>
              </div>

              <div className="mt-6 divide-y divide-white/5 rounded-sm border border-white/10 bg-card/40">
                {s.rows.map((r) => (
                  <div
                    key={r.name}
                    className="group flex flex-col gap-2 px-5 py-4 transition hover:bg-card sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5"
                  >
                    <span className="font-display text-base text-foreground/90 md:text-lg">{r.name}</span>
                    <span className="font-display text-base font-black text-ember md:text-lg">{r.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 py-32">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-40" />
        <div className="mx-auto max-w-[1500px] px-6 text-center">
          <h2 className="text-display text-[clamp(2.5rem,7vw,6rem)]">Нужен точный расчёт?</h2>
          <p className="mt-6 text-lg text-muted-foreground">Бесплатный выезд инженера в Перми и Пермском крае — смета в течение 24 часов.</p>
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
