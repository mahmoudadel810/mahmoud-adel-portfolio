# Mahmoud Adel Abdulwahab — portfolio

Personal portfolio and résumé site, in English (`/en`) and Arabic (`/ar`, right to left).
Built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4 and next-intl, fully static, deployed on Vercel.

## Run locally

Requirements: Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
```

Production check:

```bash
npm run build && npm start
```

## Edit content

Every word on the site lives in one typed file: [`src/content/profile.ts`](src/content/profile.ts).

- `contact` holds the email, LinkedIn, GitHub, CV path and photo path.
- `projectsMeta` holds each project's links, stack and architecture diagram (shared by both languages).
- `profile.en` and `profile.ar` hold all copy: identity, about, experience, highlights, projects, case studies,
  skills, education and UI labels. TypeScript makes both languages carry the same fields.
- Arabic strings carry a `// review-ar` comment so a native reviewer can find them.
- In `experience`, `featured` lists the bullets shown on the home page; the rest appear behind "Show all".

## Add a project

1. Add an entry to `projectsMeta` (slug, links, stack, `architecture` and `compactArchitecture`).
2. Add its text to `projects` in **both** `en` and `ar`.
3. For a case study, set `caseStudy: true`, add the slug to `caseStudySlugs` and the `ProjectSlug`/`CaseStudySlug`
   types, and write `caseStudies.<slug>` in both languages.
4. Run `npm run diagrams` to render its diagrams (see below).

## Architecture diagrams

Diagrams are described as data in `profile.ts` and rendered **once, at authoring time** with Mermaid in headless
Chromium. The site ships plain SVG — no Mermaid in the browser. Colours are mapped to the site's CSS variables,
so every diagram follows the light/dark theme.

```bash
npx playwright install chromium   # first time only
npm run diagrams                  # writes src/generated/diagrams.ts and public/diagrams/*.svg
```

Commit the generated files; Vercel builds don't need a browser.

## Replace the CV or photo

- **CV:** overwrite `public/cv/Mahmoud-Adel-Abdulwahab-Software-Engineer-EG.pdf` (keep the name, or update
  `contact.cv` and `contact.cvFileName`).
- **Photo:** overwrite `public/me.jpg` (square, at least 176×176). If the file is missing, the site shows an
  "MA" mark instead. The Open Graph image uses `src/assets/og-photo.jpg` (square, about 630×630).

## Deploy to Vercel

Import the repository in Vercel; no configuration is needed. Set one environment variable:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The production URL, e.g. `https://your-domain.com`. Used for canonical links, hreflang, the sitemap and Open Graph. |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (type-check and lint included) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run diagrams` | Re-render the architecture diagrams from `profile.ts` |

## Credits

Fonts: Geist and Geist Mono (Vercel, OFL), IBM Plex Sans Arabic (IBM, OFL — licence in `public/fonts`).
