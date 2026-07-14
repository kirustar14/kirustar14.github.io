# Kiruthika Marikumaran — Portfolio

"Gold Dragon, Diamond Heart." A personal portfolio site built with Next.js (App Router) and statically exported to GitHub Pages.

## Stack

- Next.js 14 (App Router), React, TypeScript
- Static export (`output: 'export'`) — no server runtime needed
- Deployed via GitHub Actions to GitHub Pages on every push to `main`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `out/`.

## Structure

- `app/` — root layout, global styles, page composition
- `components/` — reusable UI (`Card`, `ScrollRow`, section components)
- `data/` — content for each section (story, hackathons, currently building, projects, contact)
- `public/images/` — dragon artwork used throughout the site
