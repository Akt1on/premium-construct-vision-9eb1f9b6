import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background bg-noise">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rotate-45 bg-ember" />
              <div className="absolute inset-[3px] rotate-45 bg-background" />
            </div>
            <div className="font-display text-xl font-black">АСФАЛЬТ ПЕРМЬ</div>
          </div>
          <p className="mt-6 max-w-md text-sm text-muted-foreground">
            Асфальтирование, благоустройство и земляные работы в Перми и Пермском крае.
            Собственный парк техники. Договор. Гарантия до 3 лет.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="rounded-sm border border-white/10 px-3 py-2">с 2010 года</span>
            <span className="rounded-sm border border-white/10 px-3 py-2">СРО · допуск</span>
            <span className="rounded-sm border border-white/10 px-3 py-2">Пермский край</span>
          </div>
        </div>
        <div>
          <div className="font-display text-xs font-bold uppercase tracking-widest text-ember">Навигация</div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/services", l: "Услуги" },
              { to: "/prices", l: "Цены" },
              { to: "/fleet", l: "Спецтехника" },
              { to: "/portfolio", l: "Портфолио" },
              { to: "/calculator", l: "Калькулятор" },
              { to: "/about", l: "О компании" },
              { to: "/contacts", l: "Контакты" },
            ].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="text-muted-foreground transition hover:text-foreground">{i.l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display text-xs font-bold uppercase tracking-widest text-ember">Контакты</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-steel" /><a href="tel:+79082518226">+7 (908) 251-82-26</a></li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-steel" /><a href="mailto:info@asfalltperm.ru">info@asfalltperm.ru</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-steel" /><span className="text-muted-foreground">г. Пермь, Пермский край</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-6 py-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>© {new Date().getFullYear()} Асфальт Пермь. Все права защищены.</span>
          <span>Работаем 24/7 · Пермь и Пермский край</span>
        </div>
      </div>
    </footer>
  );
}
