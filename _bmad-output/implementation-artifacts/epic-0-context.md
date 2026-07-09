# Epic 0 Context: UI Foundation

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Epic 0 establishes the in-code UI foundation before route-specific implementation. It must give later pages and primitives a consistent styling substrate for the approved four-route Fluyo production site without creating a standalone design-system package or duplicating one-off visual rules across pages.

## Stories

- Story 0.1: UI Tokens And Global Styles
- Story 0.2: UI Primitives And App Shell

## Requirements & Constraints

The foundation must support the premium, clean, warm school brand direction using restrained black, ivory/white, and deep burgundy emphasis. Styling must preserve editorial spacing, stable type sizes, square geometry or very restrained radii, hairline borders, visible focus treatment, subtle motion, and no decorative shadows. Global text sizing must avoid viewport-width scaling, and global letter spacing must not be negative.

The production site uses exactly four public routes: `/`, `/programs`, `/teachers`, and `/pricing`. Audience context travels through anchors, query parameters, and CTA context rather than separate audience routes. Ukrainian is the default language and English is selectable; layout primitives must tolerate localized text length changes.

## Technical Decisions

The UI foundation lives inside this Nuxt app under `app/`; no external design-system package or WDS runtime artifact is part of v1. Routes and layouts may compose sections, sections may consume typed content, UI primitives, and composables, and UI primitives must not import route pages or content modules except through props.

Current architecture requires tokenized styling with components referencing project theme utilities rather than raw brand values. The implementation substrate is Tailwind CSS plus SCSS: custom project tokens flow through Tailwind theme variables, while SCSS owns authored global base styles.

Cloudflare Pages remains the production boundary. `npm run build` is the baseline verification command, and Nuxt/Nitro/Cloudflare compatibility settings in `nuxt.config.ts` and `wrangler.jsonc` must stay aligned.

## UX & Interaction Patterns

The UI should feel modern, premium, minimal, friendly, and trustworthy rather than childish, generic, or corporate. Navigation and CTA surfaces must remain compact and clear across mobile and desktop. Focus states must be visible on light and dark surfaces without becoming visually noisy.

## Cross-Story Dependencies

Story 0.1 must define the styling substrate consumed by Story 0.2 primitives and app shell. Later content, CTA, route, and quality-gate stories depend on this foundation for consistent tokens, section rhythm, interaction affordances, and build verification.
