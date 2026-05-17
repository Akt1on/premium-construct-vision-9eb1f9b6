import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ContactDial } from "./ContactDial";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/prices", label: "Цены" },
  { to: "/fleet", label: "Спецтехника" },
  { to: "/portfolio", label: "Портфолио" },
  { to: "/calculator", label: "Калькулятор" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto max-w-[1500px] px-4 transition-all duration-500 ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-sm border border-white/5 px-4 py-3 transition-all ${scrolled ? "glass" : "bg-transparent"}`}>
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rotate-45 bg-ember" />
              <div className="absolute inset-[3px] rotate-45 bg-background" />
              <div className="absolute inset-0 grid place-items-center font-display text-lg font-black text-foreground">59</div>
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-black tracking-tight">ПЕРМЬ АСФАЛЬТ 59</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">est. 2010 · Пермь · асфальт</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="group relative px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                activeProps={{ className: "!text-foreground [&>span:last-child]:!scale-x-100" }}
              >
                <span>{n.label}</span>
                <span className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 origin-center scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+73420000000" className="hidden items-center gap-2 font-mono text-sm md:flex">
              <Phone className="h-4 w-4 text-ember" />
              <span>+7 (342) 000-00-00</span>
            </a>
            <Magnetic>
              <Link
                to="/contacts"
                data-magnetic
                className="hidden rounded-sm bg-ember px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 md:inline-flex"
              >
                Заявка
              </Link>
            </Magnetic>
            <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-sm border border-white/10 lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 grid gap-1 rounded-sm border border-white/10 bg-background/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 text-sm hover:bg-white/5">
                  {n.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
