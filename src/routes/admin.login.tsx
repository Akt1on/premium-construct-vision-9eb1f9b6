import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Вход в админ-панель — Премиум Строй" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate({ to: "/admin" });
  }, [user, authLoading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Добро пожаловать");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Аккаунт создан. Доступ к панели предоставит администратор.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center px-6 pt-32 pb-20">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-50" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="w-full max-w-md">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">/ премиум строй</Link>
        <h1 className="mt-3 text-display text-5xl font-black">Админ-панель</h1>
        <p className="mt-2 text-sm text-muted-foreground">{mode === "signin" ? "Вход для управления заявками" : "Регистрация нового аккаунта"}</p>

        <form onSubmit={submit} className="mt-10 space-y-5 rounded-sm border border-white/10 bg-card/60 backdrop-blur p-8">
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-sm border border-white/10 bg-background px-4 py-3 focus:border-ember focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Пароль</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-sm border border-white/10 bg-background px-4 py-3 focus:border-ember focus:outline-none" />
          </div>
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-between rounded-sm bg-ember px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:brightness-110 disabled:opacity-60">
            <span>{loading ? "..." : mode === "signin" ? "Войти" : "Создать аккаунт"}</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-xs text-muted-foreground hover:text-ember">
            {mode === "signin" ? "Нет аккаунта? Регистрация" : "Уже есть аккаунт? Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
