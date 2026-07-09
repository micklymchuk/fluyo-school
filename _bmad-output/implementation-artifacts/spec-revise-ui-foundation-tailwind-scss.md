---
title: 'Revise UI Foundation To Tailwind CSS And SCSS'
type: 'refactor'
created: '2026-07-09'
status: 'done'
baseline_commit: 'a3481ba82d337fb4405520f946ee83656631a4ef'
context:
  - '{project-root}/_bmad-output/project-context.md'
  - '{project-root}/_bmad-output/implementation-artifacts/epic-0-context.md'
  - '{project-root}/_bmad-output/implementation-artifacts/DD-001-fluyo-production-site/stories/DD-001.0.1-ui-tokens-and-global-styles.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The current DD-001 UI foundation was implemented as raw CSS custom properties in `tokens.css` plus global CSS in `main.css`, but the project direction is now Tailwind CSS and SCSS. Leaving the current foundation in place would make later UI primitives split styling responsibility between raw CSS tokens and Tailwind utilities.

**Approach:** Make Tailwind v4 and SCSS the project styling substrate. Move custom project tokens into Tailwind theme variables in the global SCSS entrypoint, wire Tailwind through Nuxt/Vite, and update the UI foundation plan and verification so later components consume Tailwind utilities backed by project tokens.

## Boundaries & Constraints

**Always:** Use npm and preserve Nuxt 4 / Cloudflare Pages compatibility. Keep the UI foundation inside this Nuxt app; do not introduce a standalone design-system package. Custom brand tokens must be defined through Tailwind theme namespaces, not as component-owned raw values. Preserve the approved visual constraints: stable font sizes, no negative letter spacing, no decorative shadows, square or restrained geometry, visible focus states, and reduced-motion handling.

**Ask First:** Any styling dependency beyond `tailwindcss`, `@tailwindcss/vite`, and `sass`; any move to `@nuxtjs/tailwindcss` instead of the official Tailwind Vite plugin; any change to route IA, locale strategy, Cloudflare deployment settings, or visual brand palette.

**Never:** Do not keep parallel token sources in `tokens.css` and Tailwind. Do not introduce Tailwind classes with arbitrary raw brand colors in components as the normal path. Do not edit generated Nuxt, Nitro, Cloudflare, or build output files.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Tailwind token utility generation | Global SCSS defines `@theme` tokens such as `--color-page`, `--font-body`, and `--spacing-section` | Tailwind utilities like `bg-page`, `font-body`, and spacing utilities are available to future Vue components | Build must fail if Tailwind integration is broken |
| Legacy token drift | Old `app/assets/css/tokens.css` and `main.css` remain wired in Nuxt | Verification fails because the project would have two styling substrates | Remove legacy CSS wiring and consolidate into SCSS |
| Unsafe global CSS | A global style uses `font-size: *vw`, negative `letter-spacing`, or `box-shadow` | Verification fails before review | Replace with stable Tailwind-backed tokens or base styles |

</frozen-after-approval>

## Code Map

- `package.json` -- npm scripts and dependency declarations.
- `package-lock.json` -- lockfile updated by npm install.
- `nuxt.config.ts` -- global stylesheet registration and Tailwind Vite plugin wiring.
- `app/assets/css/tailwind.css` -- Tailwind import and project `@theme` token source.
- `app/assets/css/tokens.css` -- legacy token source to remove.
- `app/assets/css/main.css` -- legacy global CSS to replace with SCSS.
- `app/assets/scss/main.scss` -- authored global SCSS base styles that consume Tailwind theme variables.
- `scripts/verify-ui-foundation.mjs` -- focused verification for Tailwind/SCSS token substrate.
- `_bmad-output/project-context.md` -- project rules must stop saying no CSS framework and document Tailwind/SCSS.
- `_bmad-output/planning-artifacts/architecture/architecture-fluyo-school-2026-07-08/ARCHITECTURE-SPINE.md` -- AD-7 and structural seed should reflect Tailwind theme tokens.
- `_bmad-output/implementation-artifacts/DD-001-fluyo-production-site/stories/DD-001.0.1-ui-tokens-and-global-styles.md` -- current story must be revised from raw CSS tokens to Tailwind/SCSS.
- `_bmad-output/implementation-artifacts/DD-001-fluyo-production-site/stories/DD-001.0.2-ui-primitives-and-app-shell.md` -- dependent UI primitive story should state primitives consume Tailwind utilities backed by project tokens.

## Tasks & Acceptance

**Execution:**
- [x] `package.json` / `package-lock.json` -- add Tailwind v4 Vite integration and Sass dependencies -- enables Tailwind utility generation and SCSS preprocessing.
- [x] `nuxt.config.ts` -- import `@tailwindcss/vite`, register the Vite plugin, and replace CSS entries with `~/assets/css/tailwind.css` plus `~/assets/scss/main.scss` -- makes Nuxt compile the new styling substrate.
- [x] `app/assets/css/tailwind.css` -- import Tailwind and define project tokens in `@theme static` -- routes all custom styling tokens through Tailwind.
- [x] `app/assets/scss/main.scss` -- keep authored global base styles in CSS cascade layers while consuming Tailwind theme variables -- enables SCSS without making it a parallel token source.
- [x] `app/assets/css/tokens.css` / `app/assets/css/main.css` -- remove legacy parallel CSS substrate -- prevents token drift.
- [x] `scripts/verify-ui-foundation.mjs` -- update checks for Tailwind dependency wiring, SCSS entrypoint, `@theme` tokens, banned global patterns, and removal of legacy CSS wiring -- protects the new plan.
- [x] Planning/context docs -- update architecture spine, project context, and DD-001 story docs to reflect Tailwind + SCSS as the UI foundation -- keeps future agents aligned.

**Acceptance Criteria:**
- Given the project is installed, when `npm run test:ui-foundation` runs, then it passes only if Tailwind is wired through Nuxt/Vite, custom tokens live in Tailwind `@theme`, and SCSS owns authored global base styles.
- Given the project builds for production, when `npm run build` runs, then Nuxt builds successfully with the Cloudflare Pages preset.
- Given future UI components need project colors, typography, spacing, radii, z-index, or motion, when they use Tailwind utilities, then those utilities resolve from project theme tokens rather than raw component literals.
- Given legacy CSS files are absent or ignored, when verification scans Nuxt config, then it confirms the app uses the Tailwind CSS entrypoint plus SCSS entrypoint and not `tokens.css` / `main.css`.

## Spec Change Log

- 2026-07-09: Implementation found that Tailwind v4 directives inside `.scss` were not transformed by the Nuxt/Vite/Sass pipeline and reached CSS minification as raw at-rules. Amended the executable plan to keep Tailwind import and `@theme` tokens in `app/assets/css/tailwind.css`, with SCSS owning authored global base styles that consume those theme variables. This avoids shipping unprocessed Tailwind directives while preserving the user intent that all custom tokens pass through Tailwind and SCSS is available for project styling.
- 2026-07-09: Review pass tightened verification for parsed Tailwind token declarations, Nuxt wiring, banned viewport/negative-tracking/shadow patterns, and token namespaces. SCSS now consumes theme variables without redefining responsive token values, keeping Tailwind as the single custom-token source.

## Design Notes

Tailwind v4 theme variables are the right fit because tokens defined in recognized namespaces generate matching utilities. Tailwind directives must live in `app/assets/css/tailwind.css` in this Nuxt/Vite/Sass pipeline; putting `@import "tailwindcss"` and `@theme` directly in `.scss` leaves unprocessed Tailwind at-rules in the build. Keep ordinary global selectors small and in `@layer base` inside SCSS; use Tailwind utility classes in Vue components later instead of expanding global component CSS.

Golden Tailwind token shape:

```css
@import "tailwindcss";

@theme static {
  --color-page: #fbfaf7;
  --font-body: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --spacing-section: 4rem;
}
```

## Verification

**Commands:**
- `npm run test:ui-foundation` -- expected: focused Tailwind/SCSS substrate checks pass.
- `npm run build` -- expected: Nuxt production build succeeds with existing Cloudflare warnings only.

## Suggested Review Order

**Styling Substrate**

- Tailwind theme is the single custom token source.
  [`tailwind.css:3`](../../app/assets/css/tailwind.css#L3)

- SCSS owns base selectors while consuming theme variables.
  [`main.scss:1`](../../app/assets/scss/main.scss#L1)

- Nuxt loads Tailwind before authored SCSS.
  [`nuxt.config.ts:7`](../../nuxt.config.ts#L7)

**Verification**

- Script fails if legacy token files return.
  [`verify-ui-foundation.mjs:5`](../../scripts/verify-ui-foundation.mjs#L5)

- Parsed declarations prove required tokens exist.
  [`verify-ui-foundation.mjs:79`](../../scripts/verify-ui-foundation.mjs#L79)

- Banned viewport, tracking, and shadow patterns stay guarded.
  [`verify-ui-foundation.mjs:149`](../../scripts/verify-ui-foundation.mjs#L149)

**Plan Alignment**

- Agent rules now require Tailwind-backed component styling.
  [`project-context.md:66`](../project-context.md#L66)

- Architecture AD-7 reflects Tailwind plus SCSS.
  [`ARCHITECTURE-SPINE.md:101`](../planning-artifacts/architecture/architecture-fluyo-school-2026-07-08/ARCHITECTURE-SPINE.md#L101)

- Current story records the accepted Tailwind foundation.
  [`DD-001.0.1-ui-tokens-and-global-styles.md:19`](DD-001-fluyo-production-site/stories/DD-001.0.1-ui-tokens-and-global-styles.md#L19)

**Dependencies**

- npm script and dev dependencies are wired explicitly.
  [`package.json:13`](../../package.json#L13)
