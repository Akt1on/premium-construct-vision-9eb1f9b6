import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type FleetRow = Database["public"]["Tables"]["fleet"]["Row"];

const LONG_CACHE = { staleTime: 5 * 60_000, gcTime: 30 * 60_000 } as const;

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ServiceRow[];
    },
    ...LONG_CACHE,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ProjectRow[];
    },
    ...LONG_CACHE,
  });
}

export function useFleet() {
  return useQuery({
    queryKey: ["fleet"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fleet")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as FleetRow[];
    },
    ...LONG_CACHE,
  });
}

export function useSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      for (const row of data ?? []) map[row.key] = row.value ?? "";
      return map;
    },
    ...LONG_CACHE,
  });
}
