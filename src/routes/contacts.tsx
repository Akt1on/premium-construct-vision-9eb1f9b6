import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/StubPage";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты. — Премиум Строй" },
      { name: "description", content: "Москва, МКАД 24 км. Звоните, пишите в WhatsApp или оставьте заявку — инженер выедет в течение 24 часов." },
      { property: "og:title", content: "Контакты. — Премиум Строй" },
      { property: "og:description", content: "Москва, МКАД 24 км. Звоните, пишите в WhatsApp или оставьте заявку — инженер выедет в течение 24 часов." },
    ],
    links: [{ rel: "canonical", href: "/contacts" }],
  }),
  component: makeStub("/ contacts", "Контакты.", "Москва, МКАД 24 км. Звоните, пишите в WhatsApp или оставьте заявку — инженер выедет в течение 24 часов."),
});
