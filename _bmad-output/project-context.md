---
project_name: 'fluyo-school'
user_name: 'king'
date: '2026-07-09'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
existing_patterns_found: 4
status: 'complete'
rule_count: 39
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Nuxt `4.4.8` with Vue `3.5.39` and Vue Router `5.1.0`.
- Tailwind CSS `4.3.2` is wired through `@tailwindcss/vite` and Nuxt/Vite.
- SCSS is enabled through Dart Sass `1.101.0`.
- Project uses ESM (`"type": "module"` in `package.json`).
- TypeScript is managed through Nuxt-generated tsconfig references under `.nuxt/`.
- Deployment target is Cloudflare Pages via Nitro `cloudflare-pages`.
- Nuxt `compatibilityDate` is `2025-07-15`.
- Wrangler `compatibility_date` is `2026-06-25`.
- Cloudflare Node compatibility is enabled in both Nuxt Nitro (`nodeCompat: true`) and `wrangler.jsonc` (`nodejs_compat`).
- Dev tooling versions: Wrangler `4.105.0`, `nitro-cloudflare-dev` `0.2.2`, `@types/node` `26.0.1`.
- Use npm as the package manager because `package-lock.json` is present.

## Critical Implementation Rules

### Language-Specific Rules

- Treat TypeScript as strict: Nuxt-generated configs enable `strict`, `noUncheckedIndexedAccess`, `isolatedModules`, `verbatimModuleSyntax`, and `forceConsistentCasingInFileNames`.
- Keep the root `tsconfig.json` as a Nuxt reference file unless intentionally changing project-wide TypeScript behavior.
- Do not edit generated `.nuxt` files; run `npm run postinstall`/`nuxt prepare` when generated Nuxt types need refreshing.
- Use ESM syntax only; the project is `"type": "module"`.
- Preserve Cloudflare runtime typing through `app/env.d.ts`, `server/env.d.ts`, and `_cloudflare/env.d.ts` rather than redefining `Env` or request context types ad hoc.
- Prefer Nuxt path aliases (`~/`, `@/`, `#server`, `#shared`) over brittle relative imports when crossing app/server/shared boundaries.

### Framework-Specific Rules

- Follow Nuxt 4 conventions: app code belongs under `app/`, server code under `server/`, and static public assets under `public/`.
- Keep `nuxt.config.ts` as the source of runtime/deployment behavior; Cloudflare Pages is configured through Nitro `preset: "cloudflare-pages"`.
- Keep Tailwind wired through `@tailwindcss/vite` in `nuxt.config.ts`; do not switch to another Tailwind integration without an explicit architecture/product decision.
- Preserve the `nitro-cloudflare-dev` module while local Cloudflare runtime behavior is needed.
- Use Vue single-file components for UI. The current app entry is `app/app.vue`; replace `NuxtWelcome` when building the real application surface.
- Keep `NuxtRouteAnnouncer` in the root app unless there is a deliberate accessibility replacement.
- When adding Cloudflare-specific server behavior, use Nitro/server routes and the typed H3 event context rather than browser-only APIs.
- Avoid adding client-only dependencies or Node-only APIs without checking Cloudflare Pages compatibility.

### Testing Rules

- No test runner or test directory is configured yet; do not assume Vitest, Jest, or Playwright without adding the dependency and config intentionally.
- `npm run test:ui-foundation` is a dependency-free verification script for the Tailwind/SCSS UI foundation; it is not a general test runner.
- When adding tests for Nuxt/Vue code, colocate or organize them consistently with the first chosen project test convention and document that convention here.
- For Cloudflare/Nitro server behavior, prefer tests that exercise Nitro handlers with Cloudflare-compatible request/context assumptions.
- Do not treat generated `.nuxt`, `dist`, `.wrangler`, or Cloudflare type output as test targets.
- Before claiming a change is verified, run the most relevant available command: currently `npm run build` is the baseline project verification command.

### Code Quality & Style Rules

- No ESLint, Prettier, Biome, or style config is present yet; preserve surrounding file style instead of inventing a new formatter convention.
- Global custom Tailwind tokens are allowed and expected: visual tokens belong in Tailwind `@theme` variables in `app/assets/css/tailwind.css`.
- Vue component style should stay readable: prefer named component-local classes such as `section-header` or `header-link` in templates, then define those classes in the same Vue SFC `<style>` block with Tailwind `@apply`.
- Component `<style>` blocks should use `@apply` with utilities backed by the global Tailwind tokens; do not dump long Tailwind utility strings into templates and do not hard-code raw brand values in component CSS.
- Authored global base styles belong in `app/assets/scss/main.scss`; keep them small and use Tailwind theme variables for token values.
- Keep generated/build artifacts out of source edits: `.nuxt`, `.output`, `.nitro`, `.cache`, `dist`, `.wrangler`, and `node_modules` are ignored outputs.
- Do not commit local secrets: `.env`, `.env.*`, and `.dev.vars*` are ignored except example files.
- Prefer small, conventional Nuxt/Vue files over broad abstractions while the app is still starter-level.
- Keep comments sparse and useful; avoid narrating obvious Vue/TypeScript behavior.
- If adding a formatter/linter, add explicit npm scripts and config so future agents have a concrete command to run.

### Development Workflow Rules

- Use npm commands because this repo has `package-lock.json`.
- Development server: `npm run dev`.
- Baseline production verification: `npm run build`.
- Static generation is available through `npm run generate` when the app is intended to be pre-rendered.
- Cloudflare local preview uses `npm run preview`, which builds first and then runs `wrangler pages dev`.
- Deployment uses `npm run deploy`, which builds first and then runs `wrangler pages deploy`.
- Refresh Cloudflare runtime types with `npm run cf-typegen` after changing Wrangler bindings or compatibility settings.
- No branch naming, commit message, or PR checklist convention is documented yet; do not invent one in implementation work.

### Critical Don't-Miss Rules

- Do not edit generated Nuxt or Cloudflare output files (`.nuxt`, `dist`, `.wrangler`, `worker-configuration.d.ts`) as source-of-truth code.
- Do not remove Cloudflare compatibility settings casually; both Nuxt Nitro and Wrangler currently enable Node compatibility.
- Do not introduce dependencies that require unsupported runtime APIs without validating Cloudflare Pages compatibility.
- Do not reintroduce `app/assets/css/tokens.css` or `app/assets/css/main.css` as parallel token/global-style sources; Tailwind theme CSS plus SCSS are the styling substrate.
- Do not hardcode secrets or environment-specific values into app/server code; use environment bindings or ignored local env files.
- Do not claim test coverage exists until a test runner and test scripts are actually added.
- Do not leave `NuxtWelcome` in place when implementing real product UI; it is only the starter placeholder.
- Keep `wrangler.jsonc` and `nuxt.config.ts` deployment assumptions aligned when changing output directories, compatibility dates, or Cloudflare bindings.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow all rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Update this file if new patterns emerge.

**For Humans:**

- Keep this file lean and focused on agent needs.
- Update when technology stack changes.
- Review periodically for outdated rules.
- Remove rules that become obvious over time.

Last Updated: 2026-07-09
