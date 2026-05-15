import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const NotificationSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(1).max(40),
  email: z.string().max(320).optional().nullable(),
  message: z.string().max(4000).optional().nullable(),
  source: z.string().max(40),
  estimatedCost: z.number().optional().nullable(),
});

export const notifyLead = createServerFn({ method: "POST" })
  .inputValidator((input) => NotificationSchema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Gracefully no-op until the user wires the secrets.
    if (!token || !chatId) {
      return { ok: false, skipped: true as const };
    }

    const lines = [
      `🧱 *Новая заявка — Премиум Строй*`,
      `*Источник:* ${data.source}`,
      `*Имя:* ${data.name}`,
      `*Телефон:* ${data.phone}`,
      data.email ? `*Email:* ${data.email}` : null,
      data.estimatedCost != null
        ? `*Смета:* ${new Intl.NumberFormat("ru-RU").format(data.estimatedCost)} ₽`
        : null,
      data.message ? `\n${data.message}` : null,
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("Telegram notify failed:", res.status, body);
        return { ok: false, skipped: false as const };
      }
      return { ok: true, skipped: false as const };
    } catch (error) {
      console.error("Telegram notify error:", error);
      return { ok: false, skipped: false as const };
    }
  });
