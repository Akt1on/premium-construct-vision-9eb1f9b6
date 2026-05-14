import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/StubPage";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Портфолио. — Премиум Строй" },
      { name: "description", content: "Более 2400 объектов: парковки, дворы, дороги, благоустройство ЖК и промышленных территорий." },
      { property: "og:title", content: "Портфолио. — Премиум Строй" },
      { property: "og:description", content: "Более 2400 объектов: парковки, дворы, дороги, благоустройство ЖК и промышленных территорий." },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: makeStub("/ portfolio", "Портфолио.", "Более 2400 объектов: парковки, дворы, дороги, благоустройство ЖК и промышленных территорий."),
});
