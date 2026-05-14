import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/StubPage";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Спецтехника. — Премиум Строй" },
      { name: "description", content: "Собственный парк из 87 единиц техники: асфальтоукладчики, катки, экскаваторы, самосвалы. Аренда с оператором." },
      { property: "og:title", content: "Спецтехника. — Премиум Строй" },
      { property: "og:description", content: "Собственный парк из 87 единиц техники: асфальтоукладчики, катки, экскаваторы, самосвалы. Аренда с оператором." },
    ],
    links: [{ rel: "canonical", href: "/fleet" }],
  }),
  component: makeStub("/ fleet", "Спецтехника.", "Собственный парк из 87 единиц техники: асфальтоукладчики, катки, экскаваторы, самосвалы. Аренда с оператором."),
});
