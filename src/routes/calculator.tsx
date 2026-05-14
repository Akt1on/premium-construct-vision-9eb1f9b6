import { createFileRoute } from "@tanstack/react-router";
import { makeStub } from "@/components/StubPage";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Калькулятор. — Премиум Строй" },
      { name: "description", content: "Узнайте стоимость работ за 30 секунд. Площадь × толщина × материал — итоговая цена в реальном времени." },
      { property: "og:title", content: "Калькулятор. — Премиум Строй" },
      { property: "og:description", content: "Узнайте стоимость работ за 30 секунд. Площадь × толщина × материал — итоговая цена в реальном времени." },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  component: makeStub("/ calculator", "Калькулятор.", "Узнайте стоимость работ за 30 секунд. Площадь × толщина × материал — итоговая цена в реальном времени."),
});
