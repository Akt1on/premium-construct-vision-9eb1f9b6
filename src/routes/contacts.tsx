import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { submitLead } from "@/lib/leads";
import { toast } from "sonner";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Премиум Строй · Москва" },
      { name: "description", content: "Свяжитесь с нами: телефон, email, адрес офиса. Бесплатный выезд инженера и смета за 24 часа." },
      { property: "og:title", content: "Контакты Премиум Строй" },
      { property: "og:description", content: "Звоните, пишите, приезжайте. Работаем 24/7." },
      { property: "og:url", content: "/contacts" },
    ],
    links: [{ rel: "canonical", href: "/contacts" }],
  }),
  component: ContactsPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(100),
  phone: z.string().trim().min(10, "Введите телефон").max(20),
  message: z.string().trim().max(1000).optional(),
});

function ContactsPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = { name: form.get("name"), phone: form.get("phone"), message: form.get("message") };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="relative min-h-screen pt-40 pb-32">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-[1500px] px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ контакты</div>
        <h1 className="mt-4 text-display text-[clamp(3rem,10vw,9rem)] leading-[0.85]">
          <span className="block">Давайте</span>
          <span className="block translate-x-[6vw]"><span className="bg-gradient-to-r from-foreground to-ember bg-clip-text text-transparent">строить.</span></span>
        </h1>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            {[
              { i: Phone, l: "Телефон · 24/7", v: "+7 495 123-45-67", h: "tel:+74951234567" },
              { i: Mail, l: "Email", v: "info@premiumstroe.ru", h: "mailto:info@premiumstroe.ru" },
              { i: MapPin, l: "Офис", v: "Москва, ул. Промышленная, 12, оф. 408" },
              { i: Clock, l: "График", v: "Пн–Вс · круглосуточно" },
            ].map((c) => (
              <a
                key={c.l}
                href={c.h ?? "#"}
                className="group flex items-start gap-5 border-b border-white/10 pb-8 last:border-0"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm border border-white/10 bg-card transition group-hover:border-ember group-hover:bg-ember/10">
                  <c.i className="h-5 w-5 text-ember" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.l}</div>
                  <div className="mt-1 font-display text-xl font-bold transition group-hover:text-ember md:text-2xl">{c.v}</div>
                </div>
              </a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-sm border border-white/10 bg-card/60 backdrop-blur p-8 md:p-12">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-ember/30 blur-3xl" />

              {sent ? (
                <div className="relative flex flex-col items-center py-16 text-center">
                  <CheckCircle2 className="h-16 w-16 text-ember" strokeWidth={1.5} />
                  <h3 className="mt-6 text-display text-3xl">Заявка принята</h3>
                  <p className="mt-3 text-muted-foreground">Перезвоним в течение 15 минут.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="relative space-y-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ заявка</div>
                  <h2 className="text-display text-3xl font-black md:text-4xl">Оставьте заявку.<br /><span className="text-muted-foreground">Перезвоним за 15 минут.</span></h2>

                  <Input name="name" label="Ваше имя" placeholder="Андрей" error={errors.name} />
                  <Input name="phone" label="Телефон" placeholder="+7 (___) ___-__-__" error={errors.phone} />
                  <div>
                    <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Сообщение</label>
                    <textarea
                      name="message" rows={4} maxLength={1000}
                      placeholder="Опишите задачу"
                      className="w-full rounded-sm border border-white/10 bg-background px-4 py-3 text-foreground transition focus:border-ember focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="inline-flex w-full items-center justify-between rounded-sm bg-ember px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
                  >
                    <span>{loading ? "Отправка..." : "Отправить заявку"}</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                  <p className="text-xs text-muted-foreground">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-20 overflow-hidden rounded-sm border border-white/10">
          <iframe
            title="Карта офиса"
            src="https://yandex.ru/map-widget/v1/?ll=37.617%2C55.755&z=11"
            className="h-[480px] w-full border-0 grayscale-[0.6] contrast-125"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function Input({ name, label, placeholder, error }: { name: string; label: string; placeholder: string; error?: string }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name} placeholder={placeholder} maxLength={255}
        className={`w-full rounded-sm border bg-background px-4 py-3 text-foreground transition focus:outline-none ${
          error ? "border-destructive" : "border-white/10 focus:border-ember"
        }`}
      />
      {error && <div className="mt-1 font-mono text-[10px] text-destructive">{error}</div>}
    </div>
  );
}
