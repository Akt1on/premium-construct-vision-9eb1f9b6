import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppFab() {
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!sessionStorage.getItem("wa-shown")) {
        setPopup(true);
        sessionStorage.setItem("wa-shown", "1");
      }
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/74951234567"
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-ember text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.69_0.22_39/_60%)] animate-pulse-ring"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass fixed bottom-24 right-6 z-40 w-[280px] rounded-sm p-5"
          >
            <button onClick={() => setPopup(false)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
            <div className="font-display text-sm font-bold">Получите расчёт за 15 минут</div>
            <p className="mt-2 text-xs text-muted-foreground">Опишите задачу — пришлём смету и сроки в WhatsApp.</p>
            <a
              href="https://wa.me/74951234567"
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-ember px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground"
            >
              Написать в WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
