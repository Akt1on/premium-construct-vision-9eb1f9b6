import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, X, MessageCircle, Send } from "lucide-react";

const PHONE = "+7 (908) 251-82-26";
const PHONE_RAW = "+79082518226";
const PHONE_DIGITS = "79082518226";

type Channel = {
  label: string;
  href: string;
  icon: ReactNode;
  hint: string;
};

const CHANNELS: Channel[] = [
  {
    label: "Позвонить",
    href: `tel:${PHONE_RAW}`,
    icon: <Phone className="h-5 w-5" />,
    hint: PHONE,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${PHONE_DIGITS}`,
    icon: <MessageCircle className="h-5 w-5" />,
    hint: "Чат · ответ за 15 мин",
  },
  {
    label: "Telegram",
    href: `https://t.me/+${PHONE_DIGITS}`,
    icon: <Send className="h-5 w-5" />,
    hint: "Чат · ответ за 15 мин",
  },
  {
    label: "Max",
    href: `https://max.ru/+${PHONE_DIGITS}`,
    icon: <MessageCircle className="h-5 w-5" />,
    hint: "Российский мессенджер",
  },
];

export function ContactDial({ children, label = "Связаться" }: { children?: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-sm bg-ember px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:brightness-110"
      >
        {children ?? label}
      </button>

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
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sm text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">/ связаться</div>
              <h3 className="mt-2 font-display text-2xl font-black">Выберите способ связи</h3>
              <p className="mt-1 text-xs text-muted-foreground">Работаем 24/7. Ответим за 15 минут.</p>

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
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-ember/15 text-ember">
                      {c.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-sm font-bold">{c.label}</div>
                      <div className="truncate text-xs text-muted-foreground">{c.hint}</div>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-ember">→</div>
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
