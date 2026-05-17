// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Target Vercel: disable Cloudflare plugin and tell TanStack Start to emit Vercel output.
// Local dev (`bun dev`) still works — server functions / SSR run via Vite node runtime.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "vercel",
    server: { entry: "server" },
  },
});
