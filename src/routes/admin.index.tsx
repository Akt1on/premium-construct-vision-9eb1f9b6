import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { Database } from "@/integrations/supabase/types";
import { LogOut, Phone, Mail, MessageSquare, Calculator, RefreshCw, Settings } from "lucide-react";
import { toast } from "sonner";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Заявки — Админ Премиум Строй" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [denied, setDenied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/admin/login" });
  }, [user, authLoading, navigate]);

  const load = async () => {
    setRefreshing(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
    setRefreshing(false);
    if (error) {
      setDenied(true);
      return;
    }
    setLeads(data ?? []);
  };

  useEffect(() => { if (user) load(); }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (authLoading || !user) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Загрузка...</div>;
  }

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-30" />
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ админ-панель</div>
            <h1 className="mt-2 text-display text-4xl font-black md:text-5xl">Заявки</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/content" className="inline-flex items-center gap-2 rounded-sm border border-ember/40 bg-ember/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ember hover:bg-ember/20">
              <Settings className="h-4 w-4" /> Контент сайта
            </Link>
            <button onClick={load} disabled={refreshing} className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-ember">
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Обновить
            </button>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-destructive">
              <LogOut className="h-4 w-4" /> Выйти
            </button>
          </div>
        </div>

        {denied ? (
          <div className="mt-12 rounded-sm border border-destructive/30 bg-destructive/5 p-8">
            <h3 className="font-display text-xl font-bold">Нет доступа</h3>
            <p className="mt-2 text-sm text-muted-foreground">У вашего аккаунта нет роли admin или manager. Попросите администратора назначить роль.</p>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">Ваш user id: {user.id}</p>
            <Link to="/" className="mt-4 inline-block text-ember underline">На главную</Link>
          </div>
        ) : leads === null ? (
          <div className="mt-12 text-muted-foreground">Загрузка заявок...</div>
        ) : leads.length === 0 ? (
          <div className="mt-12 rounded-sm border border-white/10 p-12 text-center text-muted-foreground">Заявок пока нет</div>
        ) : (
          <div className="mt-12 grid gap-4">
            {leads.map((l) => (
              <div key={l.id} className="grid gap-4 rounded-sm border border-white/10 bg-card/60 p-6 md:grid-cols-12">
                <div className="md:col-span-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ember">
                    {l.source === "calculator" ? <Calculator className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                    {l.source}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold">{l.name}</div>
                  <div className="mt-1 font-mono text-[10px] text-muted-foreground">{new Date(l.created_at).toLocaleString("ru-RU")}</div>
                </div>
                <div className="md:col-span-4 space-y-1 text-sm">
                  <a href={`tel:${l.phone}`} className="flex items-center gap-2 hover:text-ember"><Phone className="h-3 w-3" /> {l.phone}</a>
                  {l.email && <a href={`mailto:${l.email}`} className="flex items-center gap-2 hover:text-ember"><Mail className="h-3 w-3" /> {l.email}</a>}
                </div>
                <div className="md:col-span-5 text-sm text-muted-foreground">
                  {l.estimated_cost && <div className="font-display text-xl text-ember">{Number(l.estimated_cost).toLocaleString("ru-RU")} ₽</div>}
                  {l.message && <div className="mt-2">{l.message}</div>}
                  {l.payload && <pre className="mt-2 overflow-auto rounded-sm bg-background/50 p-2 font-mono text-[10px]">{JSON.stringify(l.payload, null, 2)}</pre>}
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => copy(user.id)} className="mt-12 font-mono text-[10px] text-muted-foreground hover:text-ember">
          скопировать user id для назначения admin: {user.id}
        </button>
      </div>
    </div>
  );
}

function copy(text: string) {
  navigator.clipboard?.writeText(text).then(() => toast.success("Скопировано"));
}
