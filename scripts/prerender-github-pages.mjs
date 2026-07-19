// Renders the app's routes to static HTML for GitHub Pages.
//
// TanStack Start normally relies on a running server (nitro) to render HTML
// per request. GitHub Pages only serves static files, and this build has no
// server functions or per-request data, so we render once at build time
// instead. Nitro ships a "github-pages" preset that does this automatically,
// but it currently crashes on this project's Vite 8 + Nitro 3 beta versions
// (nitro's static-preset prerenderer fails to wire up the TanStack Start SSR
// handler, then a later build step chokes on an html entry). Calling the
// built SSR handler directly, as done here, sidesteps both issues.
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const clientDir = `${root}dist/client`;
const serverEntry = `${root}dist/server/server.js`;

const routes = ["/"];

const { default: handler } = await import(serverEntry);

for (const route of routes) {
  const response = await handler.fetch(new Request(`http://localhost${route}`), {}, {});
  if (response.status !== 200) {
    throw new Error(`Prerendering ${route} returned status ${response.status}`);
  }
  const html = await response.text();
  const outPath = route === "/" ? `${clientDir}/index.html` : `${clientDir}${route}/index.html`;
  await mkdir(new URL(".", `file://${outPath}`), { recursive: true });
  await writeFile(outPath, html, "utf8");
  console.log(`prerendered ${route} -> ${outPath.replace(root, "")}`);
}

// GitHub Pages serves 404.html for unknown paths; reusing the prerendered
// index lets TanStack Router's client-side routing take over from there.
await copyFile(`${clientDir}/index.html`, `${clientDir}/404.html`);

// Tells GitHub Pages not to run this through Jekyll (which ignores _-prefixed files).
await writeFile(`${clientDir}/.nojekyll`, "");

console.log("done");
