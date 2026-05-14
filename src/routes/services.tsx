import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/StubPage";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги. — Премиум Строй" },
      { name: "description", content: "Полный цикл строительных работ: асфальтирование, благоустройство, земляные работы, аренда техники и доставка материалов." },
      { property: "og:title", content: "Услуги. — Премиум Строй" },
      { property: "og:description", content: "Полный цикл строительных работ: асфальтирование, благоустройство, земляные работы, аренда техники и доставка материалов." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: makeStub("/ services", "Услуги.", "Полный цикл строительных работ: асфальтирование, благоустройство, земляные работы, аренда техники и доставка материалов."),
});
