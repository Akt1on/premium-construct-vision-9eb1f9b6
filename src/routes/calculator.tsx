import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowUpRight, Calculator as CalcIcon, X, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { submitLead } from "@/lib/leads";
import { toast } from "sonner";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Калькулятор стоимости — Премиум Строй" },
      { name: "description", content: "Рассчитайте стоимость асфальтирования онлайн. Площадь, толщина, тип покрытия — мгновенный результат." },
      { property: "og:title", content: "Калькулятор стоимости" },
      { property: "og:description", content: "Расчёт асфальтирования за 30 секунд." },
      { property: "og:url", content: "/calculator" },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  component: CalculatorPage,
});

const TYPES = [
  { id: "yard", name: "Двор · парковка", base: 690 },
  { id: "road", name: "Дорога · проезд", base: 850 },
  { id: "highway", name: "Магистраль", base: 1180 },
] as const;

function CalculatorPage() {
  const [area, setArea] = useState(500);
  const [thickness, setThickness] = useState(7);
  const [typeId, setTypeId] = useState<typeof TYPES[number]["id"]>("yard");
  const [base, setBase] = useState(true);
  const [curb, setCurb] = useState(false);
  const [marking, setMarking] = useState(false);
  const [open, setOpen] = useState(false);

  const total = useMemo(() => {
    const t = TYPES.find((x) => x.id === typeId)!;
    let cost = area * t.base * (thickness / 7);
    if (base) cost *= 1.18;
    if (curb) cost += area * 0.15 * 1200;
    if (marking) cost += area * 80;
    return Math.round(cost);
  }, [area, thickness, typeId, base, curb, marking]);

  const days = Math.max(1, Math.ceil(area / 1500));

  return (
    <div className="relative min-h-screen pt-40 pb-32">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-[1500px] px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ калькулятор</div>
        <h1 className="mt-4 text-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9]">
          Стоимость<br /><span className="bg-gradient-to-r from-foreground to-ember bg-clip-text text-transparent">за 30 секунд.</span>
        </h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-10">
            <Field label="Тип покрытия">
              <div className="grid gap-2 sm:grid-cols-3">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTypeId(t.id)}
                    className={`rounded-sm border p-4 text-left font-display text-sm font-bold transition ${
                      typeId === t.id ? "border-ember bg-ember/10 text-ember" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">{t.base} ₽/м²</div>
                    <div className="mt-2">{t.name}</div>
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`Площадь · ${area.toLocaleString("ru-RU")} м²`}>
              <input
                type="range" min={50} max={20000} step={50}
                value={area} onChange={(e) => setArea(+e.target.value)}
                className="w-full accent-ember"
              />
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>50 м²</span><span>20 000 м²</span>
              </div>
            </Field>

            <Field label={`Толщина слоя · ${thickness} см`}>
              <input
                type="range" min={4} max={15} step={1}
                value={thickness} onChange={(e) => setThickness(+e.target.value)}
                className="w-full accent-ember"
              />
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>4 см</span><span>15 см</span>
              </div>
            </Field>

            <Field label="Дополнительно">
              <div className="space-y-2">
                <Toggle on={base} setOn={setBase} label="Подготовка основания" hint="+18% к стоимости" />
                <Toggle on={curb} setOn={setCurb} label="Установка бордюра" hint="по периметру" />
                <Toggle on={marking} setOn={setMarking} label="Дорожная разметка" hint="80 ₽/м²" />
              </div>
            </Field>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative lg:col-span-5"
          >
            <div className="sticky top-32 overflow-hidden rounded-sm border border-white/10 bg-card/60 backdrop-blur p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-ember/30 blur-3xl" />
              <CalcIcon className="h-8 w-8 text-ember" />
              <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Предварительная стоимость</div>
              <motion.div
                key={total}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-display text-5xl font-black md:text-6xl"
              >
                {total.toLocaleString("ru-RU")} <span className="text-ember">₽</span>
              </motion.div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">≈ {Math.round(total / area).toLocaleString("ru-RU")} ₽/м²</div>

              <div className="mt-8 grid grid-cols-2 gap-px bg-white/5">
                <Cell label="Срок" value={`${days} дн.`} />
                <Cell label="Гарантия" value="5 лет" />
              </div>

              <button onClick={() => setOpen(true)} className="mt-8 inline-flex w-full items-center justify-between rounded-sm bg-ember px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:brightness-110">
                <span>Заказать точный расчёт</span>
                <ArrowUpRight className="h-5 w-5" />
              </button>

              <p className="mt-4 text-xs text-muted-foreground">Расчёт является предварительным. Точная цена — после выезда инженера на объект.</p>
            </div>
          </motion.aside>
        </div>
      </div>

      <CalcLeadModal
        open={open} onClose={() => setOpen(false)}
        payload={{ area, thickness, typeId, base, curb, marking }}
        total={total}
      />
    </div>
  );
}

const leadSchema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(100),
  phone: z.string().trim().min(10, "Введите телефон").max(20),
});

function CalcLeadModal({ open, onClose, payload, total }: {
  open: boolean; onClose: () => void; payload: Record<string, unknown>; total: number;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = leadSchema.safeParse({ name, phone });
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await submitLead({
        source: "calculator", name: r.data.name, phone: r.data.phone,
        estimated_cost: total, payload: payload as never,
      });
      setDone(true);
    } catch (err) {
      toast.error("Не удалось отправить. Попробуйте ещё раз.");
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-6 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute right-3 top-3 grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
            {done ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-ember" strokeWidth={1.5} />
                <h3 className="mt-4 text-display text-2xl">Заявка принята</h3>
                <p className="mt-2 text-sm text-muted-foreground">Перезвоним в течение 15 минут с точным расчётом.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ точный расчёт</div>
                <h3 className="text-display text-2xl font-black">Заявка на расчёт<br /><span className="text-muted-foreground text-base font-normal">≈ {total.toLocaleString("ru-RU")} ₽</span></h3>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Имя</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className={`w-full rounded-sm border bg-background px-4 py-3 focus:outline-none ${errors.name ? "border-destructive" : "border-white/10 focus:border-ember"}`} />
                  {errors.name && <div className="mt-1 font-mono text-[10px] text-destructive">{errors.name}</div>}
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Телефон</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className={`w-full rounded-sm border bg-background px-4 py-3 focus:outline-none ${errors.phone ? "border-destructive" : "border-white/10 focus:border-ember"}`} />
                  {errors.phone && <div className="mt-1 font-mono text-[10px] text-destructive">{errors.phone}</div>}
                </div>
                <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-between rounded-sm bg-ember px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:brightness-110 disabled:opacity-60">
                  <span>{loading ? "Отправка..." : "Отправить заявку"}</span>
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">{label}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Toggle({ on, setOn, label, hint }: { on: boolean; setOn: (v: boolean) => void; label: string; hint: string }) {
  return (
    <button
      onClick={() => setOn(!on)}
      className={`flex w-full items-center justify-between rounded-sm border p-4 text-left transition ${
        on ? "border-ember bg-ember/10" : "border-white/10 hover:border-white/30"
      }`}
    >
      <div>
        <div className="font-display text-sm font-bold">{label}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{hint}</div>
      </div>
      <div className={`relative h-6 w-11 rounded-full transition ${on ? "bg-ember" : "bg-white/10"}`}>
        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition ${on ? "left-5" : "left-0.5"}`} />
      </div>
    </button>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-xl font-black">{value}</div>
    </div>
  );
}
