import { createFileRoute } from "@tanstack/react-router";

const BODY = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/login

Sitemap: https://permasfalt59.ru/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(BODY, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
