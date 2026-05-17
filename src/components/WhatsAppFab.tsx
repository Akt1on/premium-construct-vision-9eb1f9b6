import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Phone, Send } from "lucide-react";

const PHONE_RAW = "+73420000000";
const PHONE_DIGITS = "73420000000";

type Channel = { label: string; href: string; icon: ReactNode };
const CHANNELS: Channel[] = [
  { label: "Позвонить", href: `tel:${PHONE_RAW}`, icon: <Phone className="h-5 w-5" /> },
  { label: "WhatsApp", href: `https://wa.me/${PHONE_DIGITS}`, icon: <MessageCircle className="h-5 w-5" /> },
  { label: "Telegram", href: `https://t.me/+${PHONE_DIGITS}`, icon: <Send className="h-5 w-5" /> },
  { label: "Max", href: `https://max.ru/+${PHONE_DIGITS}`, icon: <MessageCircle className="h-5 w-5" /> },
];

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined" && !sessionStorage.getItem("wa-shown")) {
        setHint(true);
        sessionStorage.setItem("wa-shown", "1");
      }
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setHint(false); }}
        aria-label="Связаться"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-ember text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.69_0.22_39/_60%)] animate-pulse-ring"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {hint && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-[280px] rounded-sm border border-white/10 bg-background/95 p-5 shadow-2xl backdrop-blur-xl"
          >
            <button onClick={() => setHint(false)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
            <div className="font-display text-sm font-bold">Получите расчёт за 15 минут</div>
            <p className="mt-2 text-xs text-muted-foreground">Опишите задачу — пришлём смету и сроки.</p>
            <button
              type="button"
              onClick={() => { setOpen(true); setHint(false); }}
              className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-ember px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground"
            >
              Связаться
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-end bg-background/70 backdrop-blur-sm sm:place-items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-t-2xl border border-white/10 bg-background p-6 shadow-2xl sm:rounded-2xl"
            >
              <button onClick={() => setOpen(false)} aria-label="Закрыть" className="absolute right-3 top-3 grid h-9 w-9 place-items-center text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">/ связаться</div>
              <h3 className="mt-2 font-display text-2xl font-black">Как удобнее связаться?</h3>
              <p className="mt-1 text-xs text-muted-foreground">Работаем 24/7 в Перми и крае.</p>
              <div className="mt-6 grid gap-2">
                {CHANNELS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 rounded-sm border border-white/10 bg-card/60 p-4 transition hover:border-ember hover:bg-card"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-ember/15 text-ember">{c.icon}</div>
                    <div className="font-display text-sm font-bold">{c.label}</div>
                    <div className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-ember">→</div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
