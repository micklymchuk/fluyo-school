# DD-001 Implementation Stories: Fluyo School Production Four-Page Site

**Delivery:** `_bmad-output/deliveries/DD-001-fluyo-production-site.yaml`  
**Test Scenario:** `_bmad-output/test-scenarios/TS-001-fluyo-production-site.yaml`  
**Architecture:** `_bmad-output/planning-artifacts/architecture/architecture-fluyo-school-2026-07-08/ARCHITECTURE-SPINE.md`  
**Created:** 2026-07-09  
**Status:** Ready for implementation  

This package decomposes DD-001 into implementation-ready stories for the Nuxt production site. It preserves the required order from the handoff: build the in-code UI foundation first, then content and contracts, then route surfaces, then quality gates.

No feature branch was created for this planning-only artifact. Create the implementation branch when starting `DD-001.0.1`.

## Source Artifacts

- `_bmad-output/deliveries/DD-001-fluyo-production-site.yaml`
- `_bmad-output/deliveries/DD-001-handoff-log.md`
- `_bmad-output/test-scenarios/TS-001-fluyo-production-site.yaml`
- `_bmad-output/C-UX-Scenarios/00-multi-page-ia-redesign.md`
- `_bmad-output/planning-artifacts/fluyo-school-page-layout-schemas.html`
- `_bmad-output/planning-artifacts/fluyo-school-landing-visual-schema.md`
- `_bmad-output/planning-artifacts/architecture/architecture-fluyo-school-2026-07-08/ARCHITECTURE-SPINE.md`
- `_bmad-output/E-Assets/content/launch-content-approval-matrix.md`
- `_bmad-output/E-Assets/content/production-content.md`
- `docs/design-ref/design-els/`
- `docs/design-ref/design-instagram-elements/`

## Implementation Sequence

| Order | Story | Epic | Size | Depends On |
| --- | --- | --- | --- | --- |
| 1 | `stories/DD-001.0.1-ui-tokens-and-global-styles.md` | Epic 0 - UI foundation | Medium | None |
| 2 | `stories/DD-001.0.2-ui-primitives-and-app-shell.md` | Epic 0 - UI foundation | Medium | `DD-001.0.1` |
| 3 | `stories/DD-001.1.1-typed-content-locale-and-seo.md` | Epic 1 - Content and routing contracts | Large | `DD-001.0.1` |
| 4 | `stories/DD-001.1.2-telegram-cta-and-tracking-contracts.md` | Epic 1 - CTA and analytics contracts | Medium | `DD-001.1.1` |
| 5 | `stories/DD-001.1.3-launch-production-content-validation.md` | Epic 1 - Content integrity | Medium | `DD-001.1.1` |
| 6 | `stories/DD-001.2.1-home-route.md` | Epic 2 - Home and Learning Paths | Large | `DD-001.0.2`, `DD-001.1.1`, `DD-001.1.2` |
| 7 | `stories/DD-001.2.2-learning-paths-route.md` | Epic 2 - Home and Learning Paths | Large | `DD-001.2.1` |
| 8 | `stories/DD-001.3.1-teachers-proof-route.md` | Epic 3 - Proof and Pricing | Large | `DD-001.1.3`, `DD-001.2.2` |
| 9 | `stories/DD-001.3.2-trial-pricing-route.md` | Epic 3 - Proof and Pricing | Large | `DD-001.1.2`, `DD-001.1.3`, `DD-001.2.2` |
| 10 | `stories/DD-001.4.1-responsive-accessibility-and-build-validation.md` | Epic 4 - Quality gates | Medium | `DD-001.2.1` through `DD-001.3.2` |
| 11 | `stories/DD-001.4.2-content-analytics-and-handoff-validation.md` | Epic 4 - Launch gates | Medium | `DD-001.4.1` |

## Work Item Inventory

- Create the Tailwind/SCSS UI foundation with `app/assets/css/tailwind.css` for Tailwind `@theme` tokens and `app/assets/scss/main.scss` for authored global base styles.
- Replace starter `NuxtWelcome` with a real Nuxt app shell while preserving `NuxtRouteAnnouncer`.
- Add default layout, global header, mobile navigation, language control, Telegram CTA, and footer/contact strip.
- Add route-agnostic UI primitives and section primitives under `app/components/ui/`, `app/components/navigation/`, and `app/components/sections/`.
- Add typed bilingual content records and metadata under `app/data/`.
- Add `useLocale`, `useSeo`, `useTelegramCta`, and `useTracking` composables.
- Add launch-sensitive content readiness handling and release checks.
- Build `/`, `/programs`, `/teachers`, and `/pricing`.
- Preserve path context through anchors, query state, CTA contexts, and Telegram tracking payloads.
- Validate route direct loads, accessibility, responsive behavior, content integrity, analytics events, and production build.

## Global Acceptance Criteria

- [ ] V1 public routes are exactly `/`, `/programs`, `/teachers`, and `/pricing`.
- [ ] No production implementation recreates the old 11-section single-page prototype.
- [ ] No `/exams`, `/kids`, or `/adults` route is created for v1.
- [ ] Ukrainian is the default visible language; English is selectable without route-structure drift.
- [ ] Public route copy is sourced from typed content records, not hard-coded inside route-specific UI primitives.
- [ ] Telegram CTA links are built through one helper and preserve available `path`, `format`, `sourceRoute`, `locale`, and `messageIntent` context.
- [ ] Analytics events use only `path_card_click`, `program_path_view`, `pricing_summary_view`, `pricing_view`, `teacher_proof_view`, `telegram_click`, and `telegram_context`.
- [ ] Launch-sensitive records have explicit content readiness and only production-facing records ship as public truth.
- [ ] UI uses the in-code foundation: Tailwind theme tokens, SCSS base styles, primitives, section patterns, square geometry, hairline borders, restrained palette, no decorative shadows.
- [ ] Text uses stable type sizes, no viewport-width font scaling, and no negative letter spacing.
- [ ] Routes have no horizontal overflow at 375, 428, 768, 1440, or 1920 widths.
- [ ] `npm run build` passes with the Cloudflare Pages Nitro preset.

## Definition Of Ready For Development

- DD-001, TS-001, the architecture spine, and this story index are available to the implementation agent.
- The implementation agent starts with `DD-001.0.1`.
- Final production content is defined in `_bmad-output/E-Assets/content/production-content.md`; each story must preserve production-facing content and validation rules.

## Definition Of Done For DD-001

- Stories `DD-001.0.1` through `DD-001.4.2` are implemented and verified.
- TS-001 must-pass tests pass.
- Content owner confirms approved, hidden, or blocked handling for launch-sensitive records.
- Designer/product owner reviews route screenshots against the layout schema and raw design references.
- Final result is recorded in `_bmad-output/_progress/00-design-log.md`.
