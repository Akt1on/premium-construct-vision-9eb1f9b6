import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { uploadImage } from "@/lib/admin-content";
import { Plus, Trash2, Save, Upload, ArrowLeft, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Управление контентом — Админ Асфальт Пермь" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminContentPage,
});

type Tab = "services" | "projects" | "fleet" | "contacts";

const TABS: { id: Tab; label: string }[] = [
  { id: "services", label: "Услуги" },
  { id: "projects", label: "Портфолио" },
  { id: "fleet", label: "Спецтехника" },
  { id: "contacts", label: "Контакты" },
];

function AdminContentPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("services");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/admin/login" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Загрузка...</div>;
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-30" />
      <div className="mx-auto max-w-[1500px] px-6">
        <Link to="/admin" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-ember">
          <ArrowLeft className="h-4 w-4" /> К заявкам
        </Link>
        <h1 className="mt-4 text-display text-4xl font-black md:text-5xl">Управление контентом</h1>

        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-widest transition ${
                tab === t.id ? "border-ember bg-ember/10 text-ember" : "border-white/10 text-muted-foreground hover:border-white/30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {tab === "services" && <ServicesManager />}
          {tab === "projects" && <ProjectsManager />}
          {tab === "fleet" && <FleetManager />}
          {tab === "contacts" && <ContactsManager />}
        </div>
      </div>
    </div>
  );
}

/* ---------- shared field components ---------- */

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className="w-full rounded-sm border border-white/10 bg-background px-3 py-2 text-sm focus:border-ember focus:outline-none" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-sm border border-white/10 bg-background px-3 py-2 text-sm focus:border-ember focus:outline-none" />
      )}
    </label>
  );
}

function ImageField({ label, value, onChange, folder }: { label: string; value: string; onChange: (v: string) => void; folder: string }) {
  const [busy, setBusy] = useState(false);
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Фото загружено");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-sm border border-white/10 bg-background">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="h-5 w-5 text-muted-foreground" />}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-ember">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {busy ? "Загрузка..." : "Загрузить"}
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={busy} />
        </label>
      </div>
    </div>
  );
}

function RowCard({ children, onSave, onDelete, saving }: { children: React.ReactNode; onSave: () => void; onDelete: () => void; saving: boolean }) {
  return (
    <div className="rounded-sm border border-white/10 bg-card/60 p-5">
      <div className="grid gap-3">{children}</div>
      <div className="mt-4 flex gap-2">
        <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-sm bg-ember px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary-foreground hover:brightness-110 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Сохранить
        </button>
        <button onClick={onDelete} className="inline-flex items-center gap-2 rounded-sm border border-destructive/40 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" /> Удалить
        </button>
      </div>
    </div>
  );
}

/* ---------- generic table manager hook ---------- */

function useRows<T extends { id: string }>(table: "services" | "projects" | "fleet", order = "sort_order") {
  const [rows, setRows] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);
  const load = useCallback(async () => {
    const { data, error } = await supabase.from(table).select("*").order(order, { ascending: true });
    if (error) { toast.error("Ошибка загрузки: " + error.message); return; }
    setRows((data ?? []) as unknown as T[]);
    setLoaded(true);
  }, [table, order]);
  useEffect(() => { load(); }, [load]);
  return { rows, setRows, loaded, reload: load };
}

/* ---------- SERVICES ---------- */

type Svc = { id: string; slug: string; title: string; description: string | null; price_text: string | null; image_url: string | null; sort_order: number; is_active: boolean };

function ServicesManager() {
  const { rows, setRows, loaded, reload } = useRows<Svc>("services");
  const [saving, setSaving] = useState<string | null>(null);

  const update = (id: string, patch: Partial<Svc>) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const save = async (row: Svc) => {
    setSaving(row.id);
    const { error } = await supabase.from("services").update({
      slug: row.slug, title: row.title, description: row.description, price_text: row.price_text,
      image_url: row.image_url, sort_order: row.sort_order, is_active: row.is_active,
    }).eq("id", row.id);
    setSaving(null);
    error ? toast.error(error.message) : toast.success("Сохранено");
  };

  const del = async (id: string) => {
    if (!confirm("Удалить услугу?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    error ? toast.error(error.message) : (toast.success("Удалено"), reload());
  };

  const add = async () => {
    const { error } = await supabase.from("services").insert({ slug: "new-" + Date.now(), title: "Новая услуга", sort_order: rows.length + 1 });
    error ? toast.error(error.message) : reload();
  };

  if (!loaded) return <div className="text-muted-foreground">Загрузка...</div>;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {rows.map((row) => (
        <RowCard key={row.id} saving={saving === row.id} onSave={() => save(row)} onDelete={() => del(row.id)}>
          <ImageField label="Фото" value={row.image_url ?? ""} onChange={(v) => update(row.id, { image_url: v })} folder="services" />
          <Field label="Название" value={row.title} onChange={(v) => update(row.id, { title: v })} />
          <Field label="Slug (URL)" value={row.slug} onChange={(v) => update(row.id, { slug: v })} />
          <Field label="Описание" value={row.description ?? ""} onChange={(v) => update(row.id, { description: v })} textarea />
          <Field label="Цена" value={row.price_text ?? ""} onChange={(v) => update(row.id, { price_text: v })} />
          <Field label="Порядок" value={String(row.sort_order)} onChange={(v) => update(row.id, { sort_order: Number(v) || 0 })} />
        </RowCard>
      ))}
      <button onClick={add} className="grid min-h-[120px] place-items-center rounded-sm border border-dashed border-white/15 text-muted-foreground hover:border-ember hover:text-ember">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><Plus className="h-4 w-4" /> Добавить услугу</span>
      </button>
    </div>
  );
}

/* ---------- PROJECTS ---------- */

type Prj = { id: string; title: string; category: string | null; description: string | null; image_url: string | null; before_url: string | null; after_url: string | null; year: string | null; metric: string | null; sort_order: number; is_active: boolean };

function ProjectsManager() {
  const { rows, setRows, loaded, reload } = useRows<Prj>("projects");
  const [saving, setSaving] = useState<string | null>(null);
  const update = (id: string, patch: Partial<Prj>) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const save = async (row: Prj) => {
    setSaving(row.id);
    const { error } = await supabase.from("projects").update({
      title: row.title, category: row.category, description: row.description,
      image_url: row.image_url, before_url: row.before_url, after_url: row.after_url,
      year: row.year, metric: row.metric, sort_order: row.sort_order,
    }).eq("id", row.id);
    setSaving(null);
    error ? toast.error(error.message) : toast.success("Сохранено");
  };
  const del = async (id: string) => { if (!confirm("Удалить проект?")) return; const { error } = await supabase.from("projects").delete().eq("id", id); error ? toast.error(error.message) : (toast.success("Удалено"), reload()); };
  const add = async () => { const { error } = await supabase.from("projects").insert({ title: "Новый проект", sort_order: rows.length + 1 }); error ? toast.error(error.message) : reload(); };

  if (!loaded) return <div className="text-muted-foreground">Загрузка...</div>;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {rows.map((row) => (
        <RowCard key={row.id} saving={saving === row.id} onSave={() => save(row)} onDelete={() => del(row.id)}>
          <Field label="Название" value={row.title} onChange={(v) => update(row.id, { title: v })} />
          <Field label="Категория" value={row.category ?? ""} onChange={(v) => update(row.id, { category: v })} />
          <Field label="Описание" value={row.description ?? ""} onChange={(v) => update(row.id, { description: v })} textarea />
          <div className="grid grid-cols-2 gap-3">
            <ImageField label="Фото «До»" value={row.before_url ?? ""} onChange={(v) => update(row.id, { before_url: v })} folder="projects" />
            <ImageField label="Фото «После»" value={row.after_url ?? ""} onChange={(v) => update(row.id, { after_url: v })} folder="projects" />
          </div>
          <ImageField label="Главное фото" value={row.image_url ?? ""} onChange={(v) => update(row.id, { image_url: v })} folder="projects" />
          <Field label="Порядок" value={String(row.sort_order)} onChange={(v) => update(row.id, { sort_order: Number(v) || 0 })} />
        </RowCard>
      ))}
      <button onClick={add} className="grid min-h-[120px] place-items-center rounded-sm border border-dashed border-white/15 text-muted-foreground hover:border-ember hover:text-ember">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><Plus className="h-4 w-4" /> Добавить проект</span>
      </button>
    </div>
  );
}

/* ---------- FLEET ---------- */

type Flt = { id: string; name: string; specs: string | null; image_url: string | null; sort_order: number; is_active: boolean };

function FleetManager() {
  const { rows, setRows, loaded, reload } = useRows<Flt>("fleet");
  const [saving, setSaving] = useState<string | null>(null);
  const update = (id: string, patch: Partial<Flt>) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const save = async (row: Flt) => { setSaving(row.id); const { error } = await supabase.from("fleet").update({ name: row.name, specs: row.specs, image_url: row.image_url, sort_order: row.sort_order }).eq("id", row.id); setSaving(null); error ? toast.error(error.message) : toast.success("Сохранено"); };
  const del = async (id: string) => { if (!confirm("Удалить технику?")) return; const { error } = await supabase.from("fleet").delete().eq("id", id); error ? toast.error(error.message) : (toast.success("Удалено"), reload()); };
  const add = async () => { const { error } = await supabase.from("fleet").insert({ name: "Новая техника", sort_order: rows.length + 1 }); error ? toast.error(error.message) : reload(); };

  if (!loaded) return <div className="text-muted-foreground">Загрузка...</div>;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {rows.map((row) => (
        <RowCard key={row.id} saving={saving === row.id} onSave={() => save(row)} onDelete={() => del(row.id)}>
          <ImageField label="Фото" value={row.image_url ?? ""} onChange={(v) => update(row.id, { image_url: v })} folder="fleet" />
          <Field label="Название" value={row.name} onChange={(v) => update(row.id, { name: v })} />
          <Field label="Характеристики" value={row.specs ?? ""} onChange={(v) => update(row.id, { specs: v })} textarea />
          <Field label="Порядок" value={String(row.sort_order)} onChange={(v) => update(row.id, { sort_order: Number(v) || 0 })} />
        </RowCard>
      ))}
      <button onClick={add} className="grid min-h-[120px] place-items-center rounded-sm border border-dashed border-white/15 text-muted-foreground hover:border-ember hover:text-ember">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><Plus className="h-4 w-4" /> Добавить технику</span>
      </button>
    </div>
  );
}

/* ---------- CONTACTS ---------- */

const CONTACT_FIELDS: { key: string; label: string }[] = [
  { key: "phone", label: "Телефон" },
  { key: "email", label: "Email" },
  { key: "address", label: "Адрес" },
  { key: "whatsapp", label: "WhatsApp (ссылка)" },
  { key: "telegram", label: "Telegram (ссылка)" },
  { key: "vk", label: "ВКонтакте (ссылка)" },
];

function ContactsManager() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) { toast.error(error.message); return; }
      const map: Record<string, string> = {};
      for (const r of data ?? []) map[r.key] = r.value ?? "";
      setValues(map);
      setLoaded(true);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const rows = CONTACT_FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    error ? toast.error(error.message) : toast.success("Контакты сохранены");
  };

  if (!loaded) return <div className="text-muted-foreground">Загрузка...</div>;
  return (
    <div className="max-w-xl rounded-sm border border-white/10 bg-card/60 p-6">
      <div className="grid gap-4">
        {CONTACT_FIELDS.map((f) => (
          <Field key={f.key} label={f.label} value={values[f.key] ?? ""} onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))} />
        ))}
      </div>
      <button onClick={save} disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-primary-foreground hover:brightness-110 disabled:opacity-60">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Сохранить контакты
      </button>
    </div>
  );
}
