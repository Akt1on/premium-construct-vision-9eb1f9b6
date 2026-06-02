import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services-data";

const ORIGIN = "https://permasfalt59.ru";
const ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  { path: "/prices", priority: "0.9" },
  { path: "/fleet", priority: "0.8" },
  { path: "/portfolio", priority: "0.8" },
  { path: "/calculator", priority: "0.8" },
  { path: "/about", priority: "0.6" },
  { path: "/contacts", priority: "0.7" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries = [
          ...ROUTES,
          ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, priority: "0.8" })),
        ];
        const urls = entries
          .map(
            (r) =>
              `  <url><loc>${ORIGIN}${r.path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${r.priority}</priority></url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
