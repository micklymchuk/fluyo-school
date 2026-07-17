# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Available-pages gating (page-by-page launch)

Which route pages are publicly reachable in production is controlled by a single
build-time allowlist, the `NUXT_PUBLIC_AVAILABLE_PAGES` environment variable. It
is a comma-separated list of page paths, e.g. `/`, `/,/programs`, or
`/,/programs,/teachers,/pricing`.

- **Unset (the default) ⇒ all pages available.** Local `npm run dev` and every
  verify script behave exactly as normal; nothing is gated.
- **Set ⇒ only the listed pages are served.** Home (`/`) is always included even
  if omitted. Any page not on the list is redirected (302) to `/` at the
  Cloudflare edge and never rendered. When home is the only available page the
  header collapses to just the logo plus the inline language / Instagram /
  Telegram actions — no nav menu, no mobile hamburger.

No page, section, component, or content is deleted by gating; everything stays
in the codebase and fully working in local dev. The allowlist is resolved once
at build time in `nuxt.config.ts` (see `app/utils/pages.ts`) and feeds both the
edge redirects and the navigation, so server and client render identically (no
hydration mismatch).

**To change what is live in production:** set `NUXT_PUBLIC_AVAILABLE_PAGES` in
Cloudflare Pages → Settings → Environment variables → **Production**
(comma-separated paths; unset = all), then redeploy (git push, or the dashboard
"Retry deployment"). **Launch a page** = append its path to the list. **Unlaunch
a page** = remove its path. When a brand-new route is added to the app, also add
its path to `ALL_PAGES` in `app/utils/pages.ts`.
