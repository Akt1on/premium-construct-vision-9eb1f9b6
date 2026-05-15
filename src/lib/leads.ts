import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

export async function submitLead(lead: LeadInsert) {
  const { error } = await supabase.from("leads").insert(lead);
  if (error) throw error;
}
