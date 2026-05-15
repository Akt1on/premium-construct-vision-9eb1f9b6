import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { notifyLead } from "./notifications.functions";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

export async function submitLead(lead: LeadInsert) {
  const { error } = await supabase.from("leads").insert(lead);
  if (error) throw error;

  // Fire-and-forget — never block the form on Telegram delivery.
  void notifyLead({
    data: {
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? null,
      message: lead.message ?? null,
      source: String(lead.source ?? "contact"),
      estimatedCost:
        typeof lead.estimated_cost === "number" ? lead.estimated_cost : null,
    },
  }).catch((err) => console.error("notifyLead failed:", err));
}
