import { createFileRoute } from "@tanstack/react-router";

const BODY = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/login
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content

User-agent: Yandex
Allow: /
Disallow: /admin
Disallow: /admin/login
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content

Sitemap: https://permasfalt59.ru/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(BODY, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
