# Satvik Singh — Mobile App Developer
### React Native | TypeScript | Expo | Animations | UI/UX

Building smooth, modern and production-ready mobile apps.

---

## Live Portfolio
https://my-portfolio-coral-seven-61.vercel.app/

---

## CRITICAL: Deploy (read this before pushing)

**Puppeteer cannot run on Vercel CI.** A normal “push → Vercel auto-build” produces a **stale, un-prerendered** SPA with no warning (empty `#root` for crawlers).

| Do | Don't |
|----|--------|
| Push to `main` and let **GitHub Actions** build + deploy `dist/` | Rely on Vercel’s git Integration build |
| Or run `npm run deploy` locally | Run `vercel --prod` from source without a local Puppeteer build |

### GitHub Actions (preferred)

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

Required repo secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

In the Vercel project settings, keep **Install / Build commands empty** (or disabled) so a git-connected push cannot overwrite Actions deploys with an empty shell. Prefer deploying **only** via the Actions workflow or `npm run deploy`.

### Local / manual

```sh
npm run deploy
# same as: npm run build && vercel deploy ./dist --prod
```

---

## Projects in this portfolio

Source of truth: [`src/data/projects.ts`](src/data/projects.ts)

- WayGood HelpStudyAbroad
- Disaster Alert & SOS
- Virtual Event Platform
- Personal Finance Companion
- CalmCompanion

Add a new project by appending one object to `projects` — detail routes are `/portfolio/:slug`.

---

## Tech Stack

| Category | Technologies |
|---------|--------------|
| **Mobile** | React Native, Expo, TypeScript |
| **Backend** | Node.js, Express, MongoDB |
| **Portfolio site** | Vite, React, Framer Motion, React Three Fiber, Tailwind |
| **SEO** | Puppeteer prerender + react-helmet-async |

---

## Run locally

```sh
git clone https://github.com/ssatviksingh/My-Portfolio
cd My-Portfolio
npm install
npm run dev
```

## Contact

Email: satviksingh164@gmail.com  
LinkedIn: https://www.linkedin.com/in/satvik-singh-785337287/  
GitHub: https://github.com/ssatviksingh
