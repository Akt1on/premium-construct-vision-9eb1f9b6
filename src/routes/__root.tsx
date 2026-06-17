import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Cursor } from "@/components/Cursor";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A0F1C" },
      { title: "Асфальтирование в Перми | Асфальт Пермь — от 300 ₽/кв.м" },
      { name: "description", content: "Асфальтирование дорог и территорий в Перми и Пермском крае от 300 ₽/кв.м. Работаем с 2010 года. Гарантия 3 года. Бесплатный выезд на объект." },
      { name: "keywords", content: "асфальтирование Пермь, укладка асфальта Пермь, ямочный ремонт Пермь, асфальтирование Пермский край, благоустройство территории Пермь, тротуарная плитка Пермь, аренда спецтехники Пермь, строительство дорог Пермь, асфальтирование двора, асфальтирование парковки" },
      { name: "geo.region", content: "RU-PER" },
      { name: "geo.placename", content: "Пермь" },
      { name: "yandex-verification", content: "REPLACE_WITH_YANDEX_CODE" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "Асфальт Пермь" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Асфальтирование в Перми | Асфальт Пермь — от 300 ₽/кв.м" },
      { name: "twitter:title", content: "Асфальтирование в Перми | Асфальт Пермь — от 300 ₽/кв.м" },
      { property: "og:description", content: "Асфальтирование дорог и территорий в Перми и Пермском крае от 300 ₽/кв.м. Работаем с 2010 года. Гарантия 3 года. Бесплатный выезд на объект." },
      { name: "twitter:description", content: "Асфальтирование дорог и территорий в Перми и Пермском крае от 300 ₽/кв.м. Работаем с 2010 года. Гарантия 3 года. Бесплатный выезд на объект." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/HpGaKIUyDQcVXI70NnX35ls4LNy2/social-images/social-1780819591928-1000028240.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/HpGaKIUyDQcVXI70NnX35ls4LNy2/social-images/social-1780819591928-1000028240.webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Асфальт Пермь",
          description:
            "Асфальтирование, ямочный ремонт, благоустройство территорий, укладка тротуарной плитки и аренда спецтехники в Перми и Пермском крае.",
          url: "https://asfalltperm.ru",
          telephone: "+7-908-251-82-26",
          image:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3a1568f5-e96f-42d7-9eca-ac97c26b641e/id-preview-ab7337d7--e3ad1de5-26cf-447d-a9b8-adee02ff7651.lovable.app-1778798701475.png",
          priceRange: "₽₽",
          areaServed: ["Пермь", "Пермский край"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Пермь",
            addressRegion: "Пермский край",
            addressCountry: "RU",
          },
          geo: { "@type": "GeoCoordinates", latitude: 58.0105, longitude: 56.2502 },
        }),
      },
       {
        type: "text/javascript",
        children: (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
        ym(109919915,"init",{ssr:true,clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});,
        },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgress />
      <Cursor />
      <SiteHeader />
      <main className="relative">
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <Toaster theme="dark" position="bottom-center" />
    </QueryClientProvider>
  );
}
