import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/StubPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании. — Премиум Строй" },
      { name: "description", content: "15+ лет на рынке. Собственный парк техники. Договор. Гарантия 5 лет. Сертификаты ISO 9001 и допуски СРО." },
      { property: "og:title", content: "О компании. — Премиум Строй" },
      { property: "og:description", content: "15+ лет на рынке. Собственный парк техники. Договор. Гарантия 5 лет. Сертификаты ISO 9001 и допуски СРО." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: makeStub("/ about", "О компании.", "15+ лет на рынке. Собственный парк техники. Договор. Гарантия 5 лет. Сертификаты ISO 9001 и допуски СРО."),
});
