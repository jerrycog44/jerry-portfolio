# Jerry — Portfolio

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.

## Run
```bash
npm install
npm run dev        # local dev
npm run build      # type-check + production build
```

## Project screenshots
The five live sites show a clean typographic preview until real screenshots exist.
Generate them from the live URLs (needs internet):
```bash
npx playwright install chromium
npm run screenshots
```
This writes `public/projects/<slug>.jpg`; the cards pick them up automatically.

## Edit content
All projects, design work, services, contact details and links live in `src/data/site.ts`.
Add a real repository to a web project with `repoUrl` and a "View Source" button appears.

## Deploy (Vercel)
Import the repo in Vercel (framework: Vite, build `npm run build`, output `dist`) — or run `npx vercel`.
