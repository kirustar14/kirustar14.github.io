// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isGithubPagesBuild = process.env.DEPLOY_TARGET === "github-pages";

export default defineConfig({
  // GitHub Pages only serves static files, so skip nitro's server bundle for
  // that build (this site has no server functions or per-request data).
  // Nitro ships a "github-pages" static-export preset that would normally
  // handle this, but it currently crashes on this project's Vite 8 + Nitro 3
  // beta versions. Instead, `bun run build:github-pages` builds the client +
  // SSR bundles here, then scripts/prerender-github-pages.mjs calls the SSR
  // handler directly to render static HTML.
  ...(isGithubPagesBuild ? { nitro: false } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this.
    server: { entry: "server" },
  },
});
