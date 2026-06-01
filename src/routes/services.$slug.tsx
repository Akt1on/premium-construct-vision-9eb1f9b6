import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { getService, SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    const url = `https://permasfalt59.ru/services/${s.slug}`;
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDescription },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: s.img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: s.metaTitle },
        { name: "twitter:description", content: s.metaDescription },
        { name: "twitter:image", content: s.img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            serviceType: s.title,
            provider: {
              "@type": "LocalBusiness",
              name: "Пермь Асфальт 59",
              url: "https://permasfalt59.ru",
              telephone: "+7-342-000-0000",
              areaServed: ["Пермь", "Пермский край"],
            },
            areaServed: ["Пермь", "Пермский край"],
            description: s.metaDescription,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-display text-5xl">Услуга не найдена</h1>
        <Link to="/services" className="mt-6 inline-block text-ember underline">
          Все услуги
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-display text-4xl">Не удалось загрузить услугу</h1>
        <Link to="/services" className="mt-6 inline-block text-ember underline">
          Все услуги
        </Link>
      </div>
    </div>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service: s } = Route.useLoaderData();
  const related = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-20">
          <img src={s.img} alt={s.title} className="h-full w-full object-cover opacity-25" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <div className="mx-auto max-w-[1500px] px-6">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-ember"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-1" /> все услуги
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mt-6 flex items-center gap-4">
              <s.icon className="h-12 w-12 text-ember" strokeWidth={1.4} />
              <span className="font-mono text-[11px] uppercase tracking-widest text-ember">{s.n} / 10</span>
            </div>
            <h1 className="mt-6 text-display text-[clamp(2.8rem,9vw,8rem)] leading-[0.9]">
              {s.h1}
              <span className="block bg-gradient-to-r from-foreground via-foreground to-ember bg-clip-text text-transparent">
                в&nbsp;Перми.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">{s.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="font-display text-3xl font-black text-ember">{s.price}</div>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-3 rounded-sm bg-ember px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:brightness-110"
              >
                Рассчитать <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO + POINTS */}
      <section className="relative border-t border-white/5 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 space-y-6"
          >
            {s.longBody.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5"
          >
            <div className="glass rounded-sm border border-white/10 p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ember">/ стоимость работ</div>
              <ul className="mt-6 space-y-4">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 font-display text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contacts"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-sm border border-foreground/20 px-6 py-4 font-display text-sm font-bold uppercase tracking-wider hover:border-ember"
              >
                Заказать услугу <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative overflow-hidden border-t border-white/5 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-40" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ почему мы</div>
          <h2 className="mt-4 text-display text-[clamp(2rem,5vw,4rem)] leading-[0.95]">Преимущества работы с нами</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/5 sm:grid-cols-2">
            {s.benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-background p-8 transition hover:bg-card"
              >
                <div className="font-display text-4xl font-black text-ember/30 transition group-hover:text-ember">
                  0{i + 1}
                </div>
                <p className="mt-4 font-display text-lg">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative border-t border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ как мы работаем</div>
          <h2 className="mt-4 text-display text-[clamp(2rem,5vw,4rem)] leading-[0.95]">Этапы работ</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {s.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-sm border border-white/10 bg-card/40 p-6"
              >
                <div className="font-mono text-[11px] uppercase tracking-widest text-ember">шаг {i + 1}</div>
                <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ вопросы</div>
          <h2 className="mt-4 text-display text-[clamp(2rem,5vw,4rem)] leading-[0.95]">Частые вопросы</h2>
          <div className="mt-10 space-y-4">
            {s.faq.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border border-white/10 bg-card/40 p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-bold">
                  {f.q}
                  <span className="text-ember transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="relative overflow-hidden border-t border-white/5 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-30" />
        <div className="mx-auto max-w-[1500px] px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ другие услуги</div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/services/$slug"
                params={{ slug: r.slug }}
                className="group relative overflow-hidden rounded-sm border border-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <r.icon className="h-8 w-8 text-ember" strokeWidth={1.4} />
                  <h3 className="mt-3 font-display text-lg font-bold leading-tight">{r.title}</h3>
                  <div className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ember">
                    подробнее <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:rotate-45" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/5 py-28">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-40" />
        <div className="mx-auto max-w-[1500px] px-6 text-center">
          <h2 className="text-display text-[clamp(2.2rem,6vw,5rem)]">Обсудим ваш объект?</h2>
          <p className="mt-6 text-lg text-muted-foreground">Бесплатный выезд инженера и смета в течение 24 часов.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
              href="tel:+73420000000"
              className="inline-flex items-center gap-3 rounded-sm bg-ember px-8 py-5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:brightness-110"
            >
              <Phone className="h-5 w-5" /> Позвонить
            </a>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-3 px-6 py-5 font-display text-sm font-bold uppercase tracking-wider border-b border-foreground/30"
            >
              Оставить заявку <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
